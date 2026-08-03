'use client';

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import Image from 'next/image';

const phtsImg = 'assets/PHTS.png';
const mp1Img = 'assets/MP1.png';
const mp2Img = 'assets/MP2.png';
const mp3Img = 'assets/MP3.png';

const projects = [
    {
        img: phtsImg,
        title: 'PHTS',
        tag: 'Web App',
        year: '2025',
        accent: '#c47a30',
        accentRgb: '196,122,48',
        desc: 'A full-featured web application built with modern technologies. Clean UI, smooth interactions, and a seamless user experience from end to end.',
        url: 'https://phts.vercel.app/',
        github: 'https://github.com/samirhusayn28-dev/PHTS.git',
        stats: [
            { label: 'Stack', value: 'React' },
            { label: 'Deploy', value: 'Vercel' },
            { label: 'Year', value: '2025' },
        ],
    },
    {
        img: mp1Img,
        title: 'Personal Portfolio',
        tag: 'Portfolio',
        year: '2025',
        accent: '#315cfd',
        accentRgb: '49,92,253',
        desc: 'A sleek personal portfolio showcasing projects, skills, and experience with a clean, modern design and smooth animations.',
        url: 'https://personal-portfolio-lemon-ten.vercel.app/',
        github: 'https://github.com/Mukhtar-816/Personal_Portfolio.git',
        stats: [
            { label: 'Stack', value: 'React' },
            { label: 'Deploy', value: 'Vercel' },
            { label: 'Year', value: '2025' },
        ],
    },
    {
        img: mp2Img,
        title: 'Hospital Mgmt',
        tag: 'Web App',
        year: '2025',
        accent: '#22c97a',
        accentRgb: '34,201,122',
        desc: 'A full-featured hospital management system with patient records, appointment scheduling, and an admin dashboard built with Next.js.',
        url: 'https://hospital-managment-system-rosy.vercel.app/',
        github: 'https://github.com/Mukhtar-816/Hospital-Management-System-Nextjs.git',
        stats: [
            { label: 'Stack', value: 'Next.js' },
            { label: 'Deploy', value: 'Vercel' },
            { label: 'Year', value: '2025' },
        ],
    },
    {
        img: mp3Img,
        title: 'Bid&Go',
        tag: 'Web App',
        year: '2025',
        accent: '#e63946',
        accentRgb: '230,57,70',
        desc: 'A real-time online bidding and auction platform where users can list items, place live bids, and track auctions as they unfold.',
        url: 'https://mukhtar-dev.vercel.app',
        github: '#',
        stats: [
            { label: 'Stack', value: 'React' },
            { label: 'Deploy', value: 'Vercel' },
            { label: 'Year', value: '2025' },
        ],
    },
];

const DEFAULT_IMG_W_PERCENT = 60;
const MIN_IMG_W = 35;
const MAX_IMG_W = 75;
const DEBOUNCE_MS = 400;

const GithubIcon = memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
));
GithubIcon.displayName = 'GithubIcon';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Outfit:wght@300;400;500;600&family=Poppins:wght@500;600&display=swap');

.pj-section {
  position: relative;
  background: transparent;
  transition: background 0.4s ease;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transform: translateZ(0);
}

.pj-desktop-layout {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
}

.pj-transition-container {
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: min(1380px, 94vw);
  height: min(720px, 86vh);
  max-height: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.pj-transition-container.slide-left {
  animation: slideLeftAnim 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.pj-transition-container.slide-right {
  animation: slideRightAnim 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideLeftAnim {
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideRightAnim {
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
}

.pj-big-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--card-bg, rgba(255, 255, 255, 0.85));
  border: 1px solid var(--card-border, rgba(0,0,0,0.1));
  color: var(--text-primary, #0f172a);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.pj-big-arrow:hover:not(:disabled) {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 14px 36px rgba(37, 99, 235, 0.3);
}

.pj-big-arrow:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  box-shadow: none;
}

.pj-big-arrow.left { left: 32px; }
.pj-big-arrow.right { right: 32px; }

.pj-img-col {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  will-change: width;
}

.pj-img-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-primary);
  border: 1px solid var(--card-border);
  cursor: zoom-in;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
}

