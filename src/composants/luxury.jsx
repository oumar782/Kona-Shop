import React, { useState } from 'react';
import './luxury.css';

// Icônes SVG
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>
);

// 🔥 Données produits de luxe (simulées ou récupérables via API/BDD)
const luxuryProducts = [
  {
    id: 1,
    name: "Sac en Cuir Véritable",
    description: "Édition premium fabriquée à la main",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg",
    rating: 5,
    discount: "25% OFF"
  },
  {
    id: 2,
    name: "Chaussures Exclusives",
    description: "Design italien, édition limitée",
    price: 799,
    originalPrice: 999,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    rating: 4,
    discount: "20% OFF"
  },
  {
    id: 3,
    name: "Montre Prestige",
    description: "Or rose et diamants",
    price: 4999,
    originalPrice: 5999,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    rating: 5,
    discount: "15% OFF"
  }
];

const LuxuryProductGrid = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section className="luxury-products-section">
      <div className="luxury-products-container">
        <div className="luxury-products-header">
          <div className="luxury-badge">
            <SparklesIcon />
            <span className="luxury-badge-text">Dernières Arrivées</span>
          </div>
          <h2 className="luxury-products-title">Nouvelle Collection de Luxe</h2>
        </div>

        <div className="luxury-products-grid">
          {luxuryProducts.map((product, index) => (
            <div 
              key={product.id}
              className="luxury-product-card"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="luxury-product-image-container">
                <img 
                  src={product.image}
                  alt={product.name}
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
                    {[...Array(product.rating)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
                <h3 className="luxury-product-name">{product.name}</h3>
                <p className="luxury-product-description">{product.description}</p>
                <div className="luxury-product-pricing">
                  <span className="luxury-current-price">{product.price.toLocaleString()} €</span>
                  <span className="luxury-original-price">{product.originalPrice.toLocaleString()} €</span>
                </div>
              </div>

              <div className="luxury-discount-badge">{product.discount}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProductGrid;
