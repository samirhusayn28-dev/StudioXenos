import React from 'react';
import logo from '../components/assets/StudioX.png';

const navLinks = [
  { label: 'Home',        id: 'home'        },
  { label: 'Services',    id: 'services'    },
  { label: 'How we work', id: 'how-we-work' },
  { label: 'About',       id: 'about'       },
  { label: 'Contact',     id: 'contact'     },
];

export default function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5">
      <div>
        <img src={logo} alt="StudioX" className="h-20 w-auto" />
        </div>

      <ul className="flex gap-9 list-none m-0 p-0">
        {navLinks.map(({ label, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              className="text-white/80 no-underline text-sm tracking-wide cursor-pointer transition-colors duration-200 hover:text-white"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollTo('contact')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-px border-none"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Book a Call
      </button>
    </nav>
  );
}