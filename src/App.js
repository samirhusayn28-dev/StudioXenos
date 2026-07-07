import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import StarBackground from './components/StarBackground';
import Hero from './components/Hero';
import Services from './components/services';
import Work from './components/Work';
import Projects from './components/Projects';
import Art from './components/Art';
import AboutUs from './components/About';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Loader from './components/Loader';
import OurTeam from './components/OurTeam';

emailjs.init('nBS7HLI2w7Zq5t3gI');

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <div style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}>
        <StarBackground />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <Services />
          <Projects />
          <Art />
          <Work />
          <AboutUs />
          <OurTeam/>
          <ChatBot />
          <Footer />
        </div>
      </div>
    </>
  );
}