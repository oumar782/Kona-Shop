// src/composants/MainLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main2026">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;