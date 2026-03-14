import React from 'react';
import img1 from '../components/assets/Artimg1.jpg';
import img2 from '../components/assets/Artimg2.jpg';
import img3 from '../components/assets/Artimg3.jpg';
import img4 from '../components/assets/Artimg4.jpg';
import img5 from '../components/assets/Artimg5.jpg';
import img6 from '../components/assets/Artimg6.jpg';
import img7 from '../components/assets/Artimg7.jpg';
import img8 from '../components/assets/Artimg8.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function ArtGallery() {
  return (
    <section style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }} className="py-24 px-6 md:px-16">

      <div className="text-center mb-12">
        <h2 className="text-white font-extrabold text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          Discover the World<br />of Art Around You !
        </h2>
        <p className="text-blue-200 text-base max-w-md mx-auto mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          We specialize in creating custom designed logos, business cards, websites, mobile applications, and social media content.
        </p>
        <button className="bg-blue-500 text-white font-semibold px-7 py-3 rounded-lg border-none cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Explore
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {images.map((img, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ height: '160px' }}>
            <img src={img} alt={`Art ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

    </section>
  );
}