import React from "react";
import Navbar from "./Navbar";
import Robot3D from "../components/Robot3D";

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-visible"
      style={{
        background:
          "linear-gradient(135deg, #c9a882 0%, #e8d5b7 40%, #f5ebe0 70%, #ede0d4 100%)",
      }}
    >
      <Navbar />

      {/* Background depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 70% 50%, rgba(201,168,130,0.25) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* MAIN */}
      <div className="relative w-full flex items-center justify-between px-6 md:px-16">
        
        {/* LEFT TEXT */}
        <div className="max-w-xl z-10">
          <h1
            className="font-extrabold leading-tight mb-5 text-4xl md:text-6xl"
            style={{ color: "#3b2a1a" }}
          >
            Unleash The Growth
            <br />
            Potential Of Your
            <br />
            Business
          </h1>

          <p className="mb-8 max-w-sm" style={{ color: "#6b4c31" }}>
            Unlock your business potential with bespoke Designs, Mobile Apps,
            and Websites crafted for growth.
          </p>

          <button
            className="px-8 py-3 rounded-lg font-semibold"
            style={{
              background: "#3b2a1a",
              color: "#f5ebe0",
              border: "none",
              cursor: "pointer",
            }}
          >
            Request a Quote
          </button>
        </div>

        {/* RIGHT ROBOT */}
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            width: "60%",
            height: "100vh",
          }}
        >
          <Robot3D />
        </div>
      </div>
    </section>
  );
}

export default Hero;