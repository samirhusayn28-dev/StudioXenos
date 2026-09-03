'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import services from '../data/services.json';
import { useContactModal } from './ContactModal';

const servicesStyles = `
.srv-section {
  position: relative;
  width: 100%;
  gap: 40px;
  min-height: 100vh;
  padding: 20px 5% 80px 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
  font-family: var(--font-outfit), sans-serif;
  background-color: transparent;
  contain: layout style;
}

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
}

.srv-header {
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 50;
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

.srv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1320px;
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.srv-card-wrapper {
  display: flex;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  position: relative;
}

.srv-card {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
}

.srv-card:hover {
  transform: translateY(-12px) scale(1.025) translateZ(30px) !important;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 0 0 25px rgba(41, 114, 235, 0.35);
  border-color: rgba(41, 114, 235, 0.6);
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
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.srv-card:hover .srv-card-num {
  opacity: 0.25;
  transform: scale(1.05);
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
  transition: transform 0.3s ease;
}

.srv-card:hover .srv-card-icon {
  transform: scale(1.1) rotate(-3deg);
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
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.srv-card:hover .srv-tag {
  background: rgba(41, 114, 235, 0.14);
  border-color: rgba(41, 114, 235, 0.3);
}

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
  z-index: 10;
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

@media (max-width: 950px) {
  .srv-section {
    height: auto;
    min-height: auto;
    padding: 20px 20px 50px 20px;
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
    opacity: 1 !important;
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

const ServiceCardIcon = memo(function ServiceCardIcon({ src, alt }) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            className="srv-card-icon"
            width={42}
            height={42}
            loading="lazy"
            onError={() => setImgSrc('/assets/WebDev.png')}
        />
    );
});

function Services() {
    const { openModal } = useContactModal();
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        const gridEl = gridRef.current;
        if (!sectionEl || !gridEl) return;

        const cards = gridEl.querySelectorAll('.srv-card-wrapper');
        const totalCards = cards.length;
        if (totalCards === 0) return;

        let ticking = false;
        let winHeight = window.innerHeight;
        let gridWidth = gridEl.offsetWidth || 1200;
        let isMobile = window.innerWidth <= 950;

        const updateCachedDimensions = () => {
            winHeight = window.innerHeight;
            gridWidth = gridEl.offsetWidth || 1200;
            isMobile = window.innerWidth <= 950;
        };

        const updateCardStack = () => {
            if (isMobile) {
                ticking = false;
                return;
            }

            const rect = sectionEl.getBoundingClientRect();
            const scrollDistance = winHeight * 0.9;
            const entryProgress = (winHeight - rect.top) / scrollDistance;
            const targetP = Math.max(0, Math.min(1, entryProgress));

            const factor = 1 - targetP;
            const colPitch = gridWidth / totalCards;
            const stepOffset = 52;
            const pullDistance = colPitch - stepOffset;

            cards.forEach((card, index) => {
                const centerOffset = index - (totalCards - 1) / 2;

                const translateX = centerOffset * -pullDistance * factor;
                const translateY = (index * 10 + factor * 16) * factor;
                const translateZ = -index * 45 * factor;

                const rotateX = 14 * factor;
                const rotateY = centerOffset * -8 * factor;
                const rotateZ = centerOffset * 4 * factor;
                const scale = 1 - index * 0.025 * factor;

                card.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
                card.style.opacity = Math.max(0.6, targetP + (1 - index * 0.1));
                card.style.zIndex = totalCards - index;
            });

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateCardStack);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateCachedDimensions, { passive: true });

        updateCardStack();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateCachedDimensions);
        };
    }, []);

    return (
        <section ref={sectionRef} id="services" className="srv-section">
            <style>{servicesStyles}</style>

            <div className="srv-header">
                <h2 className="srv-header-title">What We Deliver</h2>
                <p className="srv-subtitle">End-to-End digital engineering and design crafted to scale modern businesses.</p>
            </div>

            <div ref={gridRef} className="srv-grid">
                {services.map((s, i) => (
                    <div key={i} className="srv-card-wrapper">
                        <div className="srv-card">
                            <div>
                                <span className="srv-card-num">{s.num}</span>

                                <div className="srv-card-top-row">
                                    <ServiceCardIcon src={s.img} alt={s.title} />
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