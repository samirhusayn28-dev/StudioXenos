import React from 'react';
import leftImg from './assets/left.png';
import rightImg from './assets/right.png';

const paragraphs = [
  "At Studio Xenos, we turn ideas into impactful digital experiences. We specialize in mobile app development, web development, and UI/UX design, delivering tailor-made solutions that empower businesses to grow in the digital age.",
  "Our team of passionate developers, designers, and strategists is committed to crafting intuitive interfaces, scalable applications, and seamless user experiences.",
  "Whether you're a startup building your first product or an established brand looking to innovate, we work closely with you to bring your vision to life — on time and within budget.",
  "Driven by creativity, backed by technology, and fueled by results, Studio Xenos is your trusted partner in digital transformation.",
];

export default function AboutUs() {
  return (
    <section
      className="py-24 px-6 md:px-16"
      style={{ background: '#d1d5db' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div>
          <h2
            className="text-slate-900 font-extrabold text-3xl sm:text-4xl md:text-5xl mb-8"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            About Us
          </h2>
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className="text-slate-700 text-sm sm:text-base leading-7 mb-4 last:mb-0"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {text}
            </p>
          ))}
        </div>

        <div className="relative h-64 sm:h-80 md:h-96 mt-8 md:mt-0">
          <img
            src={leftImg}
            alt="About 1"
            className="rounded-2xl shadow-xl object-cover absolute left-0"
            style={{ paddingRight: '8px', width: '48%', height: '85%' }}
          />
          <img
            src={rightImg}
            alt="About 2"
            className="rounded-2xl shadow-xl object-cover absolute top-0 right-0 -translate-y-4 md:-translate-y-8"
            style={{ paddingLeft: '8px', width: '48%', height: '85%' }}
          />
        </div>

      </div>
    </section>
  );
}