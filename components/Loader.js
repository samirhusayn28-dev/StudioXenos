"use client";

import React, { useEffect, useRef, useState } from "react";
import manifest from './assetManifest';
import preloadAssets from './Preloader';

// Hard cap: loader dismisses after this many ms regardless of asset state.
// Kept short because we now only preload 2 images + 1 font URL.
const MAX_WAIT_MS = 600;

export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState({ loaded: 0, total: 1, percent: 0 });
    const [fadeOut, setFadeOut] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        let finished = false;

        const finish = () => {
            if (finished || !isMounted) return;
            finished = true;
            setFadeOut(true);
            timeoutRef.current = setTimeout(() => onComplete && onComplete(), 400);
        };

        const handleProgress = (loaded, total, detail = {}) => {
            if (!isMounted) return;
            const percent = total > 0 ? Math.round((loaded / total) * 100) : 100;
            setProgress({ loaded, total, percent, detail });
        };

        preloadAssets(manifest, handleProgress).then(finish).catch(finish);

        const maxWaitTimer = setTimeout(finish, MAX_WAIT_MS);

        return () => {
            isMounted = false;
            clearTimeout(maxWaitTimer);
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
            background: "#f0f4f9",
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.6s ease",
            pointerEvents: fadeOut ? "none" : "all",
            contain: "layout paint style",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
        }}>
            <style>{`
    @keyframes sxPulse {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(1.08); }
    }
    @keyframes sxFadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .sx-loader-logo { animation: sxFadeUp 0.6s ease forwards; }

    .sx-text-wrap {
      position: relative;
      display: inline-block;
    //   font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 32px;
      letter-spacing: 0.08em;
      line-height: 1.15;
      text-align: center;
      max-width: 90vw;
    }

    .sx-text-base {
      display: block;
      color: transparent;
      -webkit-text-stroke: 1px transparent;
      user-select: none;
      white-space: normal;
      word-break: break-word;
    }

    .sx-text-fill {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      color: #2563eb;
      will-change: clip-path;
      -webkit-clip-path: inset(0 0 0 0);
      clip-path: inset(0 0 0 0);
      transition: clip-path 200ms ease-out;
      white-space: normal;
      word-break: break-word;
    }

    /* Mobile: allow the studio name to wrap onto 2 lines instead of overflowing */
    @media (max-width: 480px) {
      .sx-text-wrap {
        font-size: 24px;
        max-width: 80vw;
      }
      .sx-text-base,
      .sx-text-fill {
        white-space: normal;
        word-break: normal;
        overflow-wrap: break-word;
      }
    }
    `}</style>

            {/* Ambient blue glow */}
            <div style={{
                position: "absolute", width: 400, height: 400,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
                animation: "sxPulse 3s ease-in-out infinite",
                pointerEvents: "none",
            }} />

            {/* Studio name — text fills left-to-right (and wraps on mobile) with load progress */}
            <div className="sx-loader-logo sx-text-wrap">
                <span className="sx-text-base" aria-hidden="true">STUDIO XENOS</span>
                <span
                    className="sx-text-fill"
                    style={{ clipPath: `inset(0 ${100 - progress.percent - 50}% 0 0)` }}
                    aria-hidden="true"
                >
                    STUDIO XENOS
                </span>
                <span style={{
                    position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
                    overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
                }}>
                    STUDIO XENOS loading, {progress.percent}%
                </span>
            </div>
        </div>
    );
}