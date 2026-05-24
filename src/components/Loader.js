import React, { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress bar smoothly fills up
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Fade out after reaching 100
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        // Faster at start, slower near end (realistic feel)
        const increment = prev < 60 ? Math.random() * 8 + 4
                        : prev < 85 ? Math.random() * 4 + 2
                        : Math.random() * 1.5 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#080d14",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.6s ease",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');

        @keyframes sxPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(1.08); }
        }
        @keyframes sxSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes sxFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sxDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%           { opacity: 1;   transform: scale(1.2); }
        }

        .sx-loader-ring {
          animation: sxSpin 2.4s linear infinite;
        }
        .sx-loader-logo {
          animation: sxFadeUp 0.7s ease forwards;
        }
        .sx-loader-sub {
          animation: sxFadeUp 0.7s ease 0.2s both;
        }
        .sx-loader-bar-wrap {
          animation: sxFadeUp 0.7s ease 0.35s both;
        }
        .sx-dot-1 { animation: sxDot 1.4s infinite 0s; }
        .sx-dot-2 { animation: sxDot 1.4s infinite 0.2s; }
        .sx-dot-3 { animation: sxDot 1.4s infinite 0.4s; }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,122,48,0.12) 0%, transparent 70%)",
        animation: "sxPulse 3s ease-in-out infinite",
        pointerEvents: "none",
      }}/>

      {/* Spinning ring */}
      <div style={{ position: "relative", width: 110, height: 110, marginBottom: 32 }}>
        <svg className="sx-loader-ring" width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="48"
            fill="none" stroke="rgba(196,122,48,0.12)" strokeWidth="2"/>
          <circle cx="55" cy="55" r="48"
            fill="none" stroke="rgba(196,122,48,0.85)" strokeWidth="2"
            strokeDasharray="80 222"
            strokeLinecap="round"
            style={{ transformOrigin: "55px 55px" }}
          />
        </svg>

        {/* Logo center */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 22, color: "#c47a30", letterSpacing: "0.04em",
        }}>SX</div>
      </div>

      {/* Studio name */}
      <div className="sx-loader-logo" style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: 28, color: "#e8ddd0", letterSpacing: "0.08em",
        marginBottom: 8,
      }}>
        STUDIO<span style={{ color: "#c47a30" }}>XENOS</span>
      </div>

      {/* Tagline with animated dots */}
      <div className="sx-loader-sub" style={{
        fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
        fontSize: 13, color: "rgba(232,221,208,0.45)",
        letterSpacing: "0.12em", textTransform: "uppercase",
        display: "flex", alignItems: "center", gap: 4,
        marginBottom: 48,
      }}>
        Loading
        <span className="sx-dot-1" style={{ width: 3, height: 3, borderRadius: "50%", background: "#c47a30", display: "inline-block" }}/>
        <span className="sx-dot-2" style={{ width: 3, height: 3, borderRadius: "50%", background: "#c47a30", display: "inline-block" }}/>
        <span className="sx-dot-3" style={{ width: 3, height: 3, borderRadius: "50%", background: "#c47a30", display: "inline-block" }}/>
      </div>

      {/* Progress bar */}
      <div className="sx-loader-bar-wrap" style={{ width: 220 }}>
        <div style={{
          width: "100%", height: 2,
          background: "rgba(232,221,208,0.08)",
          borderRadius: 2, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: "linear-gradient(90deg, #c47a30, #e8a855)",
            width: `${progress}%`,
            transition: "width 0.15s ease",
            boxShadow: "0 0 10px rgba(196,122,48,0.6)",
          }}/>
        </div>
        <div style={{
          marginTop: 10, textAlign: "right",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
          fontSize: 11, color: "rgba(196,122,48,0.7)",
          letterSpacing: "0.06em",
        }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}