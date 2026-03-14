import React from 'react';
import designImg from '../components/assets/Design.png';
import webDevImg from '../components/assets/WebDev.png';
import appDevImg from '../components/assets/AppDev.png';

const services = [
  {
    img: designImg,
    title: 'Design',
    desc: 'Focusing on clarity and user experience, we deliver interfaces accompanied by interactive models that map out your solution ahead of development.',
  },

        {
    img: webDevImg,
    title: 'Website',
    desc: 'Specializing in efficient, scalable websites, we prioritize purposeful design and user-focused functionality to strengthen your digital presence.',
         },
         
    {
    img: appDevImg,
    title: 'Mobile App',
    desc: 'Designed and built for mobility, we develop iOS and Android applications that deliver exceptional user experiences through thoughtful design and seamless performance.',
  },
];

export default function Services() {
  return (
    <section className="bg-white py-24 px-6 md:px-16">

      <h2 className="text-center font-bold text-3xl md:text-4xl text-slate-900 mb-14" 
      style={{ fontFamily: "'Syne', sans-serif" }}>
        Services
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-5xl mx-auto mb-14">
        {services.map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8">
            <img src={s.img} alt={s.title} className="w-12 h-12 object-contain mb-5" />
            <h3 className="font-bold text-lg text-slate-900 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
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