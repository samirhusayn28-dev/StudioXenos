/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

//   .card-code-tag {
//     font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, Menlo, monospace;
//     font-size: 24px;
//     font-weight: 800;
//     line-height: 1;
//     color: var(--ot-accent-dev);
//   }

//   .card-name {
//     color: var(--text-primary, #ffffff);
//     font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, Menlo, monospace;
//     font-size: 15px;
//     font-weight: 700;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     line-height: 1.35;
//     margin-top: 14px;
//     margin-bottom: 6px;
//   }

//   .card-name-line { display: block; }

//   .card-dev .card-name { color: var(--ot-accent-dev); font-size: 16px; font-weight: 800; }
//   .card-design .card-name { color: var(--ot-accent-design); font-size: 16px; font-weight: 800; }
//   .card-marketing .card-name { color: var(--ot-accent-marketing); font-size: 16px; font-weight: 800; }

//   .card-role {
//     color: var(--text-sub, rgba(255,255,255,0.55));
//     font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, Menlo, monospace;
//     font-size: 11.5px;
//     font-weight: 500;
//     letter-spacing: 0.3px;
//     margin-bottom: 20px;
//   }

//   .card-divider {
//     width: 32px;
//     height: 1px;
//     background: var(--glass-border, rgba(255,255,255,0.2));
//     margin-bottom: 18px;
//   }

//   .card-socials {
//     display: flex;
//     gap: 16px;
//     margin-top: auto;
//   }

//   .card-socials-btn {
//     width: 22px;
//     height: 22px;
//     border: none;
//     background: transparent;
//     cursor: pointer;
//     color: var(--text-primary, #ffffff);
//     opacity: 0.55;
//     transition: opacity 0.2s ease, transform 0.2s ease;
//   }

//   .card-socials-btn svg {
//     width: 100%;
//     height: 100%;
//     fill: currentColor;
//   }

//   .card-socials-btn:hover {
//     opacity: 1;
//     transform: translateY(-3px);
//   }
// `;

// function RoleIcon({ type }) {
//     if (type === 'dev') {
//         return <span className="card-code-tag">{'</>'}</span>;
//     }
//     if (type === 'design') {
//         return (
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M2 2l7.586 7.586" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
//                 <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
//             </svg>
//         );
//     }
//     return (
//         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M3 11v2a2 2 0 002 2h1l1 5h2l-1-5h2l7 4V6l-7 4H6a2 2 0 00-2 2H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
//             <path d="M17 9a3 3 0 010 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
//         </svg>
//     );
// }

// // Each type gets one icon "stamped" at several hand-placed positions/rotations/scales
// // inside a 260x260 tile, so the repeat reads as scattered rather than a grid.
// // {{C}} gets swapped for the role's accent color (theme-aware) at render time.
// const ICON_PATHS = {
//     dev: `<text x='0' y='16' font-family='ui-monospace, SFMono-Regular, Consolas, Menlo, monospace' font-weight='700' font-size='15' fill='{{C}}'>&lt;/&gt;</text>`,
//     design: `<g fill='none' stroke='{{C}}' stroke-width='1.6'><path d='M12 19l7-7 3 3-7 7-3-3z'/><path d='M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z'/><circle cx='11' cy='11' r='2'/></g>`,
//     marketing: `<g fill='none' stroke='{{C}}' stroke-width='1.6'><path d='M3 11v2a2 2 0 002 2h1l1 5h2l-1-5h2l7 4V6l-7 4H6a2 2 0 00-2 2H3z'/><path d='M17 9a3 3 0 010 6'/></g>`,
// };

// // Matches the CSS accent overrides above so the pattern stays legible on both themes.
// const ACCENT_COLOR = {
//     dark: { dev: '#58dcb4', design: '#b48cff', marketing: '#ff965a' },
//     light: { dev: '#0e9678', design: '#7c3aed', marketing: '#d9540a' },
// };

