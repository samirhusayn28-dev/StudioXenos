import React, { useState } from 'react';

export default function FacebookButton({ href = '#' }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: 'none',
          borderRadius: hovered ? '30px' : '50%',
          width: hovered ? '110px' : '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          background: '#1877f2',
          overflow: 'hidden',
          transition: 'width 0.4s, border-radius 0.4s',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.5em"
          viewBox="0 0 24 24"
          style={{ transition: 'opacity 0.3s', opacity: hovered ? 0 : 1, flexShrink: 0 }}
        >
          <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span style={{
          position: 'absolute',
          color: 'white',
          width: '120px',
          fontWeight: '600',
          fontSize: '14px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }}>
          Facebook
        </span>
      </button>
    </a>
  );
}