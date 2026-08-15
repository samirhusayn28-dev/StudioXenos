'use client';

import React, { useMemo, useRef, useEffect, useState, useCallback, memo } from 'react';

const testimonials = [
    {
        quote: 'Working with Studio Xenos completely transformed our digital footprint. Their attention to detail is unmatched.',
        name: 'SARAH JENKINS',
        role: 'CTO, TechFlow Inc.',
        rating: 5,
        avatar: 'SJ'
    },
    {
        quote: 'The design deliverables blew our expectations out of the water. User engagement went up by 140% fast.',
        name: 'ALEXANDER WRIGHT',
        role: 'Product Director, Veloce',
        rating: 5,
        avatar: 'AW'
    },
    {
        quote: 'Their strategic marketing roadmap and execution helped us capture our target audience efficiently. Absolute pros!',
        name: 'ELENA ROSTOVA',
        role: 'CMO, Nexus Global',
        rating: 5,
        avatar: 'ER'
    },
    {
        quote: 'Scalable architecture, flawless code quality, and delivery ahead of schedule. They operate like a dream team.',
        name: 'MARCUS VANCE',
        role: 'Founder, Apex Studio',
        rating: 5,
        avatar: 'MV'
    },
    {
        quote: 'The level of creativity and technical execution they brought to our web platform was truly exceptional.',
        name: 'SOPHIA CHEN',
        role: 'Head of Product, Lumina',
        rating: 5,
        avatar: 'SC'
    },
    {
        quote: 'An incredible partner from day one. They understood our vision immediately and delivered beyond par.',
        name: 'LIAM O’CONNOR',
        role: 'CEO, FinPulse',
        rating: 5,
        avatar: 'LO'
    },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  .t-section {
    background: transparent;
    padding: 40px 0;
    font-family: 'Outfit', system-ui, -apple-system, sans-serif;
    width: 100%;
    box-sizing: border-box;
    contain: paint style;
  }

  .t-header {
    text-align: center;
    margin-bottom: 56px;
    padding: 0 24px;
  }

  .t-badge {
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

  .t-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2563eb;
    box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
    flex-shrink: 0;
  }

  .t-title {
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin: 0;
    font-size: clamp(28px, 5.5vw, 50px);
    color: #0f172a;
  }

  .t-title-blue {
    color: #2563eb;
  }

  .t-divider {
    width: 48px;
    height: 3px;
    background: #2563eb;
    border-radius: 2px;
    margin: 18px auto 0;
  }

  .t-marquee-wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .t-marquee {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .t-marquee::before,
  .t-marquee::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(40px, 10%, 160px);
    z-index: 2;
    pointer-events: none;
  }

  .t-marquee::before {
    left: 0;
    background: linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%);
  }

  .t-marquee::after {
    right: 0;
    background: linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%);
  }

  .t-track {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    will-change: transform;
  }

  .t-card {
    position: relative;
    flex: 0 0 auto;
    width: 400px;
    padding: 36px 32px;
    margin-right: 28px;
    border-radius: 24px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    min-height: 300px;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .t-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .t-stars {
    display: flex;
    gap: 4px;
    color: #f59e0b;
    font-size: 17px;
  }

  .t-quote-symbol {
    font-size: 40px;
    font-weight: 900;
    line-height: 1;
    color: #94a3b8;
    opacity: 0.25;
  }

  .t-quote {
    font-size: 17px;
    font-weight: 400;
    line-height: 1.65;
    color: #475569;
    margin-bottom: 26px;
    flex-grow: 1;
  }

  .t-footer {
    display: flex;
    align-items: center;
    gap: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 18px;
  }

  .t-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #eff6ff;
    color: #2563eb;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(37, 99, 235, 0.15);
  }

  .t-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .t-name {
    font-size: 14.5px;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
  }

  .t-role {
    font-size: 12.5px;
    font-weight: 400;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── TABLET ── */
  @media (max-width: 900px) {
    .t-section { padding: 36px 0; }
    .t-header { margin-bottom: 44px; }
    .t-card {
      width: 340px;
      padding: 30px 26px;
      margin-right: 22px;
      min-height: 270px;
    }
    .t-quote { font-size: 16px; margin-bottom: 22px; }
  }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .t-section { padding: 32px 0; }
    .t-header {
      margin-bottom: 30px;
      padding: 0 16px;
    }
    .t-badge {
      font-size: 10.5px;
      padding: 5px 14px 5px 10px;
      margin-bottom: 12px;
    }
    .t-divider { margin-top: 14px; }
    .t-marquee-wrap { gap: 16px; }
    .t-marquee::before,
    .t-marquee::after {
      width: clamp(20px, 8%, 60px);
    }
    .t-card {
      width: 270px;
      padding: 22px 20px;
      margin-right: 14px;
      min-height: 235px;
      border-radius: 18px;
    }
    .t-card-top { margin-bottom: 12px; }
    .t-stars { font-size: 14px; gap: 3px; }
    .t-quote-symbol { font-size: 30px; }
    .t-quote {
      font-size: 13.5px;
      line-height: 1.55;
      margin-bottom: 18px;
    }
    .t-footer {
      gap: 10px;
      padding-top: 14px;
    }
    .t-avatar {
      width: 38px;
      height: 38px;
      font-size: 13px;
    }
    .t-name { font-size: 12.5px; }
    .t-role { font-size: 11px; }
  }

  /* ── SMALL MOBILE ── */
  @media (max-width: 380px) {
    .t-card {
      width: 235px;
      padding: 18px 16px;
      margin-right: 12px;
      min-height: 220px;
    }
    .t-quote { font-size: 12.5px; }
  }
