'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function LazySection({ children, minHeight = '100vh' }) {
    const [isActive, setIsActive] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggle active state smoothly as sections enter/leave the viewport window
                setIsActive(entry.isIntersecting);
            },
            { rootMargin: '600px 0px' } // Pre-activates 600px before reaching the viewport
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ minHeight, position: 'relative' }}>
            {/* Clone children and pass down isViewActive so sections control their own internal loops */}
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child, { isViewActive: isActive }) : child
            )}
        </div>
    );
}