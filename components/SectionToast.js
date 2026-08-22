'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const DURATION = 6000;
const EXIT_DURATION = 350;
const BACK_LIFETIME = 900;
const STACK_OFFSET_Y = 54;
const STACK_SCALE = 0.96;
const STACK_OPACITY = 0.6;

const SECTION_TIPS = {
    services: 'Discover our core digital solutions tailored for your growth.',
    projects: 'Explore our latest case studies and successful client deliveries.',
    work: 'See how we engineer high-performance web experiences.',
    about: 'Learn more about our mission, vision, and core values.',
    team: 'Meet the talented minds behind StudioX.',
    footer: 'Get in touch with us to start your next big project.',
};

const toastStyles = `
  .section-toast-root {
    position: fixed;
    top: 24px;
    left: 24px;
    z-index: 9999;
    max-width: 300px;
    width: calc(100vw - 48px);
    pointer-events: none;
  }

  .section-toast-card {
    padding: 14px 40px 14px 16px;
    will-change: transform, opacity;
  }

  .section-toast-text {
    font-size: 12.5px;
  }

  @media (max-width: 900px) {
    .section-toast-root {
      top: 84px;
      left: 14px;
      max-width: 240px;
      width: calc(100vw - 28px);
    }

    .section-toast-card {
      padding: 10px 32px 10px 12px;
    }

    .section-toast-text {
      font-size: 11.5px;
    }
  }
`;

export default function SectionToast() {
    const [stack, setStack] = useState([]);

    const lastTriggered = useRef(null);
    const keyCounter = useRef(0);
    const timers = useRef({});

    const removeToast = useCallback((key) => {
        if (timers.current[key]) {
            clearTimeout(timers.current[key]);
            delete timers.current[key];
        }
        setStack((prev) => prev.filter((t) => t.key !== key));
    }, []);

    const dismissToast = useCallback((key) => {
        setStack((prev) =>
            prev.map((t) => (t.key === key ? { ...t, leaving: true } : t))
        );
        setTimeout(() => removeToast(key), EXIT_DURATION);
    }, [removeToast]);

    const addToast = useCallback((id, text) => {
        const key = ++keyCounter.current;

        setStack((prev) => {
            let next = [...prev];

            if (next.length >= 2) {
                const oldest = next[next.length - 1];
                if (oldest && timers.current[oldest.key]) {
                    clearTimeout(timers.current[oldest.key]);
                    delete timers.current[oldest.key];
                }
                setTimeout(() => dismissToast(oldest.key), 0);
                next = next.slice(0, 1);
            }

            if (next[0]) {
                const backKey = next[0].key;
                if (timers.current[backKey]) {
                    clearTimeout(timers.current[backKey]);
                }
                timers.current[backKey] = setTimeout(
                    () => dismissToast(backKey),
                    BACK_LIFETIME
                );
            }

            return [{ key, id, text, entering: true, leaving: false }, ...next].slice(0, 2);
        });

        requestAnimationFrame(() => {
            setTimeout(() => {
                setStack((prev) =>
                    prev.map((t) => (t.key === key ? { ...t, entering: false } : t))
                );
            }, 30);
        });

        timers.current[key] = setTimeout(() => dismissToast(key), DURATION);
    }, [dismissToast]);

    const triggerToast = useCallback((id) => {
        if (id === 'hero' || id === lastTriggered.current) return;
        lastTriggered.current = id;
        const text = SECTION_TIPS[id] || 'Explore this section to learn more.';
        addToast(id, text);
    }, [addToast]);

    useEffect(() => {
        const sections = document.querySelectorAll('[data-section]');
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-section');
                        if (id) triggerToast(id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-45% 0px -45% 0px',
                threshold: 0,
            }
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => {
            observer.disconnect();
            Object.values(timers.current).forEach(clearTimeout);
        };
    }, [triggerToast]);

    if (!stack.length) return null;

    return (
        <div className="section-toast-root">
            <style>{toastStyles}</style>

            {stack.map((t, i) => {
                const y = i * STACK_OFFSET_Y;
                const scale = i === 0 ? 1 : STACK_SCALE;
                const opacity = i === 0 ? 1 : STACK_OPACITY;

                let transform = `translate3d(0, ${t.entering ? -16 : y}px, 0) scale(${t.entering ? 0.95 : scale})`;
                let finalOpacity = t.entering ? 0 : opacity;

                if (t.leaving) {
                    transform = `translate3d(40px, ${y}px, 0) scale(${scale})`;
                    finalOpacity = 0;
                }

                return (
                    <div
                        key={t.key}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            zIndex: 2 - i,
                            transform,
                            opacity: finalOpacity,
                            willChange: 'transform, opacity',
                            transition: `opacity ${t.leaving ? EXIT_DURATION : 320}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${t.leaving ? EXIT_DURATION : 320}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                            pointerEvents: t.leaving ? 'none' : 'auto',
                        }}
                    >
                        <ToastCard toast={t} onClose={() => dismissToast(t.key)} showProgress={i === 0 && !t.leaving} />
                    </div>
                );
            })}
        </div>
    );
}

function ToastCard({ toast, onClose, showProgress }) {
    const progressRef = useRef(null);

    useEffect(() => {
        if (!showProgress) return;
        const el = progressRef.current;
        if (!el) return;

        el.style.transition = 'none';
        el.style.width = '0%';
        void el.offsetWidth;

        requestAnimationFrame(() => {
            el.style.transition = `width ${DURATION}ms linear`;
            el.style.width = '100%';
        });
    }, [showProgress]);

    return (
        <div
            className="section-toast-card"
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(15, 23, 42, 0.06)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            {showProgress && (
                <div
                    ref={progressRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '0%',
                        background: 'rgba(37, 99, 235, 0.08)',
                        pointerEvents: 'none',
                    }}
                />
            )}

            <button
                onClick={onClose}
                aria-label="Close"
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(15, 23, 42, 0.05)',
                    color: 'rgba(15, 23, 42, 0.6)',
                    fontSize: 13,
                    lineHeight: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(15, 23, 42, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(15, 23, 42, 0.05)')}
            >
                ×
            </button>

            <p
                className="section-toast-text"
                style={{
                    position: 'relative',
                    margin: 0,
                    lineHeight: 1.45,
                    color: 'rgba(15, 23, 42, 0.88)',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                }}
            >
                {toast.text}
            </p>
        </div>
    );
}