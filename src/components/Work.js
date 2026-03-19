import React from 'react';
import robot1 from './assets/Robot.png';
import robot2 from './assets/Robot2.png';
import robot3 from './assets/Robot1.png';
import shadow from './assets/Shadow.png';

const steps = [
  {
    img: robot1,
    title: 'Request a Quote',
    desc: 'Schedule a quick call to discuss your needs and goals',
  },
  {
    img: robot2,
    title: 'Get a Custom Plan',
    desc: 'We analyse your situation and create a tailored strategy or solution',
  },
  {
    img: robot3,
    title: 'Launch & Grow',
    desc: 'We execute the plan and support you as you achieve results',
  },
];

export default function Work() {
  return (
    <section className="bg-white py-24 px-6 md:px-16">

      <h2 className="text-center font-bold text-3xl md:text-4xl text-slate-900 mb-16" style={{ fontFamily: "'Syne', sans-serif" }}>
        How We Work
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-14">
        {steps.map((s, i) => (
          <div key={i} className="text-center border border-slate-200 rounded-2xl p-8 shadow-md">
            <div className="relative mx-auto mb-6" style={{ width: '144px' }}>
              <img src={s.img} alt={s.title} className="w-36 h-36 object-contain relative z-10" />
              <img src={shadow} alt="shadow" className="absolute -bottom-11 left-0 w-full" style={{ zIndex: 0 }} />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              {s.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-lg border-none cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Book a Call
        </button>
      </div>

    </section>
  );
}