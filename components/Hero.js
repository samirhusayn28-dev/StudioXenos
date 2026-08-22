'use client';

// src/components/Hero.jsx
import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import Navbar from "./Navbar";
import Robot3D from "../components/Robot3D";

const heroStyles = `
  /* ── heroStyles ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500;600&family=Poppins:wght@600;700;800&display=swap');

/* ── Responsive Title Sizing & Theme Variable Mapping ── */
.hero-h1, .hero-h3 {
  font-family: 'Outfit', sans-serif;  
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  color: var(--text-primary);
}

.hero-h2 {
  font-family: 'Outfit', sans-serif;  
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 2px 0;
  background: linear-gradient(110deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ── Hardware-Accelerated Pure CSS Keyframes ── */
@keyframes heroFadeUp {
  0%   { opacity: 0; transform: translate3d(0, 14px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes lineGrow {
  0%   { transform: scaleX(0); opacity: 0; }
  100% { transform: scaleX(1); opacity: 1; }
}

@keyframes arrowFloat {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.6; }
  50%       { transform: translate3d(0, 5px, 0); opacity: 1; }
}

@keyframes bubblePop {
  0%   { opacity: 0; transform: translate3d(0, 8px, 0) scale(0.95); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}

/* ── GPU-Accelerated CSS Entry Classes ── */
.hero-h1  { animation: heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.20s both; will-change: transform, opacity; }
.hero-h2  { animation: heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.32s both; will-change: transform, opacity; }
.hero-h3  { animation: heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.44s both; will-change: transform, opacity; }
.hero-hr  { 
  animation: lineGrow 0.5s cubic-bezier(0.16,1,0.3,1) 0.54s both; 
  transform-origin: left; 
  will-change: transform;
  width: 38px;
  height: 2px;
  background: var(--hr-color);
  border-radius: 2px;
  margin: 16px 0 14px;
}

.hero-sub { 
  animation: heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.62s both; 
  will-change: transform, opacity; 
  font-size: clamp(0.85rem, 1.2vw, 1.05rem);
  font-family: 'Outfit', sans-serif;
  line-height: 1.55;
  color: var(--text-sub);
  margin: 0 0 22px;
  font-weight: 400;
  max-width: 400px;
}

.hero-btn { animation: heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.72s both; will-change: transform, opacity; }
.hero-scroll-arrow { animation: heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.85s both; }
.hero-arrow-icon   { animation: arrowFloat 1.8s ease-in-out infinite; will-change: transform; }

.hero-scroll-text {
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 500;
}

/* ── CTA Button ── */
.hero-book-btn {
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
  background: var(--btn-bg);
  border: 1px solid var(--btn-border);
  border-radius: 8px;
  color: var(--btn-color);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 11px 28px;
  cursor: pointer;
  white-space: nowrap;
  will-change: transform;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px var(--card-shadow);
}
.hero-book-btn:hover {
  transform: translate3d(0, -2px, 0);
  background: #1d4ed8;
  box-shadow: 0 6px 20px var(--card-shadow-h);
}

/* ── Scroll Button ── */
.hero-scroll-btn {
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; padding: 0; transition: opacity 0.2s ease;
}
.hero-scroll-btn:hover { opacity: 0.75; }

/* ── Lightweight CSS Chat Bubble ── */
.robot-bubble-wrap { 
  animation: bubblePop 0.4s cubic-bezier(0.16,1,0.3,1) 0.6s both; 
  will-change: transform, opacity; 
}
.robot-bubble-box {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 10px;
  padding: 10px 14px;
  max-width: 210px;
  box-shadow: 0 8px 24px var(--card-shadow-h);
}

.robot-name-badge { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.robot-name-dot { width: 5px; height: 5px; border-radius: 50%; background: #2563eb; }
.robot-name-text {
  font-family: 'Poppins', sans-serif;
  font-size: 9.5px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: #2563eb;
}
.robot-bubble-msg {
  font-family: 'Outfit', sans-serif;
  font-size: 12px; font-weight: 400; line-height: 1.45;
  color: var(--text-primary); margin: 0;
}

.robot-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.robot-chip {
  font-family: 'Outfit', sans-serif;
  font-size: 10px; font-weight: 500;
  padding: 3px 8px; border-radius: 6px;
  border: 1px solid var(--card-border);
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb; cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}
.robot-chip:hover {
  background: rgba(37, 99, 235, 0.15);
  transform: translate3d(0, -1px, 0);
}

.robot-bubble-desktop {
  position: absolute; top: 24%; left: -2%; z-index: 25;
}

/* ── Layout Setup ── */
.hero-inner {
  position: absolute; inset: 0; z-index: 10;
  display: flex; align-items: center;
  padding: 150px 7% 40px; overflow: hidden;
  box-sizing: border-box;
}
.hero-text-wrap {
  width: min(540px, 48%);
  position: relative; z-index: 2;
  display: flex; flex-direction: column; justify-content: center;
}
.hero-robot-wrap {
  position: absolute; right: 1%; top: 8%; bottom: 6%;
  width: 50%; height: 86%;
}

/* ── Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  .hero-h1, .hero-h2, .hero-h3, .hero-hr, .hero-sub, .hero-btn,
  .hero-scroll-arrow, .hero-arrow-icon, .robot-bubble-wrap {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ── Mobile/Tablet Adjustments ── */
@media (max-width: 900px) {
  .hero-inner { padding: 80px 5% 30px; flex-direction: column; justify-content: center; text-align: center; }
  .hero-text-wrap {
    width: 100%;
    top: 20%;
    max-width: 100%;
    align-items: flex-start;
    justify-content: flex-end;
    text-align: left;
    z-index: 10;
    margin-bottom: 10px;
  }
  .hero-robot-wrap {
    position: absolute;
    top: 0%;
    left: 30%;
    transform: translateX(-50%);
    width: 100%;
    height: 70vh;
    z-index: 1;
    pointer-events: auto;
  }
  .hero-hr-line { margin: 14px auto !important; }
  .robot-bubble-desktop {
    position: absolute;
    top: 20%;
    right: -2%;
    left: auto; 
  }
}
`;

