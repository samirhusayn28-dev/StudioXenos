'use client';

import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import SectionSlider from '../components/SectionSlider';
import ChatBot from '../components/ChatBot';
import SectionToast from '../components/SectionToast';
import assetManifest from '../components/assetManifest';
import { preloadAssets } from '../components/Preloader';

export default function Page() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Run asset preloading concurrently with EmailJS initialization
        preloadAssets(assetManifest);

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
                    visibility: loaded ? 'visible' : 'hidden',
                }}
            >
                <SectionSlider />
            </div>
            <ChatBot />
            <SectionToast />
        </>
    );
}