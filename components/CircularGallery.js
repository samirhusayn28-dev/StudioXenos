import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';

const defaultItems = [
    { image: 'https://picsum.photos/600/400?random=1', text: 'Card 1' },
    { image: 'https://picsum.photos/600/400?random=2', text: 'Card 2' },
    { image: 'https://picsum.photos/600/400?random=3', text: 'Card 3' },
    { image: 'https://picsum.photos/600/400?random=4', text: 'Card 4' },
    { image: 'https://picsum.photos/600/400?random=5', text: 'Card 5' },
];

const galleryStyles = `
  .simple-gallery-container {
    width: 100%;
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    position: relative;
    touch-action: pan-y;
  }

  .simple-gallery-stage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    position: relative;
    overflow: visible;
    perspective: 1200px;
    --radius: 350px;
    --x-mult: 1.3;
  }

  .simple-gallery-card {
    position: absolute;
    border-radius: 16px;
    overflow: hidden;
    will-change: transform, opacity;
    cursor: pointer;
    /* Removed CSS transition on transform to prevent layout jitter / micro-stutters during high-frequency loop updates */
    transition: opacity 0.2s ease;
    
    width: min(33vw, 420px);
    height: 260px;

    transform: translate3d(
      calc(var(--sin-angle) * var(--radius) * var(--x-mult)), 
      0px, 
      calc(var(--cos-angle) * var(--radius))
    ) scale(var(--scale));
  }

  /* Active / Clicked scale state */
  .simple-gallery-card.active-card {
    transform: translate3d(
      calc(var(--sin-angle) * var(--radius) * var(--x-mult)), 
      0px, 
      calc(var(--cos-angle) * var(--radius))
    ) scale(calc(var(--scale) * 1.35)) !important;
    z-index: 9999 !important;
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);
  }

  .simple-gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .simple-gallery-container {
      min-height: 38vh;
    }

    .simple-gallery-stage {
      perspective: 700px;
      --radius: 150px;
      --x-mult: 1.0;
    }

    .simple-gallery-card {
      width: min(72vw, 260px);
      height: 180px;
      border-radius: 12px;
    }
  }
`;

export default function SimpleGallery({ items = defaultItems, speed = 0.005 }) {
    const [rotation, setRotation] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const containerRef = useRef(null);
    const requestRef = useRef(null);
    const lastTimeRef = useRef(null);

    // Using useLayoutEffect to hook the animation frame synchronously before paint
    useLayoutEffect(() => {
        const animate = (time) => {
            if (lastTimeRef.current !== null) {
                const delta = time - lastTimeRef.current;
                if (selectedIndex === null) {
                    setRotation((prev) => (prev + speed * (delta / 16.67)) % (2 * Math.PI));
                }
            }
            lastTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [speed, selectedIndex]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setSelectedIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const count = items.length;

    return (
        <div
            ref={containerRef}
            className="simple-gallery-container"
        >
            <style>{galleryStyles}</style>

            <div className="simple-gallery-stage">
                {items.map((item, index) => {
                    const angle = rotation + (index * (2 * Math.PI / count));

                    const sinVal = Math.sin(angle);
                    const cosVal = Math.cos(angle);

                    const normZ = (cosVal + 1) / 2;
                    const scale = normZ * 0.3 + 0.7;
                    const opacity = normZ * 0.6 + 0.4;
                    const zIndex = selectedIndex === index ? 9999 : Math.round(normZ * 1000);

                    const isSelected = selectedIndex === index;

                    return (
                        <div
                            key={index}
                            className={`simple-gallery-card ${isSelected ? 'active-card' : ''}`}
                            style={{
                                '--sin-angle': sinVal,
                                '--cos-angle': cosVal,
                                '--scale': scale,
                                opacity: opacity,
                                zIndex: zIndex,
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(isSelected ? null : index);
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.text}
                                className="simple-gallery-image"
                                fill
                                sizes="(max-width: 768px) 72vw, 420px"
                                unoptimized
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}