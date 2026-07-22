import React, { useState, useEffect, useRef, useCallback, useMemo, memo, useLayoutEffect } from 'react';
import logo from '../components/assets/StudioX.png';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home',        id: 'home'        },
  { label: 'Services',    id: 'services'    },
  { label: 'How we work', id: 'how-we-work' },
  { label: 'Projects',    id: 'projects'    },
  { label: 'Gallery',     id: 'art-gallery' },
  { label: 'Team',        id: 'our-team'    },
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
    transition: color 0.2s ease;
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

  @keyframes navTargetPulse {
    0%   { box-shadow: 0 0 0 0 rgba(120, 160, 255, 0.0); }
    25%  { box-shadow: 0 0 0 0 rgba(120, 160, 255, 0.22); }
    100% { box-shadow: 0 0 40px 12px rgba(120, 160, 255, 0); }
  }

  .nav-target-pulse {
    animation: navTargetPulse 700ms ease-out;
  }

  .nav-pill-indicator {
    position: absolute;
    top: 50%;
    height: calc(100% - 4px);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.10);
    border: 1px solid rgba(255, 255, 255, 0.15);
    pointer-events: none;
    transform: translate3d(0, -50%, 0) scaleX(1);
    transform-origin: left center;
    opacity: 0;
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1),
                opacity 0.2s ease;
    z-index: 0;
    will-change: transform, opacity;
  }

  .book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.20);
    border-radius: 999px;
    color: rgba(255,255,255,0.85);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    padding: 10px 26px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2);
    will-change: transform;
  }
  .book-btn:hover {
    transform: scale(1.04);
    background: rgba(49,92,253,0.55);
    border-color: rgba(99,132,255,0.55);
    color: #fff;
    box-shadow: 0 6px 20px rgba(49,92,253,0.35);
  }
  .book-btn .txt-default,
  .book-btn .txt-hover {
    display: block;
    transition: transform 0.25s ease, opacity 0.25s ease;
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
    top: 70px;
    width: calc(100% - 80px);
    max-width: 1100px;
    transform: translate3d(-50%, 0, 0);
    transition: transform 0.3s ease;
    will-change: transform;
    z-index: 50;
  }
  .pill-nav-outer.scrolled {
    transform: translate3d(-50%, -25px, 0);
  }

  .pill-nav-inner {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 0 24px;
    height: 68px;
    border-radius: 999px;
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.13);
    box-shadow: 0 4px 24px rgba(0,0,0,0.22);
    transition: height 0.3s ease;
  }
  .pill-nav-outer.scrolled .pill-nav-inner {
    height: 56px;
  }

  .pill-nav-logo {
    height: 32px;
    transition: height 0.3s ease;
  }
  .pill-nav-outer.scrolled .pill-nav-logo {
    height: 24px;
  }

  .mobile-menu-pill {
    margin-top: 10px;
    border-radius: 24px;
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.13);
    box-shadow: 0 4px 24px rgba(0,0,0,0.22);
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
    transition: transform 0.25s ease, opacity 0.25s ease;
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
    .pill-nav-outer { width: calc(100% - 32px); top: 16px !important; transform: translate3d(-50%, 0, 0) !important; }
    .pill-nav-inner { padding: 0 16px; height: 52px !important; gap: 8px; }
    .nav-desktop { display: none !important; }
    .nav-mobile  { display: flex !important; }
    .nav-links-desktop { display: none !important; }
  }