`;

const TestimonialCard = memo(function TestimonialCard({ item }) {
    const starsArray = useMemo(() => Array.from({ length: item.rating }), [item.rating]);

    return (
        <div className="t-card">
            <div>
                <div className="t-card-top">
                    <div className="t-stars">
                        {starsArray.map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                    </div>
                    <span className="t-quote-symbol">“</span>
                </div>
                <p className="t-quote">{"\u201C"}{item.quote}{"\u201D"}</p>
            </div>
            <div className="t-footer">
                <div className="t-avatar">{item.avatar}</div>
                <div className="t-info">
                    <span className="t-name">{item.name}</span>
                    <span className="t-role">{item.role}</span>
                </div>
            </div>
        </div>
    );
});

const GlobalStyle = memo(function GlobalStyle() {
    return <style>{css}</style>;
});

function useMarquee(speed = 45, direction = 1, sharedHover) {
    const trackRef = useRef(null);
    const seqRef = useRef(null);
    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(2);
    const [localHovered, setLocalHovered] = useState(false);
    const isHovered = sharedHover !== undefined ? sharedHover : localHovered;
    const offsetRef = useRef(0);
    const rafRef = useRef(null);
    const lastTsRef = useRef(null);

    const measure = useCallback(() => {
        const containerWidth = trackRef.current?.parentElement?.clientWidth ?? 0;
        const width = seqRef.current?.getBoundingClientRect?.().width ?? 0;
        if (width > 0) {
            setSeqWidth(Math.ceil(width));
            const copiesNeeded = Math.ceil(containerWidth / width) + 2;
            setCopyCount(Math.max(2, copiesNeeded));
        }
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track || seqWidth === 0) return;

        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            track.style.transform = 'translate3d(0,0,0)';
            return;
        }

        const animate = (timestamp) => {
            if (lastTsRef.current === null) lastTsRef.current = timestamp;
            const dt = Math.max(0, timestamp - lastTsRef.current) / 1000;
            lastTsRef.current = timestamp;

            if (!isHovered) {
                let next = offsetRef.current + speed * direction * dt;
                next = ((next % seqWidth) + seqWidth) % seqWidth;
                offsetRef.current = next;
                track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            lastTsRef.current = null;
        };
    }, [seqWidth, speed, isHovered]);

    return { trackRef, seqRef, copyCount, setIsHovered: setLocalHovered };
}

function MarqueeRow({ items, speed, direction, hovered, onEnter, onLeave }) {
    const { trackRef, seqRef, copyCount } = useMarquee(speed, direction, hovered);

    const copies = useMemo(
        () =>
            Array.from({ length: copyCount }, (_, copyIndex) => (
                <div key={copyIndex} ref={copyIndex === 0 ? seqRef : undefined} style={{ display: 'flex' }}>
                    {items.map((item, i) => (
                        <TestimonialCard key={`${copyIndex}-${i}`} item={item} />
                    ))}
                </div>
            )),
        [copyCount, seqRef, items]
    );

    return (
        <div className="t-marquee" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div className="t-track" ref={trackRef}>
                {copies}
            </div>
        </div>
    );
}

const rowOne = testimonials.slice(0, 3);
const rowTwo = testimonials.slice(3, 6);

export default function Testimonials() {
    const [hovered, setHovered] = useState(false);
    const [speed, setSpeed] = useState(50);

    const handleEnter = useCallback(() => setHovered(true), []);
    const handleLeave = useCallback(() => setHovered(false), []);

    useEffect(() => {
        const updateSpeed = () => setSpeed(window.innerWidth <= 640 ? 32 : 50);
        updateSpeed();
        window.addEventListener('resize', updateSpeed);
        return () => window.removeEventListener('resize', updateSpeed);
    }, []);

    return (
        <section id="testimonials" className="t-section">
            <GlobalStyle />

            <div className="t-header">
                <h2 className="t-title">
                    What <span className="t-title-blue">People Say About Us</span>
                </h2>
                <div className="t-divider" />
            </div>

            <div className="t-marquee-wrap">
                <MarqueeRow
                    items={rowOne}
                    speed={speed}
                    direction={1}
                    hovered={hovered}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                />
                <MarqueeRow
                    items={rowTwo}
                    speed={speed}
                    direction={-1}
                    hovered={hovered}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                />
            </div>
        </section>
    );
}