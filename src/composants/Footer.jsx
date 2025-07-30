import React from 'react';
import './Footer.css';
import logos from '../assets/WhatsApp Image 2025-07-23 à 02.08.18_4916699a.jpg'; // Import direct de l'image

// Icônes SVG intégrées
const CrownIcon = () => (
  <svg className="ks-footer-crown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 15H2V9h3M19 15h3V9h-3M12 15l-2-8-2 8m0 0H5m7 0h7m-7-8l2 8 2-8"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="ks-footer-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const Footer = () => {
  const categories = [
    { name: 'Bijouterie ' },
    { name: 'Parfumerie' },
    { name: 'Cosmétiques' },
    { name: 'Prêt-à-porter ' },
    { name: 'Maison & Décoration' },
    { name: 'Jouetterie ' },
    { name: 'Électronique' },
    { name: 'Accesoires automobile' }
  ];

  const services = [
    { name: 'Nous contacter' },
    { name: 'Livraison & Suivi' },
    { name: 'Retours & Échanges' },
    { name: 'Guide des tailles' }
  ];

  const socialIcons = [
    { name: 'Instagram', icon: 'i' },
    { name: 'Facebook', icon: 'f' },
    { name: 'Twitter', icon: 't' },
    { name: 'Pinterest', icon: 'p' }
  ];

  return (
    <footer className="ks-footer">
      <div className="ks-footer-container">
        <div className="ks-footer-grid">
          {/* Section Marque */}
          <div className="ks-footer-brand">
            <div className="ks-footer-logo-container">
              <img 
                src={logos} // Utilisation directe de l'import
                alt="Kona Shop" 
                className="ks-footer-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150x40?text=Kona+Shop";
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
              {categories.map((category, index) => (
                <li key={index} className="ks-footer-item">
                  <a href="#" className="ks-footer-link">
                    <ArrowIcon />
                    <span>{category.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Client */}
          <div className="ks-footer-column">
            <h3 className="ks-footer-title">Service Client</h3>
            <ul className="ks-footer-list">
              {services.map((service, index) => (
                <li key={index} className="ks-footer-item">
                  <a href="#" className="ks-footer-link">
                    <ArrowIcon />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Valeurs */}
          <div className="ks-footer-column">
            <h3 className="ks-footer-title">Nos Valeurs</h3>
            <p className="ks-footer-values-text">
              Fiabilité, excellence, proximité et innovation : chaque jour pour mieux vous servir.
            </p>
            <div className="ks-footer-social">
              {socialIcons.map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="ks-footer-social-icon"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
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