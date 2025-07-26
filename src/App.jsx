import Header from './composants/Header';
import Hero from './composants/Hero';
import Store from './composants/store';
import Vedette from './composants/vedette';
import Luxury from './composants/luxury';
import Footer from './composants/Footer';
import Propos from './Page/Apropos';
import Service from './Page/service';
import Accueil from './Page/accueil';
import Contact from './Page/Contact';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main2026">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Store />
              <Vedette />
              <Luxury />
            </>
          } />
          <Route path="/apropos" element={<Propos />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;