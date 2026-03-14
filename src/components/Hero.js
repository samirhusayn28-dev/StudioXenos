import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import mountain0 from "../components/assets/mountain.jpg";
import mountain1 from "../components/assets/mountain1.jpg";
import mountain2 from "../components/assets/mountain2.jpg";

const images = [mountain0, mountain1, mountain2];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">

      <div
        className="absolute inset-0 flex ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transitionDuration: "2000ms"
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="min-w-full h-full"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black opacity-50" />
      <Navbar />

      <div className="relative z-10 px-6 sm:px-10 md:px-16 max-w-2xl mt-24 w-full">
        <h1
          className="text-white font-extrabold leading-tight mb-5 tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.025em" }}
        >
          Unleash The Growth
          <br />
          Potential Of Your
          <br />
          Business
        </h1>

        <p
          className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm mb-9"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Unlock your business potential with bespoke Designs, Mobile Apps,
          and Websites crafted for growth.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg cursor-pointer transition-all duration-200 text-sm sm:text-base"
          style={{
            fontFamily: "DM Sans, sans-serif",
            boxShadow: "0 0 32px rgba(59,130,246,0.45)",
          }}
        >
          Request a Quote
        </button>
        <div className="flex gap-2 mt-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
                i === current ? "bg-white w-6" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}

export default Hero;