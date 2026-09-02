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
    const [readyToOpen, setReadyToOpen] = useState(false);

    useEffect(() => {
        // Minimum 2.5s hold timer for smooth brand presentation
        const minHoldTimer = new Promise((resolve) => setTimeout(resolve, 2500));
        const assetLoader = Promise.resolve(preloadAssets(assetManifest));

        // Wait until both assets are fully loaded and min hold time has elapsed
        Promise.all([assetLoader, minHoldTimer]).then(() => {
            setReadyToOpen(true);
        });

        import('@emailjs/browser').then(({ default: emailjs }) => {
            emailjs.init('nBS7HLI2w7Zq5t3gI');
        });
    }, []);

    return (
        <>
            <Loader
                readyToOpen={readyToOpen}
                onComplete={() => setLoaded(true)}
            />
            <SectionSlider isLoaded={loaded} />
            <ChatBot />
            <SectionToast />
        </>
    );
}