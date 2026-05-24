import React from 'react';
import designImg from '../components/assets/Design.png';
import webDevImg from '../components/assets/WebDev.png';
import appDevImg from '../components/assets/AppDev.png';

const services = [
  {
    img: designImg,
    title: 'Design',
    desc: 'Focusing on clarity and user experience, we deliver interfaces accompanied by interactive models that map out your solution ahead of development.',
  },
  {
    img: webDevImg,
    title: 'Website',
    desc: 'Specializing in efficient, scalable websites, we prioritize purposeful design and user-focused functionality to strengthen your digital presence.',
  },
  {
    img: appDevImg,
    title: 'Mobile App',
    desc: 'Designed and built for mobility, we develop iOS and Android applications that deliver exceptional user experiences through thoughtful design and seamless performance.',
  },
];

const servicesStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500&family=Poppins:wght@600;700;800&display=swap');

  .srv-section {
    background: var(--bg-primary);
    position: relative;
    overflow: hidden;
    transition: background 0.4s ease;
  }

  .srv-section::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 400px;
    background: radial-gradient(ellipse, var(--srv-glow) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  :root, [data-theme="dark"] {
    --srv-glow:           rgba(196,122,48,0.05);
    --srv-card-bg:        rgba(255,255,255,0.04);
    --srv-card-border:    rgba(255,255,255,0.09);
    --srv-card-shadow:    rgba(0,0,0,0.30);
    --srv-card-shadow-h:  rgba(0,0,0,0.50);
    --srv-title-color:    #e8ddd0;
    --srv-card-title:     #e8ddd0;
    --srv-card-desc:      rgba(232,221,208,0.48);
  }
  [data-theme="light"] {
    --srv-glow:           rgba(196,122,48,0.08);
    --srv-card-bg:        rgba(255,253,248,0.90);
    --srv-card-border:    rgba(200,170,130,0.22);
    --srv-card-shadow:    rgba(120,70,20,0.07);
    --srv-card-shadow-h:  rgba(120,70,20,0.14);
    --srv-title-color:    #1a0e04;
    --srv-card-title:     #1a0e04;
    --srv-card-desc:      rgba(26,14,4,0.52);
  }

  .srv-card {
    background: var(--srv-card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 24px;
    padding: 40px 36px;
    box-shadow: 0 4px 24px var(--srv-card-shadow), 0 1px 4px var(--srv-card-shadow);
    border: 1px solid var(--srv-card-border);
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.3s cubic-bezier(0.16,1,0.3,1),
                background 0.4s ease,
                border-color 0.4s ease;
    cursor: default;
    position: relative;
    z-index: 1;
  }

  .srv-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px var(--srv-card-shadow-h), 0 4px 12px var(--srv-card-shadow);
  }

  .srv-book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    background: var(--btn-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--btn-border);
    border-radius: 999px;
    color: var(--btn-color);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    padding: 10px 26px;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.25s ease, box-shadow 0.25s ease,
                background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5);
  }

  .srv-book-btn:hover {
    transform: scale(1.05);
    background: rgba(49,92,253,0.55);
    border-color: rgba(99,132,255,0.55);
    color: #fff;
    box-shadow: 0 6px 24px rgba(49,92,253,0.40), inset 0 1px 0 rgba(255,255,255,0.18);
  }

  .srv-book-btn .txt-default,
  .srv-book-btn .txt-hover {
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .srv-book-btn .txt-hover {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    opacity: 0;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  .srv-book-btn:hover .txt-default { transform: translateY(-100%); opacity: 0; }
  .srv-book-btn:hover .txt-hover   { transform: translateY(0);     opacity: 1; }
`;

export default function Services() {
  return (
    <section
      id="services"
      className="srv-section"
      style={{
        padding: '180px 6% 200px',
        fontFamily: "'Outfit', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <style>{servicesStyles}</style>

      <div style={{ marginBottom: '72px', paddingTop: '48px', position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: 'var(--srv-title-color)',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
          transition: 'color 0.4s ease',
        }}>
          What We
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
          background: 'linear-gradient(110deg, #c47a30 0%, #e8a84a 50%, #c47a30 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          Deliver
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1100px',
        marginBottom: '72px',
        position: 'relative',
        zIndex: 1,
      }}>
        {services.map((s, i) => (
          <div key={i} className="srv-card" style={{ textAlign: 'left' }}>
            <img
              src={s.img}
              alt={s.title}
              style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '28px' }}
            />
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '28px',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'var(--srv-card-title)',
              letterSpacing: '-0.01em',
              marginBottom: '14px',
              transition: 'color 0.4s ease',
            }}>
              {s.title}
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--srv-card-desc)',
              fontWeight: 300,
              margin: 0,
              transition: 'color 0.4s ease',
            }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <button className="srv-book-btn" style={{ position: 'relative', zIndex: 1 }}>
        <span className="txt-default">Book a Call</span>
        <span className="txt-hover">GO</span>
      </button>
    </section>
  );
}