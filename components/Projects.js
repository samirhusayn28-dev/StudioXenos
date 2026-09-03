'use client';

import React, { useState, useMemo, memo, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import projects from '../data/projects.json';

const INITIAL_PROJECT_LIMIT = 5;
const categories = ['All', ...Array.from(new Set(projects.map((p) => p.tag)))];

const sortOptions = [
    { id: 'newest', label: 'Newest' },
    { id: 'az', label: 'A – Z' },
];

const GithubIcon = memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
));
GithubIcon.displayName = 'GithubIcon';

const FilterIcon = memo(() => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
));
FilterIcon.displayName = 'FilterIcon';

const SortIcon = memo(() => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M6 12h12M10 18h4" />
    </svg>
));
SortIcon.displayName = 'SortIcon';

const ChevronLeftIcon = memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
));
ChevronLeftIcon.displayName = 'ChevronLeftIcon';

const ChevronRightIcon = memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
    </svg>
));
ChevronRightIcon.displayName = 'ChevronRightIcon';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const css = `
html {
  scroll-behavior: smooth;
}

.pj-section {
  position: relative;
  background: transparent;
  width: 100%;
  font-family: var(--font-outfit), sans-serif;
  contain: layout style;
}

.pj-section.pj-flat {
  height: auto;
}

.pj-sticky-wrap {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

.pj-flat .pj-sticky-wrap {
  position: relative;
  height: auto;
  min-height: 100vh;
  padding: 60px 0 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pj-progress-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(15, 23, 42, 0.06);
  z-index: 5;
}

.pj-flat .pj-progress-track { display: none; }

.pj-progress-fill {
  height: 100%;
  width: 100%;
  background: #2563eb;
  transform-origin: left center;
  will-change: transform;
}

.pj-header-container {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 5vw;
  margin-bottom: 20px;
}

.pj-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.pj-heading-block { max-width: 560px; }

.pj-pill-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  padding: 5px 14px 5px 10px;
  margin-bottom: 14px;
  font-size: 11px;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.pj-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
  flex-shrink: 0;
}

.pj-heading {
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
  font-size: clamp(32px, 4.5vw, 46px);
  color: #0f172a;
}

.pj-heading-blue { color: #2563eb; }

.pj-controls { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.pj-filters { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

.pj-filter-btn {
  font-family: var(--font-outfit), sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.pj-filter-btn:hover { border-color: rgba(37, 99, 235, 0.35); color: #2563eb; }

.pj-filter-btn.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
}

.pj-sort-wrap { position: relative; }

.pj-sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-outfit), sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  color: #0f172a;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.pj-sort-btn:hover { border-color: rgba(37, 99, 235, 0.35); }

.pj-sort-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
  padding: 6px;
  min-width: 140px;
  z-index: 20;
}

.pj-sort-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  color: #475569;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.pj-sort-option:hover { background-color: rgba(37, 99, 235, 0.06); }
.pj-sort-option.active { color: #2563eb; font-weight: 700; }

.pj-skip-btn {
  background: #ffffff;
  border: 1px solid rgba(37, 99, 235, 0.3);
  border-radius: 8px;
  font-family: var(--font-outfit), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #2563eb;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.1);
}

.pj-skip-btn:hover { 
  background: #2563eb; 
  color: #ffffff;
  transform: translateY(-1px);
}

.pj-flat .pj-skip-btn { display: none; }

.pj-count-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
  flex-wrap: wrap;
}

.pj-count-action-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pj-count { font-size: 12px; font-weight: 500; color: #94a3b8; }

.pj-nav-arrows {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pj-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #ffffff;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.pj-nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
}

.pj-nav-btn:not(:disabled):hover {
  border-color: #2563eb;
  color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}

.pj-drag-cue {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: 0.02em;
}

.pj-track-viewport { 
  position: relative; 
  z-index: 2; 
  width: 100%; 
  overflow: visible; 
  margin-top: 24px; 
}

.pj-flat .pj-track-viewport {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 12px;
}

.pj-flat .pj-track-viewport::-webkit-scrollbar { display: none; }

.pj-track {
  position: relative;
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 5vw;
  width: max-content;
  will-change: transform;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.pj-flat .pj-track { will-change: auto; gap: 24px; }

.pj-track.is-ready {
  opacity: 1;
}

.pj-card-stage {
  will-change: transform, opacity;
  flex-shrink: 0;
  transform-origin: center center;
}

.pj-flat .pj-card-stage { scroll-snap-align: center; }

.pj-card {
  width: min(85vw, 680px);
  height: 500px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.pj-card-more {
  width: min(85vw, 680px);
  height: 500px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pj-more-circle-btn {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid #2563eb;
  color: #2563eb;
  font-family: var(--font-outfit), sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.02em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.08);
}

.pj-more-circle-btn:hover {
  background: #2563eb;
  color: #ffffff;
  transform: scale(1.06);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
}

.pj-card-stage.is-active .pj-card {
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 20px 50px rgba(37, 99, 235, 0.15);
}

.pj-card-img-wrap { 
  position: relative; 
  width: 100%; 
  height: 240px; 
  overflow: hidden; 
  flex-shrink: 0; 
}

.pj-card-img {
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease-out;
}

.pj-card-stage.is-active .pj-card-img { transform: scale(1.03); }

.pj-card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.02) 0%, transparent 50%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
}

.pj-card-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; }

.pj-card-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.75);
  padding: 6px 12px;
  border-radius: 8px;
}

.pj-card-index {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.5);
  padding: 6px 10px;
  border-radius: 8px;
  opacity: 0;
  transform: translate3d(0, -6px, 0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.pj-card-stage.is-active .pj-card-index { opacity: 1; transform: translate3d(0, 0, 0); }

.pj-card-body { padding: 28px 28px 24px; display: flex; flex-direction: column; flex-grow: 1; }

.pj-card-title {
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}

.pj-card-meta { font-size: 12px; font-weight: 600; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 14px; }

.pj-card-desc { font-size: 14.5px; font-weight: 400; color: #64748b; line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }

.pj-card-btns { display: flex; gap: 12px; align-items: center; margin-top: auto; }

.pj-btn-visit {
  font-family: var(--font-poppins), sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  transition: transform 0.15s ease, filter 0.15s ease;
  will-change: transform;
}

.pj-btn-visit:hover { transform: translate3d(0, -2px, 0); filter: brightness(1.1); }

.pj-btn-gh {
  font-family: var(--font-poppins), sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: transparent;
  color: #0f172a;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.15s ease, transform 0.15s ease;
  will-change: transform;
}

.pj-btn-gh:hover { background-color: rgba(37, 99, 235, 0.06); transform: translate3d(0, -2px, 0); }

.pj-index-rail {
  position: absolute;
  right: calc(5vw - 6px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.pj-rail-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: rgba(15, 23, 42, 0.15);
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.pj-rail-dot:hover { background: rgba(37, 99, 235, 0.5); }
.pj-rail-dot.active { background: #2563eb; transform: scale(1.5); }

@media (max-width: 1100px) { .pj-index-rail { display: none; } }
.pj-empty { text-align: center; padding: 60px 20px; color: #94a3b8; font-size: 14px; width: 100vw; }
@media (max-width: 900px) { .pj-header { flex-direction: column; align-items: flex-start; } }
@media (max-width: 640px) {
  .pj-card {
    width: 85vw;
    height: auto;
    min-height: 440px;
  }
  .pj-card-more {
    width: 85vw;
    height: 440px;
  }
  .pj-card-img-wrap {
    height: 180px;
  }
  .pj-card-body {
    padding: 20px 18px 18px;
  }
  .pj-card-title {
    font-size: 18px;
  }
  .pj-card-desc {
    font-size: 13.5px;
    margin-bottom: 16px;
  }
  .pj-header-container {
    margin-bottom: 12px;
  }
  .pj-track-viewport {
    margin-top: 16px;
  }
}
@media (max-width: 500px) { 
  .pj-controls { width: 100%; justify-content: space-between; } 
  .pj-count-row { flex-direction: row; align-items: center; justify-content: space-between; gap: 10px; } 
}
`;

