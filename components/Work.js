'use client';

import React from 'react';

const robot1 = '/assets/Robot.png';
const robot2 = '/assets/Robot2.png';
const robot3 = '/assets/Robot1.png';
const shadow = '/assets/Shadow.png';

const steps = [
    {
        img: robot1,
        title: 'Request a Quote',
        desc: 'Schedule a quick call to discuss your goals, timeline, and vision.',
        tag: 'Step 01',
    },
    {
        img: robot2,
        title: 'Get a Custom Plan',
        desc: 'We analyze your needs and create a tailored execution strategy.',
        tag: 'Step 02',
    },
    {
        img: robot3,
        title: 'Launch & Grow',
        desc: 'We execute the plan seamlessly and support continuous scaling.',
        tag: 'Step 03',
    },
];

const workStyles = `
/* ── workStyles (Process / Workflow Section) ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500;600;700&display=swap');

/* Main Container - Flexible for both modes */
.work-section {
  background-color: transparent;
  width: 100%;
  min-height: 100vh;
  padding: clamp(40px, 6vh, 80px) 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Centered Header */
.work-header {
  text-align: center;
  position: relative;
  z-index: 5;
  max-width: 720px;
  margin: 0 auto clamp(30px, 5vh, 50px);
  flex-shrink: 0;
}

.work-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(42px, 5.5vw, 65px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  line-height: 0.95;
  margin: 0;
}

.work-title-main {
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.work-title-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.work-subtitle {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(13px, 1.2vw, 15px);
  color: var(--text-muted);
  margin-top: 10px;
  margin-bottom: 0;
  font-weight: 400;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

/* Viewport Canvas Container */
.work-flow-container {
  position: relative;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
}

/* SVG Gradient Flow Rope */
.rope-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.gradient-rope-path {
  fill: none;
  stroke: url(#ropeGradient);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 10 10;
  animation: ropeFlow 25s linear infinite;
  filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.4));
}

.arrow-head {
  fill: url(#ropeGradient);
  filter: drop-shadow(0 0 6px rgba(37, 99, 235, 0.5));
}

@keyframes ropeFlow {
  to {
    stroke-dashoffset: -1000;
  }
}

/* Cards Grid layout supporting both absolute desktop flow and fluid stack */
.work-grid {
  width: 100%;
  position: relative;
  z-index: 2;
  min-height: 400px;
}

.work-card {
  position: absolute;
  width: min(32%, 360px);
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--card-border);
  border-radius: 28px;
  padding: clamp(24px, 3.2vh, 34px) clamp(22px, 2.2vw, 30px);
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.35s ease, 
              border-color 0.35s ease,
              background-color 0.3s ease;
}

.work-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(37, 99, 235, 0.4);
  box-shadow: 0 24px 50px rgba(37, 99, 235, 0.15), 0 0 30px rgba(37, 99, 235, 0.1);
}

/* Desktop Staggered Positioning */
@media (min-width: 900px) {
  .card-pos-0 {
    top: 0%;
    left: 0%;
  }
  .card-pos-1 {
    top: 22%;
    left: 34%;
  }
  .card-pos-2 {
    top: 45%;
    right: 0%;
  }
}

/* Responsive / Free Scroll Fallback Layout */
@media (max-width: 899px) {
  .work-section {
    height: auto;
    min-height: auto;
    padding: 60px 20px;
  }
  .rope-svg {
    display: none;
  }
  .work-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-height: auto;
  }
  .work-card {
    position: relative;
    width: 100%;
    top: auto !important;
    left: auto !important;
    right: auto !important;
  }
}

/* Card Contents */
.step-number {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(56px, 7vh, 80px);
  font-weight: 900;
  line-height: 0.8;
  color: var(--step-num-color, rgba(37, 99, 235, 0.12));
  position: absolute;
  top: 18px;
  right: 22px;
  user-select: none;
  transition: color 0.3s ease;
}

.robot-wrapper {
  position: relative;
  width: clamp(95px, 12.5vh, 130px);
  height: clamp(95px, 12.5vh, 130px);
  margin: 4px auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.robot-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  transition: transform 0.35s ease;
}

.work-card:hover .robot-img {
  transform: translateY(-6px) scale(1.06);
}

.shadow-img {
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  z-index: 1;
  opacity: 0.4;
}

.step-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #2563eb;
  display: block;
  margin-bottom: 4px;
}

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(22px, 2.8vh, 28px);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-primary);
  margin: 0 0 6px 0;
  letter-spacing: 0.01em;
  transition: color 0.3s ease;
}

.card-desc {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(13px, 1.4vh, 14px);
  font-weight: 400;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s ease;
}
`;

export default function Work() {
    return (
        <section id="how-we-work" className="work-section">
            <style>{workStyles}</style>

            {/* Header */}
            <div className="work-header">
                <h2 className="work-title">
                    <span className="work-title-main">How We </span>
                    <span className="work-title-gradient">Work</span>
                </h2>
                <p className="work-subtitle">Our simple 3-step continuous journey from start to launch.</p>
            </div>

            {/* Viewport Canvas Container */}
            <div className="work-flow-container">
                <svg className="rope-svg" viewBox="0 0 1200 480" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d98e38" />
                            <stop offset="50%" stopColor="#f7c368" />
                            <stop offset="100%" stopColor="#315cfd" />
                        </linearGradient>
                    </defs>

                    <path
                        className="gradient-rope-path"
                        d="M 180 140 C 300 320, 310 190, 570 270 C 810 350, 860 230, 1030 360"
                    />

                    <path
                        className="arrow-head"
                        d="M 1015 348 L 1040 366 L 1014 374 Z"
                    />
                </svg>

                <div className="work-grid">
                    {steps.map((s, i) => (
                        <div key={i} className={`work-card card-pos-${i}`}>
                            <span className="step-number">0{i + 1}</span>

                            <div className="robot-wrapper">
                                <img src={s.img} alt={s.title} className="robot-img" />
                                <img src={shadow} alt="" className="shadow-img" />
                            </div>

                            <span className="step-tag">{s.tag}</span>
                            <h3 className="card-title">{s.title}</h3>
                            <p className="card-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}