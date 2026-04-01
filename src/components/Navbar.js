import React, { useState, useEffect, useRef } from 'react';
import logo from '../components/assets/StudioX.png';

const navLinks = [
  { label: 'Home',        id: 'home'        },
  { label: 'Services',    id: 'services'    },
  { label: 'How we work', id: 'how-we-work' },
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
  }

  .nav-link::after,
  .nav-link::before {
    display: none !important;
  }

  .nav-link:hover {
    color: #fff;
  }

  .nav-links-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 4px 0;
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
    transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.25s ease;
    z-index: 0;
  }

  .book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.20);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    padding: 10px 26px;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.25s ease,
                box-shadow 0.25s ease,
                background 0.3s ease,
                border-color 0.3s ease,
                color 0.3s ease;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .book-btn span {
    position: relative;
    z-index: 1;
  }

  .book-btn:hover {
    transform: scale(1.05);
    background: rgba(49, 92, 253, 0.55);
    border-color: rgba(99, 132, 255, 0.55);
    color: #fff;
    box-shadow: 0 6px 24px rgba(49, 92, 253, 0.40),
                inset 0 1px 0 rgba(255, 255, 255, 0.18);
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

  .book-btn:hover .txt-default {
    transform: translateY(-100%);
    opacity: 0;
  }

  .book-btn:hover .txt-hover {
    transform: translateY(0);
    opacity: 1;
  }

  .pill-nav-outer {
    position: fixed;
    top: 70px;
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
    padding: 0 24px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.13);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
    transition: height 0.35s ease, padding 0.35s ease;
  }

  .mobile-menu-pill {
    margin-top: 10px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.13);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
    padding: 20px 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
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
      const linkEl      = linkRefs.current[hoveredId];
      const wrapperEl   = wrapperRef.current;
      const linkRect    = linkEl.getBoundingClientRect();
      const wrapperRect = wrapperEl.getBoundingClientRect();
      setPillStyle({
        left:    linkRect.left - wrapperRect.left,
        width:   linkRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredId]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="pill-nav-outer" style={{ top: scrolled ? '45px' : '70px' }}>
      <style>{styles}</style>

      <div
        className="pill-nav-inner"
        style={{ height: scrolled ? '56px' : '68px' }}
      >
        <img
          src={logo}
          alt="StudioX"
          style={{
            height: scrolled ? '26px' : '34px',
            transition: 'height 0.35s ease',
          }}
        />

        <ul
          ref={wrapperRef}
          className="hidden md:flex nav-links-wrapper"
          style={{ listStyle: 'none', margin: 0 }}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="nav-pill-indicator"
            style={{
              left:    pillStyle.left,
              width:   pillStyle.width,
              opacity: pillStyle.opacity,
            }}
          />

          {navLinks.map(({ label, id }) => (
            <li key={id} style={{ position: 'relative', zIndex: 1 }}>
              <a
                ref={el => { linkRefs.current[id] = el; }}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                className="nav-link"
                onMouseEnter={() => setHoveredId(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex" style={{ justifySelf: 'end' }}>
          <button onClick={() => scrollTo('contact')} className="book-btn">
            <span className="txt-default">Book a Call</span>
            <span className="txt-hover">GO</span>
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            gridColumn: '3',
          }}
        >
          <span style={{ width: '24px', height: '1.5px', background: '#fff', display: 'block' }} />
          <span style={{ width: '24px', height: '1.5px', background: '#fff', display: 'block' }} />
          <span style={{ width: '24px', height: '1.5px', background: '#fff', display: 'block' }} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mobile-menu-pill">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              className="nav-link"
            >
              {label}
            </a>
          ))}
          <button onClick={() => scrollTo('contact')} className="book-btn">
            <span className="txt-default">Book a Call</span>
            <span className="txt-hover">GO →</span>
          </button>
        </div>
      )}
    </div>
  );
}