'use client';

import React, { useState, memo, useCallback } from 'react';

const navLinks = [
    // { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'How we work', id: 'how-we-work' },
    { label: 'Projects', id: 'projects' },
    { label: 'Gallery', id: 'art-gallery' },
    { label: 'What People Say', id: 'testimonials' },
    { label: 'About', id: 'about' },
    // { label: 'Contact', id: 'contact' },
];

const navbarStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

  .hero-nav-container {
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 20px 24px 0;
    box-sizing: border-box;
    position: relative;
    z-index: 50;
    transform: translateZ(0);
    will-change: transform;
  }

  .hero-nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    padding: 0 20px;
    border-radius: 999px;
    background: var(--glass-bg, rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--card-border, rgba(255, 255, 255, 0.1));
    box-shadow: 0 4px 20px var(--shadow-medium, rgba(0, 0, 0, 0.08));
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .nav-logo {
    height: 30px;
    width: auto;
    background: var(--btn-bg, #2563eb); padding: 5px 20px;
    border-radius: 999px;
    object-fit: contain;
    cursor: pointer;
  }

  .nav-links-desktop {
    display: flex;
    align-items: center;
    gap: 2px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    color: var(--text-secondary, #94a3b8);
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 6px 12px;
    font-family: 'Outfit', sans-serif;
    border-radius: 999px;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .nav-link:hover {
    color: var(--text-on-primary, #ffffff);
    background: var(--accent-blue-overlay, rgba(37, 99, 235, 0.15));
  }

  .book-btn {
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow: hidden;
    background: var(--surface-faint-strong, rgba(255, 255, 255, 0.08));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid var(--card-border, rgba(255, 255, 255, 0.1));
    border-radius: 999px;
    color: var(--text-on-primary, #ffffff);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 0 20px;
    height: 38px;
    min-width: 120px;
    cursor: pointer;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .book-btn:hover {
    background: var(--btn-bg, #2563eb);
    border-color: var(--btn-bg, #2563eb);
    transform: translate3d(0, -1px, 0);
    box-shadow: 0 4px 18px var(--accent-blue-shadow, rgba(37, 99, 235, 0.3));
  }

  .book-btn .txt-default {
   color : var(--btn-bg, #2563eb);
  },
  .book-btn .txt-hover {
    display: block;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .book-btn .txt-hover {
    position: absolute;
    transform: translate3d(0, 100%, 0);
    opacity: 0;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .book-btn:hover .txt-default {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }

  .book-btn:hover .txt-hover {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .hamburger-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 4px;
    color: inherit;
  }

  .hamburger-bar {
    width: 20px;
    height: 1.5px;
    background: currentColor;
    display: block;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .mobile-dropdown {
    margin-top: 8px;
    border-radius: 20px;
    background: var(--chat-window-bg, rgba(15, 23, 42, 0.9));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--card-border, rgba(255, 255, 255, 0.1));
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mobile-nav-link {
    color: var(--text-primary, #ffffff);
    text-decoration: none;
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 10px 14px;
    border-radius: 10px;
    transition: background 0.15s ease;
  }

  .mobile-nav-link:hover {
    background: var(--accent-blue-overlay, rgba(37, 99, 235, 0.15));
  }

  .nav-desktop-group { display: flex; align-items: center; gap: 12px; }
  .nav-mobile-group  { display: none; }

  @media (max-width: 900px) {
    .nav-desktop-group { display: none !important; }
    .nav-mobile-group  { display: flex !important; align-items: center; gap: 10px; }
    .hero-nav-container { padding: 12px 16px 0; }
  }
`;

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollTo = useCallback((id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (!el) return;

        const targetPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const currentPosition = window.pageYOffset;

        // Condition: Website can go down, but not up when navigating to sections
        if (targetPosition > currentPosition) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <header className="hero-nav-container animate-slide-down">
            <style>{navbarStyles}</style>

            <div className="hero-nav-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/assets/StudioX.png"
                    alt="StudioX Logo"
                    className="nav-logo"
                    onClick={() => scrollTo('home')}
                />

                <ul className="nav-links-desktop nav-desktop-group">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(link.id);
                                }}
                                className="nav-link"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="nav-desktop-group">
                    <button onClick={() => scrollTo('contact')} className="book-btn">
                        <span className="txt-default">Book a Call</span>
                        <span className="txt-hover">GO</span>
                    </button>
                </div>

                <div className="nav-mobile-group">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="hamburger-btn"
                        aria-label="Toggle menu"
                    >
                        <span
                            className="hamburger-bar"
                            style={menuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : undefined}
                        />
                        <span
                            className="hamburger-bar"
                            style={menuOpen ? { opacity: 0 } : undefined}
                        />
                        <span
                            className="hamburger-bar"
                            style={menuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : undefined}
                        />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="mobile-dropdown">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollTo(link.id);
                            }}
                            className="mobile-nav-link"
                        >
                            {link.label}
                        </a>
                    ))}
                    <button
                        onClick={() => scrollTo('contact')}
                        className="book-btn"
                        style={{ marginTop: '6px', width: '100%' }}
                    >
                        Book a Call
                    </button>
                </div>
            )}
        </header>
    );
}

export default memo(Navbar);