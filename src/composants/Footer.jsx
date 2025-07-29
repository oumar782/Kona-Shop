import React from 'react';
import './footer.css';

// SVG Icons as components
const CrownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 15H2V9h3M19 15h3V9h-3M12 15l-2-8-2 8m0 0H5m7 0h7m-7-8l2 8 2-8" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const LuxuryFooter = ({ categories = [] }) => {
  const defaultCategories = [
    { name: 'Bijouterie' },
    { name: 'Parfumerie' },
    { name: 'Pret a porter ' },
    { name: 'Electroniques' },
    { name: 'Tapisserie' },
    { name: 'Jouetterie' },
    { name: 'Cosmétiques' },
    ...categories
  ].slice(0, 4);

  return (
    <footer className="luxury-footer">
      <div className="luxury-footer-container">
        <div className="luxury-footer-grid">
          <div className="luxury-footer-brand">
            <div className="luxury-footer-logo">
              <CrownIcon />
            </div>
            <span className="luxury-footer-brand-name">Kona Shop</span>
            <p className="luxury-footer-description">
              Your destination for luxury products and exceptional shopping experiences. 
              Quality guaranteed, service unmatched.
            </p>
          </div>

          <div className="luxury-footer-column">
            <h3 className="luxury-footer-heading">Categories</h3>
            <ul className="luxury-footer-list">
              {defaultCategories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="luxury-footer-link">
                    <ArrowRightIcon />
                    <span>{category.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="luxury-footer-column">
            <h3 className="luxury-footer-heading">Customer Care</h3>
            <ul className="luxury-footer-list">
              <li><a href="#" className="luxury-footer-link"><ArrowRightIcon /><span>Contact Us</span></a></li>
              <li><a href="#" className="luxury-footer-link"><ArrowRightIcon /><span>Shipping Info</span></a></li>
              <li><a href="#" className="luxury-footer-link"><ArrowRightIcon /><span>Returns</span></a></li>
              <li><a href="#" className="luxury-footer-link"><ArrowRightIcon /><span>Size Guide</span></a></li>
            </ul>
          </div>

          <div className="luxury-footer-column">
            <h3 className="luxury-footer-heading">Connect</h3>
            <p className="luxury-footer-social-text">Follow us for the latest updates</p>
            <div className="luxury-footer-social">
              <a href="#" className="luxury-social-icon">f</a>
              <a href="#" className="luxury-social-icon">t</a>
              <a href="#" className="luxury-social-icon">i</a>
            </div>
          </div>
        </div>

        <div className="luxury-footer-bottom">
          <p className="luxury-footer-copyright">
            © 2024 Kona Shop. All rights reserved. Crafted with luxury in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;