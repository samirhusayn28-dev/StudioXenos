import React, { useEffect, useRef, useState, useCallback } from 'react';
import phtsImg from './assets/PHTS.png';
import mp1Img from './assets/MP1.png';
import mp2Img from './assets/MP2.png';
import mp3Img from './assets/MP3.png';

const projects = [
  {
    img: phtsImg,
    title: 'PHTS',
    tag: 'Web App',
    year: '2025',
    accent: '#c47a30',
    accentRgb: '196,122,48',
    desc: 'A full-featured web application built with modern technologies. Clean UI, smooth interactions, and a seamless user experience from end to end.',
    url: 'https://phts.vercel.app/',
    github: 'https://github.com/samirhusayn28-dev/PHTS.git',
    stats: [
      { label: 'Stack', value: 'React' },
      { label: 'Deploy', value: 'Vercel' },
      { label: 'Year', value: '2025' },
    ],
  },
  {
    img: mp1Img,
    title: 'Personal Portfolio',
    tag: 'Portfolio',
    year: '2025',
    accent: '#315cfd',
    accentRgb: '49,92,253',
    desc: 'A sleek personal portfolio showcasing projects, skills, and experience with a clean, modern design and smooth animations.',
    url: 'https://personal-portfolio-lemon-ten.vercel.app/',
    github: 'https://github.com/Mukhtar-816/Personal_Portfolio.git',
    stats: [
      { label: 'Stack', value: 'React' },
      { label: 'Deploy', value: 'Vercel' },
      { label: 'Year', value: '2025' },
    ],
  },
  {
    img: mp2Img,
    title: 'Hospital Mgmt',
    tag: 'Web App',
    year: '2025',
    accent: '#22c97a',
    accentRgb: '34,201,122',
    desc: 'A full-featured hospital management system with patient records, appointment scheduling, and an admin dashboard built with Next.js.',
    url: 'https://hospital-managment-system-rosy.vercel.app/',
    github: 'https://github.com/Mukhtar-816/Hospital-Management-System-Nextjs.git',
    stats: [
      { label: 'Stack', value: 'Next.js' },
      { label: 'Deploy', value: 'Vercel' },
      { label: 'Year', value: '2025' },
    ],
  },
  {
    img: mp3Img,
    title: 'Bid&Go',
    tag: 'Web App',
    year: '2025',
    accent: '#e63946',
    accentRgb: '230,57,70',
    desc: 'A real-time online bidding and auction platform where users can list items, place live bids, and track auctions as they unfold — built for speed and a smooth bidding experience.',
    url: 'https://mukhtar-dev.vercel.app',
    github: '#',
    stats: [
      { label: 'Stack', value: 'React' },
      { label: 'Deploy', value: 'Vercel' },
      { label: 'Year', value: '2025' },
    ],
  },
];

