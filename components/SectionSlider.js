'use client';

import React, { useEffect, useRef, memo } from 'react';
import Lenis from 'lenis';
import Hero from './Hero';
import Services from './services';
import Projects from './Projects';
import Work from './Work';
import AboutUs from './About';
import OurTeam from './OurTeam';
import Footer from './Footer';

const SectionSlider = memo(function SectionSlider({ isLoaded }) {
    const shellRef = useRef(null);
    const servicesTrackRef = useRef(null);
    const heroRef = useRef(null);
    const domeRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Cache DOM elements ONCE to prevent layout thrashing
        const cards = document.querySelectorAll('.srv-card-wrapper');
        const totalCards = cards.length;

        let ticking = false;
        // Damped display value for scroll progress — smooths out per-frame
        // jitter on top of Lenis's own scroll smoothing, without changing
        // any of the hero/dome/card formulas that consume it below.
        let currentP = 0;

        lenis.on('scroll', () => {
            if (!servicesTrackRef.current) return;

            // Throttle scroll logic using requestAnimationFrame for 60 FPS performance
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = servicesTrackRef.current.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    let rawProgress = 1 - (rect.top / windowHeight);
                    const targetP = Math.max(0, Math.min(1, rawProgress));

                    // Ease the displayed progress toward its target each
                    // frame instead of snapping to it directly. Everything
                    // below still just reads `p` exactly as before.
                    currentP += (targetP - currentP) * 0.15;
                    const p = currentP;


                    // Mutate Hero
                    if (heroRef.current) {
                        heroRef.current.style.transform = `translateY(${p * 50}px)`;
                        heroRef.current.style.opacity = 1 - p * 0.2;
                    }

                    // Mutate Dome
                    if (domeRef.current) {
                        const insetX = (1 - p) * 8;
                        const radius = (1 - p) * 400;
                        domeRef.current.style.clipPath = `inset(0vw ${insetX}vw 0vw ${insetX}vw round ${radius}px ${radius}px 0px 0px)`;
                    }

                    // Card 3D Stack-to-Grid Animation with tighter spacing and custom easing
                    if (totalCards > 0) {
                        const easedProgress = Math.pow(p, 0.7); // Stretches animation progression smoothly
                        const factor = 1 - easedProgress;

                        cards.forEach((card, index) => {
                            const centerOffset = index - (totalCards - 1) / 2;

                            // Tighter initial card offsets
                            const translateX = centerOffset * -35 * factor;
                            const translateY = (index * 12 + factor * 30) * factor;
                            const translateZ = -index * 40 * factor;
                            const rotateX = 18 * factor;
                            const rotateY = centerOffset * -8 * factor;
                            const scale = 1 - index * 0.03 * factor;

                            card.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
                            card.style.opacity = Math.max(0.4, easedProgress + (1 - index * 0.15));
                        });
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });

        let animationFrameId;
        function raf(time) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }
        animationFrameId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

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

        return () => observer.disconnect();
    }, [isLoaded]);

    return (
        <div ref={shellRef} className="w-full relative">
            <div
                ref={heroRef}
                className="w-full h-screen sticky top-0 z-10 bg-[#f0f4f9] overflow-hidden"
                style={{ transformOrigin: 'center top', willChange: 'transform, opacity' }}
                data-section="hero"
            >
                <Hero isLoaded={isLoaded} />
            </div>

            <div
                ref={servicesTrackRef}
                className="w-full relative z-20"
                style={{ height: '140vh' }}
            >
                <div
                    ref={domeRef}
                    className="w-full min-h-screen sticky top-0 bg-[#2972EB] text-white shadow-[0_-40px_90px_rgba(0,0,0,0.3)] flex flex-col justify-center overflow-hidden border-t-2 border-white/30"
                    style={{ willChange: 'clip-path' }}
                    data-section="services"
                >
                    <Services />
                </div>
            </div>

            <div className="w-full min-h-screen relative z-30 bg-[#f0f4f9]" data-section="projects"><Projects /></div>
            <div className="w-full min-h-screen relative z-30 bg-[#f0f4f9]" data-section="work"><Work /></div>
            <div className="w-full min-h-screen relative z-30 bg-[#f0f4f9]" data-section="about"><AboutUs /></div>
            <div className="w-full min-h-screen relative z-30 bg-[#f0f4f9]" data-section="team"><OurTeam /></div>
            <div className="w-full min-h-screen relative z-30 bg-[#f0f4f9]" data-section="footer"><Footer /></div>
        </div>
    );
});

export default SectionSlider;