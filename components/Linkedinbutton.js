import React, { memo } from 'react';

const linkedinStyles = `
  .in-btn-link {
    text-decoration: none;
    display: inline-block;
  }
  .in-btn {
    border: none;
    border-radius: 8px;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    background: #0077b5;
    overflow: hidden;
    transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease;
    will-change: width, transform;
    padding: 0;
  }
  .in-btn-icon {
    transition: opacity 0.25s ease, transform 0.25s ease;
    flex-shrink: 0;
    opacity: 1;
  }
  .in-btn-text {
    position: absolute;
    color: white;
    font-weight: 600;
    font-size: 13.5px;
    opacity: 0;
    white-space: nowrap;
    transition: opacity 0.3s ease;
    pointer-events: none;
    font-family: var(--font-outfit), sans-serif;
  }
  @media (hover: hover) and (pointer: fine) {
    .in-btn:hover {
      width: 110px;
      transform: translate3d(0, -2px, 0);
    }
    .in-btn:hover .in-btn-icon {
      opacity: 0;
      transform: scale(0.8);
    }
    .in-btn:hover .in-btn-text {
      opacity: 1;
    }
  }
`;

function LinkedInButton({ href = '#' }) {
  return (
    <>
      <style>{linkedinStyles}</style>
      <a href={href} target="_blank" rel="noreferrer" className="in-btn-link" aria-label="LinkedIn">
        <button className="in-btn" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.4em"
            viewBox="0 0 24 24"
            className="in-btn-icon"
          >
            <path fill="white" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="in-btn-text">LinkedIn</span>
        </button>
      </a>
    </>
  );
}

export default memo(LinkedInButton);