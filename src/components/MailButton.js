import React, { useState, useCallback, useMemo, memo } from 'react';

const styles = {
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: 'color 0.2s',
    paddingBottom: '2px',
    willChange: 'color',
  },
  text: {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '14px',
  },
};

const MailIcon = memo(function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
});

function MailButton({ href }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const linkStyle = useMemo(() => {
    return {
      ...styles.link,
      color: hovered ? '#fff' : 'rgba(255,255,255,0.65)',
      borderBottom: hovered ? '1px solid rgba(255,255,255,0.6)' : '1px solid transparent',
    };
  }, [hovered]);

  return (
    <a href={href} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={linkStyle}>
      <MailIcon />
      <span style={styles.text}>info@studioxenos.co</span>
    </a>
  );
}

export default memo(MailButton);