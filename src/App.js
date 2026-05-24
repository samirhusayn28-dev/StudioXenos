import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import StarBackground from './components/StarBackground';
import Hero from './components/Hero';
import Services from './components/services';
import Work from './components/Work';
import Projects from './components/Projects';
import AboutUs from './components/About';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Loader from './components/Loader';

// EmailJS initialize — app shuru hote hi
emailjs.init('nBS7HLI2w7Zq5t3gI');

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loader — jab tak loaded false hai tab tak dikhega */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Main website — loader ke peeche render hota rehta hai */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}>
        {/* Fixed star/dust background — poore page pe */}
        <StarBackground />

        {/* All sections — zIndex 1 se upar taaki stars ke upar rahe */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <Services />
          <Projects />
          <Work />
          <AboutUs />
          <ChatBot />
          <Footer />
        </div>
      </div>
    </>
  );
}