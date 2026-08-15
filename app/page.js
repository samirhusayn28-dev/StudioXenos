'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Loader from '../components/Loader';
import SectionSlider from '../components/SectionSlider';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import SectionToast from '../components/SectionToast';

emailjs.init('nBS7HLI2w7Zq5t3gI');

export default function Page() {
    const [loaded, setLoaded] = useState(false);

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