const DEFAULT_IMG_W_PX = 340;
const MIN_IMG_W = 180;
const MAX_IMG_W = 560;

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,900&family=Outfit:wght@300;400;500;600&family=Poppins:wght@500;600&display=swap');

  .pj-section {
    position: relative;
    background: var(--bg-primary);
    transition: background 0.4s ease;
  }

  .pj-viewport {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pj-grid {
    display: flex;
    align-items: stretch;
    gap: 20px;
    width: min(1320px, 96vw);
    height: min(680px, 88vh);
  }

  .pj-img-col {
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: stretch;
    transition: width 0.18s ease;
  }

  .pj-img-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: #0a0a0a;
    cursor: zoom-in;
    width: 100%;
  }

  .pj-img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.7s ease;
  }
  .pj-img-card:hover .pj-img { transform: scale(1.04); }

  .pj-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(175deg, transparent 30%, rgba(4,6,18,0.45) 60%, rgba(4,6,18,0.9) 100%);
    pointer-events: none;
  }

  .pj-img-counter {
    position: absolute; top: 16px; left: 16px;
    font-family: 'Outfit', sans-serif;
    font-size: 10px; font-weight: 500; letter-spacing: 0.18em;
    color: rgba(255,255,255,0.4);
  }

  .pj-img-click-hint {
    position: absolute; top: 14px; right: 14px;
    font-family: 'Outfit', sans-serif; font-size: 9px;
    font-weight: 500; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.35);
    display: flex; align-items: center; gap: 5px;
  }

  .pj-img-foot {
    position: absolute; bottom: 22px; left: 20px; right: 20px;
  }

  .pj-img-tag {
    font-family: 'Outfit', sans-serif; font-size: 9px;
    font-weight: 500; letter-spacing: 0.24em;
    text-transform: uppercase; color: rgba(255,255,255,0.38);
    margin-bottom: 4px;
  }

  .pj-img-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(32px, 3.8vw, 52px); font-weight: 900;
    text-transform: uppercase; color: #fff; line-height: 0.92;
  }

  .pj-img-bar {
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    transition: background 0.4s ease;
  }

  .pj-drag-handle {
    width: 16px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    cursor: col-resize; position: relative; z-index: 10; margin: 0 -4px;
  }

  .pj-drag-handle-inner {
    width: 4px; height: 48px; border-radius: 4px;
    background: var(--card-border);
    transition: background 0.2s, height 0.2s;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 4px;
  }

  .pj-drag-handle:hover .pj-drag-handle-inner,
  .pj-drag-handle.dragging .pj-drag-handle-inner {
    background: rgba(255,255,255,0.3); height: 64px;
  }

  .pj-drag-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: rgba(255,255,255,0.5);
  }

  .pj-details {
    background: var(--card-bg, rgba(255,255,255,0.03));
    border: 1px solid var(--card-border);
    border-radius: 16px; padding: 38px 36px 28px;
    display: flex; flex-direction: column;
    overflow: hidden; position: relative; flex: 1; min-width: 0;
    transition: background 0.4s ease, border-color 0.4s ease;
  }

  .pj-details-glow {
    position: absolute; inset: 0; pointer-events: none;
    border-radius: 16px; transition: background 0.8s ease;
  }

  .pj-section-label {
    font-family: 'Outfit', sans-serif;
    font-size: 9px; font-weight: 500; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--text-muted);
    margin-bottom: 4px; transition: color 0.4s ease;
  }

  .pj-section-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(28px, 3.4vw, 44px); font-weight: 900;
    text-transform: uppercase; letter-spacing: -0.01em;
    color: var(--text-primary); line-height: 0.92; margin-bottom: 24px;
    transition: color 0.4s ease;
  }

  .pj-section-heading em {
    font-style: italic; color: transparent;
    -webkit-text-stroke: 1.2px var(--card-border);
    transition: -webkit-text-stroke 0.4s ease;
  }

  .pj-slide {
    display: flex; flex-direction: column; flex: 1;
    position: relative; z-index: 1;
    transition: opacity 0.26s ease, transform 0.36s cubic-bezier(.16,1,.3,1);
  }
  .pj-slide.out { opacity: 0; transform: translateY(12px); }
  .pj-slide.in  { opacity: 1; transform: translateY(0); }

  .pj-ghost {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(80px, 10vw, 128px); font-weight: 900;
    line-height: 1; letter-spacing: -0.06em; color: transparent;
    -webkit-text-stroke: 1px var(--card-border);
    user-select: none; margin-bottom: -24px; margin-left: -3px;
    transition: -webkit-text-stroke 0.4s ease;
  }

  .pj-pill {
    display: inline-flex; align-items: center; gap: 6px;
    margin-bottom: 8px; position: relative; z-index: 1;
  }
  .pj-pill-dot { width: 5px; height: 5px; border-radius: 50%; }
  .pj-pill-text {
    font-family: 'Outfit', sans-serif; font-size: 9px;
    font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-muted); transition: color 0.4s ease;
  }

  .pj-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 4.5vw, 62px); font-weight: 900;
    text-transform: uppercase; letter-spacing: -0.02em;
    line-height: 0.9; color: var(--text-primary);
    margin-bottom: 12px; position: relative; z-index: 1;
    transition: color 0.4s ease;
  }

  .pj-rule { height: 1.5px; width: 30px; border-radius: 2px; margin-bottom: 10px; }

  .pj-desc {
    font-family: 'Outfit', sans-serif; font-size: 14.5px;
    font-weight: 300; color: var(--text-sub);
    line-height: 1.8; margin-bottom: 18px; flex: 1;
    transition: color 0.4s ease;
  }

  .pj-stats { display: flex; margin-bottom: 20px; }

  .pj-stat {
    display: flex; flex-direction: column; gap: 2px;
    padding-right: 22px; margin-right: 22px;
    border-right: 1px solid var(--card-border);
    transition: border-color 0.4s ease;
  }
  .pj-stat:last-child { border-right: none; padding-right: 0; margin-right: 0; }

  .pj-stat-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 30px; font-weight: 900; line-height: 1;
  }
  .pj-stat-lbl {
    font-family: 'Outfit', sans-serif; font-size: 8.5px;
    font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--text-muted);
    transition: color 0.4s ease;
  }

  .pj-btns { display: flex; gap: 8px; align-items: center; }

  .pj-btn-visit {
    font-family: 'Poppins', sans-serif; font-size: 12px;
    font-weight: 600; letter-spacing: 0.04em;
    padding: 12px 28px; border-radius: 999px;
    border: none; cursor: pointer; color: #000;
    transition: transform 0.18s, filter 0.18s;
  }
  .pj-btn-visit:hover { transform: scale(1.04); filter: brightness(1.08); }

  .pj-btn-gh {
    font-family: 'Poppins', sans-serif; font-size: 12px;
    font-weight: 500; letter-spacing: 0.03em;
    padding: 10px 22px; border-radius: 999px;
    border: 1px solid var(--card-border); background: transparent;
    color: var(--text-sub); cursor: pointer; text-decoration: none;
    display: inline-flex; align-items: center; gap: 6px;
    transition: background 0.18s, transform 0.18s;
  }
  .pj-btn-gh:hover { background: var(--glass-bg); transform: scale(1.04); }

  .pj-dots {
    display: flex; gap: 6px;
    position: absolute; bottom: 18px; left: 36px; z-index: 10;
  }
  .pj-dot {
    width: 5px; height: 5px; border-radius: 50%;
    cursor: pointer; transition: background 0.3s, transform 0.3s;
  }
  .pj-dot.active { transform: scale(1.6); }

  .pj-scroll-hint {
    position: absolute; bottom: 20px; right: 22px;
    font-family: 'Outfit', sans-serif; font-size: 8.5px;
    font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-muted); transition: color 0.4s ease;
  }

  .pj-skip-btn {
    position: absolute; bottom: 28px; left: 50%;
    transform: translateX(-50%); z-index: 100;
    font-family: 'Outfit', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 8px 20px; border-radius: 999px;
    border: 1px solid var(--card-border, rgba(255,255,255,0.15));
    background: rgba(0,0,0,0.45);
    color: var(--text-muted, rgba(255,255,255,0.45));
    cursor: pointer; backdrop-filter: blur(8px);
    display: flex; align-items: center; gap: 7px;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .pj-skip-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.28);
    color: var(--text-primary, #fff);
  }

  .pj-lightbox-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.88);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(6px); animation: lbFadeIn 0.22s ease;
  }
  @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .pj-lightbox-inner {
    position: relative; display: inline-flex;
    animation: lbScaleIn 0.28s cubic-bezier(.16,1,.3,1);
  }
  @keyframes lbScaleIn { from { transform: scale(0.92); opacity:0; } to { transform: scale(1); opacity:1; } }

  .pj-lightbox-inner img {
    display: block; max-width: 75vw; max-height: 75vh;
    width: auto; height: auto; border-radius: 12px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7);
  }

  .pj-lightbox-close {
    position: absolute; top: -16px; right: -16px;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; font-size: 16px; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.18s;
  }
  .pj-lightbox-close:hover { background: rgba(255,255,255,0.22); }

  .pj-lift {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.75s cubic-bezier(.16,1,.3,1), opacity 0.65s ease;
  }

  @media (max-width: 860px) {
    .pj-grid { flex-direction: column; height: auto; }
    .pj-img-col { width: 100% !important; height: 220px; }
    .pj-drag-handle { display: none; }
  }
