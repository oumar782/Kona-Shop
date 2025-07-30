import React from 'react';
import '../dossierfooter/footer.css';
import logos from '../assets/WhatsApp Image 2025-07-23 à 02.08.18_4916699a.jpg';

import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

// Icônes SVG intégrées
const CrownIcon = () => (
  <svg className="ks-footer-crown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 15H2V9h3M19 15h3V9h-3M12 15l-2-8-2 8m0 0H5m7 0h7m-7-8l2 8 2-8" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="ks-footer-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Footer = () => {
  const categories = [
    'Bijouterie',
    'Parfumerie',
    'Cosmétiques',
    'Prêt-à-porter',
    'Maison & Décoration',
    'Jouetterie',
    'Électronique',
    'Accessoires automobile',
  ];

  const services = [
    'Nous contacter',
    'Livraison & Suivi',
    'Retours & Échanges',
    'Guide des tailles',
  ];

  return (
    <footer className="ks-footer">
      <div className="ks-footer-container">
        <div className="ks-footer-grid">
          {/* Marque */}
          <div className="ks-footer-brand">
            <div className="ks-footer-logo-container">
              <img
                src={logos}
                alt="Kona Shop"
                className="ks-footer-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150x40?text=Kona+Shop';
                }}
              />
              <CrownIcon />
            </div>
            <h2 className="ks-footer-brand-name">Kona Shop</h2>
            <p className="ks-footer-brand-desc">
              Plus qu'une boutique en ligne : un univers où qualité, fiabilité et inspiration se rencontrent pour sublimer votre quotidien.
            </p>
          </div>

          {/* Boutiques */}
          <div className="ks-footer-column">
            <h3 className="ks-footer-title">Nos Boutiques</h3>
            <ul className="ks-footer-list">
              {categories.map((cat, idx) => (
                <li key={idx} className="ks-footer-item">
                  <a href="#" className="ks-footer-link">
                    <ArrowIcon />
                    <span>{cat}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service client */}
          <div className="ks-footer-column">
            <h3 className="ks-footer-title">Service Client</h3>
            <ul className="ks-footer-list">
              {services.map((service, idx) => (
                <li key={idx} className="ks-footer-item">
                  <a href="#" className="ks-footer-link">
                    <ArrowIcon />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Valeurs & réseaux sociaux */}
          <div className="ks-footer-column">
            <h3 className="ks-footer-title">Nos Valeurs</h3>
            <p className="ks-footer-values-text">
              Fiabilité, excellence, proximité et innovation : chaque jour pour mieux vous servir.
            </p>
            <div className="ks-footer-social">
              <a href="#" aria-label="Facebook" className="ks-footer-social-icon">
                <FaFacebookF size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="ks-footer-social-icon">
                <FaInstagram size={24} />
              </a>
              <a href="#" aria-label="TikTok" className="ks-footer-social-icon">
                <SiTiktok size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="ks-footer-bottom">
          <p className="ks-footer-copyright">
            © {new Date().getFullYear()} Kona Shop. Ensemble, rendons votre quotidien plus beau et plus inspirant.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
