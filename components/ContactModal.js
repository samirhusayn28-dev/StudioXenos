'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, memo } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_aimz3zm';
const EMAILJS_PUBLIC_KEY = 'nBS7HLI2w7Zq5t3gI';
const TEMPLATE_TO_COMPANY = 'template_wo2oyuf';
const TEMPLATE_TO_USER = 'template_ub2mpjv';

const ContactModalContext = createContext(null);

export function useContactModal() {
    const context = useContext(ContactModalContext);
    if (!context) {
        throw new Error('useContactModal must be used within ContactModalProvider');
    }
    return context;
}

const contactModalStyles = `
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
`;

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
};

const ContactModal = memo(function ContactModal({ open, onClose }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [warning, setWarning] = useState('');
    const [shaking, setShaking] = useState(false);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
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

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));
        setWarning('');
    }, []);

    const handleSubmit = useCallback(async () => {
        setForm((currentForm) => {
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

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) onClose();
    }, [onClose]);

    return (
        <>
            <style>{contactModalStyles}</style>
            <div className={backdropClassName} onClick={handleBackdropClick}>
                <div className={modalClassName}>
                    <button className="contact-modal-close" onClick={onClose} aria-label="Close">✕</button>

                    {status === 'sent' ? (
                        <div className="modal-success">
                            <div style={styles.successIconWrap}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12l5 5L19 7" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
        </>
    );
});

export function ContactModalProvider({ children }) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    const contextValue = useMemo(
        () => ({ openModal, closeModal, isOpen: modalOpen }),
        [modalOpen, openModal, closeModal]
    );

    return (
        <ContactModalContext.Provider value={contextValue}>
            {children}
            <ContactModal open={modalOpen} onClose={closeModal} />
        </ContactModalContext.Provider>
    );
}