const MESSAGES = [
    { text: "Hey! I'm Xenos 👋 Welcome to Studio Xenos.", chips: ["What do you do?", "See work"] },
    { text: "We craft websites & apps that grow your business 🚀", chips: ["How it works", "Book a call"] },
];

const XenosBubble = memo(function XenosBubble({ extraClass = "" }) {
    const [msgIdx, setMsgIdx] = useState(0);

    const handleChipClick = useCallback(() => {
        setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, []);

    return (
        <div className={`robot-bubble-wrap ${extraClass}`}>
            <div className="robot-bubble-box">
                <div className="robot-name-badge">
                    <div className="robot-name-dot" />
                    <span className="robot-name-text">Xenos AI</span>
                </div>
                <p className="robot-bubble-msg">{MESSAGES[msgIdx].text}</p>
                <div className="robot-chips">
                    {MESSAGES[msgIdx].chips.map((chip, i) => (
                        <button
                            key={i}
                            className="robot-chip"
                            onClick={handleChipClick}
                        >
                            {chip}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

function Hero() {
    const sectionRef = useRef(null);
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    // Optimized Intersection Observer using discrete state toggling to prevent redundant updates
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scrollToNext = useCallback(() => {
        const nextEl = document.getElementById("services");
        if (nextEl) {
            nextEl.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                maxHeight: "100dvh",
                overflow: "hidden",
                fontFamily: "'Outfit', sans-serif",
                background: "transparent",
            }}
        >
            <style>{heroStyles}</style>
            <Navbar />

            <div className="hero-inner">
                <div className="hero-text-wrap">
                    <div style={{ lineHeight: 0.96, letterSpacing: "-0.02em" }}>
                        <div className="hero-h1">
                            Unleash the
                        </div>

                        <div className="hero-h2">
                            Growth Potential
                        </div>

                        <div className="hero-h3">
                            of your business
                        </div>
                    </div>

                    <div className="hero-hr hero-hr-line" />

                    <p className="hero-sub">
                        We craft high-performing websites and digital experiences that help modern businesses scale, convert, and stand out.
                    </p>

                    <div className="hero-btn">
                        <button className="hero-book-btn">Book a Call →</button>
                    </div>
                </div>

                <div className="hero-robot-wrap">
                    <Robot3D isHeroVisible={isHeroVisible} />
                    <XenosBubble extraClass="robot-bubble-desktop" />
                </div>

                <div
                    className="hero-scroll-arrow"
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "50%",
                        transform: "translate3d(-50%, 0, 0)",
                        zIndex: 30,
                    }}
                >
                    <button className="hero-scroll-btn" onClick={scrollToNext}>
                        <span className="hero-scroll-text">
                            Scroll
                        </span>
                        <div className="hero-arrow-icon">
                            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                                <path
                                    d="M11 4V18M11 18L5 12M11 18L17 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default memo(Hero);