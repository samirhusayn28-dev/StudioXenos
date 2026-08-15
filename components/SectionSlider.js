'use client';

import Hero from './Hero';
import Services from './services';
import Work from './Work';
import Projects from './Projects';
import AboutUs from './About';
import Footer from './Footer';
import ChatBot from './ChatBot';
import OurTeam from './OurTeam';
import StarBackground from './StarBackground';

const sections = [
    { id: 'hero', node: <Hero key="hero" /> },
    { id: 'services', node: <Services key="services" /> },
    { id: 'projects', node: <Projects key="projects" /> },
    { id: 'work', node: <Work key="work" /> },
    { id: 'about', node: <AboutUs key="about" /> },
    { id: 'team', node: <OurTeam key="team" /> },
    { id: 'footer', node: <Footer key="footer" /> },
];

const styles = `
  html, body {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    height: auto !important;
    position: relative !important;
    background-color: var(--bg-primary, #040610);
    color: var(--text-primary, #e8ddd0);
    -webkit-overflow-scrolling: touch;
  }

  .section-slider-shell {
    position: relative !important;
    width: 100% !important;
    height: auto !important;
    min-height: 100vh !important;
    overflow: visible !important;
    z-index: 1;
  }

  .section-slider-track {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    height: auto !important;
    transform: none !important;
    transition: none !important;
    overflow: visible !important;
  }

  .section-slider-page {
    width: 100% !important;
    height: auto !important;
    min-height: 100vh !important;
    position: relative !important;
    overflow: visible !important;
    flex-shrink: 0;
    background-color: transparent;

    content-visibility: auto;
    contain-intrinsic-size: auto 100vh;
  }

  .section-slider-page > section {
    height: auto !important;
    min-height: 100vh !important;
    max-height: none !important;
    overflow: visible !important;
  }
`;

export default function SectionSlider() {
    return (
        <div className="section-slider-shell">
            <style>{styles}</style>
            {/* <StarBackground /> */}

            <div className="section-slider-track">
                {sections.map(({ id, node }) => (
                    <div key={`slide-${id}`} className="section-slider-page" data-section={id}>
                        {node}
                    </div>
                ))}
            </div>
        </div>
    );
}