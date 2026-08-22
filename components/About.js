'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import aboutData from '../data/about.json';

const aboutStyles = `
/* ── aboutStyles (About Section) ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');

/* Core Theme Variables */
.about-section {
  background-color: transparent;
  color: var(--about-text-main, #0f172a);
  padding: 80px 24px;
  border: solid 1px var(--about-card-border, rgba(15, 23, 42, 0.08));
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.about-glow {
  position: absolute;
  top: 20%;
  right: -5%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .about-section { padding: 120px 48px; }
  .about-container {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 64px;
  }
}

/* Base Animation Classes */
.about-anim-target {
  opacity: 0;
  will-change: opacity, transform;
}

.about-section.is-visible .about-anim-target {
  animation: aboutFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes aboutFadeUp {
  from { 
    opacity: 0; 
    transform: translate3d(0, 20px, 0); 
  }
  to { 
    opacity: 1; 
    transform: translate3d(0, 0, 0); 
  }
}

/* Badge */
.about-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--about-card-bg, rgba(255, 255, 255, 0.8));
  border: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-radius: 6px;
  padding: 5px 14px;
  margin-bottom: 20px;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--about-accent, #2563eb);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
}

.about-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--about-accent, #2563eb);
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
}

/* Typography */
.about-heading {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.92;
  letter-spacing: 0.01em;
  font-size: clamp(32px, 5.5vw, 50px);
  margin: 0 0 24px 0;
}

.about-heading-main { color: var(--about-text-main, #0f172a); }

.about-heading-gold {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about-para {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(14px, 1.1vw, 15px);
  line-height: 1.75;
  color: var(--about-text-sub, #475569);
  font-weight: 400;
  margin: 0;
}

.about-extra-paras {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about-read-more-btn {
  display: none;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--about-accent, #2563eb);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Stats Grid */
.about-stats {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding-top: 28px;
  margin-top: 28px;
  border-top: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
}

.stat-num {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(28px, 3.5vw, 46px);
  font-weight: 900;
  line-height: 0.9;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: block;
}

.stat-label {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(10px, 1vw, 11px);
  font-weight: 600;
  color: var(--about-text-sub, #475569);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: block;
  margin-top: 6px;
}

/* SVG Persona Matrix */
.persona-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
}

.persona-card {
  background: var(--about-card-bg, rgba(255, 255, 255, 0.8));
  border: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.03);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}

.persona-card:hover {
  background: var(--about-card-hover, #ffffff);
  transform: translate3d(0, -3px, 0);
  border-color: var(--about-accent, #2563eb);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.08);
}

.persona-card-featured {
  grid-column: span 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.featured-content-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(37, 99, 235, 0.08);
  color: var(--about-accent, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.persona-title {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--about-text-main, #0f172a);
  margin: 0;
}

.persona-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: var(--about-text-sub, #475569);
  margin: 4px 0 0 0;
  line-height: 1.5;
}

/* Modal Sheet Overlay */
.about-expand-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease, background 0.25s ease;
}

.about-expand-overlay.visible {
  pointer-events: auto;
  opacity: 1;
  background: rgba(0, 0, 0, 0.75);
}

.about-expand-box {
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--about-bg, #ffffff);
  border: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-radius: 12px;
  padding: 28px;
  position: relative;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15);
}

.about-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(15, 23, 42, 0.05);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: var(--about-text-main, #0f172a);
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

/* Responsive Overrides (Down to 360px Mobile) */
@media (max-width: 767px) {
  .about-section {
    padding: 60px 16px;
  }
  
  .about-container {
    gap: 40px;
  }

  .about-extra-paras { 
    display: none; 
  }
  
  .about-read-more-btn { 
    display: inline-flex; 
  }

  .about-stats {
    gap: 12px;
    padding-top: 20px;
    margin-top: 20px;
  }

  .persona-grid {
    grid-template-columns: 1fr;
  }

  .persona-card-featured {
    grid-column: span 1;
    align-items: flex-start;
  }

  .featured-content-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .featured-arrow {
    display: none;
  }
}
`;

