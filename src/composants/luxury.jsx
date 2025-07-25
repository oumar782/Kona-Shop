import React, { useState, useEffect } from 'react';
import './luxury.css';

const LuxuryProductGrid = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // SVG Icons as React components
  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );

  const ShoppingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <path d="M3 6h18"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );

  const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );

  const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
  );

  const products = [...Array(8)].map((_, index) => ({
    id: index + 1,
    name: `Luxury Item ${index + 1}`,
    price: (299 + index * 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
    originalPrice: (399 + index * 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
    image: `https://images.pexels.com/photos/${1190819 + index}/pexels-photo-${1190819 + index}.jpeg`,
    category: ['Horlogerie', 'Parfumerie', 'Haute Couture', 'Accessoires'][index % 4],
    rating: 5,
    badge: ['Nouveauté', 'Best-seller', 'Édition Limitée', 'Exclusif'][index % 4],
    color: `linear-gradient(135deg, ${['#FEF3C7', '#EFF6FF', '#ECFDF5', '#FCE7F3'][index % 4]} 0%, ${['#FEF9C3', '#E0E7FF', '#D1FAE5', '#FFE4E6'][index % 4]} 100%)`
  }));

  return (
    <section className={`luxury-grid-section ${isVisible ? 'visible' : ''}`}>
      {/* Éléments décoratifs */}
      <div className="luxury-decoration gold-blob"></div>
      <div className="luxury-decoration black-blob"></div>
      
      <div className="luxury-container">
        <div className="luxury-header">
          <div className="luxury-badge">
            <div className="badge-content">
              <SparklesIcon />
              <span>Collection Exclusive</span>
            </div>
            <div className="badge-glow"></div>
          </div>
          
          <h2>
            <span className="title-main">Sélection d'Exception</span>
            <span className="title-sub">L'Art du Luxe</span>
          </h2>
          
          <p className="luxury-description">
            Découvrez nos pièces les plus emblématiques, où l'artisanat rencontre l'excellence
          </p>
        </div>

        <div className="luxury-grid">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`luxury-card ${hoveredProduct === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ '--accent-color': ['#D4AF37', '#000000', '#333333', '#D4AF37'][index % 4] }}
            >
              <div className="card-background" style={{ background: product.color }}></div>
              <div className="card-glow"></div>
              
              <div className="card-image-container">
                <img 
                  src={`${product.image}?auto=compress&cs=tinysrgb&w=800`}
                  alt={product.name}
                  className="card-image"
                  loading="lazy"
                  width="800"
                  height="800"
                />
                <div className="image-overlay"></div>
                <div className="product-badge">{product.badge}</div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <div className="category-tag">
                    <span>{product.category}</span>
                  </div>
                  <div className="product-rating">
                    {[...Array(product.rating)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
                
                <h3 className="product-name">{product.name}</h3>
                
                <div className="price-container">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>
                
                <div className="action-buttons">
                  <button className="add-to-cart">
                    <ShoppingBagIcon />
                    <span>Ajouter</span>
                  </button>
                  <button className="wishlist">
                    <HeartIcon />
                  </button>
                </div>
              </div>

              <div className="discount-badge">-25%</div>
              
              {hoveredProduct === index && (
                <div className="card-hover-effect"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProductGrid;