"use client";

import React, { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Snappy, lightweight timer: loads instantly and finishes in 350ms
        const timer = setTimeout(() => {
            setFadeOut(true);
            const finishTimer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 400); // Matches the fade-out CSS transition duration
            return () => clearTimeout(finishTimer);
        }, 350);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 99999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#f0f4f9",
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.4s ease",
            pointerEvents: fadeOut ? "none" : "all",
            contain: "layout paint style",
        }}>
            <style>{`
                @keyframes sxShimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }

                .sx-loader-logo {
                  font-weight: 800;
                  font-size: 32px;
                  letter-spacing: 0.08em;
                  text-align: center;
                  /* Gradient that creates the light beam sweeping left to right */
                  background: linear-gradient(90deg, #1e3a8a 0%, #1e3a8a 35%, #93c5fd 50%, #1e3a8a 65%, #1e3a8a 100%);
                  background-size: 200% auto;
                  color: transparent;
                  -webkit-background-clip: text;
                  background-clip: text;
                  animation: sxShimmer 1.2s linear infinite;
                }

                @media (max-width: 480px) {
                  .sx-loader-logo { font-size: 24px; }
                }
            `}</style>

            {/* Sweeping left-to-right text animation */}
            <div className="sx-loader-logo">STUDIO XENOS</div>
        </div>
    );
}