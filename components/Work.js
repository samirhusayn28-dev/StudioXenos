'use client';

import React, { memo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const robot1 = '/assets/Robot.png';
const robot2 = '/assets/Robot2.png';
const robot3 = '/assets/Robot1.png';
const shadow = '/assets/Shadow.png';

const workStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

.work-section {
  background-color: transparent;
  width: 100%;
  min-height: 100vh;
  padding: clamp(30px, 8vh, 60px) 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
  contain: paint style;
}

.work-bg-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}

.work-glow-orb {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%);
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  filter: blur(40px);
}

@keyframes sequentialFadeIn {
  from { 
    opacity: 0; 
    transform: translate3d(0, 15px, 0); 
  }
  to { 
    opacity: 1; 
    transform: translate3d(0, 0, 0); 
  }
}

@keyframes ropeDraw {
  from {
    stroke-dashoffset: 1500;
    opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.work-header {
  text-align: center;
  position: relative;
  z-index: 5;
  max-width: 720px;
  margin: 0 auto clamp(20px, 4vh, 40px);
  opacity: 0;
}

.work-section.has-animated .work-header {
  animation: sequentialFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.work-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(36px, 5.5vw, 50px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  line-height: 0.95;
  margin: 0;
  color: var(--text-primary);
}

.work-title-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.work-subtitle {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(14px, 1.2vw, 16px);
  color: var(--text-muted);
  margin-top: 12px;
  margin-bottom: 0;
}

.work-flow-container {
  position: relative;
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 620px;
  z-index: 2;
}

.rope-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 620px;
  pointer-events: none;
  z-index: 1;
}

.gradient-rope-path {
  fill: none;
  stroke: url(#ropeGradient);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  opacity: 0;
  will-change: stroke-dashoffset, opacity;
}

.work-section.has-animated .gradient-rope-path {
  animation: ropeDraw 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.3s;
}

.arrow-head {
  fill: url(#ropeGradient);
  opacity: 0;
}

.work-section.has-animated .arrow-head {
  animation: sequentialFadeIn 0.4s ease 1.2s both;
}

.work-grid {
  width: 100%;
  position: relative;
  z-index: 2;
  min-height: 600px;
  contain: paint style;
}

.work-card {
  position: absolute;
  width: min(24%, 280px);
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  text-align: center;
  box-sizing: border-box;
  opacity: 0;
  will-change: opacity, transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.work-section.has-animated .work-card {
  animation: sequentialFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (min-width: 1000px) {
  .card-pos-0 { top: 10px; left: 0%; }
  .card-pos-1 { top: 280px; left: 26%; }
  .card-pos-2 { top: 10px; left: 52%; }
  .card-pos-3 { top: 280px; right: 0%; }
}

@media (max-width: 999px) {
  .work-section { height: auto; min-height: auto; padding: 60px 20px; }
  .rope-svg { display: none; }
  .work-grid { display: flex; flex-direction: column; gap: 60px; min-height: auto; }
  .work-card { position: relative; width: 100%; top: auto !important; left: auto !important; right: auto !important; }
}

.step-number {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(48px, 6vh, 70px);
  font-weight: 900;
  line-height: 0.8;
  color: rgba(37, 99, 235, 0.12);
  position: absolute;
  top: -10px;
  right: 10px;
  user-select: none;
}

.robot-wrapper {
  position: relative;
  width: clamp(90px, 11vh, 120px);
  height: clamp(90px, 11vh, 120px);
  margin: 8px auto 28px;
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
  bottom: -8px;
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
  font-size: clamp(17px, 2.1vh, 21px);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-primary);
  margin: 0 0 6px 0;
}

.card-desc {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(12px, 1.3vh, 13px);
  font-weight: 400;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 0;
}

.small-floating-card {
  background: var(--card-bg, rgba(255, 255, 255, 0.95));
  border: 1px solid var(--card-border, rgba(37, 99, 235, 0.2));
  border-radius: 10px;
  padding: 6px 12px;
  margin: 0 auto 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.1);
  transition: transform 0.3s ease;
  will-change: transform;
  transform: translateZ(0);
}

.small-floating-card:hover {
  transform: translateY(-3px);
}

.card-svg-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.card-label-text {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}

@media (prefers-reduced-motion: reduce) {
  .work-header,
  .work-card,
  .small-floating-card,
  .robot-img,
  .gradient-rope-path,
  .arrow-head {
    animation: none !important;
    transition: none !important;
    stroke-dashoffset: 0 !important;
    opacity: 1 !important;
  }

  .work-card:hover .robot-img {
    transform: none !important;
  }
}
`;

const steps = [
    {
        id: '01',
        posClass: 'card-pos-0',
        delay: '0.15s',
        label: 'Quotation',
        labelColor: '#2563eb',
        robot: robot1,
        title: 'Request a Quote',
        desc: 'Schedule a quick call to discuss your goals.',
        stroke: '#2563eb',
        iconPath: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    },
    {
        id: '02',
        posClass: 'card-pos-1',
        delay: '0.3s',
        label: 'Custom Plan',
        labelColor: '#d97706',
        robot: robot2,
        title: 'Custom Plan',
        desc: 'We analyze requirements and build strategy.',
        stroke: '#f59e0b',
        iconPath: (
            <>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </>
        )
    },
    {
        id: '03',
        posClass: 'card-pos-2',
        delay: '0.45s',
        label: 'Development',
        labelColor: '#3b82f6',
        robot: robot1,
        title: 'Development',
        desc: 'Iterative building with clean code architecture.',
        stroke: '#3b82f6',
        iconPath: (
            <>
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </>
        )
    },
    {
        id: '04',
        posClass: 'card-pos-3',
        delay: '0.6s',
        label: 'Launch & Grow',
        labelColor: '#10b981',
        robot: robot3,
        title: 'Launch & Grow',
        desc: 'Deploy seamlessly and scale performance.',
        stroke: '#10b981',
        iconPath: (
            <>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
            </>
        )
    }
];

const StepCard = memo(function StepCard({ step }) {
    return (
        <div
            className={`work-card ${step.posClass}`}
            style={{ animationDelay: step.delay }}
        >
            <div className="small-floating-card">
                <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke={step.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {step.iconPath}
                </svg>
                <span className="card-label-text" style={{ color: step.labelColor }}>{step.label}</span>
            </div>

            <span className="step-number">{step.id}</span>
            <div className="robot-wrapper">
                <Image src={step.robot} alt={step.title} className="robot-img" width={120} height={120} sizes="(max-width: 999px) 60vw, 120px" />
                <Image src={shadow} alt="" className="shadow-img" width={102} height={102} sizes="102px" />
            </div>
            <span className="step-tag">Step {step.id}</span>
            <h3 className="card-title">{step.title}</h3>
            <p className="card-desc">{step.desc}</p>
        </div>
    );
});

export default function Work() {
    const sectionRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);

                    if (sectionRef.current) {
                        observer.unobserve(sectionRef.current);
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} id="how-we-work" className={`work-section ${hasAnimated ? 'has-animated' : ''}`}>
            <style>{workStyles}</style>

            <div className="work-bg-grid" />
            <div className="work-glow-orb" />

            <div className="work-header">
                <h2 className="work-title">
                    <span className="work-title-main">How We </span>
                    <span className="work-title-gradient">Work</span>
                </h2>
                <p className="work-subtitle">Our seamless 4-step continuous journey from start to launch.</p>
            </div>

            <div className="work-flow-container">
                <svg className="rope-svg" viewBox="0 0 1300 620" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d98e38" />
                            <stop offset="50%" stopColor="#f7c368" />
                            <stop offset="100%" stopColor="#315cfd" />
                        </linearGradient>
                    </defs>

                    <path
                        className="gradient-rope-path"
                        d="M 140 180 C 270 180, 350 435, 435 435 C 610 480, 680 180, 810 180 C 940 180, 1030 440, 1160 440"
                    />

                    <circle cx="140" cy="180" r="5" fill="#2563eb" />
                    <circle cx="480" cy="440" r="5" fill="#f7c368" />
                    <circle cx="810" cy="180" r="5" fill="#f7c368" />
                    <circle cx="1160" cy="440" r="5" fill="#2563eb" />

                    <path
                        className="arrow-head"
                        d="M 1145 416 L 1195 430 L 1145 454 Z"
                    />
                </svg>

                <div className="work-grid">
                    {steps.map((step) => (
                        <StepCard key={step.id} step={step} />
                    ))}
                </div>
            </div>
        </section>
    );
}