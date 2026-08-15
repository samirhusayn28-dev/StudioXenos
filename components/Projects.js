'use client';

import React, { useState, useMemo, memo } from 'react';
import Image from 'next/image';

const phtsImg = '/assets/PHTS.png';
const mp1Img = '/assets/MP1.png';
const mp2Img = '/assets/MP2.png';
const mp3Img = '/assets/MP3.png';

const projects = [
    {
        img: phtsImg,
        title: 'PHTS',
        tag: 'Web App',
        year: '2025',
        accent: '#c47a30',
        desc: 'A full-featured web application built with modern technologies. Clean UI, smooth interactions, and a seamless user experience from end to end.',
        url: 'https://phts.vercel.app/',
        github: 'https://github.com/samirhusayn28-dev/PHTS.git',
        stack: 'React',
    },
    {
        img: mp1Img,
        title: 'Personal Portfolio',
        tag: 'Portfolio',
        year: '2025',
        accent: '#315cfd',
        desc: 'A sleek personal portfolio showcasing projects, skills, and experience with a clean, modern design and smooth animations.',
        url: 'https://personal-portfolio-lemon-ten.vercel.app/',
        github: 'https://github.com/Mukhtar-816/Personal_Portfolio.git',
        stack: 'React',
    },
    {
        img: mp2Img,
        title: 'Hospital Mgmt',
        tag: 'Web App',
        year: '2025',
        accent: '#22c97a',
        desc: 'A full-featured hospital management system with patient records, appointment scheduling, and an admin dashboard built with Next.js.',
        url: 'https://hospital-managment-system-rosy.vercel.app/',
        github: 'https://github.com/Mukhtar-816/Hospital-Management-System-Nextjs.git',
        stack: 'Next.js',
    },
    {
        img: mp3Img,
        title: 'Bid&Go',
        tag: 'Web App',
        year: '2025',
        accent: '#e63946',
        desc: 'A real-time online bidding and auction platform where users can list items, place live bids, and track auctions as they unfold.',
        url: 'https://mukhtar-dev.vercel.app',
        github: '#',
        stack: 'React',
    },
];

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

const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Poppins:wght@500;600&display=swap');

.pj-section {
  position: relative;
  background: transparent;
  width: 100%;
  padding: 80px 24px;
  box-sizing: border-box;
  font-family: 'Outfit', sans-serif;
}

.pj-inner {
  width: min(1280px, 100%);
  margin: 0 auto;
}

.pj-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 40px;
}

.pj-heading-block {
  max-width: 560px;
}

.pj-pill-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 999px;
  padding: 6px 16px 6px 12px;
  margin-bottom: 16px;
  font-size: 11.5px;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
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

.pj-controls {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.pj-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pj-filter-btn {
  font-family: 'Outfit', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 9px 18px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.pj-filter-btn:hover {
  border-color: rgba(37, 99, 235, 0.35);
  color: #2563eb;
}

.pj-filter-btn.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
}

.pj-sort-wrap {
  position: relative;
}

.pj-sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  color: #0f172a;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.pj-sort-btn:hover {
  border-color: rgba(37, 99, 235, 0.35);
}

.pj-sort-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  padding: 6px;
  min-width: 150px;
  z-index: 20;
}

.pj-sort-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
  font-weight: 500;
  color: #475569;
  padding: 9px 12px;
  border-radius: 9px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.pj-sort-option:hover { background: rgba(37, 99, 235, 0.06); }

.pj-sort-option.active { color: #2563eb; font-weight: 700; }

.pj-count {
  font-size: 12.5px;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 24px;
}

.pj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.pj-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  animation: pjFadeIn 0.4s ease both;
}

@keyframes pjFadeIn {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

.pj-card:hover {
  transform: translateY(-6px);
  border-color: rgba(37, 99, 235, 0.25);
  box-shadow: 0 24px 48px rgba(37, 99, 235, 0.1);
}

.pj-card-img-wrap {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.pj-card-img {
  object-fit: cover;
  object-position: top center;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.pj-card-img-wrap:hover .pj-card-img { transform: scale(1.05); }

.pj-card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 40%, rgba(0,0,0,0.35) 100%);
  pointer-events: none;
}

.pj-card-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 4px;
}

.pj-card-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.55);
  padding: 5px 12px;
  border-radius: 999px;
  backdrop-filter: blur(6px);
}

.pj-card-body {
  padding: 24px 24px 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.pj-card-title {
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}

.pj-card-meta {
  font-size: 11.5px;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: 0.04em;
  margin-bottom: 14px;
}

.pj-card-desc {
  font-size: 13.5px;
  font-weight: 300;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.pj-card-btns {
  display: flex;
  gap: 10px;
  align-items: center;
}

.pj-btn-visit {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.pj-btn-visit:hover { transform: translateY(-1px); filter: brightness(1.08); }

.pj-btn-gh {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: transparent;
  color: #0f172a;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s ease, transform 0.15s ease;
}

.pj-btn-gh:hover { background: rgba(37, 99, 235, 0.06); transform: translateY(-1px); }

.pj-empty {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
  font-size: 14px;
}

@media (max-width: 900px) {
  .pj-grid { grid-template-columns: 1fr; }
  .pj-header { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 500px) {
  .pj-section { padding: 56px 16px; }
  .pj-controls { width: 100%; justify-content: space-between; }
}
`;

function Projects() {
    const [filter, setFilter] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);

    const visibleProjects = useMemo(() => {
        let list = filter === 'All' ? [...projects] : projects.filter((p) => p.tag === filter);

        if (sortBy === 'az') {
            list.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            list.sort((a, b) => Number(b.year) - Number(a.year));
        }

        return list;
    }, [filter, sortBy]);

    const activeSortLabel = sortOptions.find((s) => s.id === sortBy)?.label;

    return (
        <section id="projects" className="pj-section">
            <style>{css}</style>

            <div className="pj-inner">
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
                                    onClick={() => setFilter(cat)}
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
                                            onClick={() => {
                                                setSortBy(opt.id);
                                                setSortOpen(false);
                                            }}
                                        >
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pj-count">
                    {visibleProjects.length} project{visibleProjects.length !== 1 ? 's' : ''}
                </div>

                {visibleProjects.length === 0 ? (
                    <div className="pj-empty">No projects match this filter.</div>
                ) : (
                    <div className="pj-grid">
                        {visibleProjects.map((p, i) => (
                            <div className="pj-card" key={p.title} style={{ animationDelay: `${i * 0.06}s` }}>
                                <div className="pj-card-img-wrap">
                                    <Image
                                        src={p.img}
                                        alt={p.title}
                                        fill
                                        sizes="(max-width: 900px) 100vw, 50vw"
                                        className="pj-card-img"
                                    />
                                    <div className="pj-card-img-overlay" />
                                    <span className="pj-card-tag">{p.tag}</span>
                                    <div className="pj-card-bar" style={{ background: p.accent }} />
                                </div>

                                <div className="pj-card-body">
                                    <h3 className="pj-card-title">{p.title}</h3>
                                    <div className="pj-card-meta">{p.stack} · {p.year}</div>
                                    <p className="pj-card-desc">{p.desc}</p>

                                    <div className="pj-card-btns">
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default memo(Projects);