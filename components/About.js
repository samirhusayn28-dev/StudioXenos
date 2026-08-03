'use client';

import React, { useState } from 'react';

const aboutStyles = `
/* ── aboutStyles (About Section) ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');

/* Core Theme Variables */
.about-section {
  background-color: transparent;
  color: var(--about-text-main, #0f172a);
  padding: 80px 24px;
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
  background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%);
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

/* Badge */
.about-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--about-card-bg, rgba(255, 255, 255, 0.8));
  border: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 20px;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--about-accent, #2563eb);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

.about-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--about-accent, #2563eb);
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
}

/* Typography */
.about-heading {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.92;
  letter-spacing: 0.01em;
    font-size: clamp(36px, 5.5vw, 50px);
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

@media (max-width: 767px) {
  .about-extra-paras { display: none; }
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

@media (max-width: 767px) {
  .about-read-more-btn { display: inline-flex; }
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
  font-size: clamp(34px, 3.5vw, 46px);
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
  font-size: 11px;
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
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.persona-card:hover {
  background: var(--about-card-hover, rgba(255, 255, 255, 0.95));
  transform: translateY(-4px);
  border-color: var(--about-accent, #2563eb);
  box-shadow: 0 16px 36px rgba(37, 99, 235, 0.1);
}

.persona-card-featured {
  grid-column: span 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(37, 99, 235, 0.1);
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
  z-index: 999;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
}

.about-expand-overlay.visible {
  pointer-events: auto;
  opacity: 1;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
}

.about-expand-box {
  width: 100%;
  max-width: 500px;
  background: var(--about-bg, #ffffff);
  border: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-radius: 24px;
  padding: 28px;
  position: relative;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.2);
}

.about-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: var(--about-text-main, #0f172a);
  font-size: 18px;
  cursor: pointer;
}
`;

const paragraphs = [
    "At Studio Xenos, we are more than just a development studio — we are digital architects, creative thinkers, and relentless problem solvers committed to building products that matter.",
    "Our culture brings together visionary strategists, meticulous engineering leads, and UI/UX purists who transform complex challenges into intuitive, high-performance software.",
    "Whether launching groundbreaking startups or engineering modern systems for established enterprises, we partner closely with our clients to turn vision into reality."
];

const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '30+', label: 'Happy Clients' },
    { number: '4+', label: 'Years Experience' },
];

export default function AboutUs() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="about" className="about-section">
            <style>{aboutStyles}</style>
            <div className="about-glow" />

            <div className="about-container">

                {/* LEFT COLUMN: Narrative Content */}
                <div className="about-text-col">
                    <div className="about-badge">
                        <span className="about-badge-dot" />
                        Who We Are
                    </div>

                    <h2 className="about-heading">
                        <span className="about-heading-main">About </span>
                        <span className="about-heading-gold">Us</span>
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
                        Read Full Story →
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
                    <div className="persona-card">
                        <div className="icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="persona-title">The Innovators</h3>
                            <p className="persona-desc">Pushing technological boundaries with cutting-edge tech stacks.</p>
                        </div>
                    </div>

                    {/* Digital Architects */}
                    <div className="persona-card">
                        <div className="icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                        </div>
                        <div>
                            <h3 className="persona-title">Digital Architects</h3>
                            <p className="persona-desc">Designing resilient, scalable systems that grow with your business.</p>
                        </div>
                    </div>

                    {/* Product Builders */}
                    <div className="persona-card">
                        <div className="icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="persona-title">Product Builders</h3>
                            <p className="persona-desc">Crafting user-centric applications from initial concept to launch.</p>
                        </div>
                    </div>

                    {/* Solution Producers */}
                    <div className="persona-card">
                        <div className="icon-wrapper">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        <div>
                            <h3 className="persona-title">Solution Producers</h3>
                            <p className="persona-desc">Untangling complex business logic through smart software.</p>
                        </div>
                    </div>

                    {/* Featured Strategy Row */}
                    <div className="persona-card persona-card-featured">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className="icon-wrapper">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </div>
                            <div>
                                <h3 className="persona-title">Strategic Growth Partners</h3>
                                <p className="persona-desc">Long-term alignment to turn technology into a continuous competitive edge.</p>
                            </div>
                        </div>
                        <span style={{ color: 'var(--about-accent)', fontSize: '18px', paddingRight: '8px' }}>→</span>
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
                    <h3 className="about-heading" style={{ fontSize: '32px', marginBottom: '16px' }}>
                        <span className="about-heading-main">About </span>
                        <span className="about-heading-gold">Us</span>
                    </h3>
                    <div className="about-content">
                        {paragraphs.map((text, i) => (
                            <p key={i} className="about-para">{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}