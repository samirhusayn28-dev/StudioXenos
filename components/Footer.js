'use client';

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import emailjs from '@emailjs/browser';
const robot = '/assets/Footer Robot.png';
const xLogo = '/assets/X Logo.png';
import MailButton from './MailButton';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from '../components/Instagrambutton';
import FacebookButton from '../components/Facebookbutton';
import LinkedInButton from '../components/Linkedinbutton';
import Dither from '../components/Dither';

const EMAILJS_SERVICE_ID = 'service_aimz3zm';
const EMAILJS_PUBLIC_KEY = 'nBS7HLI2w7Zq5t3gI';
const TEMPLATE_TO_COMPANY = 'template_wo2oyuf';
const TEMPLATE_TO_USER = 'template_ub2mpjv';

const DITHER_WAVE_COLOR = [0.08, 0.12, 0.28];

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
    background: rgba(255, 255, 255, 0.4); 
    backdrop-filter: blur(8px);
    padding-top: 40px; 
    position: relative; 
    z-index: 2; 
    width: 100%; 
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .footer-glow {
    position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
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
  }

  .faq-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .faq-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 999px;
    padding: 5px 14px 5px 10px;
    margin-bottom: 16px;
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #2563eb;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  .faq-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2563eb;
    box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
    flex-shrink: 0;
  }

  .faq-title {
    font-family: 'Outfit', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
    font-size: clamp(32px, 4.5vw, 52px);
    color: #0f172a;
  }

  .faq-title-blue {
    color: #2563eb;
  }

  .faq-wrapper-card {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  }

  /* 2 COLUMN GRID FOR FAQ */
  .faq-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    align-items: start;
  }

  .faq-item {
    background: #f8fafc;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    overflow: hidden;
    transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .faq-item.active {
    border-color: rgba(37, 99, 235, 0.3);
    background: #eff6ff;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.05);
  }

  .faq-question-btn {
    width: 100%;
    padding: 18px 20px;
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
    gap: 12px;
  }

  .faq-icon {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.2);
    color: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 15px;
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .faq-item.active .faq-icon {
    transform: rotate(45deg);
    background: rgba(37, 99, 235, 0.18);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), padding 0.35s ease;
    padding: 0 20px;
  }

  .faq-item.active .faq-answer {
    max-height: 200px;
    padding: 0 20px 18px 20px;
  }

  .faq-answer-text {
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: #475569;
    line-height: 1.6;
    margin: 0;
  }

  /* ── SEPARATOR LINE ABOVE FOOTER ── */
  .faq-footer-divider {
    max-width: 1200px;
    margin: 0 auto 40px;
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%);
  }

  /* ── FOOTER STYLES ── */
  .footer-col-title {
    font-family: 'Outfit', sans-serif;
    font-size: 12px; 
    font-weight: 800;
    text-transform: uppercase; 
    letter-spacing: 0.12em;
    color: #0f172a; 
    margin-bottom: 20px; 
    margin-top: 0;
    transition: color 0.4s ease;
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
  }
  .footer-nav-btn:hover { color: #2563eb; transform: translateX(4px); }

  .footer-divider-bottom {
    border: none; 
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin: 0; 
  }

  /* ── Robot ── */
  .footer-robot-wrap {
    position: relative; display: flex;
    align-items: flex-end; justify-content: center;
  }
  .footer-robot-wrap::before {
    content: ''; position: absolute; bottom: 0; left: 50%;
    transform: translateX(-50%); width: 100px; height: 36px;
    background: radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%);
    filter: blur(8px);
  }
  .footer-robot-wrap img {
    position: relative; z-index: 1;
    filter: drop-shadow(0 8px 28px rgba(37,99,235,0.25));
    transition: transform 0.4s ease;
    will-change: transform;
  }
  .footer-robot-wrap:hover img { transform: translateY(-8px); }

  /* ── Contact Button ── */
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
    transition: all 0.25s ease;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
  }
  .footer-contact-btn:hover {
    background: #2563eb;
    color: #ffffff;
    transform: scale(1.04);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
  }

  /* ── Modal backdrop ── */
  .contact-modal-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .contact-modal-backdrop.open {
    opacity: 1;
    pointer-events: all;
  }

  /* ── Modal box ── */
  .contact-modal {
    position: relative;
    width: 100%; max-width: 680px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    padding: 48px 48px 40px;
    box-sizing: border-box;
    opacity: 0;
    transform: scale(0.9) translateY(20px);
    transition: opacity 0.42s cubic-bezier(0.34,1.56,0.64,1),
                transform 0.42s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 32px 80px rgba(0,0,0,0.12);
    max-height: 90vh;
    overflow-y: auto;
  }
  .contact-modal-backdrop.open .contact-modal {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  /* ── Close button ── */
  .contact-modal-close {
    position: absolute; top: 18px; right: 20px;
    width: 36px; height: 36px; border-radius: 50%;
    background: #f8fafc; border: 1px solid rgba(0, 0, 0, 0.06);
    color: #64748b; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; line-height: 1;
    transition: all 0.2s ease;
  }
  .contact-modal-close:hover {
    background: #eff6ff; color: #2563eb;
    transform: scale(1.08);
  }

  /* ── Modal inputs ── */
  .modal-input {
    width: 100%; background: #f8fafc;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px; padding: 14px 16px;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 400;
    color: #0f172a; outline: none; box-sizing: border-box;
    transition: border-color 0.25s ease, background 0.25s ease;
    resize: none;
  }
  .modal-input::placeholder { color: #94a3b8; }
  .modal-input:focus { border-color: #2563eb; background: #ffffff; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
  .modal-input.error { border-color: rgba(239,68,68,0.7) !important; }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
  .shake { animation: shake 0.4s ease; }

  /* ── Submit button ── */
  .modal-submit-btn {
    font-family: 'Outfit', sans-serif; font-size: 14px;
    font-weight: 700; letter-spacing: 0.04em;
    padding: 14px 36px; border-radius: 999px; cursor: pointer;
    border: none; background: #2563eb;
    color: #fff;
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(37,99,235,0.25);
  }
  .modal-submit-btn:hover {
    transform: scale(1.04); 
    background: #1d4ed8;
    box-shadow: 0 6px 24px rgba(37,99,235,0.35);
  }
  .modal-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .modal-warning {
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    color: #ef4444; margin-top: 10px; text-align: center;
    opacity: 0; transition: opacity 0.25s ease;
  }
  .modal-warning.show { opacity: 1; }

  .modal-success {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 20px 0 10px; text-align: center;
  }

  /* ── Brand description (desktop only) ── */
  .footer-brand-desc {
    font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 400;
    color: #64748b; line-height: 1.6;
    max-width: 220px; margin-bottom: 20px;
  }

  /* ── DESKTOP GRID ── */
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

  /* ── TABLET (1100px) ── */
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

  /* ── MOBILE LARGE (768px) ── */
  @media (max-width: 768px) {
    .faq-container {
      grid-template-columns: 1fr;
    }
    .faq-wrapper-card {
      padding: 16px;
    }
  }

  /* ── MOBILE LARGE (700px) ── */
  @media (max-width: 700px) {
    .footer-root { padding: 40px 0 20px !important; }
    .faq-section { margin-bottom: 30px; }
    .faq-question-btn { font-size: 14.5px; padding: 16px 18px; }
    .faq-answer-text { font-size: 13px; }

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

  /* ── MOBILE SMALL (480px) ── */
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

  /* ── VERY SMALL (360px) ── */
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

const ContactModal = memo(function ContactModal({ open, onClose }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [warning, setWarning] = useState('');
    const [shaking, setShaking] = useState(false);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const onKey = e => { if (e.key === 'Escape') onClose(); };
        if (open) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            setForm({ name: '', email: '', message: '' });
            setErrors({});
            setWarning('');
            setStatus('idle');
        }
    }, [open]);

    const handleChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => (prev[name] ? { ...prev, [name]: false } : prev));
        setWarning('');
    }, []);

    const handleSubmit = useCallback(async () => {
        setForm(currentForm => {
            const newErrors = {
                name: !currentForm.name.trim(),
                email: !currentForm.email.trim() || !/\S+@\S+\.\S+/.test(currentForm.email),
                message: !currentForm.message.trim(),
            };
            const hasError = Object.values(newErrors).some(Boolean);
            if (hasError) {
                setErrors(newErrors);
                setWarning(
                    !currentForm.name.trim() && !currentForm.email.trim() && !currentForm.message.trim()
                        ? 'Please fill in all fields before submitting.'
                        : newErrors.email && currentForm.email.trim()
                            ? 'Please enter a valid email address.'
                            : 'Please fill in all required fields.'
                );
                setShaking(true);
                setTimeout(() => setShaking(false), 450);
            } else {
                setStatus('sending');
                const templateParams = { from_name: currentForm.name, from_email: currentForm.email, message: currentForm.message };
                (async () => {
                    try {
                        await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_COMPANY, templateParams, EMAILJS_PUBLIC_KEY);
                        await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_USER, templateParams, EMAILJS_PUBLIC_KEY);
                        setStatus('sent');
                    } catch (err) {
                        console.error('EmailJS error:', err);
                        setWarning('Something went wrong. Please try again.');
                        setStatus('idle');
                    }
                })();
            }
            return currentForm;
        });
    }, []);

    const backdropClassName = useMemo(
        () => `contact-modal-backdrop ${open ? 'open' : ''}`,
        [open]
    );
    const modalClassName = useMemo(
        () => `contact-modal ${shaking ? 'shake' : ''}`,
        [shaking]
    );
    const nameClassName = useMemo(() => `modal-input ${errors.name ? 'error' : ''}`, [errors.name]);
    const emailClassName = useMemo(() => `modal-input ${errors.email ? 'error' : ''}`, [errors.email]);
    const messageClassName = useMemo(() => `modal-input ${errors.message ? 'error' : ''}`, [errors.message]);
    const warningClassName = useMemo(() => `modal-warning ${warning ? 'show' : ''}`, [warning]);

    const handleBackdropClick = useCallback(e => {
        if (e.target === e.currentTarget) onClose();
    }, [onClose]);

    return (
        <div className={backdropClassName} onClick={handleBackdropClick}>
            <div className={modalClassName}>

                <button className="contact-modal-close" onClick={onClose} aria-label="Close">✕</button>

                {status === 'sent' ? (
                    <div className="modal-success">
                        <div style={styles.successIconWrap}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12l5 5L19 7" stroke="#2563eb" strokeWidth="2.2"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div style={styles.successTitle}>Submitted!</div>
                        <p style={styles.successBody}>
                            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                            Check your email for confirmation!
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={styles.headingWrap}>
                            <div style={styles.headingTitle}>
                                Get in{' '}
                                <span style={styles.headingGradient}>Touch</span>
                            </div>
                            <p style={styles.headingSub}>
                                Tell us about your project and we&apos;ll get back to you soon.
                            </p>
                        </div>

                        <div className="modal-fields-grid" style={styles.fieldsGrid}>
                            <input
                                className={nameClassName}
                                type="text" name="name" placeholder="Your name *"
                                value={form.name} onChange={handleChange} autoComplete="off"
                            />
                            <input
                                className={emailClassName}
                                type="email" name="email" placeholder="Email address *"
                                value={form.email} onChange={handleChange} autoComplete="off"
                            />
                        </div>
                        <textarea
                            className={messageClassName}
                            name="message" placeholder="Tell us about your project... *"
                            rows={4} value={form.message} onChange={handleChange}
                            style={styles.textarea}
                        />

                        <div style={styles.footerRow}>
                            <p className={warningClassName} style={styles.warning}>
                                ⚠ {warning}
                            </p>
                            <button
                                className="modal-submit-btn"
                                onClick={handleSubmit}
                                disabled={status === 'sending'}
                                style={styles.submitBtn}
                            >
                                {status === 'sending' ? 'Sending…' : 'Submit Message →'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

export default function Footer() {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    const handleModalClose = useCallback(() => setModalOpen(false), []);
    const handleModalOpen = useCallback(() => setModalOpen(true), []);

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

            <ContactModal open={modalOpen} onClose={handleModalClose} />

            {/* ── SECTION 1: FREQUENTLY ASKED QUESTIONS ── */}
            <div className="faq-section">
                <div className="faq-header">
                    <div className="faq-badge">
                        <span className="faq-badge-dot" />
                        Got Questions?
                    </div>
                    <h2 className="faq-title">
                        Frequently Asked <span className="faq-title-blue">Questions</span>
                    </h2>
                </div>

                {/* FAQ Grid with Card Background */}
                <div className="faq-wrapper-card">
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
                                        <span>{item.question}</span>
                                        <span className="faq-icon">+</span>
                                    </button>
                                    <div className="faq-answer">
                                        <p className="faq-answer-text">{item.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Separator Divider Line Between FAQ and Footer */}
            <hr className="faq-footer-divider" />

            {/* ── SECTION 2: FOOTER MAIN CONTENT ── */}
            <div className="footer-content">
                <div className="footer-main-grid">

                    {/* Brand */}
                    <div className="footer-area-brand">
                        <img src={xLogo} alt="StudioX" style={styles.brandLogo} />
                        <p className="footer-brand-desc">
                            Building digital products for the next generation of startups and enterprises.
                        </p>
                        <div className="footer-desktop-contact">
                            <div style={styles.mailWrap}><MailButton href="/" /></div>
                            <div style={styles.whatsappWrap}><WhatsAppButton href="/" /></div>
                        </div>
                        <p className="footer-col-title" style={styles.socialTitle}>Social Media</p>
                        <div style={styles.socialRow}>
                            <InstagramButton href="https://instagram.com" />
                            <FacebookButton href="https://facebook.com" />
                            <LinkedInButton href="https://linkedin.com" />
                        </div>
                    </div>

                    {linkColumns}

                    {/* Robot + CTA */}
                    <div className="footer-area-cta">
                        <div className="footer-robot-wrap">
                            <img src={robot} alt="Robot" style={styles.robotImg} />
                        </div>
                        <button className="footer-contact-btn" onClick={handleModalOpen}>
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