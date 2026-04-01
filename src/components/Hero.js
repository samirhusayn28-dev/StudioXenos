import React, { useRef } from "react";
import Navbar from "./Navbar";
import Robot3D from "../components/Robot3D";

const heroStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400&family=Poppins:wght@600;700;800&display=swap');

  @keyframes blurSharp {
    0%   { opacity: 0; filter: blur(32px); transform: translateY(22px); }
    60%  { filter: blur(6px); opacity: 0.8; }
    100% { opacity: 1; filter: blur(0); transform: translateY(0); }
  }

  @keyframes lineGrow {
    0%   { transform: scaleX(0); opacity: 0; }
    100% { transform: scaleX(1); opacity: 1; }
  }

  @keyframes orb1 {
    0%, 100% { transform: translate(0, 0); }
    50%       { transform: translate(28px, -20px); }
  }

  @keyframes orb2 {
    0%, 100% { transform: translate(0, 0); }
    50%       { transform: translate(-20px, 26px); }
  }

  @keyframes arrowFloat {
    0%, 100% { transform: translateY(0px); opacity: 0.6; }
    50%       { transform: translateY(8px); opacity: 1; }
  }

  @keyframes arrowFadeIn {
    0%   { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .hero-h1  { animation: blurSharp 1.1s cubic-bezier(0.16,1,0.3,1) 0.30s both; }
  .hero-h2  { animation: blurSharp 1.1s cubic-bezier(0.16,1,0.3,1) 0.50s both; }
  .hero-h3  { animation: blurSharp 1.1s cubic-bezier(0.16,1,0.3,1) 0.68s both; }
  .hero-hr  { animation: lineGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.90s both; transform-origin: left; }
  .hero-sub { animation: blurSharp 0.9s cubic-bezier(0.16,1,0.3,1) 1.04s both; }
  .hero-btn { animation: blurSharp 0.9s cubic-bezier(0.16,1,0.3,1) 1.18s both; }

  .hero-scroll-arrow { animation: arrowFadeIn 1s cubic-bezier(0.16,1,0.3,1) 1.5s both; }
  .hero-arrow-icon   { animation: arrowFloat 1.8s ease-in-out infinite; }

  .hero-orb-1 {
    position: absolute;
    width: 480px; height: 480px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,215,160,0.42) 0%, transparent 68%);
    top: -100px; right: 80px;
    pointer-events: none;
    animation: orb1 9s ease-in-out infinite;
  }

  .hero-orb-2 {
    position: absolute;
    width: 340px; height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(185,125,60,0.28) 0%, transparent 70%);
    bottom: -40px; left: 30%;
    pointer-events: none;
    animation: orb2 11s ease-in-out infinite;
  }

  .hero-fade-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 260px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(237,224,212,0.55) 45%,
      #ffffff 100%
    );
    pointer-events: none;
    z-index: 20;
  }

  .hero-book-btn {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.20);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    padding: 10px 26px;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.25s ease,
                box-shadow 0.25s ease,
                background 0.3s ease,
                border-color 0.3s ease,
                color 0.3s ease;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .hero-book-btn:hover {
    transform: scale(1.05);
    background: rgba(49, 92, 253, 0.55);
    border-color: rgba(99, 132, 255, 0.55);
    color: #fff;
    box-shadow: 0 6px 24px rgba(49, 92, 253, 0.40),
                inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .hero-book-btn .txt-default,
  .hero-book-btn .txt-hover {
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .hero-book-btn .txt-hover {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    opacity: 0;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  .hero-book-btn:hover .txt-default { transform: translateY(-100%); opacity: 0; }
  .hero-book-btn:hover .txt-hover   { transform: translateY(0); opacity: 1; }

  .hero-scroll-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 0;
    transition: opacity 0.25s ease;
  }

  .hero-scroll-btn:hover { opacity: 0.7; }

  @keyframes heroSlam {
    0%   { transform: scale(1)    translateY(0);     filter: blur(0px);  opacity: 1; }
    100% { transform: scale(1.06) translateY(-40px); filter: blur(18px); opacity: 0; }
  }

  @keyframes nextSlam {
    0%   { transform: scale(0.94) translateY(30px); filter: blur(16px); opacity: 0; }
    100% { transform: scale(1)    translateY(0);    filter: blur(0px);  opacity: 1; }
  }

  .hero-slam-out {
    animation: heroSlam 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .next-slam-in {
    animation: nextSlam 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
  }
`;

function AnimatedBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, #b8956a 0%, #d4b896 40%, #ede0d4 100%)",
      }}
    />
  );
}

function Hero() {
  const sectionRef = useRef(null);

  const scrollToNext = () => {
  const heroEl = sectionRef.current;
  const nextEl = document.getElementById("services");
  if (!heroEl || !nextEl) return;

  heroEl.classList.add("hero-slam-out");
  nextEl.classList.add("next-slam-in");

  setTimeout(() => {
    const top = nextEl.offsetTop - 40;
    window.scrollTo({ top: top, behavior: "instant" });
    heroEl.classList.remove("hero-slam-out");
    setTimeout(() => nextEl.classList.remove("next-slam-in"), 750);
  }, 400);
};

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <style>{heroStyles}</style>
      <AnimatedBackground />

      <div className="hero-orb-1" />
      <div className="hero-orb-2" />
      <div className="hero-fade-bottom" />

      <Navbar />

      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "90px 5% 0 6%",
          zIndex: 10,
        }}
      >
        <div style={{ width: "min(820px, 54%)" }}>

          <div style={{ lineHeight: 0.92, letterSpacing: "-0.01em" }}>
            <div
              className="hero-h1"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(72px, 9.5vw, 130px)",
                fontWeight: 900,
                color: "#1a0e04",
                lineHeight: 0.92,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Unleash the
            </div>

            <div
              className="hero-h2"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(72px, 9.5vw, 130px)",
                fontWeight: 900,
                lineHeight: 0.92,
                margin: 0,
                textTransform: "uppercase",
                background:
                  "linear-gradient(110deg, #6b3610 0%, #c47a30 45%, #7a3e12 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Growth Potential
            </div>

            <div
              className="hero-h3"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(72px, 9.5vw, 130px)",
                fontWeight: 900,
                color: "#1a0e04",
                lineHeight: 0.92,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              of your business
            </div>
          </div>

          <div
            className="hero-hr"
            style={{
              width: "48px",
              height: "1.5px",
              background: "rgba(100,55,10,0.5)",
              borderRadius: "2px",
              margin: "36px 0 28px",
            }}
          />

          <p
            className="hero-sub"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "15.5px",
              lineHeight: 1.85,
              color: "rgba(22,10,2,0.55)",
              margin: "0 0 38px",
              fontWeight: 300,
              maxWidth: "460px",
            }}
          >
            We craft high-performing websites and apps that help businesses
            grow faster, convert better, and stand out from the crowd.
          </p>

          <div className="hero-btn">
            <button className="hero-book-btn">
              <span className="txt-default">Book a Call</span>
              <span className="txt-hover">GO</span>
            </button>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "-2%",
            top: 0,
            bottom: 0,
            width: "55%",
            height: "100%",
          }}
        >
          <Robot3D />
        </div>
      </div>

      <div
        className="hero-scroll-arrow"
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <button className="hero-scroll-btn" onClick={scrollToNext}>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgb(0, 0, 0)",
              fontWeight: 400,
            }}
          >
            Scroll
          </span>
          <div className="hero-arrow-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4V18M11 18L5 12M11 18L17 12"
                stroke="rgb(0, 0, 0)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

export default Hero;