// const SCATTER = [
//     { x: 10, y: 12, r: -18, s: 0.75 }, { x: 60, y: 5, r: 10, s: 0.5 },
//     { x: 110, y: 18, r: -25, s: 0.65 }, { x: 165, y: 6, r: 15, s: 0.85 },
//     { x: 220, y: 22, r: -10, s: 0.55 }, { x: 250, y: 60, r: 20, s: 0.7 },
//     { x: 30, y: 60, r: 22, s: 0.6 }, { x: 85, y: 55, r: -15, s: 0.9 },
//     { x: 140, y: 70, r: 8, s: 0.5 }, { x: 195, y: 65, r: -22, s: 0.75 },
//     { x: 15, y: 110, r: 12, s: 0.65 }, { x: 65, y: 115, r: -8, s: 0.55 },
//     { x: 120, y: 105, r: 25, s: 0.8 }, { x: 175, y: 120, r: -18, s: 0.6 },
//     { x: 230, y: 110, r: 14, s: 0.7 }, { x: 40, y: 160, r: -20, s: 0.7 },
//     { x: 95, y: 165, r: 18, s: 0.5 }, { x: 150, y: 155, r: -10, s: 0.85 },
//     { x: 205, y: 170, r: 22, s: 0.6 }, { x: 250, y: 150, r: -15, s: 0.75 },
//     { x: 20, y: 210, r: 15, s: 0.6 }, { x: 75, y: 220, r: -25, s: 0.5 },
//     { x: 130, y: 205, r: 10, s: 0.7 }, { x: 185, y: 225, r: -12, s: 0.85 },
//     { x: 235, y: 215, r: 20, s: 0.55 },
// ];

// function patternBg(type, theme) {
//     const palette = ACCENT_COLOR[theme] || ACCENT_COLOR.dark;
//     const iconMarkup = ICON_PATHS[type].split('{{C}}').join(palette[type]);
//     const uses = SCATTER
//         .map(
//             (p) =>
//                 `<use href='#i' opacity='${theme === 'light' ? 0.28 : 0.35}' transform='translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})'/>`
//         )
//         .join('');
//     const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><defs><g id='i'>${iconMarkup}</g></defs>${uses}</svg>`;
//     return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
// }

// function TeamCard({ member, theme }) {
//     return (
//         <div className={`card card-${member.type}`}>
//             <div className="card-pattern" style={{ backgroundImage: patternBg(member.type, theme) }} />
//             <div className="card-content">
//                 <div className="card-icon">
//                     <RoleIcon type={member.type} />
//                 </div>
//                 <div className="card-name">
//                     {member.name.split(' ').map((word, i) => (
//                         <span className="card-name-line" key={i}>{word}</span>
//                     ))}
//                 </div>
//                 <div className="card-role">{member.role}</div>
//                 <div className="card-divider" />
//                 <div className="card-socials">
//                     <a className="card-socials-btn" href={member.facebook} target="_blank" rel="noreferrer">
//                         <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path>
//                         </svg>
//                     </a>
//                     <a className="card-socials-btn" href={member.github} target="_blank" rel="noreferrer">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                             <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
//                         </svg>
//                     </a>
//                     <a className="card-socials-btn" href={member.linkedin} target="_blank" rel="noreferrer">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                             <path d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"></path>
//                         </svg>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function OurTeam() {
//     const theme = useAppTheme();

//     return (
//         <section id="our-team" className="ot-section">
//             <style>{css}</style>
//             <div className="ot-heading">The People</div>
//             <h2 className="ot-title">Our Team</h2>
//             <div className="ot-wrap">
//                 {team.map((member, i) => (
//                     <TeamCard key={i} member={member} theme={theme} />
//                 ))}
//             </div>
//         </section>
//     );
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryBlue: '#2563eb',
                lightBg: '#f0f4f9',
            },
        },
    },
    plugins: [],
}