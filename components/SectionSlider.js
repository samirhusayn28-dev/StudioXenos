'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Hero from './Hero';
import Services from './services';
import Work from './Work';
import Projects from './Projects';
import Art from './Art';
import AboutUs from './About';
import Footer from './Footer';
import ChatBot from './ChatBot';
import OurTeam from './OurTeam';
import StarBackground from './StarBackground';

const STEP_LOCK_MS = 760;
const SECTION_COUNT = 8;

const sections = [
    <Hero key="hero" />,
    <Services key="services" />,
    <Projects key="projects" />,
    <Art key="art" />,
    <Work key="work" />,
    <AboutUs key="about" />,
    <OurTeam key="team" />,
    // <ChatBot key="chat" />,
    <Footer key="footer" />,
];

const styles = `
  /* Desktop Layout - Custom Slider Track */
  .section-slider-shell {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    z-index: 1;
    color: var(--text-primary, #e8ddd0);
  }

  .section-slider-track {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100dvh;
    will-change: transform;
    transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
  }

  .section-slider-page {
    width: 100vw;
    height: 100dvh;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    background-color: transparent;
  }

  /* ── Mobile Scrolling Fix (<= 900px) ── */
  @media (max-width: 900px) {
    html, body {
      overflow-y: auto !important;
      overflow-x: hidden !important;
      height: auto !important;
      position: relative !important;
    }

    .section-slider-shell {
      position: relative !important;
      width: 100% !important;
      height: auto !important;
      min-height: 100vh !important;
      overflow: visible !important;
    }

    .section-slider-track {
      display: block !important;
      width: 100% !important;
      height: auto !important;
      transform: none !important;
      transition: none !important;
    }

    .section-slider-page {
      width: 100% !important;
      height: auto !important;
      min-height: 100vh !important;
      position: relative !important;
      overflow: visible !important;
    }

    /* Force child sections (e.g. Hero) to allow vertical expansion */
    .section-slider-page > section {
      height: auto !important;
      min-height: 100vh !important;
      max-height: none !important;
      overflow: visible !important;
    }
  }
`;

export default function SectionSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const lockRef = useRef(false);
    const timeoutRef = useRef(null);

    // Monitor screen width to enable/disable JS snap scrolling
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const releaseLock = useCallback(() => {
        lockRef.current = false;
    }, []);

    const stepBy = useCallback(
        (direction) => {
            if (lockRef.current || isMobile) return;

            lockRef.current = true;
            setActiveIndex((current) => {
                const nextIndex = Math.min(
                    SECTION_COUNT - 1,
                    Math.max(0, current + direction)
                );
                return nextIndex;
            });

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(releaseLock, STEP_LOCK_MS);
        },
        [releaseLock, isMobile]
    );

    useEffect(() => {
        if (isMobile) return;

        const handleWheel = (event) => {
            if (Math.abs(event.deltaY) < 5) return;
            event.preventDefault();
            stepBy(event.deltaY > 0 ? 1 : -1);
        };

        const handleKeyDown = (event) => {
            const { key } = event;
            const isScrollDown =
                key === 'ArrowDown' ||
                key === 'PageDown' ||
                key === ' ' ||
                key === 'Spacebar';
            const isScrollUp = key === 'ArrowUp' || key === 'PageUp';

            if (!isScrollDown && !isScrollUp) {
                return;
            }

            event.preventDefault();
            stepBy(isScrollDown ? 1 : -1);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [stepBy, isMobile]);

    return (
        <div className="section-slider-shell">
            <style>{styles}</style>
            {/* <StarBackground /> */}

            <div
                className="section-slider-track"
                style={{
                    transform: isMobile ? 'none' : `translateY(-${activeIndex * 100}dvh)`,
                }}
            >
                {sections.map((section, index) => (
                    <div key={`slide-${index}`} className="section-slider-page">
                        {section}
                    </div>
                ))}
            </div>
        </div>
    );
}

// 'use client';

// import Hero from './Hero';
// import Services from './services';
// import Work from './Work';
// import Projects from './Projects';
// import Art from './Art';
// import AboutUs from './About';
// import Footer from './Footer';
// import ChatBot from './ChatBot';
// import OurTeam from './OurTeam';
// import StarBackground from './StarBackground';

// const sections = [
//     <Hero key="hero" />,
//     <Services key="services" />,
//     <Projects key="projects" />,
//     <Art key="art" />,
//     <Work key="work" />,
//     <AboutUs key="about" />,
//     <OurTeam key="team" />,
//     // <ChatBot key="chat" />,
//     <Footer key="footer" />,
// ];

// const styles = `
//   html, body {
//     overflow-y: auto !important;
//     overflow-x: hidden !important;
//     height: auto !important;
//     position: relative !important;
//     background-color: var(--bg-primary, #040610);
//     color: var(--text-primary, #e8ddd0);
//   }

//   .section-slider-shell {
//     position: relative !important;
//     width: 100% !important;
//     height: auto !important;
//     min-height: 100vh !important;
//     overflow: visible !important;
//     z-index: 1;
//   }

//   .section-slider-track {
//     display: flex !important;
//     flex-direction: column !important;
//     width: 100% !important;
//     height: auto !important;
//     transform: none !important;
//     transition: none !important;
//   }

//   .section-slider-page {
//     width: 100% !important;
//     height: auto !important;
//     min-height: 100vh !important;
//     position: relative !important;
//     overflow: visible !important;
//     flex-shrink: 0;
//     background-color: transparent;
//   }

//   /* Force child sections to allow natural vertical expansion */
//   .section-slider-page > section {
//     height: auto !important;
//     min-height: 100vh !important;
//     max-height: none !important;
//     overflow: visible !important;
//   }
// `;

// export default function SectionSlider() {
//     return (
//         <div className="section-slider-shell">
//             <style>{styles}</style>
//             <StarBackground />

//             <div className="section-slider-track">
//                 {sections.map((section, index) => (
//                     <div key={`slide-${index}`} className="section-slider-page">
//                         {section}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }