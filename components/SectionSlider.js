'use client';

import React, { useEffect, useRef, memo } from 'react';
import Lenis from 'lenis';
import Hero from './Hero';
import Services from './services';
import Projects from './Projects';
import Work from './Work';
import AboutUs from './About';
import OurTeam from './Testimonials';
import Footer from './Footer';

const SectionSlider = memo(function SectionSlider({ isLoaded }) {
    const shellRef = useRef(null);
    const servicesTrackRef = useRef(null);
    const heroRef = useRef(null);
    const domeRef = useRef(null);

    const workAboutTrackRef = useRef(null);
    const workRef = useRef(null);
    const aboutSlideRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        let ticking = false;

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const isMobile = window.innerWidth < 1024;

            // 1. Hero scale-down & Dome expand animation
            const track = servicesTrackRef.current;
            if (track) {
                const rect = track.getBoundingClientRect();
                const rawDomeProgress = 1 - (rect.top / windowHeight);
                const domeP = Math.max(0, Math.min(1, rawDomeProgress));

                if (heroRef.current) {
                    const scale = 1 - domeP * 0.05;
                    const brightness = 1 - domeP * 0.25;
                    heroRef.current.style.transform = `scale3d(${scale}, ${scale}, 1)`;
                    heroRef.current.style.filter = `brightness(${brightness})`;
                }

                if (domeRef.current) {
                    const insetX = (1 - domeP) * (isMobile ? 4 : 8);
                    const radius = Math.round((1 - domeP) * (isMobile ? 160 : 400));
                    const clipValue = `inset(0vw ${insetX}vw 0vw ${insetX}vw round ${radius}px ${radius}px 0px 0px)`;

                    domeRef.current.style.webkitClipPath = clipValue;
                    domeRef.current.style.clipPath = clipValue;
                }
            }

            // 2. How We Work -> About Us horizontal slide (DESKTOP ONLY)
            const waTrack = workAboutTrackRef.current;
            const aSlide = aboutSlideRef.current;
            if (waTrack && aSlide) {
                if (isMobile) {
                    aSlide.style.transform = 'none';
                    if (workRef.current) {
                        workRef.current.style.transform = 'none';
                        workRef.current.style.filter = 'none';
                    }
                } else {
                    const rect = waTrack.getBoundingClientRect();
                    const scrollableDistance = rect.height - windowHeight;
                    if (scrollableDistance > 0) {
                        const currentScroll = -rect.top;

                        // Standard progress rate over the full track distance
                        const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));

                        aSlide.style.transform = `translate3d(${-100 + progress * 100}%, 0, 0)`;

                        if (workRef.current) {
                            const scale = 1 - progress * 0.05;
                            const brightness = 1 - progress * 0.25;
                            workRef.current.style.transform = `scale3d(${scale}, ${scale}, 1)`;
                            workRef.current.style.filter = `brightness(${brightness})`;
                        }
                    }
                }
            }

            ticking = false;
        };

        lenis.on('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
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
        <div ref={shellRef} className="w-full relative bg-[#f0f4f9]">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .gpu-layer {
                    will-change: transform, clip-path;
                    transform: translate3d(0, 0, 0);
                    backface-visibility: hidden;
                }
            `}</style>

            {/* Hero Section */}
            <div className="w-full h-screen sticky top-0 z-10 bg-[#f0f4f9] overflow-hidden">
                <div
                    ref={heroRef}
                    className="w-full h-full bg-[#f0f4f9] overflow-hidden gpu-layer"
                    style={{ transformOrigin: 'center center' }}
                    data-section="hero"
                >
                    <Hero isLoaded={isLoaded} />
                </div>
            </div>

            {/* Services Track */}
            <div
                ref={servicesTrackRef}
                data-track="services-track"
                className="w-full relative z-20 h-auto lg:h-[120vh]"
            >
                <div
                    ref={domeRef}
                    className="w-full min-h-screen relative lg:sticky lg:top-0 bg-[#2972EB] text-white shadow-[0_-40px_90px_rgba(0,0,0,0.3)] flex flex-col justify-center overflow-visible lg:overflow-hidden border-t-2 border-white/30 gpu-layer"
                    data-section="services"
                >
                    <Services />
                </div>
            </div>

            {/* Projects Section */}
            <div className="w-full min-h-screen relative z-30 bg-[#f0f4f9]" data-section="projects">
                <Projects />
            </div>

            {/* How We Work + About Us Track (Height increased to 250vh for smoother/slower sliding) */}
            <div
                ref={workAboutTrackRef}
                className="w-full relative z-40 isolate h-auto lg:h-[250vh] bg-[#f0f4f9]"
            >
                <div className="w-full h-auto lg:h-screen lg:sticky lg:top-0 lg:overflow-hidden bg-[#f0f4f9] flex flex-col lg:block">
                    {/* Base Layer: How We Work */}
                    <div
                        ref={workRef}
                        className="w-full relative lg:absolute lg:inset-0 z-10 lg:overflow-hidden no-scrollbar bg-[#f0f4f9] gpu-layer flex items-center justify-center min-h-screen lg:min-h-0"
                        style={{ transformOrigin: 'center center' }}
                        data-section="work"
                    >
                        <Work />
                    </div>

                    {/* Overlay Layer: About Us */}
                    <div
                        ref={aboutSlideRef}
                        className="w-full relative lg:absolute lg:inset-0 z-20 bg-[#f0f4f9] gpu-layer lg:shadow-[-20px_0_50px_rgba(0,0,0,0.15)] lg:overflow-hidden no-scrollbar flex items-center justify-center min-h-screen lg:min-h-0"
                        data-section="about"
                    >
                        <AboutUs />
                    </div>
                </div>
            </div>

            {/* Remaining Sections */}
            <div className="w-full min-h-screen relative z-50 bg-[#f0f4f9]" data-section="team">
                <OurTeam />
            </div>

            <div className="w-full min-h-screen relative z-50 bg-[#f0f4f9]" data-section="footer">
                <Footer />
            </div>
        </div>
    );
});

export default SectionSlider;