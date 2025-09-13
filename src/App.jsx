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
import BoutiqueLuxe from './Page/boutique'; // <-- ton composant BoutiqueLuxe
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main2026">
        <Routes>
          {/* Page d'accueil */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Store />
                <Vedette />
                <Luxury />
              </>
            }
          />

          {/* Pages standards */}
          <Route path="/apropos" element={<Propos />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />

          {/* Boutique générale */}
          <Route path="/boutique" element={<BoutiqueLuxe />} />

          {/* Catégories dynamiques */}
          <Route path="/:category" element={<BoutiqueLuxe />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
