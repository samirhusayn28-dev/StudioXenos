'use client';

// Centralized preloader utility. Exposes `preloadAssets(manifest, onProgress)`
// - manifest: { images: string[], fetchables: string[], fonts: string[] }
// - onProgress: (loaded, total, detail) => void

export function normalizeManifest(manifest = {}) {
    const images = Array.isArray(manifest.images) ? manifest.images : [];
    const fetchables = Array.isArray(manifest.fetchables) ? manifest.fetchables : [];
    const fonts = Array.isArray(manifest.fonts) ? manifest.fonts : [];

    const normalizeUrl = (value) => {
        if (typeof value !== 'string') return null;
        const trimmed = value.trim();
        if (!trimmed) return null;

        const withoutHash = trimmed.split('#')[0];
        const withoutQuery = withoutHash.split('?')[0];
        if (!withoutQuery) return null;

        if (/^(https?:)?\/\//i.test(withoutQuery) || withoutQuery.startsWith('data:')) {
            return withoutQuery;
        }

        return withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
    };

    const unique = (values) => Array.from(new Set(values.map(normalizeUrl).filter(Boolean)));

    return {
        images: unique(images),
        fetchables: unique(fetchables),
        fonts: Array.from(new Set(fonts.filter(Boolean))),
    };
}

export async function preloadAssets(manifest = {}, onProgress = () => { }) {
    if (typeof window === 'undefined') return Promise.resolve();

    const normalizedManifest = normalizeManifest(manifest);
    const images = normalizedManifest.images;
    const fetchables = normalizedManifest.fetchables;
    const fonts = normalizedManifest.fonts;

    const totalUnits = images.length + fetchables.length + (fonts.length > 0 ? 1 : 0);
    let loadedUnits = 0;

    const report = (detail = {}) => {
        onProgress(loadedUnits, totalUnits, detail);
    };

    if (totalUnits === 0) {
        onProgress(1, 1, { msg: 'no-assets' });
        return Promise.resolve();
    }

    const imagePromises = images.map((src) => new Promise((resolve) => {
        try {
            const img = new Image();
            img.decoding = 'async';
            img.referrerPolicy = 'no-referrer';
            img.onload = () => {
                loadedUnits += 1;
                report({ type: 'image', src });
                resolve({ ok: true, src });
            };
            img.onerror = () => {
                loadedUnits += 1;
                report({ type: 'image-error', src });
                resolve({ ok: false, src });
            };
            img.src = src;
        } catch (err) {
            loadedUnits += 1;
            report({ type: 'image-exception', src, err });
            resolve({ ok: false, src, err });
        }
    }));

    const fetchPromises = fetchables.map((url) => new Promise(async (resolve) => {
        try {
            const resp = await fetch(url, { method: 'GET' });
            if (!resp.ok) {
                loadedUnits += 1;
                report({ type: 'fetch-error', url, status: resp.status });
                return resolve({ ok: false, url, status: resp.status });
            }

            const contentLength = resp.headers.get('content-length');
            if (resp.body && contentLength) {
                const reader = resp.body.getReader();
                const total = parseInt(contentLength, 10);
                let received = 0;
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    received += value?.length || value?.byteLength || 0;
                    report({ type: 'fetch-progress', url, received, total });
                }
                loadedUnits += 1;
                report({ type: 'fetch-complete', url });
                return resolve({ ok: true, url });
            }

            await resp.blob();
            loadedUnits += 1;
            report({ type: 'fetch-complete', url });
            resolve({ ok: true, url });
        } catch (err) {
            loadedUnits += 1;
            report({ type: 'fetch-exception', url, err });
            resolve({ ok: false, url, err });
        }
    }));

    const fontPromise = (fonts.length > 0) ? new Promise((resolve) => {
        try {
            let loadedLinks = 0;
            fonts.forEach((href) => {
                try {
                    if (document.querySelector(`link[href="${href}"]`)) {
                        loadedLinks += 1;
                        return;
                    }
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    link.onload = () => {
                        loadedLinks += 1;
                        report({ type: 'font-css-loaded', href });
                        if (loadedLinks === fonts.length) {
                            document.fonts.ready.then(() => {
                                loadedUnits += 1;
                                report({ type: 'fonts-ready' });
                                resolve(true);
                            }).catch(() => {
                                loadedUnits += 1;
                                report({ type: 'fonts-ready-failed' });
                                resolve(false);
                            });
                        }
                    };
                    link.onerror = () => {
                        loadedLinks += 1;
                        report({ type: 'font-css-error', href });
                        if (loadedLinks === fonts.length) {
                            document.fonts.ready.then(() => {
                                loadedUnits += 1;
                                report({ type: 'fonts-ready' });
                                resolve(true);
                            }).catch(() => {
                                loadedUnits += 1;
                                report({ type: 'fonts-ready-failed' });
                                resolve(false);
                            });
                        }
                    };
                    document.head.appendChild(link);
                } catch (err) {
                    report({ type: 'font-link-exception', href, err });
                }
            });

            setTimeout(() => {
                document.fonts.ready.then(() => {
                    if (loadedUnits < totalUnits) {
                        loadedUnits += 1;
                    }
                    report({ type: 'fonts-ready-timeout' });
                    resolve(true);
                }).catch(() => {
                    loadedUnits += 1;
                    report({ type: 'fonts-ready-timeout-failed' });
                    resolve(false);
                });
            }, 3000);
        } catch (err) {
            loadedUnits += 1;
            report({ type: 'fonts-exception', err });
            resolve(false);
        }
    }) : Promise.resolve(null);

    const all = [];
    all.push(...imagePromises);
    all.push(...fetchPromises);
    if (fonts.length > 0) all.push(fontPromise);

    const progressInterval = setInterval(() => report(), 120);

    await Promise.all(all);

    clearInterval(progressInterval);
    report({ type: 'complete' });
}

export default preloadAssets;
