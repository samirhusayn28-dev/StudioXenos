'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';
import MailButton from './MailButton';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from '../components/Instagrambutton';
import FacebookButton from '../components/Facebookbutton';
import LinkedInButton from '../components/Linkedinbutton';
import { useContactModal } from './ContactModal';
import faqData from '../data/faq.json';

const robot = '/assets/Footer Robot.png';
const xLogo = '/assets/X Logo.png';

const footerStyles = `
  @keyframes arrowFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .footer-root {
    position: relative;
    overflow: hidden;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    box-sizing: border-box;
    background: transparent;
    contain: paint style;
    font-family: var(--font-outfit), sans-serif;
  }

  .footer-divider-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.06);
    z-index: 3;
  }

  .footer-dither-wrap { position: absolute; inset: 0; z-index: 0; }
  .footer-dither-overlay {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
  }

  .footer-content { 
    background: rgba(255, 255, 255, 0.85); 
    padding-top: 40px; 
    position: relative; 
    z-index: 2; 
    width: 100%; 
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    will-change: transform;
    transform: translate3d(0, 0, 0);
    contain: paint style;
  }

  .footer-glow {
    position: absolute; top: -100px; left: 50%; transform: translate3d(-50%, 0, 0);
    width: 700px; height: 300px;
    background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 1;
  }

  .faq-section {
    position: relative;
    z-index: 2;
    max-width: 1100px;
    margin: 0 auto 30px;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    contain: paint style;
  }

  .faq-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .faq-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-outfit), sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #2563eb;
    background: rgba(37, 99, 235, 0.07);
    border: 1px solid rgba(37, 99, 235, 0.18);
    border-radius: 6px;
    padding: 5px 14px;
    margin-bottom: 18px;
  }

  .faq-eyebrow-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #2563eb;
    flex-shrink: 0;
  }

  .faq-title {
    font-family: var(--font-outfit), sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
    font-size: clamp(32px, 5vw, 46px);
    color: #0f172a;
  }

  .faq-title-blue {
    color: #2563eb;
  }

  .faq-subtitle {
    font-family: var(--font-outfit), sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #64748b;
    margin: 0 auto;
    max-width: 420px;
    line-height: 1.6;
  }

  .faq-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    align-items: start;
  }

  .faq-item {
    position: relative;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  .faq-item::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: #2563eb;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .faq-item.active::before {
    transform: scaleY(1);
  }

  .faq-item:hover {
    transform: translate3d(0, -3px, 0);
    border-color: rgba(37, 99, 235, 0.22);
    box-shadow: 0 14px 32px rgba(37, 99, 235, 0.06);
  }

  .faq-item.active {
    border-color: rgba(37, 99, 235, 0.3);
    background: linear-gradient(180deg, rgba(37,99,235,0.03) 0%, #ffffff 60%);
    box-shadow: 0 16px 36px rgba(37, 99, 235, 0.08);
  }

  .faq-question-btn {
    width: 100%;
    padding: 22px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
    color: #0f172a;
    font-family: var(--font-outfit), sans-serif;
    font-size: 15px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    gap: 16px;
  }

  .faq-question-text {
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex: 1;
  }

  .faq-number {
    font-size: 12px;
    font-weight: 700;
    color: #2563eb;
    letter-spacing: 0.05em;
  }

  .faq-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.08);
    color: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, color 0.2s ease;
  }

  .faq-icon svg {
    width: 14px;
    height: 14px;
  }

  .faq-item.active .faq-icon {
    transform: rotate(180deg);
    background-color: #2563eb;
    color: #ffffff;
  }

  .faq-answer {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, padding 0.35s ease;
    padding: 0 24px;
  }

  .faq-item.active .faq-answer {
    max-height: 200px;
    opacity: 1;
    padding: 0 24px 22px;
  }

  .faq-answer-text {
    font-family: var(--font-outfit), sans-serif;
    font-size: 14px;
    line-height: 1.65;
    color: #64748b;
    margin: 0;
    border-top: 1px dashed rgba(0, 0, 0, 0.08);
    padding-top: 14px;
  }

  .faq-footer-divider {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.15) 30%, rgba(37, 99, 235, 0.15) 70%, transparent 100%);
    margin: 40px auto 0;
    max-width: 1100px;
    width: calc(100% - 32px);
  }

  .footer-main-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .footer-brand-desc {
    font-family: var(--font-outfit), sans-serif;
    font-size: 13.5px;
    color: #64748b;
    line-height: 1.6;
    margin: 0 0 20px;
    max-width: 280px;
  }

  .footer-col-title {
    font-family: var(--font-outfit), sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #0f172a;
    margin: 0 0 16px;
  }

  .footer-nav-btn {
    background: none;
    border: none;
    padding: 0;
    font-family: var(--font-outfit), sans-serif;
    font-size: 13.5px;
    color: #64748b;
    cursor: pointer;
    text-align: left;
    transition: color 0.15s ease;
  }

  .footer-nav-btn:hover {
    color: #2563eb;
  }

  .footer-area-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }

  .footer-robot-wrap {
    animation: arrowFloat 3s ease-in-out infinite;
    will-change: transform;
  }

  .footer-contact-btn {
    font-family: var(--font-outfit), sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: #2563eb;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    will-change: transform;
    white-space: nowrap;
  }

  .footer-contact-btn:hover {
    transform: translate3d(0, -2px, 0);
    background-color: #1d4ed8;
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
  }

  .footer-divider-bottom {
    border: none;
    height: 1px;
    background: rgba(0, 0, 0, 0.06);
    margin: 40px auto 0;
    max-width: 1200px;
    width: calc(100% - 48px);
  }

  @media (max-width: 900px) {
    .faq-container { grid-template-columns: 1fr; }
    .footer-main-grid {
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    .footer-area-brand { grid-column: span 2; }
    .footer-area-cta { grid-column: span 2; }
  }

  @media (max-width: 550px) {
    .footer-main-grid { grid-template-columns: 1fr; gap: 24px; }
    .footer-area-brand, .footer-area-cta { grid-column: span 1; }
  }
`;

