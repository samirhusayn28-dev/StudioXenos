'use client';

import React, { useEffect, useRef, memo } from 'react';
import Hero from './Hero';
import Services from './services';
import Work from './Work';
import Projects from './Projects';
import AboutUs from './About';
import Footer from './Footer';
import OurTeam from './OurTeam';

const SectionSlider = memo(function SectionSlider({ isLoaded }) {
    const shellRef = useRef(null);

    useEffect(() => {
        const root = shellRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        const animElements = root.querySelectorAll('.sx-anim');
        animElements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, [isLoaded]);

    const sections = [
        { id: 'hero', node: <Hero isLoaded={isLoaded} /> },
        { id: 'services', node: <Services /> },
        { id: 'projects', node: <Projects /> },
        { id: 'work', node: <Work /> },
        { id: 'about', node: <AboutUs /> },
        { id: 'team', node: <OurTeam /> },
        { id: 'footer', node: <Footer /> },
    ];

    return (
        <div ref={shellRef} className="relative w-full min-h-screen z-[1]">
            <div className="flex flex-col w-full">
                {sections.map(({ id, node }) => (
                    <div
                        key={`slide-${id}`}
                        className="w-full min-h-screen relative flex-shrink-0 bg-transparent"
                        data-section={id}
                    >
                        {node}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default SectionSlider;