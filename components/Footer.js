'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
const robot = '/assets/Footer Robot.png';
const xLogo = '/assets/X Logo.png';
import MailButton from './MailButton';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from '../components/Instagrambutton';
import FacebookButton from '../components/Facebookbutton';
import LinkedInButton from '../components/Linkedinbutton';
import { useContactModal } from './ContactModal';

const faqData = [
    {
        question: 'What services does Studio Xenos provide?',
        answer: 'We specialize in full-stack web development, custom UI/UX design, mobile application development, and digital marketing strategies tailored for startups and scaling enterprises.'
    },
    {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on scope and complexity. A standard web application or design system typically takes between 4 to 8 weeks from initial design to final launch.'
    },
    {
        question: 'Do you offer ongoing maintenance and support?',
        answer: 'Yes! We provide post-launch maintenance, security updates, feature expansions, and technical support plans to keep your platform running smoothly.'
    },
    {
        question: 'How can we kick off a new project with you?',
        answer: 'Simply click the "Contact Us" button in the footer below or send us an email. We will schedule a discovery call to discuss your goals, timeline, and budget.'
    },
    {
        question: 'Which technologies do you work with?',
        answer: 'Our stack centers on React, Next.js, and modern backend frameworks, paired with cloud infrastructure like AWS and Vercel for scalable, production-ready deployments.'
    },
    {
        question: 'Can you redesign an existing website or app?',
        answer: 'Absolutely. We audit your current product, identify friction points, and rebuild the experience with improved performance, accessibility, and a refreshed visual identity.'
    }
];

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

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
    transform: translateZ(0);
    contain: paint style;
  }

  .footer-glow {
    position: absolute; top: -100px; left: 50%; transform: translateX(-50%) translateZ(0);
    width: 700px; height: 300px;
    background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 1;
  }

  /* ── FAQ SECTION STYLES ── */
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
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #2563eb;
    background: rgba(37, 99, 235, 0.07);
    border: 1px solid rgba(37, 99, 235, 0.18);
    border-radius: 999px;
    padding: 6px 16px;
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
    font-family: 'Outfit', sans-serif;
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
    font-family: 'Outfit', sans-serif;
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
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.03);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    will-change: transform;
    transform: translateZ(0);
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
    transform: translateY(-3px) translateZ(0);
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
    font-family: 'Outfit', sans-serif;
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
  }

  .faq-number {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: rgba(37, 99, 235, 0.35);
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }

  .faq-item.active .faq-number {
    color: #2563eb;
  }

  .faq-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.04);
    border: 1px solid rgba(15, 23, 42, 0.08);
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  }

  .faq-icon svg {
    width: 12px;
    height: 12px;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .faq-item.active .faq-icon {
    transform: rotate(180deg);
    background: #2563eb;
    border-color: #2563eb;
    color: #ffffff;
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease, padding 0.35s ease;
    padding: 0 24px;
  }

  .faq-item.active .faq-answer {
    max-height: 250px;
    padding: 0 24px 22px 24px;
  }

  .faq-answer-text {
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: #64748b;
    line-height: 1.7;
    margin: 0;
    padding-top: 14px;
    padding-left: 24px;
    border-top: 1px solid rgba(15, 23, 42, 0.06);
  }

  .faq-footer-divider {
    max-width: 1200px;
    margin: 0 auto 40px;
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%);
  }

  .footer-col-title {
    font-family: 'Outfit', sans-serif;
    font-size: 12px; 
    font-weight: 800;
    text-transform: uppercase; 
    letter-spacing: 0.12em;
    color: #0f172a; 
    margin-bottom: 20px; 
    margin-top: 0;
  }

  .footer-nav-btn {
    font-family: 'Outfit', sans-serif; 
    font-size: 14px; 
    font-weight: 400;
    color: #64748b; 
    background: none; 
    border: none; 
    padding: 0;
    cursor: pointer; 
    text-align: left; 
    display: block;
    transition: color 0.2s ease, transform 0.2s ease; 
    line-height: 1;
    will-change: transform;
    transform: translateZ(0);
  }
  .footer-nav-btn:hover { color: #2563eb; transform: translateX(4px) translateZ(0); }

  .footer-divider-bottom {
    border: none; 
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin: 0; 
  }

  .footer-robot-wrap {
    position: relative; display: flex;
    align-items: flex-end; justify-content: center;
  }
  .footer-robot-wrap::before {
    content: ''; position: absolute; bottom: 0; left: 50%;
    transform: translateX(-50%) translateZ(0); width: 100px; height: 36px;
    background: radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%);
    filter: blur(8px);
  }
  .footer-robot-wrap img {
    position: relative; z-index: 1;
    filter: drop-shadow(0 8px 28px rgba(37,99,235,0.25));
    transition: transform 0.3s ease;
    will-change: transform;
    transform: translateZ(0);
  }
  .footer-robot-wrap:hover img { transform: translateY(-8px) translateZ(0); }

  .footer-contact-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 13px; 
    font-weight: 700; 
    letter-spacing: 0.04em;
    padding: 13px 32px; 
    border-radius: 999px; 
    cursor: pointer;
    border: 1px solid rgba(37, 99, 235, 0.2);
    background: #eff6ff;
    color: #2563eb;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    will-change: transform;
    transform: translateZ(0);
  }
  .footer-contact-btn:hover {
    background: #2563eb;
    color: #ffffff;
    transform: scale(1.04) translateZ(0);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
  }

  .footer-brand-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 400;
    color: #64748b; line-height: 1.6;
    max-width: 220px; margin-bottom: 20px;
  }

  .footer-main-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr 160px;
    grid-template-areas: "brand l1 l2 l3 cta";
    gap: 0;
    max-width: 1200px;
    margin: 0 auto 40px;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .footer-main-grid > div {
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    padding-right: 32px;
    margin-right: 32px;
  }
  .footer-main-grid > div:last-child {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
  }

  .footer-area-brand { grid-area: brand; align-self: start; }
  .footer-area-l1    { grid-area: l1;   align-self: start; }
  .footer-area-l2    { grid-area: l2;   align-self: start; }
  .footer-area-l3    { grid-area: l3;   align-self: start; }
  .footer-area-cta   {
    grid-area: cta;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  @media (max-width: 1100px) {
    .footer-main-grid {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        "brand l1 l2 l3"
        ". . cta cta";
      gap: 24px;
      align-items: start;
    }
    .footer-main-grid > div {
      border-right: none;
      padding-right: 0;
      margin-right: 0;
    }
    .footer-area-cta {
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
    .footer-brand-desc { display: none; }
  }

  @media (max-width: 768px) {
    .faq-container {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .footer-root { padding: 40px 0 20px !important; }
    .faq-section { margin-bottom: 30px; }
    .faq-question-btn { font-size: 14.5px; padding: 18px 20px; }
    .faq-answer-text { font-size: 13px; padding-left: 20px; }
    .faq-answer { padding: 0 20px; }
    .faq-item.active .faq-answer { padding: 0 20px 20px 20px; }

    .footer-main-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "brand brand"
        "l1 l2"
        "l3 cta";
      gap: 28px 20px;
      margin-bottom: 28px;
    }
    .footer-area-brand { padding-bottom: 4px; }
    .footer-area-cta {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 12px;
    }
    .footer-robot-wrap { display: none; }
    .footer-col-title  { font-size: 11px; margin-bottom: 12px; letter-spacing: 0.15em; }
    .footer-nav-btn    { font-size: 13px; }
    .footer-contact-btn {
      font-size: 12px;
      padding: 10px 22px;
      width: 100%;
      text-align: center;
    }
    .footer-brand-desc { display: none; }
    .footer-desktop-contact { display: none; }

    .footer-area-brand > div:last-child { gap: 8px !important; }
    .footer-area-brand > img { width: 32px !important; height: 32px !important; margin-bottom: 14px !important; }
  }

  @media (max-width: 480px) {
    .footer-root { padding: 32px 0 16px !important; }

    .contact-modal {
      padding: 24px 18px 20px;
      border-radius: 18px;
      margin: 0;
    }
    .modal-fields-grid { grid-template-columns: 1fr !important; }

    .footer-bottom-bar {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 4px !important;
    }

    .footer-main-grid {
      grid-template-columns: 1fr 1fr;
      gap: 24px 16px;
    }

    .footer-nav-btn { font-size: 12.5px; }
    ul[style] { gap: 10px !important; }

    .modal-submit-btn { width: 100%; }
    .modal-warning { text-align: left; font-size: 12px; }
  }

  @media (max-width: 360px) {
    .footer-main-grid {
      grid-template-columns: 1fr;
      grid-template-areas: "brand" "l1" "l2" "l3" "cta";
      gap: 20px;
    }
    .footer-area-cta {
      align-items: flex-start;
    }
    .footer-contact-btn { width: auto; }

    .contact-modal { padding: 20px 14px 18px; }
  }
`;

const footerLinks = {
    l1: { title: 'Our Products', links: ['Uni School', 'Dife Holdings', 'Fresh Wash 360'] },
    l2: { title: 'About Us', links: ['Our Story', 'Our Partners', 'Contact Us'] },
    l3: { title: 'Careers', links: ['Join Our Team', 'Events', 'News'] },
};

const styles = {
    successIconWrap: {
        width: '56px', height: '56px', borderRadius: '50%',
        background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
    },
    successTitle: {
        fontFamily: "'Outfit', sans-serif",
        fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 900,
        textTransform: 'uppercase', lineHeight: 1.1,
        color: '#0f172a', marginBottom: '14px',
    },
    successBody: {
        fontFamily: "'Outfit', sans-serif", fontSize: '14px',
        fontWeight: 400, color: '#64748b',
        lineHeight: 1.6, maxWidth: '340px', margin: '0 auto',
    },
    headingWrap: { marginBottom: '28px' },
    headingTitle: {
        fontFamily: "'Outfit', sans-serif",
        fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900,
        textTransform: 'uppercase', lineHeight: 1.1,
        color: '#0f172a', marginBottom: '8px',
    },
    headingGradient: {
        color: '#2563eb',
    },
    headingSub: {
        fontFamily: "'Outfit', sans-serif", fontSize: '14px',
        fontWeight: 400, color: '#64748b', margin: 0,
    },
    fieldsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' },
    textarea: { marginBottom: '20px', display: 'block' },
    footerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' },
    warning: { margin: 0, textAlign: 'left' },
    submitBtn: { marginLeft: 'auto' },
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
    copyright: { fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 400 },
    crafted: {
        fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b', margin: 0,
    },
    footerRoot: { padding: '56px 0 24px' },
};

export default function Footer() {
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
            <style dangerouslySetInnerHTML={{ __html: footerStyles }} />

            <div className="footer-dither-overlay" />
            <div className="footer-glow" />
            <div className="footer-divider-top" />

            {/* ── SECTION 1: FREQUENTLY ASKED QUESTIONS ── */}
            <div className="faq-section">
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

            {/* Separator Divider Line Between FAQ and Footer */}
            <hr className="faq-footer-divider" />

            {/* ── SECTION 2: FOOTER MAIN CONTENT ── */}
            <div className="footer-content">
                <div className="footer-main-grid">

                    {/* Brand */}
                    <div className="footer-area-brand">
                        <Image src={xLogo} alt="StudioX" width={36} height={36} style={styles.brandLogo} />
                        <p className="footer-brand-desc">
                            Building digital products for the next generation of startups and enterprises.
                        </p>
                        <div className="footer-desktop-contact">
                            <div style={styles.mailWrap}><MailButton href="/" /></div>
                            <div style={styles.whatsappWrap}><WhatsAppButton href="/" /></div>
                        </div>
                        <p className="footer-col-title" style={styles.socialTitle}>Social Media</p>
                        <div style={styles.socialRow}>
                            <InstagramButton href="https://www.instagram.com/develloop?igsh=OXluOWx2YTdkM2Ex&igsi=OXluOWx2YTdkM2Ex" />
                            <FacebookButton href="https://www.facebook.com/profile.php?id=61592492623869" />
                            <LinkedInButton href="https://www.linkedin.com/company/studio-xenos/" />
                        </div>
                    </div>

                    {linkColumns}

                    {/* Robot + CTA */}
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