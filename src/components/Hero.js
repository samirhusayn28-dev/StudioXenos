// src/components/Hero.jsx
import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Robot3D from "../components/Robot3D";

const heroStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500&family=Poppins:wght@600;700;800&display=swap');

  /* ── Keyframes ── */
  @keyframes blurSharp {
    0%   { opacity: 0; filter: blur(32px); transform: translateY(22px); }
    60%  { filter: blur(6px); opacity: 0.8; }
    100% { opacity: 1; filter: blur(0); transform: translateY(0); }
  }
  @keyframes lineGrow {
    0%   { transform: scaleX(0); opacity: 0; }
    100% { transform: scaleX(1); opacity: 1; }
  }
  @keyframes arrowFloat {
    0%, 100% { transform: translateY(0px); opacity: 0.6; }
    50%       { transform: translateY(7px); opacity: 1; }
  }
  @keyframes arrowFadeIn {
    0%   { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroSlam {
    0%   { transform: scale(1)    translateY(0);     filter: blur(0px);  opacity: 1; }
    100% { transform: scale(1.06) translateY(-40px); filter: blur(18px); opacity: 0; }
  }
  @keyframes nextSlam {
    0%   { transform: scale(0.94) translateY(30px); filter: blur(16px); opacity: 0; }
    100% { transform: scale(1)    translateY(0);    filter: blur(0px);  opacity: 1; }
  }
  @keyframes bubbleIn {
    0%   { opacity: 0; transform: scale(0.80) translateY(10px); }
    65%  { transform: scale(1.02) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40%           { transform: translateY(-5px); opacity: 1; }
  }
  @keyframes chipsIn {
    0%   { opacity: 0; transform: translateY(5px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes pulseGlow {
    0%,100% { box-shadow: 0 0 4px rgba(49,92,253,0.6); }
    50%      { box-shadow: 0 0 10px rgba(49,92,253,1); }
  }
  @keyframes fadeSlideUp {
    0%   { opacity: 0; transform: translateY(16px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* ── Animated entry classes ── */
  .hero-h1  { animation: blurSharp 1.1s cubic-bezier(0.16,1,0.3,1) 0.50s both; }
  .hero-h2  { animation: blurSharp 1.1s cubic-bezier(0.16,1,0.3,1) 0.68s both; }
  .hero-h3  { animation: blurSharp 1.1s cubic-bezier(0.16,1,0.3,1) 0.84s both; }
  .hero-hr  { animation: lineGrow  0.8s cubic-bezier(0.16,1,0.3,1) 1.00s both; transform-origin: left; }
  .hero-sub { animation: blurSharp 0.9s cubic-bezier(0.16,1,0.3,1) 1.12s both; }
  .hero-btn { animation: blurSharp 0.9s cubic-bezier(0.16,1,0.3,1) 1.26s both; }
  .hero-scroll-arrow { animation: arrowFadeIn 1s cubic-bezier(0.16,1,0.3,1) 1.6s both; }
  .hero-arrow-icon   { animation: arrowFloat 1.8s ease-in-out infinite; }
  .hero-slam-out { animation: heroSlam 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
  .next-slam-in  { animation: nextSlam 0.65s cubic-bezier(0.16,1,0.3,1) 0.28s both; }

  /* ── Book Button ── */
  .hero-book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.10);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 999px; color: rgba(255,255,255,0.90);
    font-size: 0.82rem; font-weight: 600; letter-spacing: 0.07em;
    padding: 11px 28px; cursor: pointer; white-space: nowrap;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.14);
  }
  [data-theme="light"] .hero-book-btn {
    background: rgba(12,43,78,0.08); border-color: rgba(12,43,78,0.20);
    color: rgba(12,43,78,0.90);
    box-shadow: 0 2px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.50);
  }
  .hero-book-btn:hover {
    transform: scale(1.05); background: rgba(49,92,253,0.55);
    border-color: rgba(99,132,255,0.55); color: #fff;
    box-shadow: 0 6px 24px rgba(49,92,253,0.40), inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .hero-book-btn .txt-default,
  .hero-book-btn .txt-hover { display: block; transition: transform 0.3s ease, opacity 0.3s ease; }
  .hero-book-btn .txt-hover {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    transform: translateY(100%); opacity: 0;
    font-size: 0.9rem; font-weight: 700; letter-spacing: 0.12em;
  }
  .hero-book-btn:hover .txt-default { transform: translateY(-100%); opacity: 0; }
  .hero-book-btn:hover .txt-hover   { transform: translateY(0);     opacity: 1; }

  /* ── Scroll btn ── */
  .hero-scroll-btn {
    background: none; border: none; cursor: pointer;
    display: flex; flex-direction: column; align-items: center;
    gap: 8px; padding: 0; transition: opacity 0.25s ease;
  }
  .hero-scroll-btn:hover { opacity: 0.6; }

  /* ── Bubble: shared base ── */
  .robot-bubble-wrap {
    animation: bubbleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }

  .robot-bubble-box {
    position: relative;
    background: rgba(6, 11, 24, 0.88);
    border: 1px solid rgba(49,92,253,0.38);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 16px 16px 16px 4px;
    padding: 14px 16px 12px;
    max-width: 220px;
    min-width: 110px;
    box-shadow:
      0 12px 40px rgba(0,0,0,0.55),
      0 0 0 1px rgba(255,255,255,0.04) inset,
      0 1px 0 rgba(255,255,255,0.07) inset,
      0 0 28px rgba(49,92,253,0.12);
  }
  [data-theme="light"] .robot-bubble-box {
    background: rgba(255,253,250,0.96);
    border-color: rgba(196,122,48,0.30);
    box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.03) inset;
  }

  .robot-bubble-box::after {
    content: '';
    position: absolute;
    bottom: -9px; left: 14px;
    width: 0; height: 0;
    border-left: 9px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid rgba(6,11,24,0.88);
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }
  [data-theme="light"] .robot-bubble-box::after {
    border-top-color: rgba(255,253,250,0.96);
  }

  .robot-name-badge {
    display: flex; align-items: center; gap: 6px;
    margin-bottom: 8px;
  }
  .robot-name-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #315cfd;
    box-shadow: 0 0 6px rgba(49,92,253,0.8);
    animation: pulseGlow 2s ease-in-out infinite;
  }
  .robot-name-text {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #315cfd;
  }
  .robot-bubble-msg {
    font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 400; line-height: 1.6;
    color: rgba(228,222,212,0.95);
    margin: 0; min-height: 20px;
  }
  [data-theme="light"] .robot-bubble-msg { color: rgba(26,14,4,0.88); }

  .robot-bubble-cursor {
    display: inline-block;
    width: 2px; height: 13px;
    background: #315cfd; border-radius: 1px;
    margin-left: 2px; vertical-align: middle;
    animation: cursorBlink 0.65s ease-in-out infinite;
  }
  .robot-dots {
    display: flex; align-items: center; gap: 4px; padding: 3px 0;
  }
  .robot-dots span {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(49,92,253,0.75);
    animation: dotBounce 1.2s ease-in-out infinite;
  }
  .robot-dots span:nth-child(2) { animation-delay: 0.15s; }
  .robot-dots span:nth-child(3) { animation-delay: 0.30s; }

  .robot-chips {
    display: flex; flex-wrap: wrap; gap: 5px;
    margin-top: 10px;
    animation: chipsIn 0.3s ease forwards;
  }
  .robot-chip {
    font-family: 'Outfit', sans-serif;
    font-size: 11px; font-weight: 500; letter-spacing: 0.02em;
    padding: 4px 10px; border-radius: 999px;
    border: 1px solid rgba(49,92,253,0.38);
    background: rgba(49,92,253,0.10);
    color: rgba(170,195,255,0.9);
    cursor: pointer; pointer-events: all;
    transition: background 0.2s, transform 0.15s, border-color 0.2s;
    white-space: nowrap;
  }
  [data-theme="light"] .robot-chip {
    border-color: rgba(196,122,48,0.32);
    background: rgba(196,122,48,0.07);
    color: rgba(100,55,10,0.88);
  }
  .robot-chip:hover {
    background: rgba(49,92,253,0.22);
    border-color: rgba(49,92,253,0.6);
    transform: scale(1.05);
  }

  /* ── Desktop bubble: top-left inside robot area ── */
  .robot-bubble-desktop {
    position: absolute;
    top: 20%; left: 8%;
    z-index: 25;
    animation: bubbleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.8s both;
  }

  /* ── Desktop layout ── */
  .hero-inner {
    position: absolute; inset: 0; z-index: 10;
    display: flex; align-items: center;
    padding: 0 6%; overflow: hidden;
  }
  .hero-text-wrap {
    width: min(760px, 52%);
    position: relative; z-index: 2;
  }
  .hero-robot-wrap {
    position: absolute;
    right: -2%; top: 0; bottom: 0;
    width: 55%; height: 100%;
  }

  /* ── Tablet ── */
  @media (min-width: 768px) and (max-width: 1023px) {
    .hero-text-wrap { width: min(580px, 60%); }
    .hero-robot-wrap { width: 48%; right: -4%; }
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .hero-inner {
      padding: 0;
      align-items: flex-end;
      justify-content: center;
    }

    /* Robot fills screen as faded background */
    .hero-robot-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      right: 0;
      opacity: 0.28;
      pointer-events: none;
    }

    /* Text card: bottom of screen, full width */
    .hero-text-wrap {
      position: relative;
      z-index: 10;
      width: 100% !important;
      max-width: 100% !important;
      padding: 36px 24px 44px !important;
      background: linear-gradient(
        to top,
        rgba(8,13,20,0.98) 0%,
        rgba(8,13,20,0.90) 65%,
        rgba(8,13,20,0.0) 100%
      );
    }
    [data-theme="light"] .hero-text-wrap {
      background: linear-gradient(
        to top,
        rgba(245,240,232,0.98) 0%,
        rgba(245,240,232,0.90) 65%,
        rgba(245,240,232,0.0) 100%
      );
    }

    .hero-title-line {
      font-size: clamp(38px, 11vw, 56px) !important;
    }
    .hero-hr-line {
      margin: 18px 0 14px !important;
      width: 36px !important;
    }
    .hero-sub-text {
      display: none !important;
    }
    .hero-meta-row {
      display: flex !important;
    }
    .hero-book-btn {
      width: 100%;
      padding: 14px 28px;
      font-size: 0.9rem;
      text-align: center;
    }
    .hero-scroll-arrow {
      display: none !important;
    }
  }

  /* ── Mobile meta row (tags) ── */
  .hero-meta-row {
    display: none;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .hero-meta-tag {
    font-family: 'Outfit', sans-serif;
    font-size: 10.5px; font-weight: 500;
    letter-spacing: 0.10em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    color: rgba(255,255,255,0.50);
    background: rgba(255,255,255,0.05);
  }
  [data-theme="light"] .hero-meta-tag {
    border-color: rgba(0,0,0,0.12);
    color: rgba(0,0,0,0.45);
    background: rgba(0,0,0,0.04);
  }

  /* ── Mobile bubble card ── */
  .hero-mobile-bubble-wrap {
    position: absolute;
    top: 80px;
    right: 16px;
    z-index: 30;
    animation: bubbleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.8s both;
    opacity: 0;
  }
  .hero-mobile-bubble-wrap .robot-bubble-box {
    max-width: 185px;
    min-width: 120px;
    padding: 12px 14px 10px;
    border-radius: 16px 16px 4px 16px;
  }
  /* Flip tail for right-aligned bubble */
  .hero-mobile-bubble-wrap .robot-bubble-box::after {
    bottom: -9px;
    left: auto;
    right: 14px;
    border-left: 5px solid transparent;
    border-right: 9px solid transparent;
    border-top: 10px solid rgba(6,11,24,0.88);
  }
  [data-theme="light"] .hero-mobile-bubble-wrap .robot-bubble-box::after {
    border-top-color: rgba(255,253,250,0.96);
  }
  .hero-mobile-bubble-wrap .robot-bubble-msg {
    font-size: 12px;
    line-height: 1.55;
  }
  .hero-mobile-bubble-wrap .robot-chips { gap: 4px; margin-top: 8px; }
  .hero-mobile-bubble-wrap .robot-chip  { font-size: 10px; padding: 3px 8px; }

  /* ── Extra small ── */
  @media (max-width: 380px) {
    .hero-text-wrap { padding: 28px 18px 38px !important; }
    .hero-title-line { font-size: clamp(33px, 10.5vw, 46px) !important; }
    .hero-mobile-bubble-wrap { right: 10px; top: 72px; }
    .hero-mobile-bubble-wrap .robot-bubble-box { max-width: 160px; }
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .hero-h1, .hero-h2, .hero-h3,
    .hero-hr, .hero-sub, .hero-btn,
    .hero-scroll-arrow, .hero-arrow-icon,
    .robot-bubble-wrap, .robot-bubble-desktop,
    .hero-mobile-bubble-wrap,
    .robot-name-dot,
    .robot-bubble-cursor, .robot-dots span {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;

const MESSAGES = [
  {
    text: "Hey! I'm Xenos 👋 Welcome to Studio Xenos.",
    chips: ["What do you do?", "See our work", "Let's talk"],
  },
  {
    text: "We craft websites & apps that grow your business 🚀",
    chips: ["How does it work?", "View projects", "Book a call"],
  },
  {
    text: "Every pixel crafted with purpose. Let's build something great ✨",
    chips: ["Start a project", "See pricing", "Contact us"],
  },
];

const TYPING_SPEED = 26;
const DOTS_DELAY   = 700;

function XenosBubble({ extraClass = "" }) {
  const [phase, setPhase]         = useState("hidden");
  const [msgIdx, setMsgIdx]       = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [showChips, setShowChips] = useState(false);
  const [isTyping, setIsTyping]   = useState(false);

  const charRef  = useRef(0);
  const timerRef = useRef(null);
  const clearT   = () => clearTimeout(timerRef.current);

  const typeText = (idx, onDone) => {
    const text = MESSAGES[idx].text;
    charRef.current = 0;
    const tick = () => {
      charRef.current++;
      if (charRef.current <= text.length) {
        setDisplayed(text.slice(0, charRef.current));
        timerRef.current = setTimeout(tick, TYPING_SPEED);
      } else {
        onDone && onDone();
      }
    };
    tick();
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("dots");
      timerRef.current = setTimeout(() => {
        setPhase("typing");
        setIsTyping(true);
        typeText(0, () => {
          setIsTyping(false);
          setShowChips(true);
          setPhase("idle");
        });
      }, DOTS_DELAY);
    }, 1600);
    return () => { clearTimeout(t); clearT(); };
  }, []);

  const handleChip = () => {
    clearT();
    const nextIdx = (msgIdx + 1) % MESSAGES.length;
    setShowChips(false);
    setIsTyping(false);
    setDisplayed("");
    setPhase("dots");
    timerRef.current = setTimeout(() => {
      setMsgIdx(nextIdx);
      charRef.current = 0;
      setPhase("typing");
      setIsTyping(true);
      typeText(nextIdx, () => {
        setIsTyping(false);
        setShowChips(true);
        setPhase("idle");
      });
    }, DOTS_DELAY);
  };

  if (phase === "hidden") return null;

  return (
    <div className={`robot-bubble-wrap ${extraClass}`}>
      <div className="robot-bubble-box">
        <div className="robot-name-badge">
          <div className="robot-name-dot" />
          <span className="robot-name-text">Xenos</span>
        </div>

        {phase === "dots" ? (
          <div className="robot-dots">
            <span /><span /><span />
          </div>
        ) : (
          <>
            <p className="robot-bubble-msg">
              {displayed}
              {isTyping && <span className="robot-bubble-cursor" />}
            </p>
            {showChips && (
              <div className="robot-chips">
                {MESSAGES[msgIdx].chips.map((chip, i) => (
                  <button key={i} className="robot-chip" onClick={handleChip}>
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const [isDark, setIsDark]     = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    const obs = new MutationObserver(checkTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    checkTheme();
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToNext = () => {
    const heroEl = sectionRef.current;
    const nextEl = document.getElementById("services");
    if (!heroEl || !nextEl) return;
    heroEl.classList.add("hero-slam-out");
    nextEl.classList.add("next-slam-in");
    setTimeout(() => {
      window.scrollTo({ top: nextEl.offsetTop - 40, behavior: "instant" });
      heroEl.classList.remove("hero-slam-out");
      setTimeout(() => nextEl.classList.remove("next-slam-in"), 750);
    }, 400);
  };

  const titleColor  = isDark ? "#e8ddd0"               : "#1a0e04";
  const subColor    = isDark ? "rgba(232,221,208,0.55)" : "rgba(22,10,2,0.55)";
  const hrColor     = isDark ? "rgba(196,122,48,0.55)"  : "rgba(100,55,10,0.5)";
  const scrollColor = isDark ? "rgba(232,221,208,0.75)" : "rgba(0,0,0,0.70)";
  const blendColor  = isDark ? "#080d14" : "#F5F0E8";

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative", width: "100%",
        height: "100vh", minHeight: "580px",
        overflow: "hidden", fontFamily: "'Outfit', sans-serif",
        background: "transparent",
      }}
    >
      <style>{heroStyles}</style>
      <Navbar />

      <div className="hero-inner">

        {/* ── Mobile: Xenos bubble (top-right, always visible) ── */}
        {isMobile && (
          <XenosBubble extraClass="hero-mobile-bubble-wrap" />
        )}

        {/* ── Left / Bottom: Text content ── */}
        <div className="hero-text-wrap">

          {/* Mobile-only tag pills */}
          <div className="hero-meta-row">
            {["Web Design", "Development", "Branding"].map((tag) => (
              <span key={tag} className="hero-meta-tag">{tag}</span>
            ))}
          </div>

          {/* Headline */}
          <div style={{ lineHeight: 0.92, letterSpacing: "-0.01em" }}>
            <div
              className="hero-h1 hero-title-line"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(44px, 8.5vw, 120px)", fontWeight: 900,
                color: titleColor, lineHeight: 0.92, margin: 0,
                textTransform: "uppercase", transition: "color 0.4s ease",
              }}
            >Unleash the</div>

            <div
              className="hero-h2 hero-title-line"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(44px, 8.5vw, 120px)", fontWeight: 900,
                lineHeight: 0.92, margin: 0, textTransform: "uppercase",
                background: "linear-gradient(110deg, #6b3610 0%, #c47a30 45%, #7a3e12 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              }}
            >Growth Potential</div>

            <div
              className="hero-h3 hero-title-line"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(44px, 8.5vw, 120px)", fontWeight: 900,
                color: titleColor, lineHeight: 0.92, margin: 0,
                textTransform: "uppercase", transition: "color 0.4s ease",
              }}
            >of your business</div>
          </div>

          {/* Divider */}
          <div
            className="hero-hr hero-hr-line"
            style={{
              width: "48px", height: "1.5px", background: hrColor,
              borderRadius: "2px", margin: "32px 0 24px",
              transition: "background 0.4s ease",
            }}
          />

          {/* Subtitle — desktop only */}
          <p
            className="hero-sub hero-sub-text"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(13px, 1.5vw, 15.5px)", lineHeight: 1.85,
              color: subColor, margin: "0 0 36px", fontWeight: 300,
              maxWidth: "460px", transition: "color 0.4s ease",
            }}
          >
            We craft high-performing websites and apps that help businesses
            grow faster, convert better, and stand out from the crowd.
          </p>

          <div className="hero-btn">
            <button className="hero-book-btn">
              <span className="txt-default">Book a Call</span>
              <span className="txt-hover">GO →</span>
            </button>
          </div>
        </div>

        {/* ── Right: Robot ── */}
        <div className="hero-robot-wrap">
          <Robot3D />

          {/* Desktop bubble inside robot area */}
          {!isMobile && (
            <XenosBubble extraClass="robot-bubble-desktop" />
          )}
        </div>

        {/* ── Scroll arrow (desktop/tablet only) ── */}
        <div
          className="hero-scroll-arrow"
          style={{
            position: "absolute", bottom: "28px", left: "50%",
            transform: "translateX(-50%)", zIndex: 30,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          }}
        >
          <button className="hero-scroll-btn" onClick={scrollToNext}>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: "11px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: scrollColor, fontWeight: 400, transition: "color 0.4s ease",
            }}>Scroll</span>
            <div className="hero-arrow-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 4V18M11 18L5 12M11 18L17 12"
                  stroke={scrollColor} strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom blend */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "220px",
          background: `linear-gradient(to bottom, transparent 0%, ${blendColor} 100%)`,
          zIndex: 15, pointerEvents: "none", transition: "background 0.4s ease",
        }}
      />
    </section>
  );
}

export default Hero;