import React, { useState, useEffect, useRef } from 'react';
import logo from '../components/assets/StudioX.png';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home',        id: 'home'        },
  { label: 'Services',    id: 'services'    },
  { label: 'How we work', id: 'how-we-work' },
  { label: 'Projects',    id: 'projects'    },
  { label: 'Gallery',     id: 'art-gallery' },  // ← yeh add karo
  { label: 'Team',        id: 'our-team'    },  // ← OurTeam.js component
  { label: 'About',       id: 'about'       },
  { label: 'Contact',     id: 'contact'     },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  .nav-link {
    position: relative;
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 14px;
    transition: color 0.25s;
    font-family: 'DM Sans', sans-serif;
    border-radius: 999px;
    z-index: 1;
    white-space: nowrap;
  }
  .nav-link::after,
  .nav-link::before { display: none !important; }
  .nav-link:hover { color: #fff; }

  .nav-links-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 4px 0;
    flex-wrap: nowrap;
  }

  .nav-links-wrapper li {
    flex-shrink: 0;
  }

  /* Gentle "arrived" pulse shown briefly on a section once the eased scroll lands on it */
  @keyframes navTargetPulse {
    0%   { box-shadow: 0 0 0 0 rgba(120, 160, 255, 0.0); }
    25%  { box-shadow: 0 0 0 0 rgba(120, 160, 255, 0.28); }
    100% { box-shadow: 0 0 60px 18px rgba(120, 160, 255, 0); }
  }

  .nav-target-pulse {
    animation: navTargetPulse 900ms ease-out;
  }

  .nav-pill-indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: calc(100% - 4px);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
    pointer-events: none;
    transition: left 0.35s cubic-bezier(0.4,0,0.2,1),
                width 0.35s cubic-bezier(0.4,0,0.2,1),
                opacity 0.25s ease;
    z-index: 0;
  }

  .book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.20);
    border-radius: 999px;
    color: rgba(255,255,255,0.85);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    padding: 10px 26px;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.25s ease, box-shadow 0.25s ease,
                background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12);
  }
  .book-btn:hover {
    transform: scale(1.05);
    background: rgba(49,92,253,0.55);
    border-color: rgba(99,132,255,0.55);
    color: #fff;
    box-shadow: 0 6px 24px rgba(49,92,253,0.40), inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .book-btn .txt-default,
  .book-btn .txt-hover {
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .book-btn .txt-hover {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    opacity: 0;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }
  .book-btn:hover .txt-default { transform: translateY(-100%); opacity: 0; }
  .book-btn:hover .txt-hover   { transform: translateY(0);     opacity: 1; }

  .book-btn-mobile {
    width: 100%;
    text-align: center;
  }

  .pill-nav-outer {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    width: calc(100% - 80px);
    max-width: 1100px;
    transition: top 0.35s ease;
  }

  .pill-nav-inner {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 0 24px;
    border-radius: 999px;
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.13);
    box-shadow: 0 4px 30px rgba(0,0,0,0.25);
    transition: height 0.35s ease, padding 0.35s ease;
  }

  .mobile-menu-pill {
    margin-top: 10px;
    border-radius: 24px;
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.13);
    box-shadow: 0 4px 30px rgba(0,0,0,0.25);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mobile-nav-link {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 10px 12px;
    border-radius: 12px;
    transition: background 0.2s ease, color 0.2s ease;
    display: block;
  }
  .mobile-nav-link:hover {
    background: rgba(255,255,255,0.08);
    color: #fff;
  }

  .mobile-menu-divider {
    height: 1px;
    background: rgba(255,255,255,0.08);
    margin: 8px 0;
  }

  .hamburger-bar {
    width: 22px;
    height: 1.5px;
    background: #fff;
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }

  .nav-desktop { display: flex; }
  .nav-mobile  { display: none; }

  @media (max-width: 1024px) and (min-width: 768px) {
    .pill-nav-outer { width: calc(100% - 48px); }
    .nav-link { font-size: 0.7rem; padding: 6px 9px; letter-spacing: 0.04em; }
    .book-btn { font-size: 0.75rem; padding: 8px 16px; }
    .pill-nav-inner { padding: 0 16px; gap: 8px; }
  }

  @media (max-width: 767px) {
    .pill-nav-outer { width: calc(100% - 32px); top: 16px !important; }
    .pill-nav-inner { padding: 0 16px; height: 52px !important; gap: 8px; }
    .nav-desktop { display: none !important; }
    .nav-mobile  { display: flex !important; }
    .nav-links-desktop { display: none !important; }
  }
`;

// Smooth ease-in-out cubic — nicer, more controlled feel than the browser's
// default `scrollIntoView({ behavior: 'smooth' })`, and lets us account for
// the fixed navbar's height as an offset.
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animatedScrollTo(targetY, duration = 850) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 1) return Promise.resolve();

  return new Promise((resolve) => {
    let startTime = null;
    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs   = useRef({});
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (hoveredId && linkRefs.current[hoveredId] && wrapperRef.current) {
      const linkRect    = linkRefs.current[hoveredId].getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      setPillStyle({
        left: linkRect.left - wrapperRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredId]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    setMenuOpen(false);
    if (!el) return;

    // Offset by the pill navbar's own height + a little breathing room,
    // so the section doesn't land hidden under it.
    const navOffset = 90;
    const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;

    animatedScrollTo(targetY, 850).then(() => {
      el.classList.add('nav-target-pulse');
      setTimeout(() => el.classList.remove('nav-target-pulse'), 900);
    });
  };

  return (
    <div
      className="pill-nav-outer"
      style={{ top: scrolled ? '45px' : '70px' }}
    >
      <style>{styles}</style>

      <div
        className="pill-nav-inner"
        style={{ height: scrolled ? '56px' : '68px' }}
      >
        <img
          src={logo}
          alt="StudioX"
          style={{ height: scrolled ? '24px' : '32px', transition: 'height 0.35s ease' }}
        />

        <ul
          ref={wrapperRef}
          className="nav-links-wrapper nav-desktop nav-links-desktop"
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="nav-pill-indicator"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
            }}
          />
          {navLinks.map(({ label, id }) => (
            <li key={id} style={{ position: 'relative', zIndex: 1 }}>
              <a
                ref={el => { linkRefs.current[id] = el; }}
                href={'#' + id}
                onClick={e => { e.preventDefault(); scrollTo(id); }}
                className="nav-link"
                onMouseEnter={() => setHoveredId(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="nav-desktop"
          style={{ justifySelf: 'end', alignItems: 'center', gap: '16px' }}
        >
          <ThemeToggle />
          <button onClick={() => scrollTo('contact')} className="book-btn">
            <span className="txt-default">Book a Call</span>
            <span className="txt-hover">GO</span>
          </button>
        </div>

        <div
          className="nav-mobile"
          style={{ gridColumn: '3', alignItems: 'center', gap: '10px' }}
        >
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
          >
            <span
              className="hamburger-bar"
              style={menuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}}
            />
            <span
              className="hamburger-bar"
              style={menuOpen ? { opacity: 0, transform: 'scaleX(0)' } : {}}
            />
            <span
              className="hamburger-bar"
              style={menuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu-pill">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={'#' + id}
              onClick={e => { e.preventDefault(); scrollTo(id); }}
              className="mobile-nav-link"
            >
              {label}
            </a>
          ))}
          <div className="mobile-menu-divider" />
          <button
            onClick={() => scrollTo('contact')}
            className="book-btn book-btn-mobile"
          >
            <span className="txt-default">Book a Call</span>
            <span className="txt-hover">GO</span>
          </button>
        </div>
      )}
    </div>
  );
}