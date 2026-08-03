'use client';

import React, { useMemo, memo } from 'react';

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
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  .t-section {
    background: transparent;
    padding: 80px 24px;
    font-family: 'Outfit', system-ui, -apple-system, sans-serif;
    width: 100%;
    box-sizing: border-box;
  }

  .t-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .t-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 999px;
    padding: 5px 14px 5px 10px;
    margin-bottom: 16px;
    font-size: 11px;
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
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
    font-size: clamp(32px, 4.5vw, 52px);
    color: #0f172a;
  }

  .t-title-blue {
    color: #2563eb;
  }

  .t-divider {
    width: 40px;
    height: 2px;
    background: #2563eb;
    border-radius: 2px;
    margin: 16px auto 0;
  }

  /* 4-Column Grid matching the theme style */
  .t-wrap {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .t-card {
    position: relative;
    padding: 24px 20px;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    box-sizing: border-box;
    min-height: 240px;
  }

  .t-card:hover {
    transform: translateY(-5px);
    border-color: rgba(37, 99, 235, 0.3);
    box-shadow: 0 20px 40px rgba(37, 99, 235, 0.08);
  }

  .t-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .t-stars {
    display: flex;
    gap: 3px;
    color: #f59e0b;
    font-size: 13px;
  }

  .t-quote-symbol {
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
    color: #94a3b8;
    opacity: 0.25;
  }

  .t-quote {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.55;
    color: #475569;
    margin-bottom: 18px;
    flex-grow: 1;
  }

  .t-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 12px;
  }

  .t-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #eff6ff;
    color: #2563eb;
    font-size: 12px;
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
    font-size: 12px;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
  }

  .t-role {
    font-size: 10.5px;
    font-weight: 400;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .t-wrap {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .t-section {
      padding: 50px 16px;
    }
    .t-header {
      margin-bottom: 32px;
    }
    .t-wrap {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .t-card {
      min-height: auto;
      padding: 20px;
    }
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
                <p className="t-quote">"{item.quote}"</p>
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

export default function Testimonials() {
    const cards = useMemo(
        () => testimonials.map((item, i) => <TestimonialCard key={i} item={item} />),
        []
    );

    return (
        <section id="testimonials" className="t-section">
            <GlobalStyle />

            <div className="t-header">
                <div className="t-badge">
                    <span className="t-badge-dot" />
                    Client Feedback
                </div>
                <h2 className="t-title">
                    Trusted <span className="t-title-blue">Testimonials</span>
                </h2>
                <div className="t-divider" />
            </div>

            <div className="t-wrap">
                {cards}
            </div>
        </section>
    );
}