'use client';

import React from 'react';
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
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 0;
    contain: paint layout;
    transform: translateZ(0);
  }

  .simple-gallery-track {
    display: flex;
    gap: 24px;
    width: max-content;
    animation: marquee-scroll 35s linear infinite;
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .simple-gallery-track:hover {
    animation-play-state: paused;
  }

  @keyframes marquee-scroll {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .simple-gallery-card {
    flex-shrink: 0;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    width: 400px;
    height: 260px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .simple-gallery-card:hover {
    border-color: rgba(37, 99, 235, 0.3);
    box-shadow: 0 20px 40px rgba(37, 99, 235, 0.08);
  }

  .simple-gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .simple-gallery-track {
      animation-duration: 25s;
      gap: 16px;
    }
    .simple-gallery-card {
      width: 280px;
      height: 180px;
      border-radius: 12px;
    }
  }
`;

export default function SimpleGallery({ items = defaultItems }) {
    const duplicatedItems = [...items, ...items];

    return (
        <div className="simple-gallery-container">
            <style>{galleryStyles}</style>

            <div className="simple-gallery-track">
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="simple-gallery-card">
                        <Image
                            src={item.image}
                            alt={item.text}
                            className="simple-gallery-image"
                            fill
                            sizes="(max-width: 768px) 280px, 400px"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}