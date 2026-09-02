import React, { memo } from 'react';

const mailStyles = `
  .mail-btn-link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.65);
    transition: color 0.2s ease, border-color 0.2s ease;
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;
    font-family: var(--font-outfit), sans-serif;
    font-size: 14px;
    will-change: color;
  }
  .mail-btn-link:hover {
    color: #ffffff;
    border-bottom-color: rgba(255, 255, 255, 0.6);
  }
`;

function MailButton({ href = 'mailto:contact@studioxenos.com' }) {
  return (
    <>
      <style>{mailStyles}</style>
      <a href={href} className="mail-btn-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span>info@studioxenos.co</span>
      </a>
    </>
  );
}

export default memo(MailButton);