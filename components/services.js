'use client';

import React from 'react';

const designImg = '/assets/Design.png';
const webDevImg = '/assets/WebDev.png';
const appDevImg = '/assets/AppDev.png';
const autoImg = '/assets/Automation.png';

const services = [
    {
        num: '01',
        img: designImg,
        title: 'Design & UX',
        desc: 'Focusing on clarity, wireframing, and design systems. We deliver high-fidelity interactive prototypes that map out your exact solution.',
        tags: ['UI/UX Design', 'Design Systems', 'Prototyping', 'Branding'],
    },
    {
        num: '02',
        img: webDevImg,
        title: 'Web Engineering',
        desc: 'Specializing in ultra-fast, scalable Web Applications and Next.js sites built with purposeful architecture, dynamic animations, and SEO excellence.',
        tags: ['Next.js / React', 'Full-Stack Development', 'Headless CMS', 'SEO & Speed'],
    },
    {
        num: '03',
        img: appDevImg,
        title: 'Mobile Apps',
        desc: 'Designed for high performance. We build cross-platform iOS and Android apps with smooth 60fps native performance and offline capabilities.',
        tags: ['iOS & Android', 'React Native / Flutter', 'App Store Deployment'],
    },
    {
        num: '04',
        img: autoImg,
        title: 'AI & Automation',
        desc: 'Streamline operations by integrating AI workflows, custom LLM agents, and automated backends to eliminate manual tasks and scale efficiency.',
        tags: ['Custom AI Agents', 'Workflow Automation', 'API Integrations', 'n8n & Zapier'],
    },
];

const servicesStyles = `
 /* ── servicesStyles ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500;600&family=Poppins:wght@600;700;800&display=swap');

.srv-section {
  position: relative;
  width: 100%;
  gap: 15px;
  height: 100vh;
  padding: 40px 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
  background-color: transparent;
  scroll-snap-align: start;
}

/* ── Ambient Background Glow ── */
.srv-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 50vh;
  background: radial-gradient(ellipse, rgba(37, 99, 235, 0.10) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
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
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
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
  background: var(--card-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 28px 22px;
  border: 1px solid var(--card-border);
  /* Restored explicit crisp ambient shadow */
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.srv-card:hover {
  transform: translate3d(0, -8px, 0);
  border-color: rgba(37, 99, 235, 0.3);
  /* Restored rich pronounced shadow on hover */
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.12), 0 8px 16px rgba(15, 23, 42, 0.08);
}

.srv-card-num {
  position: absolute;
  top: 10px;
  right: 18px;
  font-family: 'Outfit', sans-serif;
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--text-muted);
  opacity: 0.25;
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
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 6px;
  width: 44px;
  height: 44px;
  object-fit: contain;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
}

.srv-card-heading {
  font-family: 'Outfit', sans-serif;
  font-size: 1.7rem;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--text-primary);
  letter-spacing: -0.05rem;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 2;
}

.srv-card-desc {
  font-size: 0.88rem;
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
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
  border: 1px solid var(--card-border);
}

/* ── Sliding CTA Button ── */
.srv-book-btn {
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
  background: var(--btn-bg);
  border: 1px solid var(--btn-border);
  border-radius: 999px;
  color: var(--btn-color);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0 32px;
  height: 44px;
  min-width: 140px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.25);
  z-index: 1;
}

.srv-book-btn:hover {
  transform: translate3d(0, -2px, 0);
  background: #1d4ed8;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
}

.srv-book-btn .txt-default,
.srv-book-btn .txt-hover {
  display: block;
  transition: transform 0.25s ease, opacity 0.25s ease;
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
    border-radius: 14px;
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
    font-size: 1.4rem;
    margin-bottom: 0;
    line-height: 1.1;
  }

  .srv-card-desc {
    font-size: 0.9rem;
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
    font-size: 1.5rem;
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
    border-radius: 14px;
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
    font-size: 0.9rem;
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

export default function Services() {
    return (
        <section id="services" className="srv-section">
            <style>{servicesStyles}</style>

            <div className="srv-header">
                <h2 className="srv-header-title">What We Deliver</h2>
                <p className="srv-subtitle">End-to-End digital engineering and design crafted to scale modern businesses.</p>
            </div>

            <div className="srv-grid">
                {services.map((s, i) => (
                    <div key={i} className="srv-card">
                        <div>
                            <span className="srv-card-num">{s.num}</span>

                            {/* Icon & Heading Wrapper */}
                            <div className="srv-card-top-row">
                                <img
                                    src={s.img}
                                    alt={s.title}
                                    className="srv-card-icon"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = webDevImg;
                                    }}
                                />
                                <h3 className="srv-card-heading">{s.title}</h3>
                            </div>

                            <p className="srv-card-desc">{s.desc}</p>
                        </div>

                        {/* Feature Tags */}
                        <div className="srv-tags-wrapper">
                            {s.tags.map((tag, idx) => (
                                <span key={idx} className="srv-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button className="srv-book-btn">
                <span className="txt-default">Book a Call</span>
                <span className="txt-hover">LET&apos;S TALK</span>
            </button>
        </section>
    );
}