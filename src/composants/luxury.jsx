import React, { useState } from 'react';
import './luxury.css';

// Using SVG icons directly instead of react-feather
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

const LuxuryProductGrid = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section className="luxury-products-section">
      <div className="luxury-products-container">
        <div className="luxury-products-header">
          <div className="luxury-badge">
            <SparklesIcon />
            <span className="luxury-badge-text">Latest Arrivals</span>
          </div>
          <h2 className="luxury-products-title">New Luxury Collection</h2>
        </div>

        <div className="luxury-products-grid">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index}
              className="luxury-product-card"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="luxury-product-image-container">
                <img 
                  src={`https://images.pexels.com/photos/${1190819 + index}/pexels-photo-${1190819 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={`Luxury Product ${index + 1}`}
                  className="luxury-product-image"
                  loading="lazy"
                />
                <div className="luxury-image-overlay"></div>
                
                {hoveredProduct === index && (
                  <div className="luxury-product-hover-actions">
                    <button className="luxury-action-button luxury-add-to-cart">
                      <ShoppingBagIcon />
                    </button>
                    <button className="luxury-action-button luxury-wishlist">
                      <HeartIcon />
                    </button>
                  </div>
                )}
              </div>

              <div className="luxury-product-details">
                <div className="luxury-product-tags">
                  <span className="luxury-premium-tag">Premium</span>
                  <div className="luxury-product-rating">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
                <h3 className="luxury-product-name">
                  Luxury Product {index + 1}
                </h3>
                <p className="luxury-product-description">Premium quality guaranteed</p>
                <div className="luxury-product-pricing">
                  <span className="luxury-current-price">${(299 + index * 100).toLocaleString()}</span>
                  <span className="luxury-original-price">${(399 + index * 100).toLocaleString()}</span>
                </div>
              </div>

              <div className="luxury-discount-badge">25% OFF</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProductGrid;