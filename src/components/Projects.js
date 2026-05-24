import React, { useEffect, useRef, useState } from 'react';
import project1 from './assets/Project01.avif';
import project2 from './assets/Project02.avif';
import project3 from './assets/Project03.avif';

const projects = [
  {
    img: project1,
    title: 'Sport News',
    tag: 'Landing Page',
    year: '2024',
    accent: '#c47a30',
    accentRgb: '196,122,48',
    desc: 'A sports news platform delivering trending updates, club rankings, and featured articles. Bold visuals meet intuitive navigation to engage fans and enhance content discovery.',
    url: '#',
    github: 'https://github.com/samirhusayn28-dev/StudioXenos',
    stats: [
      { label: 'Pages', value: '12+' },
      { label: 'Components', value: '30+' },
      { label: 'Year', value: '2024' },
    ],
  },
  {
    img: project2,
    title: 'Project Two',
    tag: 'Web App',
    year: '2024',
    accent: '#315cfd',
    accentRgb: '49,92,253',
    desc: 'A modern platform with seamless UX, intuitive navigation, and a clean design that drives conversions and engages the target audience effectively.',
    url: '#',
    github: 'https://github.com/samirhusayn28-dev/StudioXenos',
    stats: [
      { label: 'Users', value: '5K+' },
      { label: 'Screens', value: '20+' },
      { label: 'Year', value: '2024' },
    ],
  },
  {
    img: project3,
    title: 'Project Three',
    tag: 'Dashboard',
    year: '2024',
    accent: '#22c97a',
    accentRgb: '34,201,122',
    desc: 'A powerful dashboard with real-time data visualization, clean UI and intuitive controls to manage everything efficiently.',
    url: '#',
    github: 'https://github.com/samirhusayn28-dev/StudioXenos',
    stats: [
      { label: 'Widgets', value: '18+' },
      { label: 'Charts', value: '8+' },
      { label: 'Year', value: '2024' },
    ],
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,900&family=Outfit:wght@300;400;500;600&family=Poppins:wght@600;700&display=swap');

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

  .pj-bento {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: min(1100px, 92vw);
    height: min(580px, 82vh);
  }

  .pj-card-wrap {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    background: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.07);
  }

  .pj-card-img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.6s ease;
  }
  .pj-card-wrap:hover .pj-card-img { transform: scale(1.05); }

  .pj-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, transparent 20%, rgba(4,6,18,0.55) 55%, rgba(4,6,18,0.93) 100%);
    pointer-events: none;
  }

  .pj-card-index {
    position: absolute; top: 22px; left: 22px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.15em; color: rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px; padding: 4px 12px;
  }

  .pj-card-foot { position: absolute; bottom: 28px; left: 28px; right: 28px; }

  .pj-card-tag {
    font-family: 'Outfit', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 0.22em;
    text-transform: uppercase; color: rgba(255,255,255,0.4);
    margin-bottom: 6px;
  }

  .pj-card-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(32px, 4vw, 52px); font-weight: 900;
    text-transform: uppercase; color: #fff; line-height: 0.9;
  }

  .pj-card-accent-bar {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  }

  /* ── Details panel ─────────────────────────────── */
  .pj-details-panel {
    background: var(--bg-primary);
    border: 1px solid var(--card-border);
    border-radius: 24px;
    padding: 40px 40px 36px;
    display: flex; flex-direction: column;
    overflow: hidden; position: relative;
    transition: background 0.4s ease, border-color 0.4s ease;
  }

  .pj-details-glow {
    position: absolute; inset: 0;
    pointer-events: none;
    transition: background 0.8s ease;
    border-radius: 24px;
  }

  /* Dark mode text */
  .pj-eyebrow {
    font-family: 'Outfit', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--text-muted);
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 20px;
    transition: color 0.4s ease;
  }

  .pj-eyebrow-line {
    display: inline-block; width: 24px; height: 1px;
    background: var(--card-border);
    transition: background 0.4s ease;
  }

  .pj-ghost-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(80px, 10vw, 130px); font-weight: 900;
    line-height: 1; letter-spacing: -0.06em;
    color: transparent;
    -webkit-text-stroke: 1px var(--card-border);
    user-select: none; margin-bottom: -36px; margin-left: -4px;
    transition: -webkit-text-stroke 0.4s ease;
  }

  .pj-pill {
    display: inline-flex; align-items: center; gap: 7px;
    margin-bottom: 12px; position: relative; z-index: 1;
  }

  .pj-pill-dot { width: 6px; height: 6px; border-radius: 50%; }

  .pj-pill-text {
    font-family: 'Outfit', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--text-muted);
    transition: color 0.4s ease;
  }

  .pj-dtitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 4.5vw, 60px); font-weight: 900;
    text-transform: uppercase; letter-spacing: -0.02em;
    line-height: 0.88; color: var(--text-primary);
    margin-bottom: 18px; position: relative; z-index: 1;
    transition: color 0.4s ease;
  }

  .pj-rule { height: 2px; width: 44px; border-radius: 2px; margin-bottom: 16px; }

  .pj-desc {
    font-family: 'Outfit', sans-serif; font-size: 14px;
    font-weight: 300; color: var(--text-sub);
    line-height: 1.85; margin-bottom: 24px; flex: 1;
    transition: color 0.4s ease;
  }

  .pj-stats { display: flex; margin-bottom: 28px; }

  .pj-stat {
    display: flex; flex-direction: column; gap: 4px;
    padding-right: 24px; margin-right: 24px;
    border-right: 1px solid var(--card-border);
    transition: border-color 0.4s ease;
  }
  .pj-stat:last-child { border-right: none; padding-right: 0; margin-right: 0; }

  .pj-stat-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 900; line-height: 1;
  }

  .pj-stat-lbl {
    font-family: 'Outfit', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--text-muted);
    transition: color 0.4s ease;
  }

  .pj-btns { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

  .pj-btn-main {
    font-family: 'Poppins', sans-serif; font-size: 12px;
    font-weight: 600; letter-spacing: 0.05em;
    padding: 11px 26px; border-radius: 999px;
    border: none; cursor: pointer; color: #000;
    transition: transform 0.2s, filter 0.2s;
  }
  .pj-btn-main:hover { transform: scale(1.04); filter: brightness(1.1); }

  .pj-btn-gh {
    font-family: 'Poppins', sans-serif; font-size: 12px;
    font-weight: 600; letter-spacing: 0.05em;
    padding: 10px 22px; border-radius: 999px;
    border: 1px solid var(--card-border);
    background: var(--card-bg);
    color: var(--text-sub); cursor: pointer;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 7px;
    transition: background 0.2s, transform 0.18s, border-color 0.4s ease, color 0.4s ease;
  }
  .pj-btn-gh:hover { background: var(--glass-bg); transform: scale(1.04); }

  .pj-nav-dots {
    position: absolute; bottom: 24px; left: 50%;
    transform: translateX(-50%);
    display: flex; gap: 8px; z-index: 10;
  }

  .pj-dot {
    width: 6px; height: 6px; border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }
  .pj-dot.active { transform: scale(1.5); }

  .pj-scroll-hint {
    position: absolute; bottom: 22px; right: 36px;
    font-family: 'Outfit', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--text-muted);
    transition: color 0.4s ease;
  }

  .pj-slide-content {
    display: flex; flex-direction: column; height: 100%;
    position: relative; z-index: 1;
    transition: opacity 0.28s ease, transform 0.38s cubic-bezier(.16,1,.3,1);
  }
  .pj-slide-content.out { opacity: 0; transform: translateY(14px); }
  .pj-slide-content.in  { opacity: 1; transform: translateY(0); }

  .pj-lift {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.75s cubic-bezier(.16,1,.3,1), opacity 0.65s ease;
  }

  @media (max-width: 768px) {
    .pj-bento { grid-template-columns: 1fr; height: auto; gap: 14px; }
    .pj-card-wrap { height: 260px; }
    .pj-details-panel { padding: 24px 20px; }
  }
`;

const SCROLL_STEPS = projects.length;

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [slide,   setSlide]   = useState('in');
  const [isDark,  setIsDark]  = useState(true);

  const sectionRef = useRef(null);
  const stepRef    = useRef(0);
  const flipping   = useRef(false);

  // Track theme changes for header text color
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    check();
    return () => obs.disconnect();
  }, []);

  const goTo = (idx) => {
    if (flipping.current || idx === stepRef.current) return;
    flipping.current = true;
    setSlide('out');
    setTimeout(() => {
      stepRef.current = idx;
      setCurrent(idx);
      setSlide('in');
      setTimeout(() => { flipping.current = false; }, 400);
    }, 220);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    io.observe(section);

    let prevScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const goingDown      = currentScrollY > prevScrollY;
      prevScrollY          = currentScrollY;
      if (!goingDown) return;
      const scrolled = currentScrollY - section.offsetTop;
      if (scrolled < 0) return;
      const raw = Math.floor(scrolled / window.innerHeight);
      goTo(Math.min(raw, projects.length - 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const p = projects[current];

  const headerSubColor  = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(26,14,4,0.30)';
  const headerLineColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(26,14,4,0.12)';
  const headerTitleColor = isDark ? '#fff' : '#1a0e04';
  const headerEmStroke  = isDark ? '1.5px rgba(255,255,255,0.35)' : '1.5px rgba(26,14,4,0.25)';

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="pj-section"
      style={{ height: `${(SCROLL_STEPS + 1) * 100}vh` }}
    >
      <style>{css}</style>

      <div className="pj-viewport">

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 60% at 60% 50%, rgba(${p.accentRgb},0.06) 0%, transparent 70%)`,
          transition: 'background 0.9s ease',
        }} />

        {/* Header */}
        <div style={{ position: 'absolute', top: '32px', left: '4%', zIndex: 5 }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif", fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: headerSubColor,
            display: 'flex', alignItems: 'center', gap: '10px',
            transition: 'color 0.4s ease',
          }}>
            <span style={{
              display: 'inline-block', width: '22px', height: '1px',
              background: headerLineColor,
              transition: 'background 0.4s ease',
            }} />
            Selected Work
          </div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 48px)', textTransform: 'uppercase',
            color: headerTitleColor,
            lineHeight: 0.9, letterSpacing: '-0.02em', marginTop: '8px',
            transition: 'color 0.4s ease',
          }}>
            Our{' '}
            <em style={{
              fontStyle: 'italic',
              color: 'transparent',
              WebkitTextStroke: headerEmStroke,
              transition: '-webkit-text-stroke 0.4s ease',
            }}>
              Projects
            </em>
          </div>
        </div>

        {/* Bento */}
        <div
          className="pj-lift"
          style={{
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.97)',
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="pj-bento">

            {/* LEFT — image card */}
            <div className="pj-card-wrap">
              <img src={projects[current].img} alt={projects[current].title} className="pj-card-img" />
              <div className="pj-card-overlay" />
              <div className="pj-card-index">
                {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </div>
              <div className="pj-card-foot">
                <div className="pj-card-tag">{projects[current].tag} · {projects[current].year}</div>
                <div className="pj-card-name">{projects[current].title}</div>
              </div>
              <div className="pj-card-accent-bar" style={{ background: projects[current].accent }} />
            </div>

            {/* RIGHT — details */}
            <div className="pj-details-panel">
              <div
                className="pj-details-glow"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 90% 10%, rgba(${p.accentRgb},0.09) 0%, transparent 65%)`,
                }}
              />

              <div className={`pj-slide-content ${slide}`}>
                <div>
                  <div className="pj-eyebrow">
                    <span className="pj-eyebrow-line" />{p.tag}
                  </div>
                  <div className="pj-ghost-num">{String(current + 1).padStart(2, '0')}</div>
                  <div className="pj-pill">
                    <div className="pj-pill-dot" style={{ background: p.accent }} />
                    <span className="pj-pill-text">{p.tag} · {p.year}</span>
                  </div>
                  <div className="pj-dtitle">{p.title}</div>
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
                    className="pj-btn-main"
                    style={{ background: p.accent }}
                    onClick={() => window.open(p.url, '_blank')}
                  >
                    Visit Site ↗
                  </button>
                  <a className="pj-btn-gh" href={p.github} target="_blank" rel="noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

              {/* Nav dots */}
              <div className="pj-nav-dots">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className={`pj-dot ${i === current ? 'active' : ''}`}
                    style={{ background: i === current ? p.accent : 'var(--card-border)' }}
                    onClick={() => {
                      const sectionTop = sectionRef.current.offsetTop;
                      window.scrollTo({
                        top: sectionTop + i * window.innerHeight,
                        behavior: 'smooth',
                      });
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
      </div>
    </section>
  );
}