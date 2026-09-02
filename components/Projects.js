'use client';

import React, { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import projects from '../data/projects.json';

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
.pj-section {
  position: relative;
  background: transparent;
  width: 100%;
  padding: 80px 24px;
  box-sizing: border-box;
  font-family: var(--font-outfit), sans-serif;
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
  margin-bottom: 36px;
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

.pj-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pj-filters {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

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

.pj-filter-btn:hover {
  border-color: rgba(37, 99, 235, 0.35);
  color: #2563eb;
}

.pj-filter-btn.active {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
}

.pj-sort-wrap {
  position: relative;
}

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

.pj-sort-btn:hover {
  border-color: rgba(37, 99, 235, 0.35);
}

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

.pj-count {
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 22px;
}

.pj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.pj-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.pj-card:hover {
  transform: translate3d(0, -4px, 0);
  border-color: rgba(37, 99, 235, 0.25);
  box-shadow: 0 16px 36px rgba(37, 99, 235, 0.08);
}

.pj-card-img-wrap {
  position: relative;
  width: 100%;
  height: 230px;
  overflow: hidden;
}

.pj-card-img {
  object-fit: cover;
  object-position: top center;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.pj-card-img-wrap:hover .pj-card-img { transform: scale(1.04); }

.pj-card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.04) 0%, transparent 40%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
}

.pj-card-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
}

.pj-card-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.65);
  padding: 4px 10px;
  border-radius: 6px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.pj-card-body {
  padding: 22px 22px 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.pj-card-title {
  font-size: 19px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}

.pj-card-meta {
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.pj-card-desc {
  font-size: 13px;
  font-weight: 300;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 18px;
  flex-grow: 1;
}

.pj-card-btns {
  display: flex;
  gap: 10px;
  align-items: center;
}

.pj-btn-visit {
  font-family: var(--font-poppins), sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #ffffff;
  transition: transform 0.15s ease, filter 0.15s ease;
  will-change: transform;
}

.pj-btn-visit:hover { transform: translate3d(0, -1px, 0); filter: brightness(1.08); }

.pj-btn-gh {
  font-family: var(--font-poppins), sans-serif;
  font-size: 11.5px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
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

.pj-btn-gh:hover { background-color: rgba(37, 99, 235, 0.06); transform: translate3d(0, -1px, 0); }

/* ── See More / Show Less CTA Button ── */
.pj-see-more-wrap {
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pj-see-more-btn {
  font-family: var(--font-poppins), sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 12px 32px;
  border-radius: 8px;
  border: 1px solid rgba(37, 99, 235, 0.25);
  background: #ffffff;
  color: #2563eb;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
  transition: all 0.2s ease;
  will-change: transform;
}

.pj-see-more-btn:hover {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
}

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
  .pj-see-more-btn { width: 100%; justify-content: center; }
}
`;

function Projects() {
    const [filter, setFilter] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = useMemo(() => {
        let list = filter === 'All' ? [...projects] : projects.filter((p) => p.tag === filter);

        if (sortBy === 'az') {
            list.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            list.sort((a, b) => Number(b.year) - Number(a.year));
        }

        return list;
    }, [filter, sortBy]);

    const displayedProjects = useMemo(() => {
        if (showAll) return visibleProjects;
        return visibleProjects.slice(0, 4);
    }, [visibleProjects, showAll]);

    const activeSortLabel = sortOptions.find((s) => s.id === sortBy)?.label;
    const hasMore = visibleProjects.length > 4;

    const handleFilterChange = (cat) => {
        setFilter(cat);
        setShowAll(false);
    };

    const handleSortChange = (optId) => {
        setSortBy(optId);
        setSortOpen(false);
        setShowAll(false);
    };

    return (
        <section id="projects" className="pj-section">
            <style>{css}</style>

            <div className="pj-inner">
                <div className="pj-header">
                    <div className="pj-heading-block sx-anim sx-fade-in">
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
                    </div>
                </div>

                <div className="pj-count">
                    Showing {displayedProjects.length} of {visibleProjects.length} project{visibleProjects.length !== 1 ? 's' : ''}
                </div>

                {displayedProjects.length === 0 ? (
                    <div className="pj-empty">No projects match this filter.</div>
                ) : (
                    <>
                        <div className="pj-grid sx-anim sx-fade-in">
                            {displayedProjects.map((p) => (
                                <div key={p.title}>
                                    <div className="pj-card">
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
                                </div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="pj-see-more-wrap">
                                <button
                                    className="pj-see-more-btn"
                                    onClick={() => setShowAll((prev) => !prev)}
                                >
                                    {showAll ? (
                                        <>Show Less ↑</>
                                    ) : (
                                        <>See More ({visibleProjects.length - 4} more projects) ↓</>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default memo(Projects);