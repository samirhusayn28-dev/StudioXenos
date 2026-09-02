"use client";

import React, { useState, useEffect, useRef } from "react";

/* 
 ⚡ Geometric Path Definitions
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

                .sx-loader-logo {
                    font-weight: 900;
                    font-size: 36px;
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
                    font-size: 28px;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #93C5FD;
                    font-weight: 800;
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

                @media (max-width: 768px) {
                    .arch-side-text { font-size: 16px; }
                }
                @media (max-width: 480px) {
                    .sx-loader-logo { font-size: 24px; }
                    .arch-side-text { font-size: 14px; }
                }
            `}</style>

            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMax slice"
            >
                <path
                    className="vault-mask-path"
                    d="M -100 -100 L 200 -100 L 200 100 L 62 100 L 62 100 C 62 100, 56.627 100, 50 100 C 43.373 100, 38 100, 38 100 L 38 100 L -100 100 Z"
                />
            </svg>

            {/* Main Center Logo */}
            <div className="loader-text-wrapper absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <div className="relative flex items-center justify-center">
                    <div className="overflow-hidden py-2 px-4">
                        <div className="sx-loader-logo uppercase">STUDIO XENOS</div>
                    </div>
                </div>
            </div>

            {/* Flanking Arch Text Container */}
            <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-full max-w-[1100px] flex justify-between px-10 z-20 pointer-events-none">
                <div className="arch-side-text">Welcome Mr.</div>
                <div className="arch-side-text">Studio Xenos</div>
            </div>
        </div>
    );
}