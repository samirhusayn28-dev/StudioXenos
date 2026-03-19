import React, { useState } from 'react';
import project1 from './assets/Project01.avif';
import project2 from './assets/Project02.avif';
import project3 from './assets/Project03.avif';
import GithubButton from './GithubButton';

const projects = [
  {
    img: project1,
    title: 'Sport News',
    desc: 'This sleek landing page design for a sports news platform delivers trending updates, club rankings, and featured articles in a clean, user-friendly layout. It combines bold visuals with intuitive navigation to engage sports fans and enhance content discovery.',
  },
  {
    img: project2,
    title: 'Project Two',
    desc: 'A modern platform with seamless user experience, intuitive navigation, and a clean design that drives conversions and engages the target audience effectively.',
  },
  {
    img: project3,
    title: 'Project Three',
    desc: 'A powerful dashboard with real-time data visualization, clean UI and intuitive controls to manage everything effectively and efficiently.',
  },
];

export default function ProjectShowcase() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(current === 0 ? projects.length - 1 : current - 1);
  const next = () => setCurrent(current === projects.length - 1 ? 0 : current + 1);

  return (
    <section className="py-20 px-6 md:px-16" style={{ background: '#6b7280' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">

        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img src={projects[current].img} alt={projects[current].title} className="w-full h-full object-cover" />
        </div>

        <div className="text-center md:text-right">
          <h3
            className="text-white text-3xl md:text-4xl mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {projects[current].title}
          </h3>
          <p
            className="text-white/80 text-base leading-7 mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {projects[current].desc}
          </p>

          <div className="flex justify-center md:justify-end gap-3 mb-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/40 text-white bg-transparent cursor-pointer hover:bg-white/20 transition-colors duration-200"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/40 text-white bg-transparent cursor-pointer hover:bg-white/20 transition-colors duration-200"
            >
              →
            </button>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-lg border-none cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Visit Site
          </button>

          <div className="flex justify-center md:justify-end mt-20">
            <GithubButton href="https://github.com/samirhusayn28-dev/StudioXenos" />
          </div>
        </div>

      </div>
    </section>
  );
}