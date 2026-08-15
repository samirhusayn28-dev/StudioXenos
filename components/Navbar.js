'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'How we work', id: 'how-we-work' },
    { label: 'About', id: 'about' },
    { label: 'What People Say', id: 'testimonials' },
];

const navbarStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

  .hero-nav-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    box-sizing: border-box;
    z-index: 9999;
  }

  .hero-nav-inner {
    position: relative;
    display: flex;
    align-items: center;
    gap: 64px;
    height: 65px;
    padding: 0 44px 0 18px;
    border-radius: 999px;
    background: var(--glass-bg, rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--card-border, rgba(255, 255, 255, 0.1));
    box-shadow: 0 4px 20px var(--shadow-medium, rgba(0, 0, 0, 0.08));
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .nav-logo {
    height: 35px;
    width: auto;
    background: var(--btn-bg, #2563eb); 
    padding: 5px 20px;
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
    .hero-nav-inner { width: 100%; justify-content: space-between; gap: 0; padding: 0 18px; height: 56px; }
    .mobile-dropdown { align-self: flex-end; width: auto; min-width: 190px; max-width: 240px; }
  }
`;

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollTo = useCallback((id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: 'smooth' });
    }, []);

    if (!mounted) return null;

    return createPortal(
        <header className="hero-nav-container animate-slide-down">
            <style>{navbarStyles}</style>

            <div className="hero-nav-inner">
                <Image
                    src="/assets/StudioX.png"
                    alt="StudioX Logo"
                    className="nav-logo"
                    width={140}
                    height={30}
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
                </div>
            )}
        </header>,
        document.body
    );
}

export default memo(Navbar);