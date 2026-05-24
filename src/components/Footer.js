// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import robot from './assets/Footer Robot.png';
import xLogo from './assets/X Logo.png';
import MailButton from './MailButton';
import WhatsAppButton from './WhatsAppButton';
import InstagramButton from '../components/Instagrambutton';
import FacebookButton from '../components/Facebookbutton';
import LinkedInButton from '../components/Linkedinbutton';
import Dither from '../components/Dither';

const EMAILJS_SERVICE_ID  = 'service_aimz3zm';
const EMAILJS_PUBLIC_KEY  = 'nBS7HLI2w7Zq5t3gI';
const TEMPLATE_TO_COMPANY = 'template_wo2oyuf';
const TEMPLATE_TO_USER    = 'template_ub2mpjv';

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Outfit:wght@300;400;500;600&family=Poppins:wght@600;700&display=swap');

  .footer-root {
    position: relative;
    overflow: hidden;
  }

  .footer-divider-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 80%, transparent 100%);
    z-index: 3;
  }
  [data-theme="light"] .footer-divider-top {
    background: linear-gradient(90deg, transparent 0%, rgba(26,14,4,0.12) 20%, rgba(26,14,4,0.25) 50%, rgba(26,14,4,0.12) 80%, transparent 100%);
  }

  .footer-dither-wrap { position: absolute; inset: 0; z-index: 0; }
  .footer-dither-overlay {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
  }
  [data-theme="dark"]  .footer-dither-overlay { background: rgba(4,6,16,0.82); }
  [data-theme="light"] .footer-dither-overlay { background: rgba(245,240,232,0.88); }

  .footer-content { position: relative; z-index: 2; }

  .footer-glow {
    position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
    width: 700px; height: 300px;
    background: radial-gradient(ellipse, rgba(49,92,253,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 1;
  }

  .footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 0.18em;
    color: var(--text-muted); margin-bottom: 20px; margin-top: 0;
    transition: color 0.4s ease;
  }

  .footer-nav-btn {
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 300;
    color: var(--text-sub); background: none; border: none; padding: 0;
    cursor: pointer; text-align: left; display: block;
    transition: color 0.2s ease, transform 0.2s ease; line-height: 1;
  }
  .footer-nav-btn:hover { color: var(--text-primary); transform: translateX(4px); }

  .footer-divider-bottom {
    border: none; border-top: 1px solid var(--card-border);
    margin: 0; transition: border-color 0.4s ease;
  }

  /* ── Robot ── */
  .footer-robot-wrap {
    position: relative; display: flex;
    align-items: flex-end; justify-content: center;
  }
  .footer-robot-wrap::before {
    content: ''; position: absolute; bottom: 0; left: 50%;
    transform: translateX(-50%); width: 100px; height: 36px;
    background: radial-gradient(ellipse, rgba(49,92,253,0.30) 0%, transparent 70%);
    filter: blur(8px);
  }
  .footer-robot-wrap img {
    position: relative; z-index: 1;
    filter: drop-shadow(0 8px 28px rgba(49,92,253,0.35));
    transition: transform 0.4s ease;
  }
  .footer-robot-wrap:hover img { transform: translateY(-8px); }

  /* ── Contact Button ── */
  .footer-contact-btn {
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.07em;
    padding: 13px 32px; border-radius: 999px; cursor: pointer;
    border: 1px solid rgba(196,122,48,0.5);
    background: rgba(196,122,48,0.10);
    color: #c47a30;
    transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
    white-space: nowrap;
  }
  .footer-contact-btn:hover {
    background: rgba(196,122,48,0.22);
    transform: scale(1.04);
    box-shadow: 0 4px 20px rgba(196,122,48,0.25);
  }

  /* ── Modal backdrop ── */
  .contact-modal-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(4, 6, 16, 0.0);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    transition: background 0.35s ease, backdrop-filter 0.35s ease;
    pointer-events: none;
  }
  .contact-modal-backdrop.open {
    background: rgba(4, 6, 16, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    pointer-events: all;
  }
  [data-theme="light"] .contact-modal-backdrop.open {
    background: rgba(20, 10, 2, 0.55);
  }

  /* ── Modal box ── */
  .contact-modal {
    position: relative;
    width: 100%; max-width: 680px;
    background: var(--bg-primary);
    border: 1px solid var(--card-border);
    border-radius: 28px;
    padding: 48px 48px 40px;
    box-sizing: border-box;
    opacity: 0;
    transform: scale(0.84) translateY(20px);
    transition: opacity 0.42s cubic-bezier(0.34,1.56,0.64,1),
                transform 0.42s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 32px 80px rgba(0,0,0,0.45);
  }
  .contact-modal-backdrop.open .contact-modal {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  [data-theme="dark"] .contact-modal {
    background: rgba(8,13,20,0.96);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  [data-theme="light"] .contact-modal {
    background: rgba(250,247,242,0.98);
  }

  /* ── Close button ── */
  .contact-modal-close {
    position: absolute; top: 18px; right: 20px;
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--card-bg); border: 1px solid var(--card-border);
    color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; line-height: 1;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }
  .contact-modal-close:hover {
    background: var(--card-border); color: var(--text-primary);
    transform: scale(1.08);
  }

  /* ── Modal inputs ── */
  .modal-input {
    width: 100%; background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 12px; padding: 12px 16px;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 300;
    color: var(--text-primary); outline: none; box-sizing: border-box;
    transition: border-color 0.25s ease, background 0.4s ease;
    resize: none;
  }
  .modal-input::placeholder { color: var(--text-muted); }
  .modal-input:focus { border-color: rgba(196,122,48,0.6); }
  .modal-input.error { border-color: rgba(220,60,60,0.7) !important; }

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
    font-family: 'Poppins', sans-serif; font-size: 14px;
    font-weight: 600; letter-spacing: 0.06em;
    padding: 13px 36px; border-radius: 999px; cursor: pointer;
    border: none; background: linear-gradient(110deg, #c47a30, #e8a84a);
    color: #fff;
    transition: transform 0.2s ease, box-shadow 0.25s ease, filter 0.2s ease;
    box-shadow: 0 4px 20px rgba(196,122,48,0.35);
  }
  .modal-submit-btn:hover {
    transform: scale(1.04); filter: brightness(1.1);
    box-shadow: 0 6px 28px rgba(196,122,48,0.50);
  }
  .modal-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .modal-warning {
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 400;
    color: rgba(220,80,60,0.9); margin-top: 10px; text-align: center;
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
    font-size: 12px; font-weight: 300;
    color: var(--text-muted); line-height: 1.75;
    max-width: 200px; margin-bottom: 18px;
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
  }

  .footer-main-grid > div {
    border-right: 1px solid rgba(255,255,255,0.05);
    padding-right: 32px;
    margin-right: 32px;
  }
  [data-theme="light"] .footer-main-grid > div {
    border-right: 1px solid rgba(26,14,4,0.07);
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

  /* ── MOBILE LARGE (700px) ── */
  @media (max-width: 700px) {
    .footer-main-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "brand brand"
        "l1 l2"
        "l3 cta";
      gap: 24px 16px;
    }
    .footer-area-cta {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      gap: 12px;
    }
    .footer-robot-wrap { display: none; }
    .footer-col-title  { font-size: 10px; margin-bottom: 10px; letter-spacing: 0.2em; }
    .footer-nav-btn    { font-size: 12px; }
    .footer-contact-btn { font-size: 0.78rem; padding: 10px 22px; }
    .footer-brand-desc { display: none; }

    /* Hide mail/whatsapp on mobile brand */
    .footer-desktop-contact { display: none; }
  }

  /* ── MOBILE SMALL (480px) ── */
  @media (max-width: 480px) {
    .contact-modal { padding: 28px 20px 24px; border-radius: 20px; }
    .modal-fields-grid { grid-template-columns: 1fr !important; }
    .footer-bottom-bar {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 4px !important;
    }
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
  }
`;

const footerLinks = {
  l1: { title: 'Our Products', links: ['Uni School', 'Dife Holdings', 'Fresh Wash 360'] },
  l2: { title: 'About Us',     links: ['Our Story', 'Our Partners', 'Contact Us']       },
  l3: { title: 'Careers',      links: ['Join Our Team', 'Events', 'News']               },
};

function ContactModal({ open, onClose }) {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [warning, setWarning] = useState('');
  const [shaking, setShaking] = useState(false);
  const [status, setStatus]   = useState('idle');

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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
    setWarning('');
  };

  const handleSubmit = async () => {
    const newErrors = {
      name:    !form.name.trim(),
      email:   !form.email.trim() || !/\S+@\S+\.\S+/.test(form.email),
      message: !form.message.trim(),
    };
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      setErrors(newErrors);
      setWarning(
        !form.name.trim() && !form.email.trim() && !form.message.trim()
          ? 'Please fill in all fields before submitting.'
          : newErrors.email && form.email.trim()
          ? 'Please enter a valid email address.'
          : 'Please fill in all required fields.'
      );
      setShaking(true);
      setTimeout(() => setShaking(false), 450);
      return;
    }
    setStatus('sending');
    const templateParams = { from_name: form.name, from_email: form.email, message: form.message };
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_COMPANY, templateParams, EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_USER,    templateParams, EMAILJS_PUBLIC_KEY);
      setStatus('sent');
    } catch (err) {
      console.error('EmailJS error:', err);
      setWarning('Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <div
      className={`contact-modal-backdrop ${open ? 'open' : ''}`}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`contact-modal ${shaking ? 'shake' : ''}`}>

        <button className="contact-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {status === 'sent' ? (
          <div className="modal-success">
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(196,122,48,0.15)', border: '1px solid rgba(196,122,48,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#c47a30" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900,
              textTransform: 'uppercase', lineHeight: 0.95,
              color: 'var(--text-primary)', marginBottom: '14px',
            }}>Submitted!</div>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '15px',
              fontWeight: 300, color: 'var(--text-sub)',
              lineHeight: 1.7, maxWidth: '340px', margin: '0 auto',
            }}>
              Thanks for reaching out. We'll get back to you within 24 hours.
              Check your email for confirmation!
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900,
                textTransform: 'uppercase', lineHeight: 0.92,
                color: 'var(--text-primary)', marginBottom: '10px',
              }}>
                Get in{' '}
                <span style={{
                  background: 'linear-gradient(110deg, #c47a30, #e8a84a)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                }}>Touch</span>
              </div>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '14px',
                fontWeight: 300, color: 'var(--text-muted)', margin: 0,
              }}>
                Tell us about your project and we'll get back to you soon.
              </p>
            </div>

            <div
              className="modal-fields-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}
            >
              <input
                className={`modal-input ${errors.name ? 'error' : ''}`}
                type="text" name="name" placeholder="Your name *"
                value={form.name} onChange={handleChange} autoComplete="off"
              />
              <input
                className={`modal-input ${errors.email ? 'error' : ''}`}
                type="email" name="email" placeholder="Email address *"
                value={form.email} onChange={handleChange} autoComplete="off"
              />
            </div>
            <textarea
              className={`modal-input ${errors.message ? 'error' : ''}`}
              name="message" placeholder="Tell us about your project... *"
              rows={4} value={form.message} onChange={handleChange}
              style={{ marginBottom: '20px', display: 'block' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <p className={`modal-warning ${warning ? 'show' : ''}`} style={{ margin: 0, textAlign: 'left' }}>
                ⚠ {warning}
              </p>
              <button
                className="modal-submit-btn"
                onClick={handleSubmit}
                disabled={status === 'sending'}
                style={{ marginLeft: 'auto' }}
              >
                {status === 'sending' ? 'Sending…' : 'Submit Message →'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className="footer-root" style={{ padding: '56px 6% 24px' }}>
      <style>{footerStyles}</style>

      <div className="footer-dither-wrap">
        <Dither
          waveSpeed={0.03} waveFrequency={3} waveAmplitude={0.3}
          waveColor={[0.08, 0.12, 0.28]} colorNum={4} pixelSize={2}
          enableMouseInteraction={false}
        />
      </div>
      <div className="footer-dither-overlay" />
      <div className="footer-glow" />
      <div className="footer-divider-top" />

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="footer-content">
        <div className="footer-main-grid">

          {/* Brand */}
          <div className="footer-area-brand">
            <img src={xLogo} alt="StudioX" style={{ width: '32px', height: '32px', objectFit: 'contain', marginBottom: '20px' }} />
            <p className="footer-brand-desc">
              Building digital products for the next generation of startups and enterprises.
            </p>
            <div className="footer-desktop-contact">
              <div style={{ marginBottom: '10px' }}><MailButton href="/" /></div>
              <div style={{ marginBottom: '24px' }}><WhatsAppButton href="/" /></div>
            </div>
            <p className="footer-col-title" style={{ marginBottom: '12px' }}>Social Media</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <InstagramButton href="https://instagram.com" />
              <FacebookButton  href="https://facebook.com"  />
              <LinkedInButton  href="https://linkedin.com"  />
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map(({ title, links }, i) => (
            <div key={i} className={`footer-area-l${i + 1}`}>
              <p className="footer-col-title">{title}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {links.map(link => (
                  <li key={link}><button className="footer-nav-btn">{link}</button></li>
                ))}
              </ul>
            </div>
          ))}

          {/* Robot + CTA */}
          <div className="footer-area-cta">
            <div className="footer-robot-wrap">
              <img src={robot} alt="Robot" style={{ width: '95px', objectFit: 'contain' }} />
            </div>
            <button className="footer-contact-btn" onClick={() => setModalOpen(true)}>
              Contact Us →
            </button>
          </div>

        </div>

        <hr className="footer-divider-bottom" />
        <div
          className="footer-bottom-bar"
          style={{
            paddingTop: '18px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', maxWidth: '1200px',
            margin: '0 auto', flexWrap: 'wrap', gap: '8px',
          }}
        >
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            © 2025 Studioxenos.com — All Rights Reserved
          </p>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}