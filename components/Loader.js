"use client";

import React, { useEffect, useRef, useState } from "react";
import manifest from './assetManifest';
import preloadAssets from './Preloader';

export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState({ loaded: 0, total: 1, percent: 0 });
    const [fadeOut, setFadeOut] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const handleProgress = (loaded, total, detail = {}) => {
            if (!isMounted) return;
            const percent = total > 0 ? Math.round((loaded / total) * 100) : 100;
            setProgress({ loaded, total, percent, detail });
        };

        preloadAssets(manifest, handleProgress).then(() => {
            setTimeout(() => {
                if (!isMounted) return;
                setFadeOut(true);
                timeoutRef.current = setTimeout(() => onComplete && onComplete(), 10);
            }, 400);
        }).catch(() => {
            if (!isMounted) return;
            setFadeOut(true);
            timeoutRef.current = setTimeout(() => onComplete && onComplete(), 400);
        });

        return () => {
            isMounted = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [onComplete]);

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 99999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#ffffff",
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.6s ease",
            pointerEvents: fadeOut ? "none" : "all",
            contain: "layout paint style",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
        }}>
            <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

    @keyframes sxPulse {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(1.08); }
    }
    @keyframes sxFadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes sxShiningMotion {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .sx-loader-logo { animation: sxFadeUp 0.6s ease forwards; }

    .sx-shining-text {
      background: linear-gradient(90deg, #2563eb 0%, #93c5fd 40%, #ffffff 50%, #93c5fd 60%, #2563eb 100%);
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: sxShiningMotion 2.2s linear infinite;
      will-change: background-position;
    }

    .sx-progress { margin-top: 18px; font-family: 'Outfit', sans-serif; color: #374151; }
    .sx-progress-bar { will-change: width; transform: translateZ(0); }
    `}</style>

            {/* Ambient blue glow */}
            <div style={{
                position: "absolute", width: 400, height: 400,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
                animation: "sxPulse 3s ease-in-out infinite",
                pointerEvents: "none",
            }} />

            {/* Studio name with continuous shining motion */}
            <div className="sx-loader-logo" style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 32, letterSpacing: "0.08em",
            }}>
                <span className="sx-shining-text">STUDIO XENOS</span>
            </div>

            {/* <div className="sx-progress" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 180, height: 8, background: '#eef2ff', borderRadius: 999, overflow: 'hidden' }}>
                    <div className="sx-progress-bar" style={{ width: `${progress.percent}%`, height: '100%', background: '#2563eb', transition: 'width 180ms linear' }} />
                </div>
                <div style={{ minWidth: 48, textAlign: 'right', fontWeight: 700 }}>{progress.percent}%</div>
            </div> */}
        </div>
    );
}