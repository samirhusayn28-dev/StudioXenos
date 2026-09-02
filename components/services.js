'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import services from '../data/services.json';
import { useContactModal } from './ContactModal';

const servicesStyles = `
.srv-section {
  position: relative;
  width: 100%;
  gap: 40px;
  min-height: 100vh;
  padding: 140px 5% 100px 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
  font-family: var(--font-outfit), sans-serif;
  background-color: transparent;
}

/* ── Ambient Background Glow ── */
.srv-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 80vw;
  height: 50vh;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}

/* ── Header Titles ── */
/* ── Header Titles ── */
.srv-header {
  text-align: center;
  margin-bottom: 30px; /* Increased slightly to give the stack room */
  position: relative;
  z-index: 50; /* Forced high to stay above the 3D cards */
  max-width: 600px;
}

.srv-header-title {
  font-family: var(--font-outfit), sans-serif;
  font-size: clamp(36px, 5.5vw, 52px);
  font-weight: 900;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: 0.02em;
  margin: 0 0 8px 0;
}

.srv-subtitle {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.85);
  margin-top: 6px;
  font-weight: 400;
}

/* ── Cards Grid (3D Perspective Container) ── */
.srv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1320px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
  perspective: 1200px; /* Enables true 3D spatial transforms */
}

.srv-card-wrapper {
  display: flex;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  /* Disable CSS transitions here so JS scroll loop has full, smooth control without conflict */
  transition: none !important; 
}

.srv-card {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backface-visibility: hidden;
  transform: translateZ(0); /* Force GPU layer instantiation */
}

.srv-card:hover {
transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: translate3d(0, -6px, 0) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.srv-card-num {
  position: absolute;
  top: 10px;
  right: 16px;
  font-family: var(--font-outfit), sans-serif;
  font-size: 3.8rem;
  font-weight: 900;
  color: #2972EB;
  opacity: 0.1;
  pointer-events: none;
  line-height: 1;
}

.srv-card-top-row {
  display: block;
  position: relative;
  z-index: 2;
}

.srv-card-icon {
  background: #f8fafc;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 6px;
  width: 42px;
  height: 42px;
  object-fit: contain;
  margin-bottom: 14px;
  position: relative;
  z-index: 2;
}

.srv-card-heading {
  font-family: var(--font-outfit), sans-serif;
  font-size: 1.45rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #0F172A;
  letter-spacing: -0.03em;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 2;
}

.srv-card-desc {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #475569;
  font-weight: 400;
  margin: 0 0 16px 0;
  position: relative;
  z-index: 2;
}

/* ── Service Tags ── */
.srv-tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;
  z-index: 2;
  margin-top: auto;
}

.srv-tag {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(41, 114, 235, 0.08);
  color: #2972EB;
  border: 1px solid rgba(41, 114, 235, 0.15);
}

/* ── Sliding CTA Button ── */
.srv-book-btn {
  font-family: var(--font-poppins), sans-serif;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  color: #2972EB;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0 32px;
  height: 46px;
  min-width: 150px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  z-index: 1;
}

.srv-book-btn:hover {
  transform: translate3d(0, -2px, 0);
  background-color: #f8fafc;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.srv-book-btn .txt-default,
.srv-book-btn .txt-hover {
  display: block;
  transition: transform 0.2s ease, opacity 0.2s ease;
  will-change: transform, opacity;
}

.srv-book-btn .txt-hover {
  position: absolute;
  transform: translate3d(0, 100%, 0);
  opacity: 0;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.srv-book-btn:hover .txt-default {
  transform: translate3d(0, -100%, 0);
  opacity: 0;
}

.srv-book-btn:hover .txt-hover {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

/* ── Mobile Layout Adjustments ── */
@media (max-width: 950px) {
  .srv-section {
    height: auto;
    min-height: auto;
    padding: 120px 20px 50px 20px;
    overflow: visible;
    justify-content: flex-start;
  }

  .srv-grid {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 20px;
    gap: 12px;
    perspective: none;
  }

  .srv-card-wrapper {
    transform: none !important;
  }

  .srv-card {
    padding: 16px 14px;
    border-radius: 12px;
  }
}

@media (max-width: 600px) {
  .srv-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .srv-card-num {
    display: none;
  }
}
`;

function get3DCardStyle(index, total, progress) {
    // Apply an easing curve (power 0.7) so the progress spreads out over a longer scroll window
    const easedProgress = Math.pow(Math.max(0, Math.min(1, progress)), 0.7);
    const factor = 1 - easedProgress; // 1 at start (tight stack), 0 at end (flat grid)

    const centerOffset = index - (total - 1) / 2;

    // Tighter stack values (reduced offsets bring cards closer together)
    const translateX = centerOffset * -35 * factor; // Reduced from -120 to -35 for a tight horizontal stack
    const translateY = (index * 12 + factor * 30) * factor; // Reduced vertical gap from 25 to 12
    const translateZ = -index * 40 * factor; // Reduced depth gap from -100 to -40
    const rotateX = 18 * factor; // Subtle backward tilt
    const rotateY = centerOffset * -8 * factor; // Gentle inward angle
    const scale = 1 - index * 0.03 * factor; // Slight scale reduction for depth

    return {
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        opacity: Math.max(0.4, easedProgress + (1 - index * 0.15)),
        zIndex: total - index
    };
}

function Services() {
    const { openModal } = useContactModal();

    return (
        <section id="services" className="srv-section">
            <style>{servicesStyles}</style>

            {/* Removed sx-anim to prevent IntersectionObserver from hiding it */}
            <div className="srv-header">
                <h2 className="srv-header-title">What We Deliver</h2>
                <p className="srv-subtitle">End-to-End digital engineering and design crafted to scale modern businesses.</p>
            </div>

            <div className="srv-grid">
                {services.map((s, i) => (
                    // Removed inline style logic entirely! The JS loop handles it now.
                    <div key={i} className="srv-card-wrapper">
                        <div className="srv-card">
                            <div>
                                <span className="srv-card-num">{s.num}</span>

                                <div className="srv-card-top-row">
                                    <Image
                                        src={s.img}
                                        alt={s.title}
                                        className="srv-card-icon"
                                        width={42}
                                        height={42}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.src = '/assets/WebDev.png';
                                        }}
                                    />
                                    <h3 className="srv-card-heading">{s.title}</h3>
                                </div>

                                <p className="srv-card-desc">{s.desc}</p>
                            </div>

                            <div className="srv-tags-wrapper">
                                {s.tags.map((tag, idx) => (
                                    <span key={idx} className="srv-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="srv-book-btn" onClick={openModal}>
                <span className="txt-default">Book a Call</span>
                <span className="txt-hover">LET&apos;S TALK</span>
            </button>
        </section>
    );
}

export default memo(Services);