'use client';

import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import Navbar from "./Navbar";
import Robot3D from "./Robot3D";
import { useContactModal } from "./ContactModal";

const heroStyles = `
.hero-h1, .hero-h3 {
  font-family: var(--font-outfit), sans-serif;  
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  color: var(--text-primary);
  opacity: 0;
}

.hero-h2 {
  font-family: var(--font-outfit), sans-serif;  
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 2px 0;
  background: linear-gradient(110deg, #2B68F6 0%, #93C5FD 50%, #2B68F6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  background-size: 200% auto;
}

@keyframes robotSync {
  0% { 
    transform: translate3d(var(--mover-start-x), var(--mover-start-y), 0) scale(var(--mover-start-scale)); 
  }
  68% {
    transform: translate3d(var(--mover-start-x), var(--mover-start-y), 0) scale(var(--mover-start-scale));
  }
  100% { 
    transform: translate3d(0, 10%, 0) scale(1);
  }
}

.is-loaded .hero-h1  { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.55s both; }
.is-loaded .hero-h2  { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.65s both; }
.is-loaded .hero-h3  { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.75s both; }
.is-loaded .hero-hr  { animation: lineGrow   0.7s cubic-bezier(0.22, 1, 0.36, 1) 2.85s both; }
.is-loaded .hero-sub { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.95s both; }
.is-loaded .hero-btn { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 3.05s both; }
.is-loaded .hero-scroll-arrow { animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 3.15s both; }
.is-loaded .robot-bubble-wrap { animation: bubblePop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 3.25s both; }

.is-loaded .hero-robot-mover {
  animation: robotSync 2.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

.hero-hr { 
  transform-origin: left; 
  width: 38px;
  height: 2px;
  background: var(--hr-color);
  border-radius: 2px;
  margin: 16px 0 14px;
  opacity: 0;
}

.hero-sub { 
  opacity: 0;
  font-size: clamp(0.85rem, 1.2vw, 1.05rem);
  font-family: var(--font-outfit), sans-serif;
  line-height: 1.55;
  color: var(--text-sub);
  margin: 0 0 22px;
  font-weight: 400;
  max-width: 400px;
}

.hero-btn { opacity: 0; }
.hero-scroll-arrow { opacity: 0; }
.hero-arrow-icon { animation: arrowFloat 2.2s ease-in-out infinite; }

.hero-scroll-text {
  font-family: var(--font-outfit), sans-serif;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 500;
}

.hero-book-btn {
  font-family: var(--font-poppins), sans-serif;
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
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1), background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px var(--card-shadow);
  will-change: transform;
}

.hero-book-btn:hover {
  transform: translate3d(0, -2px, 0);
  background-color: #2B68F6; 
  box-shadow: 0 6px 20px rgba(43, 104, 246, 0.25);
}

.hero-scroll-btn {
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; padding: 0; transition: opacity 0.2s ease;
}
.hero-scroll-btn:hover { opacity: 0.75; }

.robot-bubble-wrap { opacity: 0; }

.robot-bubble-box {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 10px;
  padding: 10px 14px;
  max-width: 210px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
}

.robot-name-badge { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.robot-name-dot { width: 5px; height: 5px; border-radius: 50%; background: #2B68F6; } 
.robot-name-text {
  font-family: var(--font-poppins), sans-serif;
  font-size: 9.5px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: #2B68F6; 
}
.robot-bubble-msg {
  font-family: var(--font-outfit), sans-serif;
  font-size: 12px; font-weight: 400; line-height: 1.45;
  color: var(--text-primary); margin: 0;
}

.robot-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.robot-chip {
  font-family: var(--font-outfit), sans-serif;
  font-size: 10px; font-weight: 500;
  padding: 3px 8px; border-radius: 6px;
  border: 1px solid var(--card-border);
  background: rgba(43, 104, 246, 0.08); 
  color: #2B68F6; 
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.robot-chip:hover {
  background-color: rgba(43, 104, 246, 0.15); 
  transform: translate3d(0, -1px, 0);
}

.robot-bubble-desktop {
  position: absolute; 
  top: 32%; 
  left: -20%; 
  z-index: 25;
}

.hero-inner {
  position: absolute; inset: 0; z-index: 10;
  display: flex; align-items: center;
  padding: 140px 7% 40px; overflow: hidden;
  box-sizing: border-box;
}

.hero-text-wrap {
  width: min(540px, 48%);
  position: relative; z-index: 2;
  display: flex; flex-direction: column; justify-content: center;
}

.hero-robot-wrap {
  position: absolute; right: 2%; top: 0; bottom: 0;
  width: 46%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  pointer-events: auto;
}

.hero-robot-mover {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

@media (max-width: 900px) {
  .hero-inner { padding: 80px 5% 30px; flex-direction: column; justify-content: center; text-align: center; }
  .hero-text-wrap {
    width: 100%;
    top: 18%;
    max-width: 100%;
    align-items: flex-start;
    justify-content: flex-end;
    text-align: left;
    z-index: 10;
    margin-bottom: 10px;
  }
  .hero-robot-wrap {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 100%;
    height: 65vh;
    z-index: 1;
  }
  
  .hero-hr-line { margin: 14px auto !important; }
  .robot-bubble-desktop {
    position: absolute;
    top: 18%;
    left: 4%; 
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

function Hero({ isLoaded }) {
    const sectionRef = useRef(null);
    const { openModal } = useContactModal();
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isCoveredByDome, setIsCoveredByDome] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 900px)');
        setIsMobile(mql.matches);
        const onChange = (e) => setIsMobile(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            // A small buffer so isHeroVisible doesn't flip true/false
            // repeatedly if the user scrolls back and forth right at the
            // sticky boundary — each flip mounts/unmounts the whole
            // Robot3D WebGL canvas (context + shader recompilation).
            { threshold: 0, rootMargin: '200px 0px 200px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // The Services "dome" (in SectionSlider.js) grows over Hero's own
        // first viewport-height of scroll until it fully covers it. Hero
        // stays sticky-pinned the whole time, so the IntersectionObserver
        // above still reports it as visible even once it's completely
        // hidden underneath the dome — occlusion by a higher z-index
        // sibling doesn't change geometric intersection with the
        // viewport. Track scroll position directly here so Robot3D's
        // WebGL canvas stops rendering once it's substantially covered,
        // instead of burning GPU/CPU on an invisible scene during the
        // busiest part of the scroll animation.
        let rafId = null;

        const updateCoverage = () => {
            rafId = null;
            const coverProgress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
            setIsCoveredByDome(coverProgress > 0.75);
        };

        const onScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(updateCoverage);
        };

        updateCoverage();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
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
            className={`relative w-full h-screen max-h-[100dvh] overflow-hidden bg-transparent ${isLoaded ? "is-loaded" : ""}`}
        >
            <style>{heroStyles}</style>
            <Navbar />

            <div className="hero-inner">
                <div className="hero-text-wrap">
                    <div style={{ lineHeight: 0.96, letterSpacing: "-0.02em" }}>
                        <div className="hero-h1">Unleash the</div>
                        <div className="hero-h2">Growth Potential</div>
                        <div className="hero-h3">of your business</div>
                    </div>

                    <div className="hero-hr hero-hr-line" />

                    <p className="hero-sub">
                        We craft high-performing websites and digital experiences that help modern businesses scale, convert, and stand out.
                    </p>

                    <div className="hero-btn">
                        <button className="hero-book-btn" onClick={openModal}>Book a Call →</button>
                    </div>
                </div>

                <div className="hero-robot-wrap">
                    <div
                        className="hero-robot-mover"
                        style={{
                            '--mover-start-x': isMobile ? '0%' : '-53%',
                            '--mover-start-y': isMobile ? '5%' : '18%',
                            '--mover-start-scale': isMobile ? 0.5 : 0.7,
                            transform: `translate3d(${isMobile ? '0%' : '-53%'}, ${isMobile ? '5%' : '18%'}, 0) scale(${isMobile ? 0.5 : 1})`
                        }}
                    >
                        {/* Only mount and render the 3D canvas when the Hero section is actively in view AND not already hidden under the Services dome */}
                        {isHeroVisible && !isCoveredByDome && <Robot3D isHeroVisible={isHeroVisible} />}
                    </div>
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
                    <button className="hero-scroll-btn" onClick={scrollToNext} aria-label="Scroll to services">
                        <span className="hero-scroll-text">Scroll</span>
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