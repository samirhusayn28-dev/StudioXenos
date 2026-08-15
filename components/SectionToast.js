'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const DURATION = 6000;
const EXIT_DURATION = 400;
const BACK_LIFETIME = 900; // peeche wala card sirf itni der ruk ke fast-wipe hoga
const STACK_OFFSET_Y = 58;
const STACK_SCALE = 0.95;
const STACK_OPACITY = 0.55;
const STACK_BLUR = 5; // px

const toastStyles = `
  .section-toast-root {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 9999;
    max-width: 300px;
    width: calc(100vw - 40px);
    pointer-events: none;
  }

  .section-toast-card {
    padding: 13px 38px 13px 16px;
  }

  .section-toast-text {
    font-size: 12.5px;
  }

  @media (max-width: 900px) {
    .section-toast-root {
      top: 92px;
      left: 12px;
      max-width: 230px;
      width: calc(100vw - 24px);
    }

    .section-toast-card {
      padding: 10px 30px 10px 12px;
    }

    .section-toast-text {
      font-size: 11.5px;
    }
  }
`;

export default function SectionToast() {
  const [stack, setStack] = useState([]); // index 0 = top/newest

  const cache = useRef({});
  const pending = useRef(new Set());
  const activeId = useRef(null);
  const lastTriggered = useRef(null);
  const keyCounter = useRef(0);
  const timers = useRef({});
  const rafId = useRef(null);
  const cleanupRef = useRef(() => {});

  const removeToast = useCallback((key) => {
    clearTimeout(timers.current[key]);
    delete timers.current[key];
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
      let next = prev;

      // agar stack full hai (2), sabse purana turant nikal do
      if (next.length >= 2) {
        const oldest = next[next.length - 1];
        clearTimeout(timers.current[oldest.key]);
        delete timers.current[oldest.key];
        setTimeout(() => dismissToast(oldest.key), 0);
        next = next.slice(0, 1);
      }

      // jo abhi top (index 0) tha, ab peeche (index 1) ban jayega —
      // uska full 6s timer cancel karke fast back-lifetime timer set karo
      if (next[0]) {
        const backKey = next[0].key;
        clearTimeout(timers.current[backKey]);
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
      }, 20);
    });

    timers.current[key] = setTimeout(() => dismissToast(key), DURATION);
  }, [dismissToast]);

  const computeActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('[data-section]');
    if (!sections.length) return null;

    const viewportCenter = window.innerHeight / 2;
    let closest = null;
    let closestDist = Infinity;

    sections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = el.dataset.section;
      }
    });

    return closest;
  }, []);

  const startToast = useCallback((id) => {
    lastTriggered.current = id;

    const cached = cache.current[id];
    if (cached) {
      addToast(id, cached);
      return;
    }

    if (pending.current.has(id)) return;
    pending.current.add(id);

    fetch('/api/section-tip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        const text = data?.text || 'Explore this section to learn more.';
        cache.current[id] = text;
        addToast(id, text);
      })
      .catch((err) => {
        console.error('SectionToast fetch failed:', err);
        const text = 'Explore this section to learn more.';
        cache.current[id] = text;
        addToast(id, text);
      })
      .finally(() => {
        pending.current.delete(id);
      });
  }, [addToast]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const sections = document.querySelectorAll('[data-section]');
      if (!sections.length) {
        console.warn('[SectionToast] No [data-section] elements found on mount.');
        return;
      }

      const initial = computeActiveSection();
      activeId.current = initial;
      lastTriggered.current = initial;

      const onScroll = () => {
        if (rafId.current) return;
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          const current = computeActiveSection();
          if (!current || current === activeId.current) return;
          activeId.current = current;

          if (current === 'hero') return;
          if (current === lastTriggered.current) return;

          startToast(current);
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);

      cleanupRef.current = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanupRef.current();
      Object.values(timers.current).forEach(clearTimeout);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startToast, computeActiveSection]);

  if (!stack.length) return null;

  return (
    <div className="section-toast-root">
      <style>{toastStyles}</style>

      {stack.map((t, i) => {
        const y = i * STACK_OFFSET_Y;
        const scale = i === 0 ? 1 : STACK_SCALE;
        const opacity = i === 0 ? 1 : STACK_OPACITY;
        const blur = i === 0 ? 0 : STACK_BLUR;

        let transform = `translateY(${t.entering ? -14 : y}px) scale(${t.entering ? 0.97 : scale})`;
        let finalOpacity = t.entering ? 0 : opacity;
        let finalBlur = t.entering ? 0 : blur;

        if (t.leaving) {
          transform = `translate(52px, ${y}px) scale(${scale})`;
          finalOpacity = 0;
          finalBlur = STACK_BLUR;
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
              filter: `blur(${finalBlur}px)`,
              transition: `opacity ${t.leaving ? EXIT_DURATION : 380}ms cubic-bezier(0.22,0.9,0.3,1), transform ${t.leaving ? EXIT_DURATION : 380}ms cubic-bezier(0.22,0.9,0.3,1), filter ${t.leaving ? EXIT_DURATION : 380}ms cubic-bezier(0.22,0.9,0.3,1)`,
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

    // forced reflow — browser ko current (0%) state "commit" karne pe majboor karta hai
    // isके bina agla style-change turant merge ho sakta hai aur transition skip ho jati hai
    void el.offsetWidth;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `width ${DURATION}ms linear`;
        el.style.width = '100%';
      });
    });
  }, [showProgress]);

  return (
    <div
      className="section-toast-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        background: 'rgba(255, 255, 255, 0.55)',
        border: '1px solid transparent',
        boxShadow: '0 8px 24px rgba(20, 20, 40, 0.14), 0 1px 4px rgba(20, 20, 40, 0.08)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
      }}
    >
      {showProgress && (
        <div
          ref={progressRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '0%',
            background: 'rgba(37, 99, 235, 0.10)',
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
          background: 'rgba(15, 23, 42, 0.06)',
          color: 'rgba(15, 23, 42, 0.65)',
          fontSize: 13,
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ×
      </button>

      <p
        className="section-toast-text"
        style={{
          position: 'relative',
          margin: 0,
          lineHeight: 1.5,
          color: 'rgba(15, 23, 42, 0.88)',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        }}
      >
        {toast.text}
      </p>
    </div>
  );
}