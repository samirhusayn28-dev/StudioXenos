"use client";

import React, { useState, useEffect, useRef } from "react";

/* 
 ⚡ Geometric Path Definitions (Desktop SVG Arch)
*/
const MASK_PATHS = {
    covered: 'path("M -100 -100 L 200 -100 L 200 100 L 62 100 L 62 100 C 62 100, 56.627 100, 50 100 C 43.373 100, 38 100, 38 100 L 38 100 L -100 100 Z")',
    archCutout: 'path("M -100 -100 L 200 -100 L 200 100 L 62 100 L 62 74 C 62 67.373, 56.627 62, 50 62 C 43.373 62, 38 67.373, 38 74 L 38 100 L -100 100 Z")',
    fullOpen: 'path("M -100 -100 L 200 -100 L 200 100 L 200 100 L 200 -50 C 200 -150, 125 -200, 50 -200 C -25 -200, -100 -150, -100 -50 L -100 100 L -100 100 Z")'
};

export default function Loader({ readyToOpen, onComplete }) {
    const [isOpening, setIsOpening] = useState(false);
    const [isUnmounted, setIsUnmounted] = useState(false);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        if (readyToOpen && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setIsOpening(true);

            if (onComplete) onComplete();

            const unmountTimer = setTimeout(() => {
                setIsUnmounted(true);
            }, 2500);

            return () => clearTimeout(unmountTimer);
        }
    }, [readyToOpen, onComplete]);

    if (isUnmounted) return null;

    return (
        <div className={`fixed inset-0 z-[99999] pointer-events-none overflow-hidden ${isOpening ? "is-opening" : ""}`}>
            <style>{`
                @keyframes sxShimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                /* --- DESKTOP ANIMATIONS --- */
                @keyframes vaultMorph {
                    0% { d: ${MASK_PATHS.covered}; }
                    28% { d: ${MASK_PATHS.archCutout}; }
                    68% { d: ${MASK_PATHS.archCutout}; }
                    100% { d: ${MASK_PATHS.fullOpen}; }
                }

                @keyframes textShootUp {
                    0% { transform: translate3d(0, 0, 0); opacity: 1; }
                    100% { transform: translate3d(0, -45vh, 0); opacity: 0; }
                }

                @keyframes archTextReveal {
                    0% { opacity: 0; transform: translate3d(0, 20px, 0); }
                    28% { opacity: 1; transform: translate3d(0, 0, 0); }
                    68% { opacity: 1; transform: translate3d(0, 0, 0); }
                    100% { opacity: 0; transform: translate3d(0, -20vh, 0); }
                }

                /* --- MOBILE SMOOTH CURTAIN ANIMATIONS (MATCHED BEZIER NODES) --- */
                @keyframes mobileCurtainLeft {
                    0% {
                        d: path("M 0 0 C 25 0, 51 0, 51 0 C 51 35, 51 65, 51 100 C 34 100, 17 100, 0 100 C 0 66, 0 33, 0 0 Z");
                    }
                    45% {
                        d: path("M 0 0 C 20 0, 38 0, 38 0 C 28 35, 12 65, 0 100 C 0 100, 0 100, 0 100 C 0 66, 0 33, 0 0 Z");
                    }
                    100% {
                        d: path("M 0 0 C -10 0, -20 0, -20 0 C -25 35, -35 65, -50 100 C -50 100, -50 100, -50 100 C 0 66, 0 33, 0 0 Z");
                    }
                }

                @keyframes mobileCurtainRight {
                    0% {
                        d: path("M 100 0 C 75 0, 49 0, 49 0 C 49 35, 49 65, 49 100 C 66 100, 83 100, 100 100 C 100 66, 100 33, 100 0 Z");
                    }
                    45% {
                        d: path("M 100 0 C 80 0, 62 0, 62 0 C 72 35, 88 65, 100 100 C 100 100, 100 100, 100 100 C 100 66, 100 33, 100 0 Z");
                    }
                    100% {
                        d: path("M 100 0 C 110 0, 120 0, 120 0 C 125 35, 135 65, 150 100 C 150 100, 150 100, 150 100 C 100 66, 100 33, 100 0 Z");
                    }
                }

                @keyframes mobileTextFade {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.92); }
                }

                .sx-loader-logo {
                    font-weight: 900;
                    letter-spacing: 0.12em;
                    text-align: center;
                    background: linear-gradient(
                        90deg, 
                        #0F172A 0%, 
                        #2B68F6 35%, 
                        #93C5FD 50%, 
                        #2B68F6 65%, 
                        #0F172A 100%
                    );
                    background-size: 200% auto;
                    color: transparent;
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: sxShimmer 1.5s ease-in-out infinite;
                }

                /* DESKTOP (>= 768px) */
                @media (min-width: 768px) {
                    .mobile-only { display: none !important; }

                    .vault-mask-path {
                        fill: #0F172A;
                        stroke: #2B68F6;
                        stroke-width: 0.3px;
                        vector-effect: non-scaling-stroke;
                        d: ${MASK_PATHS.covered};
                        will-change: d;
                        transform: translateZ(0);
                    }

                    .arch-side-text {
                        opacity: 0;
                        font-size: clamp(11px, 2.2vw, 22px);
                        letter-spacing: 0.1em;
                        text-transform: uppercase;
                        color: #93C5FD;
                        font-weight: 800;
                        white-space: nowrap;
                        will-change: transform, opacity;
                        transform: translateZ(0);
                    }

                    .is-opening .vault-mask-path {
                        animation: vaultMorph 2.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
                    }

                    .is-opening .loader-text-wrapper {
                        will-change: transform, opacity;
                        animation: textShootUp 0.7s cubic-bezier(0.76, 0, 0.24, 1) forwards;
                    }

                    .is-opening .arch-side-text {
                        animation: archTextReveal 2.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
                    }
                }

                /* MOBILE (< 768px) */
                @media (max-width: 767px) {
                    .desktop-only { display: none !important; }

                    .mobile-curtain-path {
                        fill: #0F172A;
                        will-change: d;
                        transform: translateZ(0);
                    }

                    .is-opening .mobile-curtain-left {
                        animation: mobileCurtainLeft 1.5s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards;
                    }

                    .is-opening .mobile-curtain-right {
                        animation: mobileCurtainRight 1.5s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards;
                    }

                    .mobile-text-container {
                        position: absolute;
                        inset: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        z-index: 20;
                        padding: 0 1rem;
                        text-align: center;
                    }

                    .is-opening .mobile-text-container {
                        animation: mobileTextFade 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards;
                    }

                    .mobile-sub-text {
                        font-size: 11px;
                        letter-spacing: 0.25em;
                        text-transform: uppercase;
                        color: #93C5FD;
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                    }

                    .mobile-title-text {
                        font-size: clamp(22px, 7vw, 32px);
                    }
                }
            `}</style>

            {/* --- DESKTOP VIEW --- */}
            <svg
                className="desktop-only absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMax slice"
            >
                <path
                    className="vault-mask-path"
                    d="M -100 -100 L 200 -100 L 200 100 L 62 100 L 62 100 C 62 100, 56.627 100, 50 100 C 43.373 100, 38 100, 38 100 L 38 100 L -100 100 Z"
                />
            </svg>

            <div className="desktop-only loader-text-wrapper absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
                <div className="relative flex items-center justify-center w-full max-w-none">
                    <div className="overflow-hidden py-2 px-4">
                        <div className="sx-loader-logo uppercase text-[36px]">STUDIO XENOS</div>
                    </div>
                </div>
            </div>

            <div className="desktop-only absolute bottom-[35%] left-1/2 -translate-x-1/2 w-full max-w-[1100px] flex justify-between px-10 z-20 pointer-events-none">
                <div className="arch-side-text">Welcome Mr.</div>
                <div className="arch-side-text">Studio Xenos</div>
            </div>

            {/* --- MOBILE VIEW (Hung Theater Curtain Curve Reveal) --- */}
            <svg
                className="mobile-only absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {/* Left Curtain Panel */}
                <path
                    className="mobile-curtain-path mobile-curtain-left"
                    d="M 0 0 C 25 0, 51 0, 51 0 C 51 35, 51 65, 51 100 C 34 100, 17 100, 0 100 C 0 66, 0 33, 0 0 Z"
                />
                {/* Right Curtain Panel */}
                <path
                    className="mobile-curtain-path mobile-curtain-right"
                    d="M 100 0 C 75 0, 49 0, 49 0 C 49 35, 49 65, 49 100 C 66 100, 83 100, 100 100 C 100 66, 100 33, 100 0 Z"
                />
            </svg>

            <div className="mobile-only mobile-text-container pointer-events-none">
                <div className="mobile-sub-text">WELCOME TO</div>
                <div className="sx-loader-logo mobile-title-text uppercase">STUDIO XENOS</div>
            </div>
        </div>
    );
}