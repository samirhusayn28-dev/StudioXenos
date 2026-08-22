import React, { useState, useEffect, useCallback, memo } from 'react';

const EXPANDED_WIDTH = 110;
const COLLAPSED_WIDTH = 45;

const facebookButtonStyles = `
  .fb-btn-link {
    text-decoration: none;
  }
  .fb-btn {
    border: none;
    border-radius: 8px;
    width: ${COLLAPSED_WIDTH}px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    position: relative;
    background: #1877f2;
    overflow: hidden;
    padding: 0;
    transform-origin: left center;
    transform: scaleX(1);
    will-change: transform;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .fb-btn-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${COLLAPSED_WIDTH}px;
    height: 45px;
    flex-shrink: 0;
    transform: scaleX(1);
    transform-origin: left center;
  }
  .fb-btn-icon {
    transition: opacity 0.3s;
    opacity: 1;
    flex-shrink: 0;
  }
  .fb-btn-text {
    position: absolute;
    left: ${COLLAPSED_WIDTH}px;
    color: white;
    white-space: nowrap;
    fontWeight: 600;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.4s;
    transform: scaleX(1);
    transform-origin: left center;
  }

  /* Pure CSS Hover: Zero React re-renders on mouse enter/leave */
  @media (hover: hover) and (pointer: fine) {
    .fb-btn:hover {
      transform: scaleX(${EXPANDED_WIDTH / COLLAPSED_WIDTH});
    }
    .fb-btn:hover .fb-btn-icon-wrap {
      transform: scaleX(${COLLAPSED_WIDTH / EXPANDED_WIDTH});
    }
    .fb-btn:hover .fb-btn-icon {
      opacity: 0;
    }
    .fb-btn:hover .fb-btn-text {
      opacity: 1;
      transform: scaleX(${COLLAPSED_WIDTH / EXPANDED_WIDTH});
    }
  }
`;

function FacebookButton({ href = '#' }) {
    const [isMobile, setIsMobile] = useState(false);

    const checkMobile = useCallback(() => {
        const coarse = window.matchMedia('(pointer: coarse)').matches;
        setIsMobile(window.innerWidth <= 768 || coarse);
    }, []);

    useEffect(() => {
        checkMobile();
        let timeoutId;
        const debounced = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 150);
        };
        window.addEventListener('resize', debounced);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', debounced);
        };
    }, [checkMobile]);

    return (
        <>
            <style>{facebookButtonStyles}</style>
            <a href={href} target="_blank" rel="noreferrer" className="fb-btn-link">
                <button className="fb-btn">
                    <span className="fb-btn-icon-wrap">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.5em"
                            viewBox="0 0 24 24"
                            className="fb-btn-icon"
                        >
                            <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </span>
                    {!isMobile && (
                        <span className="fb-btn-text">
                            Facebook
                        </span>
                    )}
                </button>
            </a>
        </>
    );
}

export default memo(FacebookButton);
