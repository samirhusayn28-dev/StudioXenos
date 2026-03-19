import React, { useState } from 'react';

function MailButton({ href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        textDecoration: 'none',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.65)',
        transition: 'color 0.2s', paddingBottom: '2px',
        borderBottom: hovered ? '1px solid rgba(255,255,255,0.6)' : '1px solid transparent',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>info@studioxenos.co</span>
    </a>
  );
}

export default MailButton;