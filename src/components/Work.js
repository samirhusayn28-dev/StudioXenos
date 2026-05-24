import React from 'react';
import robot1 from './assets/Robot.png';
import robot2 from './assets/Robot2.png';
import robot3 from './assets/Robot1.png';
import shadow from './assets/Shadow.png';

const steps = [
  {
    img: robot1,
    title: 'Request a Quote',
    desc: 'Schedule a quick call to discuss your needs and goals',
  },
  {
    img: robot2,
    title: 'Get a Custom Plan',
    desc: 'We analyse your situation and create a tailored strategy or solution',
  },
  {
    img: robot3,
    title: 'Launch & Grow',
    desc: 'We execute the plan and support you as you achieve results',
  },
];

const workStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500&family=Poppins:wght@600;700;800&display=swap');

  .work-section {
    background: var(--bg-primary);
    transition: background 0.4s ease;
  }

  .work-card {
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--card-border);
    border-radius: 24px;
    padding: 40px 28px 32px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease,
                background 0.4s ease, border-color 0.4s ease;
    position: relative;
  }

  .work-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px var(--card-shadow-h);
  }

  .work-book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    background: var(--btn-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--btn-border);
    border-radius: 999px;
    color: var(--btn-color);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    padding: 12px 36px;
    cursor: pointer;
    transition: transform 0.25s ease, background 0.3s ease,
                box-shadow 0.3s ease, color 0.3s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  }

  .work-book-btn:hover {
    transform: scale(1.05);
    background: rgba(49,92,253,0.5);
    border-color: rgba(99,132,255,0.5);
    color: #fff;
    box-shadow: 0 6px 24px rgba(49,92,253,0.35);
  }

  .step-number {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 72px;
    font-weight: 900;
    line-height: 1;
    color: var(--card-border);
    position: absolute;
    top: 12px;
    right: 20px;
    transition: color 0.4s ease;
  }
`;

export default function Work() {
  return (
    <section
      id="how-we-work"
      className="work-section"
      style={{
        padding: '100px 5% 100px',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <style>{workStyles}</style>

      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(48px, 6vw, 88px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
          transition: 'color 0.4s ease',
        }}>
          How We
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(48px, 6vw, 88px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
          background: 'linear-gradient(110deg, #c47a30 0%, #e8a84a 50%, #c47a30 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          Work
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        maxWidth: '960px',
        margin: '0 auto 64px',
      }}>
        {steps.map((s, i) => (
          <div key={i} className="work-card">
            <span className="step-number">0{i + 1}</span>
            <div style={{ position: 'relative', width: '140px', margin: '0 auto 28px' }}>
              <img
                src={s.img}
                alt={s.title}
                style={{ width: '140px', height: '140px', objectFit: 'contain', position: 'relative', zIndex: 1 }}
              />
              <img
                src={shadow}
                alt=""
                style={{ position: 'absolute', bottom: '-36px', left: 0, width: '100%', zIndex: 0, opacity: 0.6 }}
              />
            </div>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '22px',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              marginBottom: '10px',
              letterSpacing: '0.02em',
              transition: 'color 0.4s ease',
            }}>
              {s.title}
            </h3>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              transition: 'color 0.4s ease',
            }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="work-book-btn">Book a Call</button>
      </div>
    </section>
  );
}