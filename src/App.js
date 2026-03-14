import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/services';
import Art from './components/Art';

function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Services/>
      <Art/>
    </div>
  );
}

export default App;
