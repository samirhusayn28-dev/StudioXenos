'use client';

import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import Image from 'next/image';
import navLinks from '../data/navLinks.json';

const navIcons = {
    hero: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    services: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    projects: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    ),
    work: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
    about: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    ),
    team: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    footer: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    ),
};

const navbarStyles = `
  .hero-nav-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    box-sizing: border-box;
    z-index: 999;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
    will-change: transform, opacity;
    transform: translate3d(0, 0, 0);
  }

  .hero-nav-container.nav-hidden {
    transform: translate3d(0, -120%, 0);
    opacity: 0;
    pointer-events: none;
  }

  .hero-nav-inner {
    position: relative;
    display: flex;
    align-items: center;
    gap: 50px;
    height: 58px;
    padding: 0 24px 0 14px;
    border-radius: 999px;
    background: var(--glass-bg, rgba(255, 255, 255, 0.85));
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--card-border, rgba(15, 23, 42, 0.08));
    box-shadow: 0 4px 20px var(--shadow-medium, rgba(0, 0, 0, 0.06));
    transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .nav-logo {
    height: 32px;
    width: auto;
    background: var(--btn-bg, #2563eb); 
    padding: 4px 16px;
    border-radius: 999px;
    object-fit: contain;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .nav-logo:hover {
    transform: scale(1.02);
  }

  .nav-links-desktop {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-secondary, #475569);
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 6px 12px;
    font-family: var(--font-outfit), sans-serif;
    border-radius: 6px;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .nav-link svg {
    color: var(--btn-bg, #2563eb);
    opacity: 0.85;
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .nav-link:hover {
    color: var(--btn-bg, #2563eb);
    background: rgba(37, 99, 235, 0.08);
  }

  .nav-link:hover svg {
    opacity: 1;
    transform: scale(1.1);
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
    transition: transform 0.25s ease, opacity 0.25s ease;
    will-change: transform, opacity;
  }

  .mobile-dropdown {
    margin-top: 8px;
    border-radius: 10px;
    background: var(--chat-window-bg, rgba(255, 255, 255, 0.96));
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--card-border, rgba(15, 23, 42, 0.08));
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-primary, #0f172a);
    text-decoration: none;
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .mobile-nav-link svg {
    color: var(--btn-bg, #2563eb);
  }

  .mobile-nav-link:hover {
    background: rgba(37, 99, 235, 0.08);
    color: #2563eb;
  }

  .nav-desktop-group { display: flex; align-items: center; gap: 8px; }
  .nav-mobile-group  { display: none; }

  @media (max-width: 992px) {
    .nav-desktop-group { display: none !important; }
    .nav-mobile-group  { display: flex !important; align-items: center; gap: 10px; }
    .hero-nav-container { padding: 10px 14px 0; }
    .hero-nav-inner { width: 100%; justify-content: space-between; gap: 0; padding: 0 14px; height: 52px; }
    .mobile-dropdown { align-self: flex-end; width: auto; min-width: 190px; max-width: 240px; }
  }
`;

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const heroThreshold = 100;

                if (currentScrollY <= heroThreshold) {
                    setVisible(true);
                } else if (currentScrollY < lastScrollY.current) {
                    setVisible(true);
                } else if (currentScrollY > lastScrollY.current + 8) {
                    setVisible(false);
                    setMenuOpen(false);
                }

                lastScrollY.current = currentScrollY;
                ticking.current = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = useCallback((id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <header className={`hero-nav-container ${(!isReady || !visible) ? 'nav-hidden' : ''}`}>
            <style>{navbarStyles}</style>

            <nav className="hero-nav-inner" aria-label="Main Navigation">
                <Image
                    src="/assets/StudioX.png"
                    alt="StudioX Logo"
                    className="nav-logo"
                    width={120}
                    height={32}
                    priority
                    onClick={() => scrollTo('hero')}
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
                                {navIcons[link.id]}
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="nav-mobile-group">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="hamburger-btn"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span
                            className="hamburger-bar"
                            style={menuOpen ? { transform: 'translate3d(0, 6.5px, 0) rotate(45deg)' } : undefined}
                        />
                        <span
                            className="hamburger-bar"
                            style={menuOpen ? { opacity: 0 } : undefined}
                        />
                        <span
                            className="hamburger-bar"
                            style={menuOpen ? { transform: 'translate3d(0, -6.5px, 0) rotate(-45deg)' } : undefined}
                        />
                    </button>
                </div>
            </nav>

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
                            {navIcons[link.id]}
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}

export default memo(Navbar);