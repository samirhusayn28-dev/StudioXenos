import React, { useState, useEffect, useRef } from 'react';

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
    transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    
    width: min(33vw, 420px);
    height: 260px;

    /* Center translation positioning with scale multiplier */
    transform: translate3d(
      calc(var(--sin-angle) * var(--radius) * var(--x-mult)), 
      0px, 
      calc(var(--cos-angle) * var(--radius))
    ) scale(var(--scale));
  }

  /* Hover scaling effect centered natively */
  .simple-gallery-card:hover {
    transform: translate3d(
      calc(var(--sin-angle) * var(--radius) * var(--x-mult)), 
      0px, 
      calc(var(--cos-angle) * var(--radius))
    ) scale(calc(var(--scale) * 1.12)) !important;
    z-index: 9999 !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
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

export default function SimpleGallery({ items = defaultItems, speed = 0.005, isViewActive = true }) {
    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const containerRef = useRef(null);
    const requestRef = useRef(null);

    // Run animation loop strictly when isViewActive is true
    useEffect(() => {
        if (!isViewActive) return;

        const animate = () => {
            if (!isHovered) {
                setRotation((prev) => (prev + speed) % (2 * Math.PI));
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isHovered, speed, isViewActive]);

    const count = items.length;

    return (
        <div
            ref={containerRef}
            className="simple-gallery-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
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
                    const zIndex = Math.round(normZ * 1000);

                    return (
                        <div
                            key={index}
                            className="simple-gallery-card"
                            style={{
                                '--sin-angle': sinVal,
                                '--cos-angle': cosVal,
                                '--scale': scale,
                                opacity: opacity,
                                zIndex: zIndex,
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.text}
                                className="simple-gallery-image"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}