const footerLinks = {
    l1: { title: 'Our Products', links: ['Uni School', 'Dife Holdings', 'Fresh Wash 360'] },
    l2: { title: 'About Us', links: ['Our Story', 'Our Partners', 'Contact Us'] },
    l3: { title: 'Careers', links: ['Join Our Team', 'Events', 'News'] },
};

const styles = {
    brandLogo: { width: '36px', height: '36px', objectFit: 'contain', marginBottom: '16px' },
    mailWrap: { marginBottom: '10px' },
    whatsappWrap: { marginBottom: '20px' },
    socialTitle: { marginBottom: '12px' },
    socialRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    linksList: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' },
    robotImg: { width: '95px', objectFit: 'contain' },
    bottomBar: {
        padding: '24px 24px 0', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', maxWidth: '1200px',
        margin: '0 auto', flexWrap: 'wrap', gap: '8px', boxSizing: 'border-box',
    },
    copyright: { fontFamily: "var(--font-outfit), sans-serif", fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 400 },
    crafted: {
        fontFamily: "var(--font-outfit), sans-serif", fontSize: '12px', fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b', margin: 0,
    },
    footerRoot: { padding: '56px 0 24px' },
};

function Footer() {
    const { openModal } = useContactModal();
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = useCallback((index) => {
        setActiveFaq(prev => (prev === index ? null : index));
    }, []);

    const linkColumns = useMemo(
        () => Object.values(footerLinks).map(({ title, links }, i) => (
            <div key={i} className={`footer-area-l${i + 1}`}>
                <p className="footer-col-title">{title}</p>
                <ul style={styles.linksList}>
                    {links.map(link => (
                        <li key={link}><button className="footer-nav-btn">{link}</button></li>
                    ))}
                </ul>
            </div>
        )),
        []
    );

    return (
        <footer className="footer-root" style={styles.footerRoot}>
            <style>{footerStyles}</style>

            <div className="footer-dither-overlay" />
            <div className="footer-glow" />
            <div className="footer-divider-top" />

            <div className="faq-section sx-anim sx-fade-up">
                <div className="faq-header">
                    <span className="faq-eyebrow">
                        <span className="faq-eyebrow-dot" />
                        Got Questions?
                    </span>
                    <h2 className="faq-title">
                        Frequently Asked <span className="faq-title-blue">Questions</span>
                    </h2>
                    <p className="faq-subtitle">
                        Everything you need to know about working with Studio Xenos, answered.
                    </p>
                </div>

                <div className="faq-container">
                    {faqData.map((item, index) => {
                        const isActive = activeFaq === index;
                        return (
                            <div key={index} className={`faq-item ${isActive ? 'active' : ''}`}>
                                <button
                                    className="faq-question-btn"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isActive}
                                >
                                    <span className="faq-question-text">
                                        <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                                        <span>{item.question}</span>
                                    </span>
                                    <span className="faq-icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </button>
                                <div className="faq-answer">
                                    <p className="faq-answer-text">{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <hr className="faq-footer-divider" />

            <div className="footer-content">
                <div className="footer-main-grid">
                    <div className="footer-area-brand">
                        <Image src={xLogo} alt="StudioX" width={36} height={36} style={styles.brandLogo} />
                        <p className="footer-brand-desc">
                            Building digital products for the next generation of startups and enterprises.
                        </p>
                        <div className="footer-desktop-contact">
                            <div style={styles.mailWrap}><MailButton href="mailto:contact@studioxenos.com" /></div>
                            <div style={styles.whatsappWrap}><WhatsAppButton href="https://wa.me/" /></div>
                        </div>
                        <p className="footer-col-title" style={styles.socialTitle}>Social Media</p>
                        <div style={styles.socialRow}>
                            <InstagramButton href="https://www.instagram.com/develloop?igsh=OXluOWx2YTdkM2Ex&igsi=OXluOWx2YTdkM2Ex" />
                            <FacebookButton href="https://www.facebook.com/profile.php?id=61592492623869" />
                            <LinkedInButton href="https://www.linkedin.com/company/studio-xenos/" />
                        </div>
                    </div>

                    {linkColumns}

                    <div className="footer-area-cta">
                        <div className="footer-robot-wrap">
                            <Image src={robot} alt="Robot" width={95} height={95} style={styles.robotImg} />
                        </div>
                        <button className="footer-contact-btn" onClick={openModal}>
                            Contact Us →
                        </button>
                    </div>
                </div>

                <hr className="footer-divider-bottom" />
                <div className="footer-bottom-bar" style={styles.bottomBar}>
                    <p style={styles.copyright}>
                        © 2026 Studioxenos.com — All Rights Reserved
                    </p>
                    <p style={styles.crafted}>
                        Crafted with precision
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default memo(Footer);