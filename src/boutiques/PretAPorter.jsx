import React from 'react';
import './PretAporte.css';
const PretAPorterLuxe = () => {
  return (
    <div className="luxe-fashion-app">
      {/* Sidebar */}
      <aside className="luxe-sidebar">
        <h1 className="luxe-sidebar-title">Prêt à porter</h1>
        
        <nav className="luxe-categories">
          <button className="luxe-category active">Homme</button>
          <button className="luxe-category">Femme</button>
          <button className="luxe-category">Enfant</button>
        </nav>
        
        <div className="luxe-search-section">
          <h3 className="luxe-search-title">Articles à rechercher</h3>
          <input 
            type="text" 
            className="luxe-search-input" 
            placeholder="Rechercher des articles..." 
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="luxe-main-content">
        <header className="luxe-header">
          <h2 className="luxe-main-title">Prêt-à-Porter</h2>
          <p className="luxe-subtitle">Collections exclusives de designers renommés</p>
        </header>

        {/* Produits en disposition horizontale */}
        <div className="luxe-horizontal-products">
          <article className="luxe-product-card">
            <div className="luxe-product-image-container">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b" 
                alt="Robe Chanel" 
                className="luxe-product-image"
              />
              <button className="luxe-wishlist-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="luxe-product-details">
              <h3 className="luxe-product-name">Robe en soie Chanel</h3>
              <p className="luxe-product-description">Élégance intemporelle, coupe parfaite</p>
              <div className="luxe-product-footer">
                <span className="luxe-product-price">1 850€</span>
                <button className="luxe-add-to-cart">Ajouter</button>
              </div>
            </div>
          </article>

          <article className="luxe-product-card">
            <div className="luxe-product-image-container">
              <img 
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" 
                alt="Veste Gucci" 
                className="luxe-product-image"
              />
              <button className="luxe-wishlist-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="luxe-product-details">
              <h3 className="luxe-product-name">Veste brodée Gucci</h3>
              <p className="luxe-product-description">Artisanat italien, détails uniques</p>
              <div className="luxe-product-footer">
                <span className="luxe-product-price">2 400€</span>
                <button className="luxe-add-to-cart">Ajouter</button>
              </div>
            </div>
          </article>

          <article className="luxe-product-card">
            <div className="luxe-product-image-container">
              <img 
                src="https://images.unsplash.com/photo-1551232864-3f0890e580d9" 
                alt="Costume Dior" 
                className="luxe-product-image"
              />
              <button className="luxe-wishlist-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="luxe-product-details">
              <h3 className="luxe-product-name">Costume trois pièces Dior</h3>
              <p className="luxe-product-description">Laine premium, coupe sur mesure</p>
              <div className="luxe-product-footer">
                <span className="luxe-product-price">3 200€</span>
                <button className="luxe-add-to-cart">Ajouter</button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default PretAPorterLuxe;