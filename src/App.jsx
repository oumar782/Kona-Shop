import Header from './composants/Header';
import Hero from './composants/Hero';
import Store from './composants/store';
import Vedette from './composants/vedette';
import Luxury from './composants/luxury';
import Footer from './composants/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main2026">
        <Hero />
        <Store/>
        <Vedette/>
        <Luxury/>
        <Footer/>

      </main>
    </>
  );
}

export default App;
