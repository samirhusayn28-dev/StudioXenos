'use client';

import React, { useMemo, memo } from 'react';
import testimonials from '../data/testimonials.json';

const css = `
  .t-section {
    background: transparent;
    padding: 50px 0;
    font-family: 'Outfit', system-ui, -apple-system, sans-serif;
    width: 100%;
    box-sizing: border-box;
    contain: paint layout;
    overflow: hidden;
  }

  .t-header {
    text-align: center;
    margin-bottom: 44px;
    padding: 0 20px;
  }

  .t-title {
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0;
    font-size: clamp(28px, 5vw, 46px);
    color: var(--text-primary, #0f172a);
  }

  .t-title-blue {
    color: #2563eb;
  }

  .t-divider {
    width: 44px;
    height: 3px;
    background: #2563eb;
    border-radius: 2px;
    margin: 16px auto 0;
  }

  .t-marquee-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .t-marquee {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    user-select: none;
  }

  .t-marquee::before,
  .t-marquee::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(30px, 8%, 120px);
    z-index: 2;
    pointer-events: none;
  }

  .t-marquee::before {
    left: 0;
    background: linear-gradient(to right, var(--bg-main, #f0f4f9) 0%, rgba(240, 244, 249, 0) 100%);
  }

  .t-marquee::after {
    right: 0;
    background: linear-gradient(to left, var(--bg-main, #f0f4f9) 0%, rgba(240, 244, 249, 0) 100%);
  }

  /* ── Pure CSS Continuous Marquee Keyframes ── */
  @keyframes sxMarqueeLeft {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  @keyframes sxMarqueeRight {
    0% {
      transform: translate3d(-50%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  .t-track-css-left {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: sxMarqueeLeft 34s linear infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  .t-track-css-right {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: sxMarqueeRight 34s linear infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  .t-card {
    position: relative;
    flex: 0 0 auto;
    width: 320px;
    padding: 22px 20px;
    margin-right: 18px;
    border-radius: 12px;
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--card-border, rgba(0, 0, 0, 0.06));
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    min-height: 210px;
    transform: translateZ(0);
    backface-visibility: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .t-card:hover {
    transform: translateY(-2px);
    border-color: rgba(37, 99, 235, 0.25);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.08);
  }

  .t-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .t-stars {
    display: flex;
    gap: 3px;
    color: #f59e0b;
    font-size: 13.5px;
  }

  .t-quote-symbol {
    font-size: 28px;
    font-weight: 900;
    line-height: 1;
    color: #94a3b8;
    opacity: 0.3;
  }

  .t-quote {
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--text-muted, #475569);
    margin: 0 0 14px 0;
    flex-grow: 1;
  }

  .t-footer {
    display: flex;
    align-items: center;
    gap: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 10px;
  }

  .t-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.08);
    color: #2563eb;
    font-size: 12.5px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(37, 99, 235, 0.15);
  }

  .t-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .t-name {
    font-size: 12.5px;
    font-weight: 800;
    color: var(--text-primary, #0f172a);
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
  }

  .t-role {
    font-size: 11px;
    font-weight: 400;
    color: var(--text-muted, #64748b);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── TABLET BREAKPOINT ── */
  @media (max-width: 900px) {
    .t-section { padding: 40px 0; }
    .t-header { margin-bottom: 32px; }
    .t-card {
      width: 270px;
      padding: 18px 16px;
      margin-right: 14px;
      min-height: 195px;
    }
    .t-quote { font-size: 13px; }
    .t-track-css-left, .t-track-css-right { animation-duration: 26s; }
  }

  /* ── MOBILE BREAKPOINT (Optimized down to 360px) ── */
  @media (max-width: 640px) {
    .t-section { padding: 30px 0; }
    .t-header {
      margin-bottom: 24px;
      padding: 0 16px;
    }
    .t-divider { margin-top: 10px; }
    .t-marquee-wrap { gap: 14px; }
    .t-marquee::before,
    .t-marquee::after {
      width: clamp(20px, 10vw, 50px);
    }
    .t-card {
      width: 235px;
      padding: 15px 14px;
      margin-right: 10px;
      min-height: 175px;
      border-radius: 10px;
    }
    .t-card-top { margin-bottom: 6px; }
    .t-stars { font-size: 12px; gap: 2px; }
    .t-quote-symbol { font-size: 20px; }
    .t-quote {
      font-size: 12px;
      line-height: 1.45;
      margin-bottom: 10px;
    }
    .t-footer {
      gap: 8px;
      padding-top: 8px;
    }
    .t-avatar {
      width: 32px;
      height: 32px;
      font-size: 11px;
    }
    .t-name { font-size: 11.5px; }
    .t-role { font-size: 10px; }
    .t-track-css-left, .t-track-css-right { animation-duration: 20s; }
  }

  @media (prefers-reduced-motion: reduce) {
    .t-track-css-left, .t-track-css-right {
      animation: none !important;
    }
  }
`;

const TestimonialCard = memo(function TestimonialCard({ item }) {
    const starsArray = useMemo(() => Array.from({ length: item.rating }), [item.rating]);

    return (
        <div className="t-card">
            <div>
                <div className="t-card-top">
                    <div className="t-stars">
                        {starsArray.map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                    </div>
                    <span className="t-quote-symbol" aria-hidden="true">“</span>
                </div>
                <p className="t-quote">“{item.quote}”</p>
            </div>
            <div className="t-footer">
                <div className="t-avatar">{item.avatar}</div>
                <div className="t-info">
                    <span className="t-name">{item.name}</span>
                    <span className="t-role">{item.role}</span>
                </div>
            </div>
        </div>
    );
});

const GlobalStyle = memo(function GlobalStyle() {
    return <style>{css}</style>;
});

const rowOne = testimonials.slice(0, 3);
const rowTwo = testimonials.slice(3, 6);

// Quadrupling elements guarantees seamless looping with no layout popping at bounds
const rowOneRepeated = [...rowOne, ...rowOne, ...rowOne, ...rowOne];
const rowTwoRepeated = [...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo];

export default function Testimonials() {
    return (
        <section id="testimonials" className="t-section">
            <GlobalStyle />

            <div className="t-header">
                <h2 className="t-title">
                    What <span className="t-title-blue">People Say About Us</span>
                </h2>
                <div className="t-divider" />
            </div>

            <div className="t-marquee-wrap">
                {/* Row 1: Smooth Left CSS Marquee */}
                <div className="t-marquee">
                    <div className="t-track-css-left">
                        {rowOneRepeated.map((item, i) => (
                            <TestimonialCard key={`r1-${i}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Smooth Right CSS Marquee */}
                <div className="t-marquee">
                    <div className="t-track-css-right">
                        {rowTwoRepeated.map((item, i) => (
                            <TestimonialCard key={`r2-${i}`} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}