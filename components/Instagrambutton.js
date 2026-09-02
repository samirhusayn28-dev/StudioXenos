import React, { memo } from 'react';

const instagramStyles = `
  .ig-btn-link {
    text-decoration: none;
    display: inline-block;
  }
  .ig-btn {
    border: none;
    border-radius: 8px;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    overflow: hidden;
    transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease;
    will-change: width, transform;
    padding: 0;
  }
  .ig-btn-icon {
    transition: opacity 0.25s ease, transform 0.25s ease;
    flex-shrink: 0;
    opacity: 1;
  }
  .ig-btn-text {
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
    .ig-btn:hover {
      width: 110px;
      transform: translate3d(0, -2px, 0);
    }
    .ig-btn:hover .ig-btn-icon {
      opacity: 0;
      transform: scale(0.8);
    }
    .ig-btn:hover .ig-btn-text {
      opacity: 1;
    }
  }
`;

function InstagramButton({ href = '#' }) {
  return (
    <>
      <style>{instagramStyles}</style>
      <a href={href} target="_blank" rel="noreferrer" className="ig-btn-link" aria-label="Instagram">
        <button className="ig-btn" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.4em"
            viewBox="0 0 448 512"
            className="ig-btn-icon"
          >
            <path fill="white" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
          </svg>
          <span className="ig-btn-text">Instagram</span>
        </button>
      </a>
    </>
  );
}

export default memo(InstagramButton);