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

  .srv-card {
    background: #fffdf9;
    border-radius: 24px;
    padding: 40px 36px;
    box-shadow: 0 4px 24px rgba(120, 70, 20, 0.07),
                0 1px 4px rgba(120, 70, 20, 0.05);
    border: 1px solid rgba(200, 170, 130, 0.18);
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.3s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
  }

  .srv-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(120, 70, 20, 0.13),
                0 4px 12px rgba(120, 70, 20, 0.07);
  }

  .srv-book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    background: rgba(26, 14, 4, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(26, 14, 4, 0.18);
    border-radius: 999px;
    color: rgba(26, 14, 4, 0.85);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    padding: 10px 26px;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.25s ease,
                box-shadow 0.25s ease,
                background 0.3s ease,
                border-color 0.3s ease,
                color 0.3s ease;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  .srv-book-btn:hover {
    transform: scale(1.05);
    background: rgba(49, 92, 253, 0.55);
    border-color: rgba(99, 132, 255, 0.55);
    color: #fff;
    box-shadow: 0 6px 24px rgba(49, 92, 253, 0.40),
                inset 0 1px 0 rgba(255, 255, 255, 0.18);
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
  .srv-book-btn:hover .txt-hover   { transform: translateY(0); opacity: 1; }
`;

export default function Services() {
  return (
    <section
      id="services"
      style={{
background: 'linear-gradient(180deg, #ffffff 0%, #f5ede2 40%, #ffffff 100%)',        padding: '180px 6% 200px',
        fontFamily: "'Outfit', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <style>{servicesStyles}</style>

      <div style={{ marginBottom: '72px', paddingTop: '48px' }}>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(52px, 7vw, 96px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#1a0e04',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
          }}
        >
          What We
        </div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(52px, 7vw, 96px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(110deg, #6b3610 0%, #c47a30 45%, #7a3e12 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Deliver
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1100px',
          marginBottom: '72px',
        }}
      >
        {services.map((s, i) => (
          <div key={i} className="srv-card" style={{ textAlign: 'left' }}>
            <img
              src={s.img}
              alt={s.title}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                marginBottom: '28px',
              }}
            />
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '28px',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#1a0e04',
                letterSpacing: '-0.01em',
                marginBottom: '14px',
              }}
            >
              {s.title}
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'rgba(26,14,4,0.52)',
                fontWeight: 300,
                margin: 0,
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <button className="srv-book-btn">
        <span className="txt-default">Book a Call</span>
        <span className="txt-hover">GO</span>
      </button>

    </section>
  );
}