.pj-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.pj-img-card:hover .pj-img { transform: scale(1.02); }

.pj-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%);
  pointer-events: none;
}

.pj-img-counter {
  position: absolute; top: 16px; left: 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.6);
  padding: 4px 10px; border-radius: 20px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.pj-img-click-hint {
  position: absolute; top: 16px; right: 16px;
  font-family: 'Outfit', sans-serif; font-size: 10px;
  font-weight: 500; letter-spacing: 0.14em;
  text-transform: uppercase; color: #ffffff;
  background: rgba(15, 23, 42, 0.6);
  padding: 4px 12px; border-radius: 20px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex; align-items: center; gap: 6px;
}

.pj-img-bar {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  transition: background 0.4s ease;
  background: #2563eb;
}

.pj-drag-handle {
  width: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  cursor: col-resize; position: relative; z-index: 10; margin: 0 -2px;
}

.pj-drag-handle-inner {
  width: 4px; height: 48px; border-radius: 4px;
  background: var(--card-border);
  transition: background 0.2s, height 0.2s;
}

.pj-drag-handle:hover .pj-drag-handle-inner,
.pj-drag-handle.dragging .pj-drag-handle-inner {
  background: rgba(37, 99, 235, 0.5); height: 72px;
}

.pj-details {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px; padding: 32px 32px 24px;
  display: flex; flex-direction: column;
  justify-content: space-between;
  overflow: hidden; position: relative; flex: 1; min-width: 0;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

.pj-details:hover {
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.12), 0 8px 16px rgba(15, 23, 42, 0.08);
}

.pj-details-glow {
  position: absolute; inset: 0; pointer-events: none;
  border-radius: 20px; transition: background 0.8s ease;
}

.pj-slide {
  display: flex; flex-direction: column; height: 100%; justify-content: space-between;
  position: relative; z-index: 1;
}

.pj-ghost {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(42px, 5vw, 80px); font-weight: 900;
  line-height: 0.85; letter-spacing: -0.05em; color: transparent;
  -webkit-text-stroke: 1px var(--card-border);
  user-select: none; margin-bottom: 4px;
}

.pj-pill {
  display: inline-flex; align-items: center; gap: 8px;
  margin-bottom: 8px; position: relative; z-index: 1;
}
.pj-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #2563eb; }
.pj-pill-text {
  font-family: 'Outfit', sans-serif; font-size: 10px;
  font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--text-muted);
}

.pj-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(26px, 3vw, 44px); font-weight: 900;
  text-transform: uppercase; letter-spacing: -0.01em;
  line-height: 0.95; color: var(--text-primary);
  margin-bottom: 10px; position: relative; z-index: 1;
}

.pj-rule { height: 2px; width: 36px; border-radius: 2px; margin-bottom: 12px; background: rgba(37, 99, 235, 0.25); }

.pj-desc {
  font-family: 'Outfit', sans-serif; font-size: 13px;
  font-weight: 300; color: var(--text-sub);
  line-height: 1.5; margin-bottom: 16px;
}

.pj-stats { display: flex; gap: 20px; margin-bottom: 16px; }

.pj-stat { display: flex; flex-direction: column; gap: 2px; }

.pj-stat-val {
  font-family: 'Outfit', sans-serif;
  font-size: 20px; font-weight: 900; line-height: 1;
  color: var(--text-primary);
}
.pj-stat-lbl {
  font-family: 'Outfit', sans-serif; font-size: 9px;
  font-weight: 500; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--text-muted);
}

.pj-btns { display: flex; gap: 10px; align-items: center; margin-top: auto; flex-wrap: wrap; }

