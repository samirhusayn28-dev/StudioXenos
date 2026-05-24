import { useEffect, useState } from 'react';

const toggleStyles = `
  .st-toggle-label {
    width: 2.2em;
    position: relative;
    cursor: pointer;
    display: inline-block;
    color: rgba(255,255,255,0.75);
  }
  .st-toggle-input {
    opacity: 0;
    width: 100%;
    aspect-ratio: 1;
    margin: 0;
    cursor: pointer;
  }
  .st-toggle-label svg {
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
    transition: transform 0.4s ease;
    transform: rotate(40deg);
  }
  .st-toggle-label svg .sunMoon {
    transform-origin: center center;
    transition: transform 0.4s ease;
    transform: scale(1);
  }
  .st-toggle-label svg .sunRay {
    transform-origin: center center;
    transform: scale(0);
  }
  .st-toggle-label svg mask > circle {
    transition: transform 0.64s cubic-bezier(0.41,0.64,0.32,1.575);
    transform: translate(0px,0px);
  }
  .st-toggle-label svg .sunRay2 { animation-delay: 0.05s; }
  .st-toggle-label svg .sunRay3 { animation-delay: 0.10s; }
  .st-toggle-label svg .sunRay4 { animation-delay: 0.17s; }
  .st-toggle-label svg .sunRay5 { animation-delay: 0.25s; }
  .st-toggle-label svg .sunRay6 { animation-delay: 0.29s; }

  .st-toggle-label.is-light svg               { transform: rotate(90deg); }
  .st-toggle-label.is-light svg mask > circle { transform: translate(16px,-3px); }
  .st-toggle-label.is-light svg .sunMoon      { transform: scale(0.55); }
  .st-toggle-label.is-light svg .sunRay       { animation: showRay 0.4s ease 0s 1 forwards; }

  @keyframes showRay {
    0%   { transform: scale(0); }
    100% { transform: scale(1); }
  }
`;

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <>
      <style>{toggleStyles}</style>
      <label
        className={`st-toggle-label${isDark ? '' : ' is-light'}`}
        onClick={() => setIsDark(p => !p)}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        <input
          type="checkbox"
          className="st-toggle-input"
          checked={!isDark}
          onChange={() => setIsDark(p => !p)}
        />
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" stroke="none">
          <defs>
            <mask id="moon-mask-toggle">
              <rect x="0" y="0" width="20" height="20" fill="white" />
              <circle cx="11" cy="3" r="8" fill="black" />
            </mask>
          </defs>
          <circle className="sunMoon" cx="10" cy="10" r="8" mask="url(#moon-mask-toggle)" />
          <g>
            <circle className="sunRay sunRay1" cx="18" cy="10"     r="1.5" />
            <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5" />
            <circle className="sunRay sunRay3" cx="6"  cy="16.928" r="1.5" />
            <circle className="sunRay sunRay4" cx="2"  cy="10"     r="1.5" />
            <circle className="sunRay sunRay5" cx="6"  cy="3.1718" r="1.5" />
            <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5" />
          </g>
        </svg>
      </label>
    </>
  );
}