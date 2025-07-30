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
import Boutique from './Page/boutique';
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
          <Route path="/" element={
            <>
              <Hero />
              <Store />
              <Vedette />
              <Luxury />
            </>
          } />

          {/* Pages standards */}
          <Route path="/apropos" element={<Propos />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />

          {/* Routes imbriquées pour la Boutique */}
          <Route path="/Boutique" element={<Boutique />}>
            <Route path="pret-a-porter" element={<Boutique category="pret-a-porter" />} />
            <Route path="parfumerie" element={<Boutique category="parfumerie" />} />
            <Route path="cosmetique" element={<Boutique category="cosmetique" />} />
            <Route path="jouets" element={<Boutique category="jouets" />} />
            <Route path="electronique" element={<Boutique category="electronique" />} />
            <Route path="decoration-maison" element={<Boutique category="decoration-maison" />} />
            <Route path="bijouterie" element={<Boutique category="bijouterie" />} />
            <Route path="accesoires-auto" element={<Boutique category="accesoires-auto" />} />
          </Route>

          {/* Redirection implicite : /Boutique → placeholder */}
          <Route path="/Boutique/*" element={<Boutique />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;