.pj-btn-visit {
  font-family: 'Poppins', sans-serif; font-size: 12px;
  font-weight: 600; letter-spacing: 0.02em;
  padding: 10px 22px; border-radius: 999px;
  border: 1px solid var(--btn-border); cursor: pointer; color: var(--btn-color);
  background: var(--btn-bg);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), filter 0.18s, background 0.18s;
}
.pj-btn-visit:hover { transform: translateY(-2px); background: #1d4ed8; filter: brightness(1.05); }

.pj-btn-gh {
  font-family: 'Poppins', sans-serif; font-size: 12px;
  font-weight: 500; letter-spacing: 0.02em;
  padding: 9px 18px; border-radius: 999px;
  border: 1px solid var(--card-border); background: transparent;
  color: var(--text-primary); cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 6px;
  transition: background 0.18s, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}
.pj-btn-gh:hover { background: rgba(37, 99, 235, 0.08); transform: translateY(-2px); }

.pj-dots { display: flex; gap: 6px; align-items: center; }
.pj-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted);
  cursor: pointer; transition: background 0.3s, transform 0.3s;
}
.pj-dot.active { transform: scale(1.4); background: #2563eb; }

.pj-footer-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 14px; padding-top: 12px;
  border-top: 1px solid var(--card-border);
}

.pj-scroll-hint {
  font-family: 'Outfit', sans-serif; font-size: 9px;
  font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text-muted);
  display: flex; align-items: center; gap: 8px;
}

.pj-desktop-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pj-mode-toggle {
  font-family: 'Outfit', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  border: 1px solid rgba(37, 99, 235, 0.2);
  cursor: pointer;
  transition: background 0.2s;
}
.pj-mode-toggle:hover {
  background: rgba(37, 99, 235, 0.2);
}

.pj-desktop-arrows {
  display: flex;
  gap: 6px;
  align-items: center;
}

.pj-arrow-btn-d {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 11px;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}

.pj-arrow-btn-d:hover:not(:disabled) {
  background: rgba(37, 99, 235, 0.1);
  border-color: #2563eb;
  transform: translateY(-1px);
}

.pj-arrow-btn-d:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pj-lightbox-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(15, 23, 42, 0.85);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: lbFadeIn 0.22s ease;
}
@keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }

.pj-lightbox-inner {
  position: relative; display: inline-flex;
  animation: lbScaleIn 0.28s cubic-bezier(.16,1,.3,1);
}
@keyframes lbScaleIn { from { transform: scale(0.92); opacity:0; } to { transform: scale(1); opacity:1; } }

.pj-lightbox-inner img {
  display: block; max-width: 88vw; max-height: 85vh;
  width: auto; height: auto; border-radius: 12px;
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.4);
}

.pj-lightbox-close {
  position: absolute; top: -16px; right: -16px;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.9); border: 1px solid var(--card-border);
  color: var(--text-primary); font-size: 14px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.18s;
}
.pj-lightbox-close:hover { background: #ffffff; }

.pj-mobile-slider, .pj-floating-arrows-mobile {
  display: none;
}

@media (max-width: 900px) {
  .pj-desktop-layout { display: none !important; }

  .pj-section {
    padding: 0;
    height: 100vh;
    height: 100dvh;
    position: relative;
  }

  .pj-mobile-slider {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding: 0 4vw;
    box-sizing: border-box;
  }
  .pj-mobile-slider::-webkit-scrollbar { display: none; }

  .pj-mobile-slide-item {
    flex: 0 0 92vw;
    width: 92vw;
    height: 100%;
    scroll-snap-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 6px;
    box-sizing: border-box;
  }

  .pj-mobile-card {
    width: 100%;
    height: 75vh;
    max-height: 640px;
    border-radius: 24px;
    border: 1px solid var(--card-border);
    padding: 24px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background: var(--card-bg);
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08);
    isolation: isolate;
  }

  .pj-mobile-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 24px;
    background-image: var(--pj-mobile-overlay), var(--pj-thumb-url);
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .pj-ghost { font-size: 36px; margin-bottom: 2px; }
  .pj-title { font-size: 26px; margin-bottom: 8px; color: var(--text-primary); }
  .pj-desc { font-size: 12px; line-height: 1.45; margin-bottom: 12px; color: var(--text-sub); }
  .pj-stats { gap: 16px; margin-bottom: 12px; }
  .pj-stat-val { font-size: 18px; color: var(--text-primary); }

  .pj-btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .pj-btn-visit, .pj-btn-gh {
    padding: 11px 12px;
    font-size: 12px;
    justify-content: center;
    text-align: center;
  }

  .pj-footer-row {
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid var(--card-border);
  }

  .pj-floating-arrows-mobile {
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 24px;
    z-index: 100;
    align-items: center;
    gap: 8px;
  }

  .pj-arrow-btn-m {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .pj-arrow-btn-m:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}
`;

function Projects() {
    const [current, setCurrent] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [lightbox, setLightbox] = useState(false);
    const [imgColPercent, setImgColPercent] = useState(DEFAULT_IMG_W_PERCENT);
    const [scrollType, setScrollType] = useState('horizontal');
    const [animDirection, setAnimDirection] = useState('slide-left');

    const currentRef = useRef(0);
    const isInViewRef = useRef(false);
    const isNavigatingRef = useRef(false);
    const sectionRef = useRef(null);
    const handleRef = useRef(null);
    const mobileSliderRef = useRef(null);
    const dragRef = useRef({ dragging: false, startX: 0, startWPercent: 0 });
    const lastScrollAtRef = useRef(0);
    const rafDragRef = useRef(null);

    useEffect(() => { currentRef.current = current; }, [current]);
    useEffect(() => { isInViewRef.current = isInView; }, [isInView]);

    const goTo = useCallback((idx, dir = 'slide-left') => {
        const boundedIdx = Math.min(projects.length - 1, Math.max(0, idx));
        if (boundedIdx === currentRef.current || isNavigatingRef.current) return;

        isNavigatingRef.current = true;
        setAnimDirection(dir);
        currentRef.current = boundedIdx;
        setCurrent(boundedIdx);

        setTimeout(() => {
            isNavigatingRef.current = false;
        }, 400);
    }, []);

    const scrollToMobileProject = useCallback((index) => {
        if (!mobileSliderRef.current) return;
        const width = mobileSliderRef.current.querySelector('.pj-mobile-slide-item')?.offsetWidth || mobileSliderRef.current.offsetWidth;
        mobileSliderRef.current.scrollTo({
            left: index * width,
            behavior: 'smooth'
        });
    }, []);

    const handleMobileScroll = useCallback(() => {
        if (!mobileSliderRef.current) return;
        const itemWidth = mobileSliderRef.current.querySelector('.pj-mobile-slide-item')?.offsetWidth || mobileSliderRef.current.offsetWidth;
        const index = Math.round(mobileSliderRef.current.scrollLeft / itemWidth);
        if (index !== currentRef.current && index >= 0 && index < projects.length) {
            setCurrent(index);
        }
    }, []);

    const onDragStart = useCallback((e) => {
        e.preventDefault();
        const containerWidth = sectionRef.current?.offsetWidth || window.innerWidth;
        dragRef.current = { dragging: true, startX: e.clientX, startWPercent: imgColPercent };
        handleRef.current?.classList.add('dragging');

        const onMove = (ev) => {
            if (!dragRef.current.dragging) return;
            if (rafDragRef.current) cancelAnimationFrame(rafDragRef.current);

            rafDragRef.current = requestAnimationFrame(() => {
                const deltaPx = ev.clientX - dragRef.current.startX;
                const deltaPercent = (deltaPx / containerWidth) * 100;
                const newPercent = Math.min(MAX_IMG_W, Math.max(MIN_IMG_W, dragRef.current.startWPercent + deltaPercent));
                setImgColPercent(newPercent);
            });
        };

        const onUp = () => {
            dragRef.current.dragging = false;
            handleRef.current?.classList.remove('dragging');
            if (rafDragRef.current) cancelAnimationFrame(rafDragRef.current);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseup', onUp);
    }, [imgColPercent]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.4);
            },
            { threshold: [0.1, 0.4, 0.8] }
        );
        io.observe(section);

        const onWheel = (e) => {
            if (window.innerWidth <= 900) return;
            if (!isInViewRef.current || Math.abs(e.deltaY) < 5) return;

            if (scrollType === 'vertical') {
                const isDown = e.deltaY > 0;
                const isTopBoundary = currentRef.current === 0;
                const isBottomBoundary = currentRef.current === projects.length - 1;

                if ((isDown && isBottomBoundary) || (!isDown && isTopBoundary)) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                const now = Date.now();
                if (now - lastScrollAtRef.current < DEBOUNCE_MS || isNavigatingRef.current) return;
                lastScrollAtRef.current = now;

                if (isDown) {
                    goTo(currentRef.current + 1, 'slide-left');
                } else {
                    goTo(currentRef.current - 1, 'slide-right');
                }
            }
        };

        section.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            io.disconnect();
            section.removeEventListener('wheel', onWheel);
        };
    }, [goTo, scrollType]);

    const project = projects[current];

    return (
        <section id="projects" ref={sectionRef} className="pj-section">
            <style>{css}</style>

            <div className="pj-desktop-layout">
                {scrollType === 'horizontal' && (
                    <>
                        <button
                            className="pj-big-arrow left"
                            disabled={current === 0}
                            onClick={() => goTo(current - 1, 'slide-right')}
                            aria-label="Previous Project"
                        >
                            ❮
                        </button>
                        <button
                            className="pj-big-arrow right"
                            disabled={current === projects.length - 1}
                            onClick={() => goTo(current + 1, 'slide-left')}
                            aria-label="Next Project"
                        >
                            ❯
                        </button>
                    </>
                )}

                <div className={`pj-transition-container ${animDirection}`} key={current}>
                    <div className="pj-img-col" style={{ width: `${imgColPercent}%` }}>
                        <div className="pj-img-card" onClick={() => setLightbox(true)}>
                            <Image
                                src={project.img}
                                alt={project.title}
                                className="pj-img"
                                fill
                                sizes="(max-width: 768px) 100vw, 45vw"
                                unoptimized
                            />
                            <div className="pj-img-overlay" />

                            <div className="pj-img-counter">
                                {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                            </div>

                            <div className="pj-img-click-hint">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="11" y1="8" x2="11" y2="14" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                                Full screen
                            </div>

                            <div className="pj-img-bar" style={{ background: project.accent }} />
                        </div>
                    </div>

                    <div
                        ref={handleRef}
                        className="pj-drag-handle"
                        onMouseDown={onDragStart}
                        title="Drag to resize panel ratio"
                    >
                        <div className="pj-drag-handle-inner" />
                    </div>

                    <div className="pj-details">
                        <div
                            className="pj-details-glow"
                            style={{
                                background: `radial-gradient(ellipse 80% 60% at 100% 0%, rgba(${project.accentRgb},0.08) 0%, transparent 70%)`,
                            }}
                        />

                        <div className="pj-slide">
                            <div>
                                <div className="pj-ghost">{String(current + 1).padStart(2, '0')}</div>

                                <div className="pj-pill">
                                    <div className="pj-pill-dot" style={{ background: project.accent }} />
                                    <span className="pj-pill-text">{project.tag} · {project.year}</span>
                                </div>

                                <h2 className="pj-title">{project.title}</h2>
                                <div className="pj-rule" style={{ background: project.accent }} />

                                <p className="pj-desc">{project.desc}</p>

                                <div className="pj-stats">
                                    {project.stats.map((s, i) => (
                                        <div className="pj-stat" key={i}>
                                            <span className="pj-stat-val" style={{ color: project.accent }}>{s.value}</span>
                                            <span className="pj-stat-lbl">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="pj-btns">
                                    <button
                                        className="pj-btn-visit"
                                        style={{ background: project.accent }}
                                        onClick={() => window.open(project.url, '_blank')}
                                    >
                                        Visit Site ↗
                                    </button>
                                    <a className="pj-btn-gh" href={project.github} target="_blank" rel="noreferrer">
                                        <GithubIcon /> Source
                                    </a>
                                </div>

                                <div className="pj-footer-row">
                                    <div className="pj-dots">
                                        {projects.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`pj-dot ${i === current ? 'active' : ''}`}
                                                style={{ background: i === current ? project.accent : 'var(--pj-card-border)' }}
                                                onClick={() => goTo(i, i > current ? 'slide-left' : 'slide-right')}
                                            />
                                        ))}
                                    </div>
                                    <div className="pj-scroll-hint">
                                        <div className="pj-desktop-controls">
                                            <button
                                                className="pj-mode-toggle"
                                                onClick={() => setScrollType(prev => prev === 'horizontal' ? 'vertical' : 'horizontal')}
                                                title="Toggle scroll interaction mode"
                                            >
                                                Mode: {scrollType}
                                            </button>
                                        </div>
                                        <div className="pj-desktop-arrows">
                                            <button
                                                className="pj-arrow-btn-d"
                                                disabled={current === 0}
                                                onClick={() => goTo(current - 1, 'slide-right')}
                                                aria-label="Previous Project"
                                            >
                                                ←
                                            </button>
                                            <button
                                                className="pj-arrow-btn-d"
                                                disabled={current === projects.length - 1}
                                                onClick={() => goTo(current + 1, 'slide-left')}
                                                aria-label="Next Project"
                                            >
                                                →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="pj-mobile-slider"
                ref={mobileSliderRef}
                onScroll={handleMobileScroll}
            >
                {projects.map((p, idx) => (
                    <div className="pj-mobile-slide-item" key={idx}>
                        <div
                            className="pj-mobile-card"
                            style={{ '--pj-thumb-url': `url(${p.img})` }}
                        >
                            <div
                                className="pj-details-glow"
                                style={{
                                    background: `radial-gradient(ellipse 80% 60% at 100% 0%, rgba(${p.accentRgb},0.12) 0%, transparent 70%)`,
                                }}
                            />

                            <div>
                                <div className="pj-ghost">{String(idx + 1).padStart(2, '0')}</div>

                                <div className="pj-pill">
                                    <div className="pj-pill-dot" style={{ background: p.accent }} />
                                    <span className="pj-pill-text">{p.tag} · {p.year}</span>
                                </div>

                                <h2 className="pj-title">{p.title}</h2>
                                <div className="pj-rule" style={{ background: p.accent }} />

                                <p className="pj-desc">{p.desc}</p>

                                <div className="pj-stats">
                                    {p.stats.map((s, i) => (
                                        <div className="pj-stat" key={i}>
                                            <span className="pj-stat-val" style={{ color: p.accent }}>{s.value}</span>
                                            <span className="pj-stat-lbl">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="pj-btns">
                                    <button
                                        className="pj-btn-visit"
                                        style={{ background: p.accent }}
                                        onClick={() => window.open(p.url, '_blank')}
                                    >
                                        Visit Site ↗
                                    </button>
                                    <a className="pj-btn-gh" href={p.github} target="_blank" rel="noreferrer">
                                        <GithubIcon /> Source
                                    </a>
                                </div>

                                <div className="pj-footer-row">
                                    <div className="pj-dots">
                                        {projects.map((_, dotIdx) => (
                                            <div
                                                key={dotIdx}
                                                className={`pj-dot ${dotIdx === current ? 'active' : ''}`}
                                                style={{ background: dotIdx === current ? p.accent : 'var(--pj-card-border)' }}
                                                onClick={() => scrollToMobileProject(dotIdx)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pj-floating-arrows-mobile">
                <button
                    className="pj-arrow-btn-m"
                    disabled={current === 0}
                    onClick={() => scrollToMobileProject(current - 1)}
                    aria-label="Previous Project"
                >
                    ←
                </button>
                <button
                    className="pj-arrow-btn-m"
                    disabled={current === projects.length - 1}
                    onClick={() => scrollToMobileProject(current + 1)}
                    aria-label="Next Project"
                >
                    →
                </button>
            </div>

            {lightbox && (
                <div className="pj-lightbox-backdrop" onClick={() => setLightbox(false)}>
                    <div className="pj-lightbox-inner" onClick={e => e.stopPropagation()}>
                        <Image
                            src={projects[current].img}
                            alt={projects[current].title}
                            width={1200}
                            height={800}
                            className="pj-img"
                            style={{ maxWidth: '88vw', maxHeight: '85vh', width: 'auto', height: 'auto', borderRadius: '12px' }}
                        />
                        <button className="pj-lightbox-close" onClick={() => setLightbox(false)}>✕</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default memo(Projects);