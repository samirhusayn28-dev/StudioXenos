import React, { useState, useEffect, useRef } from 'react';
import leftImg from './assets/left.png';
import rightImg from './assets/right.png';

const aboutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500;600&display=swap');

  .about-section {
    background: var(--bg-primary);
    transition: background 0.4s ease;
    overflow: hidden;
    position: relative;
  }

  .about-section::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -80px;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,122,48,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .about-inner { position: relative; z-index: 1; }

  .about-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(196,122,48,0.10);
    border: 1px solid rgba(196,122,48,0.25);
    border-radius: 999px;
    padding: 5px 14px 5px 10px;
    margin-bottom: 22px;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #c47a30;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .about-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #c47a30;
    flex-shrink: 0;
  }

  .about-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.88;
    letter-spacing: -0.01em;
    margin-bottom: 26px;
    font-size: clamp(52px, 7.5vw, 100px);
  }

  .about-heading-plain { color: var(--text-primary); transition: color 0.4s ease; }

  .about-heading-gold {
    background: linear-gradient(110deg, #c47a30 0%, #e8a84a 45%, #d4872e 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .about-divider {
    width: 48px; height: 2px;
    background: linear-gradient(90deg, #c47a30, #e8a84a);
    border-radius: 2px;
    margin-bottom: 24px;
  }

  .about-para {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(13.5px, 1.4vw, 15px);
    line-height: 1.88;
    color: var(--text-sub);
    font-weight: 300;
    transition: color 0.4s ease;
  }

  /* View More button */
  .view-more-btn {
    display: none;
    align-items: center;
    gap: 6px;
    margin-top: 14px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #c47a30;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .view-more-arrow {
    display: inline-block;
    font-size: 14px;
    transition: transform 0.3s ease;
    line-height: 1;
  }

  .view-more-arrow.open {
    transform: rotate(180deg);
  }

  /* Expanded overlay — dark blur backdrop */
  .about-expand-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0,0,0,0.0);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    align-items: center;
    justify-content: center;
    transition: background 0.35s ease, backdrop-filter 0.35s ease;
  }

  .about-expand-overlay.visible {
    display: flex;
  }

  .about-expand-overlay.animating {
    background: rgba(0,0,0,0.62);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* Mac Quick Look / peek animation:
     starts small + slightly down, springs up to full size */
  .about-expand-box {
    width: calc(100% - 32px);
    max-width: 520px;
    background: #1a1a1a;
    border-radius: 20px;
    padding: 12px 22px 36px;
    position: relative;
    box-shadow: 0 -2px 0 rgba(255,255,255,0.07) inset,
                0 -24px 60px rgba(0,0,0,0.55);
    border-top: 0.5px solid rgba(255,255,255,0.10);
    transform: scale(0.82) translateY(24px);
    opacity: 0;
    transition: transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity   0.28s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, opacity;
  }

  .about-expand-overlay.animating .about-expand-box {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  /* Closing animation */
  .about-expand-overlay.closing .about-expand-box {
    transform: scale(0.88) translateY(12px);
    opacity: 0;
    transition: transform 0.26s cubic-bezier(0.4, 0, 1, 1),
                opacity   0.2s ease;
  }

  .about-expand-overlay.closing {
    background: rgba(0,0,0,0);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    transition: background 0.26s ease, backdrop-filter 0.26s ease;
  }

  .about-expand-handle {
    width: 36px; height: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,0.18);
    margin: 0 auto 12px;
  }

  /* Close button — top right */
  .about-expand-close {
    position: absolute;
    top: 16px; right: 18px;
    background: rgba(255,255,255,0.10);
    border: none;
    border-radius: 50%;
    width: 30px; height: 30px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: rgba(255,255,255,0.70);
    font-size: 15px;
    line-height: 1;
    padding: 0;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .about-expand-close:hover {
    background: rgba(255,255,255,0.18);
    color: #fff;
  }

  .about-expand-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 30px;
    font-weight: 900;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 16px;
    letter-spacing: -0.01em;
    line-height: 1;
  }

  .about-expand-title span {
    background: linear-gradient(110deg, #c47a30 0%, #e8a84a 45%, #d4872e 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .about-expand-para {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    line-height: 1.82;
    color: rgba(255,255,255,0.60);
    font-weight: 300;
    margin-bottom: 12px;
  }

  .about-expand-para:last-of-type { margin-bottom: 0; }

  /* Stats */
  .about-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-top: 36px;
    padding-top: 32px;
    border-top: 1px solid rgba(196,122,48,0.15);
  }

  .stat-item {
    display: flex; flex-direction: column; gap: 3px;
    padding-right: 24px; position: relative;
  }

  .stat-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 12px; top: 6px; bottom: 6px;
    width: 1px;
    background: rgba(196,122,48,0.18);
  }

  .stat-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(28px, 3.5vw, 38px);
    font-weight: 900; line-height: 1;
    background: linear-gradient(110deg, #c47a30 0%, #e8a84a 60%, #c47a30 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }

  .stat-label {
    font-family: 'Outfit', sans-serif;
    font-size: 11px; font-weight: 500;
    color: var(--text-sub);
    letter-spacing: 0.07em; text-transform: uppercase; opacity: 0.70;
  }

  /* Images */
  .image-frame { position: relative; }

  .img-bracket-tl {
    position: absolute; top: -14px; left: -14px;
    width: 32px; height: 32px;
    border-top: 2px solid #c47a30; border-left: 2px solid #c47a30;
    border-radius: 2px 0 0 0; z-index: 3; pointer-events: none;
  }

  .img-bracket-br {
    position: absolute; bottom: -14px; right: -14px;
    width: 32px; height: 32px;
    border-bottom: 2px solid #c47a30; border-right: 2px solid #c47a30;
    border-radius: 0 0 2px 0; z-index: 3; pointer-events: none;
  }

  .about-img {
    border-radius: 14px; object-fit: cover; display: block;
    transition: transform 0.38s cubic-bezier(.22,.68,0,1.2), box-shadow 0.38s ease;
  }

  .about-img:hover { transform: translateY(-6px) scale(1.015); }

  [data-theme="dark"] .about-img { box-shadow: 0 12px 40px rgba(0,0,0,0.48); }
  [data-theme="light"] .about-img { box-shadow: 0 12px 40px rgba(120,70,20,0.14); }

  .img-tag {
    position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
    background: rgba(196,122,48,0.92); color: #fff;
    font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.10em; text-transform: uppercase;
    padding: 6px 18px; border-radius: 999px;
    white-space: nowrap; z-index: 4; pointer-events: none;
  }

  /* ── DESKTOP ── */
  @media (min-width: 768px) {
    .about-stats { display: grid; }
    .img-tag { display: block; }
    .img-bracket-tl, .img-bracket-br { display: block; }
    .view-more-btn { display: none !important; }
  }

  /* ── MOBILE ── */
  @media (max-width: 767px) {
    .about-stats { display: none !important; }
    .img-bracket-tl, .img-bracket-br { display: none; }
    .about-section::before { display: none; }
    .img-tag { display: none; }
    .view-more-btn { display: inline-flex; }

    .about-mobile-row {
      display: flex !important;
      flex-direction: row !important;
      gap: 16px;
      align-items: flex-start;
    }

    .about-text-col {
      flex: 1;
      min-width: 0;
      overflow: visible;
    }

    .about-img-col {
      width: 42% !important;
      flex-shrink: 0;
    }

    .about-heading {
      font-size: clamp(36px, 10vw, 52px) !important;
      margin-bottom: 14px !important;
    }

    .about-badge {
      margin-bottom: 12px !important;
      font-size: 10px !important;
      padding: 4px 10px 4px 8px !important;
    }

    .about-divider { margin-bottom: 14px !important; width: 32px !important; }
    .about-para { font-size: 13px !important; line-height: 1.75 !important; }

    .about-img-col .image-frame {
      height: auto !important;
      display: flex; flex-direction: column; gap: 10px;
    }

    .about-img-col .about-img {
      position: static !important;
      width: 100% !important;
      height: 155px !important;
    }
  }

  @media (max-width: 380px) {
    .about-img-col { width: 38% !important; }
    .about-img-col .about-img { height: 120px !important; }
  }

  /* Hide extra paragraphs on mobile — shown in overlay instead */
  @media (max-width: 767px) {
    .about-extra-paras { display: none; }
  }
  @media (min-width: 768px) {
    .about-extra-paras { display: block; }
  }
`;

const paragraphs = [
  "At Studio Xenos, we turn ideas into impactful digital experiences — specializing in mobile app development, web development, and UI/UX design.",
  "Our team of passionate developers, designers, and strategists crafts intuitive interfaces, scalable applications, and seamless user experiences that move businesses forward.",
  "Whether you're a startup building your first product or an established brand looking to innovate, we partner with you to bring your vision to life — on time and within budget.",
];

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '30+', label: 'Happy Clients' },
  { number: '4+', label: 'Years Experience' },
];

export default function AboutUs() {
  const [state, setState] = useState('hidden'); // hidden | mounted | animating | closing

  const openBox = () => {
    setState('mounted');
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setState('animating'))
    );
  };

  const closeBox = () => {
    setState('closing');
    setTimeout(() => setState('hidden'), 300);
  };

  const overlayClass = [
    'about-expand-overlay',
    state !== 'hidden' ? 'visible' : '',
    state === 'animating' ? 'animating' : '',
    state === 'closing' ? 'closing' : '',
  ].filter(Boolean).join(' ');

  return (
    <section id="about" className="about-section py-20 md:py-32 px-5 sm:px-10 md:px-16 lg:px-24">
      <style>{aboutStyles}</style>

      <div className="about-mobile-row max-w-6xl mx-auto grid md:grid-cols-2 gap-4 md:gap-20 items-center">

        {/* LEFT: Text */}
        <div className="about-text-col">
          <div className="about-badge">
            <span className="about-badge-dot" />
            Who We Are
          </div>

          <h2 className="about-heading">
            <span className="about-heading-plain">About<br /></span>
            <span className="about-heading-gold">Us</span>
          </h2>

          <div className="about-divider" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p className="about-para">{paragraphs[0]}</p>
            <div className="about-extra-paras">
              {paragraphs.slice(1).map((text, i) => (
                <p key={i} className="about-para" style={{ marginTop: '14px' }}>{text}</p>
              ))}
            </div>
          </div>

          {/* View More — mobile only */}
          <button
            className="view-more-btn"
            onClick={openBox}
            aria-label="View more about us"
          >
            View More
            <span className="view-more-arrow">▾</span>
          </button>

          {/* Stats bar — desktop only */}
          <div className="about-stats">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-num">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Images */}
        <div className="about-img-col">
          <div
            className="image-frame"
            style={{ position: 'relative', height: 'clamp(240px, 38vw, 500px)' }}
          >
            <div className="img-bracket-tl" />
            <div className="img-bracket-br" />

            <img
              src={leftImg}
              alt="Studio Xenos work 1"
              className="about-img"
              style={{ position: 'absolute', left: 0, bottom: 0, width: '51%', height: '86%' }}
            />
            <img
              src={rightImg}
              alt="Studio Xenos work 2"
              className="about-img"
              style={{ position: 'absolute', right: 0, top: 0, width: '51%', height: '86%' }}
            />

            <div className="img-tag">Studio Xenos</div>
          </div>
        </div>

      </div>

      {/* ── Expand overlay — dark, blurred, Mac peek animation ── */}
      <div
        className={overlayClass}
        onClick={(e) => { if (e.target === e.currentTarget) closeBox(); }}
      >
        <div className="about-expand-box">
          <div className="about-expand-handle" />

          <button
            className="about-expand-close"
            onClick={closeBox}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="about-expand-title">
            About <span>Us</span>
          </div>

          {paragraphs.map((text, i) => (
            <p key={i} className="about-expand-para">{text}</p>
          ))}
        </div>
      </div>

    </section>
  );
}