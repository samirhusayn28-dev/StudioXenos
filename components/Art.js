import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import SimpleGallery from './CircularGallery';
import galleryItems from '../data/gallery.json';

const artStyles = `
/* ── artStyles (Articles / Showcase Section) ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500&family=Poppins:wght@600;700;800&display=swap');

.art-section {
  background: transparent;
  transition: background 0.4s ease;
  overflow: visible;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.art-explore-btn { 
  font-family: 'Poppins', sans-serif; 
  position: relative; 
  overflow: hidden; 
  background: var(--btn-bg, #2563eb); 
  border: 1px solid var(--btn-border, rgba(37, 99, 235, 0.3)); 
  border-radius: 8px; 
  color: var(--btn-color, #fff); 
  font-size: 0.82rem; 
  font-weight: 600; 
  letter-spacing: 0.07em; 
  padding: 10px 26px; 
  cursor: pointer; 
  white-space: nowrap; 
  will-change: transform; 
  transform: translateZ(0);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease; 
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); 
} 

.art-explore-btn:hover { 
  transform: translate3d(0, -2px, 0) scale(1.03); 
  background: #1d4ed8; 
  border-color: rgba(37, 99, 235, 0.6); 
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3); 
} 

.art-explore-btn .txt-default, 
.art-explore-btn .txt-hover { 
  display: block; 
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease; 
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

.art-explore-btn:hover .txt-default { 
  transform: translateY(-100%); 
  opacity: 0; 
} 

.art-explore-btn:hover .txt-hover { 
  transform: translateY(0); 
  opacity: 1; 
} 

.art-heading-line { 
  font-family: 'Outfit', sans-serif; 
  font-weight: 900; 
  text-transform: uppercase; 
  line-height: 0.92; 
  letter-spacing: -0.01em; 
  font-size: clamp(36px, 5.5vw, 50px);
} 

.art-heading-plain { 
  color: var(--text-primary); 
  transition: color 0.4s ease; 
} 

.art-heading-gold { 
  background: linear-gradient(110deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%); 
  -webkit-background-clip: text; 
  background-clip: text; 
  color: transparent; 
} 

.art-sub { 
  font-family: 'Outfit', sans-serif; 
  font-size: 15px; 
  line-height: 1.85; 
  color: var(--text-sub); 
  font-weight: 300; 
  max-width: 420px; 
  margin: 28px auto 36px; 
  transition: color 0.4s ease; 
}

.art-gallery-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
}

@media (max-width: 1024px) and (min-width: 768px) {
  .art-gallery-wrap { height: 600px; }
  .art-sub { font-size: 14px; max-width: 360px; margin: 22px auto 30px; }
}

@media (max-width: 767px) {
  .art-section { padding-top: 64px !important; }
  .art-heading-line { font-size: clamp(32px, 10vw, 52px); }
  .art-sub {
    font-size: 13px;
    line-height: 1.75;
    max-width: 280px;
    margin: 18px auto 24px;
  }
  .art-gallery-wrap { height: 320px; }
  .art-header { margin-bottom: 40px !important; padding: 0 6% !important; }
}

@media (max-width: 380px) {
  .art-gallery-wrap { height: 260px; }
  .art-heading-line { font-size: 30px; }
}
`;

function ArtGallery() {
    const [bend, setBend] = useState(1);
    const sectionRef = useRef(null);
    const rafId = useRef(null);
    const lastMobileState = useRef(null);

    const updateBend = useCallback(() => {
        const isMobile = window.innerWidth <= 767;
        if (lastMobileState.current === isMobile) return;
        lastMobileState.current = isMobile;
        setBend(isMobile ? 0.4 : 1);
    }, []);

    const handleResize = useCallback(() => {
        if (rafId.current) return;
        rafId.current = requestAnimationFrame(() => {
            rafId.current = null;
            updateBend();
        });
    }, [updateBend]);

    useEffect(() => {
        updateBend();
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [updateBend, handleResize]);

    return (
        <section ref={sectionRef} id="art-gallery" className="art-section" style={{ paddingTop: '25px' }}>
            <style>{artStyles}</style>

            <div className="art-header" style={{ textAlign: 'center', marginBottom: '20px', padding: '1% 5%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="art-heading-line art-heading-plain">
                    Discover the World
                </div>
                <div className="art-heading-line">
                    of Art Around You
                </div>

                <p className="art-sub">
                    We specialize in creating custom designed logos, business cards,
                    websites, mobile applications, and social media content.
                </p>

                <button className="art-explore-btn">
                    <span className="txt-default">Explore</span>
                    <span className="txt-hover">GO</span>
                </button>
            </div>

            <div className="art-gallery-wrap">
                <SimpleGallery
                    items={galleryItems}
                    bend={bend}
                    borderRadius={0.05}
                    scrollSpeed={2}
                    scrollEase={0.05}
                    isViewActive={true}
                />
            </div>
        </section>
    );
}

export default memo(ArtGallery);