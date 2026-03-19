import React, { useState } from 'react';
import logo from '../components/assets/StudioX.png';

const navLinks = [
  { label: 'Home',        id: 'home'        },
  { label: 'Services',    id: 'services'    },
  { label: 'How we work', id: 'how-we-work' },
  { label: 'About',       id: 'about'       },
  { label: 'Contact',     id: 'contact'     },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
<nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-1" style={{ background: '#000000' }}>
      <div className="flex items-center justify-between">
        <img src={logo} alt="StudioX" className="h-12 md:h-20 w-auto" />
        <ul className="hidden md:flex gap-9 list-none m-0 p-0">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                className="text-white/70 no-underline text-sm tracking-wide cursor-pointer transition-all duration-200 hover:text-white hover:bg-white/30 hover:border-white px-3 py-1.5 rounded-md border border-transparent"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-px border-none"
          style={{ fontFamily: "'DM Sans', sans-serif" }} >
          Book a Call
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 bg-black/80 rounded-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              className="text-white/80 hover:text-white no-underline text-sm tracking-wide cursor-pointer transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-200 border-none w-full"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Book a Call
          </button>
        </div>
      )}
    </nav>
  );
}