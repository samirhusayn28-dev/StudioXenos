import React from "react";
import Navbar from "./Navbar";
import heroBg from "../assets/mountain.jpg";

function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{
        backgroundImage: "url(" + heroBg + ")",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Navbar />

      <div className="relative z-10 px-16 max-w-2xl mt-24">
        <h1
          className="text-white font-extrabold leading-tight mb-5 tracking-tight"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            letterSpacing: "-0.025em"
          }}
        >
          Unleash The Growth
          <br />
          Potential Of Your
          <br />
          Business
        </h1>

        <p
          className="text-blue-100 text-base leading-relaxed max-w-sm mb-9"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Unlock your business potential with bespoke Designs, Mobile Apps,
          and Websites crafted for growth.
        </p>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-lg cursor-pointer transition-all duration-200"
          style={{
            fontFamily: "DM Sans, sans-serif",
            boxShadow: "0 0 32px rgba(59,130,246,0.45)"
          }}
        >
          Request a Quote
        </button>
      </div>
    </section>
  );
}

export default Hero;