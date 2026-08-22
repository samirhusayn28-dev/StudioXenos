'use client';

import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import SectionSlider from '../components/SectionSlider';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import SectionToast from '../components/SectionToast';

export default function Page() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Defer emailjs init — no need to block first render for this
        import('@emailjs/browser').then(({ default: emailjs }) => {
            emailjs.init('nBS7HLI2w7Zq5t3gI');
        });
    }, []);

    return (
        <>
            {!loaded && <Loader onComplete={() => setLoaded(true)} />}

            <div
                style={{
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            >
                <SectionSlider />
            </div>
            <ChatBot />
            <SectionToast />
        </>
    );
}