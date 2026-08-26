'use client';

export function normalizeManifest(manifest = {}) {
    const images = Array.isArray(manifest.images) ? manifest.images : [];
    const fetchables = Array.isArray(manifest.fetchables) ? manifest.fetchables : [];

    const normalizeUrl = (value) => {
        if (typeof value !== 'string') return null;
        const trimmed = value.trim();
        if (!trimmed) return null;
        const withoutQuery = trimmed.split('#')[0].split('?')[0];
        if (!withoutQuery) return null;

        return (/^(https?:)?\/\//i.test(withoutQuery) || withoutQuery.startsWith('data:'))
            ? withoutQuery
            : (withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`);
    };

    return {
        images: Array.from(new Set(images.map(normalizeUrl).filter(Boolean))),
        fetchables: Array.from(new Set(fetchables.map(normalizeUrl).filter(Boolean))),
    };
}

export async function preloadAssets(manifest = {}, onProgress = () => { }) {
    if (typeof window === 'undefined') return;

    const { images, fetchables } = normalizeManifest(manifest);
    const totalUnits = images.length + fetchables.length;
    let loadedUnits = 0;

    if (totalUnits === 0) {
        onProgress(1, 1, { msg: 'no-assets' });
        return;
    }

    const report = (detail) => {
        loadedUnits += 1;
        onProgress(loadedUnits, totalUnits, detail);
    };

    const imagePromises = images.map((src) =>
        new Promise((resolve) => {
            const img = new Image();
            img.decoding = 'async';
            img.onload = () => { report({ type: 'image', src }); resolve(); };
            img.onerror = () => { report({ type: 'image-error', src }); resolve(); };
            img.src = src;
        })
    );

    const fetchPromises = fetchables.map((url) =>
        fetch(url, { method: 'GET' })
            .then(() => report({ type: 'fetch-complete', url }))
            .catch((err) => report({ type: 'fetch-error', url, err }))
    );

    await Promise.allSettled([...imagePromises, ...fetchPromises]);
}

export default preloadAssets;