function AboutUs() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const { badge, heading, paragraphs, stats, personas } = aboutData;

    // Intersection Observer to control when animations start
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Disconnect after triggering once so it stays visible
                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.3, // Triggers when 15% of the section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Prevent body scroll when mobile modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className={`about-section ${isVisible ? 'is-visible' : ''}`}
        >
            <style>{aboutStyles}</style>
            <div className="about-glow" />

            <div className="about-container">

                {/* LEFT COLUMN: Narrative Content */}
                <div className="about-text-col about-anim-target" style={{ animationDelay: '0s' }}>
                    <div className="about-badge">
                        <span className="about-badge-dot" />
                        {badge}
                    </div>

                    <h2 className="about-heading">
                        <span className="about-heading-main">{heading.main} </span>
                        <span className="about-heading-gold">{heading.gradient}</span>
                    </h2>

                    <div className="about-content">
                        <p className="about-para">{paragraphs[0]}</p>
                        <div className="about-extra-paras">
                            <p className="about-para">{paragraphs[1]}</p>
                            <p className="about-para">{paragraphs[2]}</p>
                        </div>
                    </div>

                    <button
                        className="about-read-more-btn"
                        onClick={() => setIsOpen(true)}
                    >
                        Read Full Story <span className="arrow">→</span>
                    </button>

                    {/* Stats Row */}
                    <div className="about-stats">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-item">
                                <span className="stat-num">{s.number}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Identity Persona Matrix */}
                <div className="persona-grid">
                    {/* Innovators */}
                    <div className="about-anim-target" style={{ animationDelay: '0.15s' }}>
                        <div className="persona-card">
                            <div className="icon-wrapper">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="persona-title">{personas[0].title}</h3>
                                <p className="persona-desc">{personas[0].desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Digital Architects */}
                    <div className="about-anim-target" style={{ animationDelay: '0.25s' }}>
                        <div className="persona-card">
                            <div className="icon-wrapper">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="3" y1="9" x2="21" y2="9"></line>
                                    <line x1="9" y1="21" x2="9" y2="9"></line>
                                </svg>
                            </div>
                            <div>
                                <h3 className="persona-title">{personas[1].title}</h3>
                                <p className="persona-desc">{personas[1].desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Builders */}
                    <div className="about-anim-target" style={{ animationDelay: '0.35s' }}>
                        <div className="persona-card">
                            <div className="icon-wrapper">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="persona-title">{personas[2].title}</h3>
                                <p className="persona-desc">{personas[2].desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Solution Producers */}
                    <div className="about-anim-target" style={{ animationDelay: '0.45s' }}>
                        <div className="persona-card">
                            <div className="icon-wrapper">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </div>
                            <div>
                                <h3 className="persona-title">{personas[3].title}</h3>
                                <p className="persona-desc">{personas[3].desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Featured Strategy Row */}
                    <div className="about-anim-target" style={{ animationDelay: '0.55s', gridColumn: '1 / -1' }}>
                        <div className="persona-card persona-card-featured">
                            <div className="featured-content-wrapper">
                                <div className="icon-wrapper">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="persona-title">{personas[4].title}</h3>
                                    <p className="persona-desc">{personas[4].desc}</p>
                                </div>
                            </div>
                            <span className="featured-arrow" style={{ color: 'var(--about-accent)', fontSize: '18px', paddingRight: '8px' }}>→</span>
                        </div>
                    </div>

                </div>

            </div>

            {/* Mobile Modal Drawer */}
            <div
                className={`about-expand-overlay ${isOpen ? 'visible' : ''}`}
                onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
            >
                <div className="about-expand-box">
                    <button
                        className="about-close-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                    <h3 className="about-heading" style={{ fontSize: '28px', marginBottom: '16px', paddingRight: '24px' }}>
                        <span className="about-heading-main">{heading.main} </span>
                        <span className="about-heading-gold">{heading.gradient}</span>
                    </h3>
                    <div className="about-content">
                        {paragraphs.map((text, i) => (
                            <p key={i} className="about-para" style={{ marginBottom: '8px' }}>{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(AboutUs);