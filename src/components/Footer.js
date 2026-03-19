import React from 'react';
import robot from './assets/Footer Robot.png';
import xLogo from './assets/X Logo.png';
import MailButton from './MailButton';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from '../components/Instagrambutton';
import FacebookButton from '../components/Facebookbutton';
import LinkedInButton from '../components/Linkedinbutton';

const footerLinks = {
  'Our Products': ['Uni School', 'Dife Holdings', 'Fresh Wash 360'],
  'About Us':     ['Our Story',  'Our Partners',  'Contact Us'   ],
  'Careers':      ['Join Our Team', 'Events',      'News'         ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 pt-14 pb-7 px-6 md:px-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 max-w-6xl mx-auto mb-10">

        <div className="sm:col-span-2 md:col-span-1">
          <div className="mb-6">
            <img src={xLogo} alt="X Logo" className="w-8 h-8 object-contain" />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <MailButton href="/" />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <WhatsAppButton href="/" />
          </div>

          <p className="text-white font-bold text-sm mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Our Social Media
          </p>
          <div className="flex gap-3">
            <InstagramButton href="https://instagram.com" />
            <FacebookButton href="https://facebook.com" />
            <LinkedInButton href="https://linkedin.com" />
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-white font-bold text-base mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
              {title}
            </h4>
            <ul className="list-none m-0 p-0 space-y-3">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm no-underline transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex items-center justify-center sm:justify-start md:justify-center">
          <img src={robot} alt="Robot" className="w-28 h-28 md:w-36 md:h-36 object-contain" />
        </div>

      </div>

      <div className="border-t border-white/5 pt-5 text-center max-w-6xl mx-auto">
        <p className="text-slate-500 text-xs m-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          © 2025 Studioxenos.com All Rights Reserved
        </p>
      </div>

    </footer>
  );
}