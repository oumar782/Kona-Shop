import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  FiSearch, 
  FiHeart, 
  FiX, 
  FiChevronRight, 
  FiChevronLeft, 
  FiShoppingBag, 
  FiStar 
} from 'react-icons/fi';
import './PretAporte.css';

// Import des produits
import { hommeProducts } from '../pretdonner/hommeProducts';
import { femmeProducts } from '../pretdonner/femmeProducts';
import { enfantProducts } from '../pretdonner/enfantProducts';

const CollectionLuxe = () => {
  // Données des produits par catégorie
  const productsData = useMemo(() => ({
    Homme: hommeProducts || [],
    Femme: femmeProducts || [],
    Enfant: enfantProducts || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Homme');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Filtrage des produits avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      if (!searchQuery.trim()) {
        setFilteredProducts(productsData);
      } else {
        const filtered = {};
        Object.keys(productsData).forEach(category => {
          filtered[category] = (productsData[category] || []).filter(product =>
            (product.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (product.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (Array.isArray(product.details) && product.details.some(detail =>
              (detail || '').toLowerCase().includes(searchQuery.toLowerCase())
            ))
          );
        });
        setFilteredProducts(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, productsData]);

  // État initial et mis à jour des produits filtrés
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Navigation dans les images du modal
  const nextImage = useCallback(() => {
    if (!quickViewProduct) return;
    setCurrentImageIndex((prev) => (prev + 1) % quickViewProduct.images.length);
  }, [quickViewProduct]);

  const prevImage = useCallback(() => {
    if (!quickViewProduct) return;
    setCurrentImageIndex((prev) => (prev - 1 + quickViewProduct.images.length) % quickViewProduct.images.length);
  }, [quickViewProduct]);

  const selectImage = useCallback((index) => {
    if (!quickViewProduct) return;
    setCurrentImageIndex(index);
  }, [quickViewProduct]);

  // Produits à afficher
  const displayedProducts = useMemo(() => {
    return filteredProducts[activeCategory] || [];
  }, [filteredProducts, activeCategory]);

  // Affichage des étoiles de notation
  const renderRating = (rating) => {
    const stars = [];
    const rate = rating || 0;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`luxe-star ${i < rate ? 'filled' : ''}`}
        />
      );
    }
    return <div className="luxe-rating">{stars}</div>;
  };

  return (
    <div className="luxe-root">
      {/* Navigation par catégorie */}
      <nav className="luxe-navbar">
        <div className="luxe-navbar-container">
          <div className="luxe-nav">
            {['Homme', 'Femme', 'Enfant'].map((category) => (
              <button
                key={category}
                className={`luxe-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Barre de recherche */}
          <div className="luxe-search-wrapper">
            <div className="luxe-search-box">
              <FiSearch className="luxe-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="luxe-search-input"
              />
              {searchQuery && (
                <button
                  className="luxe-search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="luxe-main">
        <div className="luxe-header-section">
          <h1 className="luxe-category-title">{activeCategory}</h1>
          <p className="luxe-subtitle">
            Collection exclusive • Artisanat d'exception • Pièces uniques
          </p>
        </div>

        <div className="luxe-products-grid">
          {isSearching ? (
            <div className="luxe-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <div
                key={product.id || index}
                className="luxe-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="luxe-card-image-wrapper">
                  <img
                    src={product.images?.[0] || ''}
                    alt={product.name || 'Produit'}
                    className="luxe-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="luxe-image-dots">
                    {Array.isArray(product.images) &&
                      product.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`luxe-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="luxe-card-overlay">
                    <button
                      className="luxe-quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                        setCurrentImageIndex(0);
                      }}
                    >
                      Voir Détails
                    </button>
                  </div>
                  {/* Bouton favoris */}
                  <button
                    className="luxe-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {product.isNew && <span className="luxe-badge luxe-badge-new">Nouveau</span>}
                  {product.bestseller && <span className="luxe-badge luxe-badge-bestseller">Best-seller</span>}
                </div>

                {/* Détails du produit */}
                <div className="luxe-card-content">
                  <h3 className="luxe-card-title">{product.name}</h3>
                  <p className="luxe-card-desc">{product.description}</p>
                  {renderRating(product.rating)}
                  <div className="luxe-card-footer">
                    <span className="luxe-card-price">{product.price}</span>
                    <button
                      className="luxe-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="luxe-no-results">
              <FiSearch size={48} />
              <h3>Aucun produit trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="luxe-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="luxe-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="luxe-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="luxe-modal-body">
              {/* Section images */}
              <div className="luxe-modal-image-section">
                <div className="luxe-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.name || 'Produit'}
                    className="luxe-modal-image"
                  />
                </div>
                <button className="luxe-modal-nav luxe-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="luxe-modal-nav luxe-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="luxe-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`luxe-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="luxe-modal-info-section">
                <div className="luxe-modal-header">
                  <h2 className="luxe-modal-title">{quickViewProduct.name}</h2>
                  <p className="luxe-modal-price">{quickViewProduct.price}</p>
                </div>
                <div className="luxe-modal-rating">
                  {renderRating(quickViewProduct.rating)}
                  <span className="luxe-modal-category">{quickViewProduct.category}</span>
                </div>
                <p className="luxe-modal-desc">{quickViewProduct.description}</p>
                <div className="luxe-modal-details">
                  <h4>Détails du produit</h4>
                  <ul>
                    {Array.isArray(quickViewProduct.details) &&
                      quickViewProduct.details.map((detail, idx) => (
                        <li key={idx}>
                          <FiStar size={14} /> {detail}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="luxe-modal-actions">
                  <button className="luxe-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="luxe-modal-wishlist">
                    <FiHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionLuxe;