'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import aboutData from '../data/about.json';

const aboutStyles = `
.about-section {
  background-color: transparent;
  color: var(--about-text-main, #0f172a);
  padding: 80px 24px;
  border-top: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-bottom: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  position: relative;
  overflow: hidden;
  font-family: var(--font-outfit), sans-serif;
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

.about-anim-target {
  opacity: 0;
  will-change: opacity, transform;
}

.about-section.is-visible .about-anim-target {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translate3d(0, 20px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.about-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--about-card-bg, rgba(255, 255, 255, 0.8));
  border: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-radius: 6px;
  padding: 5px 14px;
  margin-bottom: 20px;
  font-family: var(--font-outfit), sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--about-accent, #2563eb);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--about-accent, #2563eb);
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
}

.about-heading {
  font-family: var(--font-outfit), sans-serif;
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 24px 0;
  color: var(--about-text-main, #0f172a);
}

.about-heading-main { color: var(--about-text-main, #0f172a); }

.about-heading-gold { color: var(--about-accent, #2563eb); }

.about-para {
  font-family: var(--font-outfit), sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--about-text-sub, #475569);
  margin: 0 0 16px 0;
}

.about-read-more-btn {
  display: none;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--about-accent, #2563eb);
  font-family: var(--font-outfit), sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
}

.about-stats {
  display: flex;
  gap: 24px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-family: var(--font-outfit), sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  color: var(--about-accent, #2563eb);
  line-height: 1.1;
}

.stat-label {
  font-family: var(--font-outfit), sans-serif;
  font-size: 12px;
  color: var(--about-text-sub, #475569);
  font-weight: 500;
  margin-top: 2px;
}

.persona-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.persona-card {
  background: var(--about-card-bg, rgba(255, 255, 255, 0.8));
  border: 1px solid var(--about-card-border, rgba(15, 23, 42, 0.08));
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
}

.persona-card:hover {
  transform: translate3d(0, -4px, 0);
  border-color: rgba(37, 99, 235, 0.25);
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.08);
}

.persona-card-featured {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.featured-content-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(37, 99, 235, 0.08);
  color: var(--about-accent, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 12px;
}

.persona-card-featured .icon-wrapper {
  margin-bottom: 0;
}

.persona-title {
  font-family: var(--font-outfit), sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--about-text-main, #0f172a);
  margin: 0;
}

.persona-desc {
  font-family: var(--font-outfit), sans-serif;
  font-size: 12px;
  color: var(--about-text-sub, #475569);
  margin: 4px 0 0 0;
  line-height: 1.5;
}

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
  transition: opacity 0.25s ease, background-color 0.25s ease;
}

.about-expand-overlay.visible {
  pointer-events: auto;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.75);
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
  animation: fadeIn 0.25s ease forwards;
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
  transition: background-color 0.2s;
}

@media (max-width: 767px) {
  .about-section { padding: 60px 16px; }
  .about-container { gap: 40px; }
  .about-extra-paras { display: none; }
  .about-read-more-btn { display: inline-flex; }
  .about-stats { gap: 12px; padding-top: 20px; margin-top: 20px; }
  .persona-grid { grid-template-columns: 1fr; }
  .persona-card-featured { grid-column: span 1; align-items: flex-start; }
  .featured-content-wrapper { flex-direction: column; align-items: flex-start; gap: 12px; }
  .featured-arrow { display: none; }
}
`;

const personaIcons = [
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>,
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
    </svg>,
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>,
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>,
    <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
];

function AboutUs() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const { badge, heading, paragraphs, stats, personas } = aboutData;

    useEffect(() => {
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(sectionEl);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(sectionEl);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
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

                    <button className="about-read-more-btn" onClick={() => setIsOpen(true)}>
                        Read Full Story <span className="arrow">→</span>
                    </button>

                    <div className="about-stats">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-item">
                                <span className="stat-num">{s.number}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="persona-grid">
                    {personas.map((p, i) => (
                        <div key={i} className={`about-anim-target ${i === 4 ? 'featured' : ''}`} style={{ animationDelay: `${0.15 + (i * 0.1)}s`, gridColumn: i === 4 ? '1 / -1' : undefined }}>
                            <div className={`persona-card ${i === 4 ? 'persona-card-featured' : ''}`}>
                                <div className="featured-content-wrapper">
                                    <div className="icon-wrapper">
                                        {personaIcons[i] || personaIcons[0]}
                                    </div>
                                    <div>
                                        <h3 className="persona-title">{p.title}</h3>
                                        <p className="persona-desc">{p.desc}</p>
                                    </div>
                                </div>
                                {i === 4 && <span className="featured-arrow" style={{ color: 'var(--about-accent)', fontSize: '18px', paddingRight: '8px' }}>→</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`about-expand-overlay ${isOpen ? 'visible' : ''}`} onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
                <div className="about-expand-box">
                    <button className="about-close-btn" onClick={() => setIsOpen(false)} aria-label="Close story modal">✕</button>
                    <h3 className="about-heading" style={{ fontSize: '28px', marginBottom: '16px', paddingRight: '24px' }}>
                        <span className="about-heading-main">{heading.main} </span>
                        <span className="about-heading-gold">{heading.gradient}</span>
                    </h3>
                    <div className="about-content">
                        {paragraphs.map((text, i) => <p key={i} className="about-para" style={{ marginBottom: '8px' }}>{text}</p>)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(AboutUs);