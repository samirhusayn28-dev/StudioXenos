import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';

const EXPANDED_WIDTH = 110;
const COLLAPSED_WIDTH = 45;

function FacebookButton({ href = '#' }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(window.innerWidth <= 768 || coarse);
  }, []);

  useEffect(() => {
    checkMobile();
    // resize ko debounce kiya — continuous resize pe baar baar state update na ho
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

  // useCallback -> stable handler refs, mount pe sirf ek dafa banenge
  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const isExpanded = isMobile ? false : hovered;

  // useMemo -> style objects sirf tab rebuild hon jab dependencies badlein,
  // har render pe naya object nahi banega (JSX inline style === naya object every render)
  const buttonStyle = useMemo(() => ({
    border: 'none',
    borderRadius: '30px', // fixed rakha — border-radius transition bhi reflow trigger karta hai
    width: `${COLLAPSED_WIDTH}px`, // width FIXED — sirf transform se expand/collapse hoga
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    position: 'relative',
    background: '#1877f2',
    overflow: 'hidden',
    padding: 0,
    // transform-origin left rakha taake icon side se hi expand ho, center se nahi
    transformOrigin: 'left center',
    transform: isExpanded
      ? `scaleX(${EXPANDED_WIDTH / COLLAPSED_WIDTH})`
      : 'scaleX(1)',
    // GPU compositing hint
    willChange: 'transform',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [isExpanded]);

  // icon aur text ko counter-scale karna zaroori hai warna woh bhi stretch ho jaayenge
  const iconWrapperStyle = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${COLLAPSED_WIDTH}px`,
    height: '45px',
    flexShrink: 0,
    transform: isExpanded ? `scaleX(${COLLAPSED_WIDTH / EXPANDED_WIDTH})` : 'scaleX(1)',
    transformOrigin: 'left center',
  }), [isExpanded]);

  const iconStyle = useMemo(() => ({
    transition: 'opacity 0.3s',
    opacity: isExpanded ? 0 : 1,
    flexShrink: 0,
  }), [isExpanded]);

  const textStyle = useMemo(() => ({
    position: 'absolute',
    left: `${COLLAPSED_WIDTH}px`,
    color: 'white',
    whiteSpace: 'nowrap',
    fontWeight: 600,
    fontSize: '14px',
    opacity: isExpanded ? 1 : 0,
    transition: 'opacity 0.4s',
    transform: isExpanded ? `scaleX(${COLLAPSED_WIDTH / EXPANDED_WIDTH})` : 'scaleX(1)',
    transformOrigin: 'left center',
  }), [isExpanded]);

  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      <button
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        style={buttonStyle}
      >
        <span style={iconWrapperStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 24 24"
            style={iconStyle}
          >
            <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </span>
        {!isMobile && (
          <span style={textStyle}>
            Facebook
          </span>
        )}
      </button>
    </a>
  );
}

// memo -> parent re-render pe href same rahe to yeh re-render skip karega
export default memo(FacebookButton);