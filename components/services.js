'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import services from '../data/services.json';
import { useContactModal } from './ContactModal';

const servicesStyles = `
.srv-section {
  position: relative;
  width: 100%;
  gap: 50px;
  min-height: 100vh;
  padding: 40px 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  background: radial-gradient(ellipse, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}

/* ── Header Titles ── */
.srv-header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.srv-header-title {
  font-family: var(--font-outfit), sans-serif;
  font-size: clamp(36px, 5.5vw, 50px);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: 0.02em;
  margin: 0 0 8px 0;
}

.srv-subtitle {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: var(--text-sub);
  margin-top: 10px;
  font-weight: 400;
}

/* ── Cards Grid (4 Columns Desktop) ── */
.srv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1320px;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.srv-card {
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 20px;
  border: 1px solid var(--card-border);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.srv-card:hover {
  transform: translate3d(0, -5px, 0);
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.08), 0 4px 10px rgba(15, 23, 42, 0.04);
}

.srv-card-num {
  position: absolute;
  top: 8px;
  right: 14px;
  font-family: var(--font-outfit), sans-serif;
  font-size: 4rem;
  font-weight: 900;
  color: var(--text-muted);
  opacity: 0.15;
  pointer-events: none;
  line-height: 1;
}

.srv-card-top-row {
  display: block;
  position: relative;
  z-index: 2;
}

.srv-card-icon {
  background: var(--card-bg);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
  border: 1px solid var(--card-border);
  border-radius: 8px;
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
  font-size: 1.55rem;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--text-primary);
  letter-spacing: -0.04rem;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 2;
}

.srv-card-desc {
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--text-sub);
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
  background: rgba(37, 99, 235, 0.06);
  color: #2563eb;
  border: 1px solid var(--card-border);
}

/* ── Sliding CTA Button ── */
.srv-book-btn {
  font-family: var(--font-poppins), sans-serif;
  position: relative;
  overflow: hidden;
  background: var(--btn-bg);
  border: 1px solid var(--btn-border);
  border-radius: 8px;
  color: var(--btn-color);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0 30px;
  height: 44px;
  min-width: 140px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.2);
  z-index: 1;
}

.srv-book-btn:hover {
  transform: translate3d(0, -2px, 0);
  background-color: #1d4ed8;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.28);
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
  font-weight: 700;
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
    padding: 50px 20px;
    overflow: visible;
    justify-content: flex-start;
  }

  .srv-grid {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 30px;
    gap: 12px;
  }

  .srv-card {
    padding: 16px 14px;
    border-radius: 10px;
  }

  .srv-card-top-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .srv-card-icon {
    width: 32px;
    height: 32px;
    padding: 4px;
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .srv-card-heading {
    font-size: 1.35rem;
    margin-bottom: 0;
    line-height: 1.1;
  }

  .srv-card-desc {
    font-size: 0.88rem;
    line-height: 1.35;
    margin-bottom: 10px;
  }

  .srv-card-num {
    font-size: 2.2rem;
    top: 6px;
    right: 10px;
  }

  .srv-tag {
    font-size: 0.7rem;
    padding: 2px 6px;
  }

  .srv-book-btn {
    min-height: 40px;
    display: inline-flex;
  }
}

@media (max-width: 600px) {
  .srv-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .srv-card-heading {
    font-size: 1.45rem;
  }
  .srv-card-num {
    display: none;
  }
  .srv-section {
    height: auto;
    min-height: auto;
    padding: 50px 20px;
    overflow: visible;
    justify-content: flex-start;
  }

  .srv-card {
    padding: 16px 14px;
    border-radius: 10px;
  }

  .srv-card-top-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 10px;
  }

  .srv-card-icon {
    width: 32px;
    height: 32px;
    padding: 4px;
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .srv-card-desc {
    font-size: 0.88rem;
    line-height: 1.35;
    margin-bottom: 10px;
  }

  .srv-tag {
    font-size: 0.7rem;
    padding: 2px 6px;
  }

  .srv-book-btn {
    min-height: 40px;
    display: inline-flex;
  }
}
`;

function Services() {
    const { openModal } = useContactModal();

    return (
        <section id="services" className="srv-section">
            <style>{servicesStyles}</style>

            <div className="srv-header sx-anim sx-fade-down">
                <h2 className="srv-header-title">What We Deliver</h2>
                <p className="srv-subtitle">End-to-End digital engineering and design crafted to scale modern businesses.</p>
            </div>

            <div className="srv-grid">
                {services.map((s, i) => (
                    <div key={i} className="sx-anim sx-fade-up" style={{ display: 'flex' }}>
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