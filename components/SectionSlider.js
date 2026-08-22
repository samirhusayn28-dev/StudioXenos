'use client';

import { useEffect } from 'react';
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
  }

  .section-slider-page > section {
    height: auto !important;
    min-height: 100vh !important;
    max-height: none !important;
    overflow: visible !important;
  }

  /* ── Global Pure CSS Scroll Animations ── */
  .sx-anim {
    opacity: 0;
    transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .sx-fade-up { transform: translateY(30px); }
  .sx-fade-down { transform: translateY(-30px); }
  .sx-fade-right { transform: translateX(-30px); }
  .sx-fade-in { transform: none; }

  .sx-anim.is-visible {
    opacity: 1;
    transform: translate(0, 0);
  }

  /* Stagger Group */
  .sx-stagger .sx-anim:nth-child(1) { transition-delay: 0ms; }
  .sx-stagger .sx-anim:nth-child(2) { transition-delay: 150ms; }
  .sx-stagger .sx-anim:nth-child(3) { transition-delay: 300ms; }
  .sx-stagger .sx-anim:nth-child(4) { transition-delay: 450ms; }
  .sx-stagger .sx-anim:nth-child(5) { transition-delay: 600ms; }
  .sx-stagger .sx-anim:nth-child(6) { transition-delay: 750ms; }
  .sx-stagger .sx-anim:nth-child(7) { transition-delay: 900ms; }
  .sx-stagger .sx-anim:nth-child(8) { transition-delay: 1050ms; }
`;

export default function SectionSlider() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '0px 0px -40px 0px' } // Updated threshold to 0.6 (60%)
        );

        // Observe initial targets
        document.querySelectorAll('.sx-anim').forEach((el) => observer.observe(el));

        // Watch for dynamically added targets (e.g. Projects filtering / "See More")
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // ELEMENT_NODE
                        if (node.classList.contains('sx-anim')) {
                            observer.observe(node);
                        }
                        const children = node.querySelectorAll('.sx-anim');
                        if (children.length) {
                            children.forEach((el) => observer.observe(el));
                        }
                    }
                });
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

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