const ProjectCard = memo(function ProjectCard({ project, index, isActive }) {
    return (
        <div className="pj-card">
            <div className="pj-card-img-wrap">
                <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 900px) 100vw, 680px"
                    className="pj-card-img"
                />
                <div className="pj-card-img-overlay" />
                <span className="pj-card-tag">{project.tag}</span>
                <span className="pj-card-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="pj-card-bar" style={{ background: project.accent }} />
            </div>

            <div className="pj-card-body">
                <h3 className="pj-card-title">{project.title}</h3>
                <div className="pj-card-meta">{project.stack} · {project.year}</div>
                <p className="pj-card-desc">{project.desc}</p>

                <div className="pj-card-btns">
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
            </div>
        </div>
    );
});

function Projects() {
    const [filter, setFilter] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlat, setIsFlat] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const stageRefs = useRef([]);
    const progressFillRef = useRef(null);
    const activeIndexRef = useRef(0);
    const sectionTopRef = useRef(0);
    const sectionHeightRef = useRef(0);
    const windowHeightRef = useRef(0);
    const currentProgressRef = useRef(0);
    const layoutRef = useRef({ firstLeft: 0, spacing: 0, cardWidth: 0 });
    const flatScrollRaf = useRef(null);

    const sortedProjects = useMemo(() => {
        let list = [...projects];
        if (sortBy === 'az') {
            list.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            list.sort((a, b) => Number(b.year) - Number(a.year));
        }
        return list;
    }, [sortBy]);

    const visibleProjects = useMemo(() => {
        if (showAll || sortedProjects.length <= INITIAL_PROJECT_LIMIT) {
            return sortedProjects;
        }
        return sortedProjects.slice(0, INITIAL_PROJECT_LIMIT);
    }, [sortedProjects, showAll]);

    const hasMore = sortedProjects.length > INITIAL_PROJECT_LIMIT && !showAll;
    const totalTrackItems = visibleProjects.length + (hasMore ? 1 : 0);

    const activeSortLabel = sortOptions.find((s) => s.id === sortBy)?.label;

    const sectionHeightVh = useMemo(() => {
        return Math.max(300, totalTrackItems * 120);
    }, [totalTrackItems]);

    const measure = useCallback(() => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            sectionTopRef.current = rect.top + window.scrollY;
            sectionHeightRef.current = sectionRef.current.offsetHeight;
        }
        windowHeightRef.current = window.innerHeight;

        const track = trackRef.current;
        if (track && track.children.length > 0) {
            const first = track.children[0];
            const firstLeft = first.offsetLeft;
            const cardWidth = first.offsetWidth;
            const spacing = track.children.length > 1
                ? track.children[1].offsetLeft - firstLeft
                : cardWidth + 40;
            layoutRef.current = { firstLeft, spacing, cardWidth };
        }
    }, []);

    useIsomorphicLayoutEffect(() => {
        stageRefs.current = [];
        measure();
    }, [measure, visibleProjects, isFlat, showAll]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting) {
                    measure();
                    requestAnimationFrame(() => setIsReady(true));
                }
            },
            { threshold: 0.01 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [measure]);

    useEffect(() => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const layoutQuery = window.matchMedia('(max-width: 900px), (pointer: coarse)');
        const updateFlags = () => {
            setReduceMotion(motionQuery.matches);
            setIsFlat(layoutQuery.matches || motionQuery.matches);
        };
        updateFlags();
        motionQuery.addEventListener('change', updateFlags);
        layoutQuery.addEventListener('change', updateFlags);
        return () => {
            motionQuery.removeEventListener('change', updateFlags);
            layoutQuery.removeEventListener('change', updateFlags);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('resize', measure, { passive: true });
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    const applyStage = useCallback((progress, virtualIndex) => {
        if (progressFillRef.current) {
            progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (!isFlat && trackRef.current) {
            const { firstLeft, spacing, cardWidth } = layoutRef.current;
            const localCenter = firstLeft + virtualIndex * spacing + cardWidth / 2;
            const tx = localCenter - window.innerWidth / 2;
            trackRef.current.style.transform = `translate3d(${-tx}px, 0, 0)`;
        }

        stageRefs.current.forEach((el, i) => {
            if (!el) return;
            const delta = i - virtualIndex;
            const absDelta = Math.abs(delta);

            if (absDelta > 2.2) {
                el.style.visibility = 'hidden';
                return;
            }
            el.style.visibility = 'visible';

            const scale = Math.max(0.78, 1.08 - absDelta * 0.32);
            const opacity = Math.max(0.2, 1 - absDelta * 0.55);
            const lift = absDelta < 0.5 ? -8 : 0;
            const zIndex = String(Math.round(20 - absDelta * 3));

            el.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale.toFixed(3)})`;
            el.style.opacity = opacity.toFixed(3);
            if (el.style.zIndex !== zIndex) el.style.zIndex = zIndex;
        });

        if (totalTrackItems > 0) {
            const idx = Math.min(totalTrackItems - 1, Math.max(0, Math.round(virtualIndex)));
            if (idx !== activeIndexRef.current) {
                activeIndexRef.current = idx;
                setActiveIndex(idx);
            }
        }
    }, [isFlat, totalTrackItems]);

    useEffect(() => {
        if (isFlat || !isInView) return undefined;

        let animationFrameId;
        let lastTime = performance.now();
        let isFirstFrame = true;
        const decaySpeed = reduceMotion ? 60 : 6;

        const updateScroll = (now) => {
            const dt = Math.max(0, now - lastTime);
            lastTime = now;

            const absoluteSectionTop = sectionTopRef.current;
            const scrollDistance = sectionHeightRef.current - windowHeightRef.current;

            let targetProgress = scrollDistance > 0 ? (window.scrollY - absoluteSectionTop) / scrollDistance : 0;
            targetProgress = Math.max(0, Math.min(1, targetProgress));

            if (isFirstFrame) {
                currentProgressRef.current = targetProgress;
                isFirstFrame = false;
            } else {
                const factor = 1 - Math.exp(-decaySpeed * (dt / 1000));
                currentProgressRef.current += (targetProgress - currentProgressRef.current) * factor;
            }

            if (Math.abs(targetProgress - currentProgressRef.current) < 0.0001) {
                currentProgressRef.current = targetProgress;
            }

            const virtualIndex = totalTrackItems > 1 ? currentProgressRef.current * (totalTrackItems - 1) : 0;
            applyStage(currentProgressRef.current, virtualIndex);

            animationFrameId = requestAnimationFrame(updateScroll);
        };

        animationFrameId = requestAnimationFrame(updateScroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [totalTrackItems, isFlat, reduceMotion, isInView, applyStage]);

    useEffect(() => {
        if (!isFlat) return undefined;
        const viewport = trackRef.current?.parentElement;
        if (!viewport) return undefined;

        const onScroll = () => {
            if (flatScrollRaf.current) return;
            flatScrollRaf.current = requestAnimationFrame(() => {
                const { firstLeft, spacing, cardWidth } = layoutRef.current;
                const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
                const virtualIndex = spacing > 0 ? (centerX - firstLeft - cardWidth / 2) / spacing : 0;
                const maxScroll = viewport.scrollWidth - viewport.clientWidth;
                const progress = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;
                applyStage(progress, Math.max(0, Math.min(totalTrackItems - 1, virtualIndex)));
                flatScrollRaf.current = null;
            });
        };

        viewport.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => {
            viewport.removeEventListener('scroll', onScroll);
            if (flatScrollRaf.current) cancelAnimationFrame(flatScrollRaf.current);
        };
    }, [isFlat, totalTrackItems, applyStage]);

    const scrollToIndex = useCallback((index) => {
        if (totalTrackItems === 0) return;

        if (isFlat) {
            const viewport = trackRef.current?.parentElement;
            const stage = stageRefs.current[index];
            if (viewport && stage) {
                viewport.scrollTo({
                    left: stage.offsetLeft - (viewport.clientWidth - stage.clientWidth) / 2,
                    behavior: reduceMotion ? 'auto' : 'smooth',
                });
            }
            return;
        }

        const progress = totalTrackItems > 1 ? index / (totalTrackItems - 1) : 0;
        const scrollDistance = sectionHeightRef.current - windowHeightRef.current;
        const targetY = sectionTopRef.current + progress * scrollDistance;

        window.scrollTo({ top: targetY, behavior: reduceMotion ? 'auto' : 'smooth' });
    }, [isFlat, reduceMotion, totalTrackItems]);

    useEffect(() => {
        if (!isInView) return undefined;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIdx = Math.min(totalTrackItems - 1, activeIndexRef.current + 1);
                scrollToIndex(nextIdx);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIdx = Math.max(0, activeIndexRef.current - 1);
                scrollToIndex(prevIdx);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isInView, totalTrackItems, scrollToIndex]);

    const handleFilterChange = (cat) => {
        setFilter(cat);

        if (cat === 'All') {
            scrollToIndex(0);
            return;
        }

        const targetIndex = sortedProjects.findIndex((p) => p.tag === cat);
        if (targetIndex !== -1) {
            if (targetIndex >= INITIAL_PROJECT_LIMIT && !showAll) {
                setShowAll(true);
                setTimeout(() => {
                    measure();
                    scrollToIndex(targetIndex);
                }, 60);
            } else {
                scrollToIndex(targetIndex);
            }
        }
    };

    const handleSortChange = (optId) => {
        setSortBy(optId);
        setSortOpen(false);
    };

    const handleSkip = useCallback(() => {
        const bottomY = sectionTopRef.current + sectionHeightRef.current;
        window.scrollTo({ top: bottomY, behavior: 'smooth' });
    }, []);

    const handleLoadMore = () => {
        setShowAll(true);
        setTimeout(() => measure(), 50);
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className={`pj-section ${isFlat ? 'pj-flat' : ''}`}
            style={!isFlat ? { height: `${sectionHeightVh}vh` } : undefined}
        >
            <style>{css}</style>

            <div
                className="pj-sticky-wrap"
                tabIndex={isFlat ? -1 : 0}
                aria-label="Selected projects section"
            >
                <div className="pj-progress-track">
                    <div ref={progressFillRef} className="pj-progress-fill" />
                </div>

                <div className="pj-header-container">
                    <div className="pj-header">
                        <div className="pj-heading-block">
                            <span className="pj-pill-label">
                                <span className="pj-pill-dot" />
                                Selected Work
                            </span>
                            <h2 className="pj-heading">
                                Our <span className="pj-heading-blue">Projects</span>
                            </h2>
                        </div>

                        <div className="pj-controls">
                            <div className="pj-filters">
                                <FilterIcon />
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`pj-filter-btn ${filter === cat ? 'active' : ''}`}
                                        onClick={() => handleFilterChange(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="pj-sort-wrap">
                                <button className="pj-sort-btn" onClick={() => setSortOpen((v) => !v)}>
                                    <SortIcon />
                                    {activeSortLabel}
                                </button>

                                {sortOpen && (
                                    <div className="pj-sort-menu" onMouseLeave={() => setSortOpen(false)}>
                                        {sortOptions.map((opt) => (
                                            <div
                                                key={opt.id}
                                                className={`pj-sort-option ${sortBy === opt.id ? 'active' : ''}`}
                                                onClick={() => handleSortChange(opt.id)}
                                            >
                                                {opt.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className="pj-skip-btn" onClick={handleSkip}>
                                Skip Section <span>↓</span>
                            </button>
                        </div>
                    </div>

                    <div className="pj-count-row">
                        <div className="pj-count-action-wrap">
                            <div className="pj-count">
                                {String(Math.min(activeIndex + 1, visibleProjects.length)).padStart(2, '0')} / {String(sortedProjects.length).padStart(2, '0')}
                                {' — '}
                                {sortedProjects.length} project{sortedProjects.length !== 1 ? 's' : ''}
                            </div>

                            <div className="pj-nav-arrows">
                                <button
                                    className="pj-nav-btn"
                                    onClick={() => scrollToIndex(activeIndex - 1)}
                                    disabled={activeIndex === 0}
                                    aria-label="Previous project"
                                >
                                    <ChevronLeftIcon />
                                </button>
                                <button
                                    className="pj-nav-btn"
                                    onClick={() => scrollToIndex(activeIndex + 1)}
                                    disabled={activeIndex >= totalTrackItems - 1}
                                    aria-label="Next project"
                                >
                                    <ChevronRightIcon />
                                </button>
                            </div>
                        </div>

                        <div className="pj-drag-cue">
                            {isFlat ? 'Swipe or tap arrows to browse' : 'Scroll or tap arrows to browse'}
                        </div>
                    </div>
                </div>

                {!isFlat && totalTrackItems > 1 && (
                    <div className="pj-index-rail" role="tablist">
                        {Array.from({ length: totalTrackItems }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                role="tab"
                                aria-selected={i === activeIndex}
                                className={`pj-rail-dot ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => scrollToIndex(i)}
                            />
                        ))}
                    </div>
                )}

                <div className="pj-track-viewport">
                    {visibleProjects.length === 0 ? (
                        <div className="pj-empty">No projects match this filter.</div>
                    ) : (
                        <div ref={trackRef} className={`pj-track ${isReady ? 'is-ready' : ''}`}>
                            {visibleProjects.map((p, i) => (
                                <div
                                    key={p.title}
                                    ref={(el) => { stageRefs.current[i] = el; }}
                                    className={`pj-card-stage ${i === activeIndex ? 'is-active' : ''}`}
                                >
                                    <ProjectCard project={p} index={i} isActive={i === activeIndex} />
                                </div>
                            ))}

                            {hasMore && (
                                <div
                                    ref={(el) => { stageRefs.current[visibleProjects.length] = el; }}
                                    className={`pj-card-stage ${visibleProjects.length === activeIndex ? 'is-active' : ''}`}
                                >
                                    <div className="pj-card-more">
                                        <button className="pj-more-circle-btn" onClick={handleLoadMore}>
                                            <span>Load More</span>
                                            <span style={{ fontSize: '11px', opacity: 0.75, fontWeight: 500 }}>
                                                +{sortedProjects.length - INITIAL_PROJECT_LIMIT}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default memo(Projects);