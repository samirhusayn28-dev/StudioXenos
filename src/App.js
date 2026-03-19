import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/services';
import Art from './components/Art';
import Projects from './components/Projects';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <section id="home"><Hero /></section>
      <section id="services"><Services /></section>
      <section id="gallery"><Art /></section>
      <section id="portfolio"><Projects /></section>
      <section id="how-we-work"><Work /></section>
      <section id="about"><About /></section>
      <section id="contact"><Footer /></section>
    </div>
  );
}

export default App;