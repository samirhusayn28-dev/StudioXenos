import React from 'react';
import img1 from '../components/assets/Artimg1.jpg';
import img2 from '../components/assets/Artimg2.jpg';
import img3 from '../components/assets/Artimg3.jpg';
import img4 from '../components/assets/Artimg4.jpg';
import img5 from '../components/assets/Artimg5.jpg';
import img6 from '../components/assets/Artimg6.jpg';
import img7 from '../components/assets/Artimg7.jpg';
import img8 from '../components/assets/Artimg8.jpg';
import CircularGallery from './CircularGallery';

const artStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500&family=Poppins:wght@600;700;800&display=swap');

  .art-section {
var(--bg-primary);
 }

  .art-explore-btn {
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
    box-shadow: 0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12);
  }

  .art-explore-btn:hover {
    transform: scale(1.05);
    background: rgba(49,92,253,0.55);
    border-color: rgba(99,132,255,0.55);
    color: #fff;
    box-shadow: 0 6px 24px rgba(49,92,253,0.40), inset 0 1px 0 rgba(255,255,255,0.18);
  }

  .art-explore-btn .txt-default,
  .art-explore-btn .txt-hover {
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .art-explore-btn .txt-hover {
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

  .art-explore-btn:hover .txt-default { transform: translateY(-100%); opacity: 0; }
  .art-explore-btn:hover .txt-hover   { transform: translateY(0); opacity: 1; }
`;

const galleryItems = [
  { image: img1, text: 'Design',   description: 'Crafting visual identities that speak louder than words. Every pixel placed with purpose and precision.' },
  { image: img2, text: 'Branding', description: 'Building brands that leave a lasting impression. From strategy to execution, we shape your story.' },
  { image: img3, text: 'Web',      description: 'Designing and developing web experiences that are fast, beautiful, and built to convert.' },
  { image: img4, text: 'Mobile',   description: 'Intuitive mobile interfaces designed for real users. Smooth, accessible, and pixel-perfect.' },
  { image: img5, text: 'UI/UX',    description: 'User-first design that balances aesthetics with function. We make complexity feel effortless.' },
  { image: img6, text: 'Motion',   description: 'Bringing designs to life through animation and motion. Every transition tells part of your story.' },
  { image: img7, text: 'Identity', description: 'Creating cohesive visual systems that define who you are across every touchpoint.' },
  { image: img8, text: 'Creative', description: 'Bold ideas executed with craft. We push boundaries to make work that stands out in any crowd.' },
];

export default function ArtGallery() {
  return (
    <section
      className="art-section"
      style={{
        padding: '100px 0 0 0',
        fontFamily: "'Outfit', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style>{artStyles}</style>

      <div style={{ textAlign: 'center', marginBottom: '72px', padding: '0 5%' }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
        }}>
          Discover the World
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(52px, 7vw, 96px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
          background: 'linear-gradient(110deg, #fff8f0 0%, #f5d9b0 50%, #e8c088 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          of Art Around You
        </div>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '15px',
          lineHeight: 1.85,
          color: 'var(--text-sub)',
          fontWeight: 300,
          maxWidth: '420px',
          margin: '28px auto 36px',
        }}>
          We specialize in creating custom designed logos, business cards,
          websites, mobile applications, and social media content.
        </p>
        <button className="art-explore-btn">
          <span className="txt-default">Explore</span>
          <span className="txt-hover">GO</span>
        </button>
      </div>

      <div style={{ height: '600px', width: '100%', position: 'relative' }}>
        <CircularGallery
          items={galleryItems}
          bend={1}
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </section>
  );
}