`;

export default function Projects() {
  const [current,  setCurrent]  = useState(0);
  const [visible,  setVisible]  = useState(false);
  const [slide,    setSlide]    = useState('in');
  const [isDark,   setIsDark]   = useState(true);
  const [lightbox, setLightbox] = useState(false);
  const [imgColW,  setImgColW]  = useState(DEFAULT_IMG_W_PX);
  const [skipped,  setSkipped]  = useState(false);

  // Refs that wheel handler can always read fresh (no stale closure)
  const currentRef  = useRef(0);
  const skippedRef  = useRef(false);
  const flipping    = useRef(false);
  const cooldown    = useRef(false);
  const sectionRef  = useRef(null);
  const dragRef     = useRef({ dragging: false, startX: 0, startW: 0 });
  const handleRef   = useRef(null);

  useEffect(() => { currentRef.current = current; },  [current]);
  useEffect(() => { skippedRef.current = skipped; }, [skipped]);

  // Dark mode
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    check();
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback((idx) => {
    if (flipping.current || idx === currentRef.current) return;
    flipping.current = true;
    setSlide('out');
    setTimeout(() => {
      currentRef.current = idx;
      setCurrent(idx);
      setSlide('in');
      setTimeout(() => { flipping.current = false; }, 400);
    }, 220);
  }, []);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    skippedRef.current = true;
    if (sectionRef.current) {
      const bottom = sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
      window.scrollTo({ top: bottom, behavior: 'smooth' });
    }
  }, []);

  // Drag to resize
  const onDragStart = useCallback((e) => {
    e.preventDefault();
    dragRef.current = { dragging: true, startX: e.clientX, startW: imgColW };
    handleRef.current?.classList.add('dragging');
    const onMove = (ev) => {
      if (!dragRef.current.dragging) return;
      const delta = ev.clientX - dragRef.current.startX;
      const newW  = Math.min(MAX_IMG_W, Math.max(MIN_IMG_W, dragRef.current.startW + delta));
      setImgColW(newW);
    };
    const onUp = () => {
      dragRef.current.dragging = false;
      handleRef.current?.classList.remove('dragging');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [imgColW]);

  // Scroll / wheel logic
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entrance animation
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    io.observe(section);

    /**
     * The section has height = (projects.length + 1) * 100vh.
     * The inner .pj-viewport is sticky top:0.
     * We track scroll position relative to the section to decide which
     * project to show, and prevent the page from scrolling past the
     * section until all projects have been seen.
     */
    const TOTAL_STEPS = projects.length; // number of "pages" inside

    let ticking = false;

    const onScroll = () => {
      if (skippedRef.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;

        const rect       = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const scrollY    = window.scrollY;

        // How many vh have we scrolled inside the section?
        const scrolledInside = scrollY - sectionTop;

        // Only act when the section is sticking (top of viewport)
        if (rect.top > 1) return; // haven't reached section yet
        if (rect.bottom < window.innerHeight - 1) return; // already past it

        // Which step should we be on?
        const targetStep = Math.min(
          TOTAL_STEPS - 1,
          Math.max(0, Math.round(scrolledInside / window.innerHeight))
        );

        goTo(targetStep);

        // Once last project reached, let scroll pass freely
        // No clamping needed — wheel handler stops hijacking at last project
      });
    };

    /**
     * Wheel handler: when we're inside the section and there are more
     * projects to see, consume the wheel event and advance/retreat.
     * When we've seen them all (or none left to go back to), let it pass.
     */
    const onWheel = (e) => {
      if (skippedRef.current) return;

      const rect = section.getBoundingClientRect();
      // Section must be fully pinned (sticky) to intercept
      if (rect.top > 2 || rect.bottom < window.innerHeight - 2) return;

      const down = e.deltaY > 0;

      if (down && currentRef.current < projects.length - 1) {
        e.preventDefault();
        if (cooldown.current) return;
        cooldown.current = true;
        setTimeout(() => { cooldown.current = false; }, 650);

        const nextIdx = currentRef.current + 1;
        // Also push scroll position forward so the section stays in the right state
        const sectionTop = section.offsetTop;
        window.scrollTo({ top: sectionTop + nextIdx * window.innerHeight });
        goTo(nextIdx);
        return;
      }

      if (!down && currentRef.current > 0) {
        e.preventDefault();
        if (cooldown.current) return;
        cooldown.current = true;
        setTimeout(() => { cooldown.current = false; }, 650);

        const prevIdx = currentRef.current - 1;
        const sectionTop = section.offsetTop;
        window.scrollTo({ top: sectionTop + prevIdx * window.innerHeight });
        goTo(prevIdx);
        return;
      }

      // All projects seen (or we're going up from first) — let scroll pass naturally
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel',  onWheel,  { passive: false });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel',  onWheel);
    };
  }, []); // stable — only refs used inside

  const p = projects[current];
  const headingStroke = isDark
    ? '1.2px rgba(255,255,255,0.3)'
    : '1.2px rgba(26,14,4,0.2)';

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="pj-section"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <style>{css}</style>

      {/* Accent glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 55% 55% at 45% 50%, rgba(${p.accentRgb},0.05) 0%, transparent 70%)`,
        transition: 'background 1s ease',
      }} />

      <div className="pj-viewport">
        <div
          className="pj-lift"
          style={{
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
            opacity:   visible ? 1 : 0,
          }}
        >
          <div className="pj-grid">

            {/* Col A: Image */}
            <div className="pj-img-col" style={{ width: imgColW }}>
              <div className="pj-img-card" onClick={() => setLightbox(true)}>
                <img src={projects[current].img} alt={projects[current].title} className="pj-img" />
                <div className="pj-img-overlay" />
                <div className="pj-img-counter">
                  {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>
                <div className="pj-img-click-hint">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8"  y1="11" x2="14"  y2="11"/>
                  </svg>
                  Expand
                </div>
                <div className="pj-img-foot">
                  <div className="pj-img-tag">{projects[current].tag} · {projects[current].year}</div>
                  <div className="pj-img-title">{projects[current].title}</div>
                </div>
                <div className="pj-img-bar" style={{ background: projects[current].accent }} />
              </div>
            </div>

            {/* Drag Handle */}
            <div ref={handleRef} className="pj-drag-handle" onMouseDown={onDragStart} title="Drag to resize">
              <div className="pj-drag-handle-inner">
                <div className="pj-drag-dot" />
                <div className="pj-drag-dot" />
                <div className="pj-drag-dot" />
              </div>
            </div>

            {/* Col B: Details */}
            <div className="pj-details">
              <div className="pj-details-glow" style={{
                background: `radial-gradient(ellipse 70% 50% at 100% 0%, rgba(${p.accentRgb},0.07) 0%, transparent 60%)`,
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="pj-section-label">Selected Work</div>
                <div className="pj-section-heading">
                  Our <em style={{ WebkitTextStroke: headingStroke }}>Projects</em>
                </div>
              </div>

              <div className={`pj-slide ${slide}`}>
                <div>
                  <div className="pj-ghost">{String(current + 1).padStart(2, '0')}</div>
                  <div className="pj-pill">
                    <div className="pj-pill-dot" style={{ background: p.accent }} />
                    <span className="pj-pill-text">{p.tag} · {p.year}</span>
                  </div>
                  <div className="pj-title">{p.title}</div>
                  <div className="pj-rule" style={{ background: p.accent }} />
                  <p className="pj-desc">{p.desc}</p>
                </div>

                <div className="pj-stats">
                  {p.stats.map((s, i) => (
                    <div className="pj-stat" key={i}>
                      <span className="pj-stat-val" style={{ color: p.accent }}>{s.value}</span>
                      <span className="pj-stat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pj-btns">
                  <button
                    className="pj-btn-visit"
                    style={{ background: p.accent }}
                    onClick={() => window.open(p.url, '_blank')}
                  >
                    Visit Site ↗
                  </button>
                  <a className="pj-btn-gh" href={p.github} target="_blank" rel="noreferrer">
                    <GithubIcon /> GitHub
                  </a>
                </div>
              </div>

              <div className="pj-dots">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className={`pj-dot ${i === current ? 'active' : ''}`}
                    style={{ background: i === current ? p.accent : 'var(--card-border)' }}
                    onClick={() => {
                      const top = sectionRef.current.offsetTop + i * window.innerHeight;
                      window.scrollTo({ top, behavior: 'smooth' });
                      goTo(i);
                    }}
                  />
                ))}
              </div>
              <div className="pj-scroll-hint">
                {current < projects.length - 1 ? 'Scroll ↓ next' : 'Scroll ↓ continue'}
              </div>
            </div>

          </div>
        </div>

        {/* Skip button */}
        {!skipped && (
          <button className="pj-skip-btn" onClick={handleSkip}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="13 17 18 12 13 7"/>
              <polyline points="6 17 11 12 6 7"/>
            </svg>
            Skip Projects
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="pj-lightbox-backdrop" onClick={() => setLightbox(false)}>
          <div className="pj-lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={projects[current].img} alt={projects[current].title} />
            <button className="pj-lightbox-close" onClick={() => setLightbox(false)}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}