`;

function animatedScrollTo(targetY, duration = 700) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 1) return Promise.resolve();

  return new Promise((resolve) => {
    let startTime = null;
    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, startY + diff * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

const GlobalStyle = memo(function GlobalStyle() {
  return <style>{styles}</style>;
});

const Hamburger = memo(function Hamburger(props) {
  const menuOpen = props.menuOpen;
  const onToggle = props.onToggle;
  return (
    <button
      onClick={onToggle}
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
        style={menuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : undefined}
      />
      <span
        className="hamburger-bar"
        style={menuOpen ? { opacity: 0, transform: 'scaleX(0)' } : undefined}
      />
      <span
        className="hamburger-bar"
        style={menuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : undefined}
      />
    </button>
  );
});

function DesktopNavLinkBase(props) {
  const label = props.label;
  const id = props.id;
  const setRef = props.setRef;
  const onHover = props.onHover;
  const onClick = props.onClick;

  const linkEl = React.createElement(
    'a',
    {
      ref: setRef,
      href: '#' + id,
      onClick: onClick,
      className: 'nav-link',
      onMouseEnter: onHover,
    },
    label
  );

  return React.createElement(
    'li',
    { style: { position: 'relative', zIndex: 1 } },
    linkEl
  );
}

const DesktopNavLink = memo(DesktopNavLinkBase);

function MobileNavLinkBase(props) {
  const label = props.label;
  const id = props.id;
  const onClick = props.onClick;

  return React.createElement(
    'a',
    { href: '#' + id, onClick: onClick, className: 'mobile-nav-link' },
    label
  );
}

const MobileNavLink = memo(MobileNavLinkBase);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [pillStyle, setPillStyle] = useState({ x: 0, scaleX: 100, opacity: 0 });
  const linkRefs = useRef({});
  const wrapperRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(function () {
    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(function () {
        setScrolled(function (prev) {
          const next = window.scrollY > 40;
          return prev === next ? prev : next;
        });
        tickingRef.current = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function () {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useLayoutEffect(function () {
    if (hoveredId && linkRefs.current[hoveredId] && wrapperRef.current) {
      const linkRect = linkRefs.current[hoveredId].getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      setPillStyle({
        x: linkRect.left - wrapperRect.left,
        scaleX: linkRect.width,
        opacity: 1,
      });
    } else {
      setPillStyle(function (prev) {
        return prev.opacity === 0 ? prev : Object.assign({}, prev, { opacity: 0 });
      });
    }
  }, [hoveredId]);

  const scrollTo = useCallback(function (id) {
    const el = document.getElementById(id);
    setMenuOpen(false);
    if (!el) return;

    const navOffset = 90;
    const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;

    animatedScrollTo(targetY, 700).then(function () {
      el.classList.add('nav-target-pulse');
      setTimeout(function () {
        el.classList.remove('nav-target-pulse');
      }, 700);
    });
  }, []);

  const handleMenuToggle = useCallback(function () {
    setMenuOpen(function (prev) { return !prev; });
  }, []);

  const handleWrapperLeave = useCallback(function () {
    setHoveredId(null);
  }, []);

  const handleContactClick = useCallback(function () {
    scrollTo('contact');
  }, [scrollTo]);

  const setLinkRef = useCallback(function (id) {
    return function (el) {
      linkRefs.current[id] = el;
    };
  }, []);

  const hoverHandlers = useMemo(function () {
    const map = {};
    navLinks.forEach(function (link) {
      map[link.id] = function () {
        setHoveredId(link.id);
      };
    });
    return map;
  }, []);

  const clickHandlers = useMemo(function () {
    const map = {};
    navLinks.forEach(function (link) {
      map[link.id] = function (e) {
        e.preventDefault();
        scrollTo(link.id);
      };
    });
    return map;
  }, [scrollTo]);

  const linkRefSetters = useMemo(function () {
    const map = {};
    navLinks.forEach(function (link) {
      map[link.id] = setLinkRef(link.id);
    });
    return map;
  }, [setLinkRef]);

  const indicatorStyle = useMemo(function () {
    return {
      transform: 'translate3d(' + pillStyle.x + 'px, -50%, 0) scaleX(' + (pillStyle.scaleX / 100) + ')',
      width: 100,
      opacity: pillStyle.opacity,
    };
  }, [pillStyle]);

  const desktopRightStyle = useMemo(function () {
    return { justifySelf: 'end', alignItems: 'center', gap: '16px' };
  }, []);

  const mobileRightStyle = useMemo(function () {
    return { gridColumn: '3', alignItems: 'center', gap: '10px' };
  }, []);

  const outerClassName = scrolled ? 'pill-nav-outer scrolled' : 'pill-nav-outer';

  return (
    <div className={outerClassName}>
      <GlobalStyle />

      <div className="pill-nav-inner">
        <img src={logo} alt="StudioX" className="pill-nav-logo" />

        <ul
          ref={wrapperRef}
          className="nav-links-wrapper nav-desktop nav-links-desktop"
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
          onMouseLeave={handleWrapperLeave}
        >
          <div className="nav-pill-indicator" style={indicatorStyle} />
          {navLinks.map(function (link) {
            return (
              <DesktopNavLink
                key={link.id}
                label={link.label}
                id={link.id}
                setRef={linkRefSetters[link.id]}
                onHover={hoverHandlers[link.id]}
                onClick={clickHandlers[link.id]}
              />
            );
          })}
        </ul>

        <div className="nav-desktop" style={desktopRightStyle}>
          <ThemeToggle />
          <button onClick={handleContactClick} className="book-btn">
            <span className="txt-default">Book a Call</span>
            <span className="txt-hover">GO</span>
          </button>
        </div>

        <div className="nav-mobile" style={mobileRightStyle}>
          <ThemeToggle />
          <Hamburger menuOpen={menuOpen} onToggle={handleMenuToggle} />
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu-pill">
          {navLinks.map(function (link) {
            return (
              <MobileNavLink
                key={link.id}
                label={link.label}
                id={link.id}
                onClick={clickHandlers[link.id]}
              />
            );
          })}
          <div className="mobile-menu-divider" />
          <button onClick={handleContactClick} className="book-btn book-btn-mobile">
            <span className="txt-default">Book a Call</span>
            <span className="txt-hover">GO</span>
          </button>
        </div>
      )}
    </div>
  );
}