import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  FiSearch, 
  FiHeart, 
  FiX, 
  FiChevronRight, 
  FiChevronLeft, 
  FiShoppingBag, 
  FiStar,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import './decoration.css';

// Import des produits de décoration
import { chambre } from '../Deco/chambre';
import { salon } from '../Deco/salon';
import { cuisine } from '../Deco/cuisine';

const BoutiqueDecorationMaison = () => {
  // Sous-catégories
  const sousCategories = {
    Chambre: [
      'Literie & Matelas',
      'Rangements',
      'Éclairage',
      'Textiles',
      'Miroirs & Décoration murale',
      'Mobilier',
      'Accessoires de nuit'
    ],
    Salon: [
      'Canapés & Fauteuils',
      'Tables & Meubles TV',
      'Tapis & Décoration sol',
      'Éclairage',
      'Décoration murale',
      'Rangements',
      'Accessoires déco'
    ],
    Cuisine: [
      'Mobilier',
      'Rangements',
      'Éclairage',
      'Décoration murale',
      'Arts de la table',
      'Accessoires déco',
      'Textiles'
    ]
  };

  // Données des produits par catégorie
  const produitsData = useMemo(() => ({
    'Chambre': chambre || [],
    'Salon': salon || [],
    'Cuisine': cuisine || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Chambre');
  const [activeSousCategorie, setActiveSousCategorie] = useState('Tous');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProduits, setFilteredProduits] = useState(produitsData);
  const [showSousCategories, setShowSousCategories] = useState(false);

  // Filtrage des produits avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      if (!searchQuery.trim()) {
        setFilteredProduits(produitsData);
      } else {
        const filtered = {};
        Object.keys(produitsData).forEach(category => {
          filtered[category] = (produitsData[category] || []).filter(produit =>
            (produit.nom?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (produit.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (produit.marque?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (produit.sousCategorie?.toLowerCase() || '').includes(searchQuery.toLowerCase())
          );
        });
        setFilteredProduits(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, produitsData]);

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
  const displayedProduits = useMemo(() => {
    let produits = filteredProduits[activeCategory] || [];
    if (activeSousCategorie !== 'Tous') {
      produits = produits.filter(produit => 
        produit.sousCategorie === activeSousCategorie
      );
    }
    return produits;
  }, [filteredProduits, activeCategory, activeSousCategorie]);

  // Affichage des étoiles de notation
  const renderRating = (rating) => {
    const stars = [];
    const rate = rating || 0;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`produit-star ${i < rate ? 'filled' : ''}`}
        />
      );
    }
    return <div className="produit-rating">{stars}</div>;
  };

  return (
    <div className="decoration-root">
      {/* Navigation par catégorie */}
      <nav className="decoration-navbar">
        <div className="decoration-navbar-container">
          <div className="decoration-nav">
            {['Chambre', 'Salon', 'Cuisine'].map((category) => (
              <button
                key={category}
                className={`decoration-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveSousCategorie('Tous');
                  setShowSousCategories(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Barre de recherche */}
          <div className="decoration-search-wrapper">
            <div className="decoration-search-box">
              <FiSearch className="decoration-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="decoration-search-input"
              />
              {searchQuery && (
                <button
                  className="decoration-search-clear"
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
      <main className="decoration-main">
        <div className="decoration-header-section">
          <h1 className="decoration-category-title">{activeCategory}</h1>
          <p className="decoration-subtitle">
            Décoration d'intérieur • Design exclusif • Qualité artisanale
          </p>
          
          {/* Sélecteur de sous-catégorie */}
          <div className="decoration-sous-categories">
            <button 
              className="decoration-sous-categorie-toggle"
              onClick={() => setShowSousCategories(!showSousCategories)}
            >
              {activeSousCategorie === 'Tous' ? 'Toutes les sous-catégories' : activeSousCategorie}
              {showSousCategories ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {showSousCategories && (
              <div className="decoration-sous-categories-dropdown">
                <button
                  className={`decoration-sous-categorie-item ${activeSousCategorie === 'Tous' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSousCategorie('Tous');
                    setShowSousCategories(false);
                  }}
                >
                  Tous
                </button>
                {sousCategories[activeCategory]?.map((sousCat) => (
                  <button
                    key={sousCat}
                    className={`decoration-sous-categorie-item ${activeSousCategorie === sousCat ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSousCategorie(sousCat);
                      setShowSousCategories(false);
                    }}
                  >
                    {sousCat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="decoration-products-grid">
          {isSearching ? (
            <div className="decoration-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedProduits.length > 0 ? (
            displayedProduits.map((produit, index) => (
              <div
                key={produit.id || index}
                className="decoration-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="decoration-card-image-wrapper">
                  <img
                    src={produit.images?.[0] || ''}
                    alt={produit.nom || 'Produit de décoration'}
                    className="decoration-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="decoration-image-dots">
                    {Array.isArray(produit.images) &&
                      produit.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`decoration-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(produit);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="decoration-card-overlay">
                    <button
                      className="decoration-quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(produit);
                        setCurrentImageIndex(0);
                      }}
                    >
                      Voir Détails
                    </button>
                  </div>
                  {/* Bouton favoris */}
                  <button
                    className="decoration-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {produit.nouveaute && <span className="decoration-badge decoration-badge-new">Nouveau</span>}
                  {produit.bestseller && <span className="decoration-badge decoration-badge-bestseller">Best-seller</span>}
                  {produit.promotion && <span className="decoration-badge decoration-badge-promo">-{produit.promotion}%</span>}
                </div>

                {/* Détails du produit */}
                <div className="decoration-card-content">
                  <h3 className="decoration-card-title">{produit.nom}</h3>
                  <p className="decoration-card-marque">{produit.marque}</p>
                  <p className="decoration-card-desc">{produit.descriptionCourte}</p>
                  {renderRating(produit.notation)}
                  <div className="decoration-card-footer">
                    <div className="decoration-price-container">
                      {produit.prixPromo && (
                        <span className="decoration-card-price-promo">{produit.prixPromo} €</span>
                      )}
                      <span className={`decoration-card-price ${produit.prixPromo ? 'old-price' : ''}`}>
                        {produit.prix} €
                      </span>
                    </div>
                    <button
                      className="decoration-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="decoration-no-results">
              <FiSearch size={48} />
              <h3>Aucun produit trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="decoration-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="decoration-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="decoration-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="decoration-modal-body">
              {/* Section images */}
              <div className="decoration-modal-image-section">
                <div className="decoration-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.nom || 'Produit de décoration'}
                    className="decoration-modal-image"
                  />
                </div>
                <button className="decoration-modal-nav decoration-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="decoration-modal-nav decoration-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="decoration-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`decoration-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="decoration-modal-info-section">
                <div className="decoration-modal-header">
                  <h2 className="decoration-modal-title">{quickViewProduct.nom}</h2>
                  <div className="decoration-modal-price-container">
                    {quickViewProduct.prixPromo && (
                      <span className="decoration-modal-price-promo">{quickViewProduct.prixPromo} €</span>
                    )}
                    <span className={`decoration-modal-price ${quickViewProduct.prixPromo ? 'old-price' : ''}`}>
                      {quickViewProduct.prix} €
                    </span>
                    {quickViewProduct.prixPromo && (
                      <span className="decoration-modal-promo-percent">-{quickViewProduct.promotion}%</span>
                    )}
                  </div>
                </div>
                <div className="decoration-modal-rating">
                  {renderRating(quickViewProduct.notation)}
                  <span className="decoration-modal-category">{quickViewProduct.sousCategorie}</span>
                </div>
                <p className="decoration-modal-marque">Marque: {quickViewProduct.marque}</p>
                <p className="decoration-modal-desc">{quickViewProduct.descriptionLongue}</p>
                <div className="decoration-modal-details">
                  <h4>Caractéristiques</h4>
                  <ul>
                    {quickViewProduct.caracteristiques?.map((carac, index) => (
                      <li key={index}>
                        <FiStar size={14} /> <strong>{carac.nom}:</strong> {carac.valeur}
                      </li>
                    ))}
                  </ul>
                  <div className="decoration-modal-specs">
                    <p><strong>Matériaux:</strong> {quickViewProduct.materiaux}</p>
                    <p><strong>Dimensions:</strong> {quickViewProduct.dimensions}</p>
                    <p><strong>Entretien:</strong> {quickViewProduct.entretien}</p>
                    <p><strong>Couleurs disponibles:</strong> {quickViewProduct.couleurs}</p>
                  </div>
                </div>
                <div className="decoration-modal-actions">
                  <button className="decoration-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="decoration-modal-wishlist">
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

export default BoutiqueDecorationMaison;