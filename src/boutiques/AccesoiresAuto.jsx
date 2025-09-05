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
  FiChevronUp,
  FiTool,
  FiBattery,
  FiTruck,
  FiShield
} from 'react-icons/fi';
import './auto.css';

// Import des produits automobiles
import { interieur } from '../auto/interieur';
import { exterieur } from '../auto/exterieur';
import { performance } from '../auto/performance';

const BoutiqueAuto = () => {
  // Sous-catégories
  const sousCategories = {
    Intérieur: [
      'Sièges & Housses',
      'Volants & Accessoires',
      'Éclairage intérieur',
      'Organisateurs',
      'Parfums & Désodorisants',
      'Nettoyage intérieur',
      'Accessoires tech'
    ],
    Extérieur: [
      'Jantes & Enjoliveurs',
      'Pneus & Accessoires',
      'Phares & Feux',
      'Rétroviseurs',
      'Protections',
      'Stickers & Décorations',
      'Nettoyage extérieur'
    ],
    Performance: [
      'Système d\'échappement',
      'Suspension & Freinage',
      'Moteur & Transmission',
      'Électronique & Diagnostique',
      'Filtres & Huiles',
      'Refroidissement',
      'Accessoires tuning'
    ]
  };

  // Données des produits par catégorie
  const produitsData = useMemo(() => ({
    'Intérieur': interieur || [],
    'Extérieur': exterieur || [],
    'Performance': performance || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Intérieur');
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
            (produit.sousCategorie?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (produit.modeleCompatible?.toLowerCase() || '').includes(searchQuery.toLowerCase())
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

  // Icônes pour les catégories
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Intérieur': return <FiTool className="category-icon" />;
      case 'Extérieur': return <FiTruck className="category-icon" />;
      case 'Performance': return <FiBattery className="category-icon" />;
      default: return <FiShield className="category-icon" />;
    }
  };

  return (
    <div className="auto-root">
      {/* Navigation par catégorie */}
      <nav className="auto-navbar">
        <div className="auto-navbar-container">
          <div className="auto-nav">
            {['Intérieur', 'Extérieur', 'Performance'].map((category) => (
              <button
                key={category}
                className={`auto-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveSousCategorie('Tous');
                  setShowSousCategories(false);
                }}
              >
                {getCategoryIcon(category)}
                {category}
              </button>
            ))}
          </div>
          {/* Barre de recherche */}
          <div className="auto-search-wrapper">
            <div className="auto-search-box">
              <FiSearch className="auto-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un accessoire, une marque ou un modèle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="auto-search-input"
              />
              {searchQuery && (
                <button
                  className="auto-search-clear"
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
      <main className="auto-main">
        <div className="auto-header-section">
          <h1 className="auto-category-title">{activeCategory}</h1>
          <p className="auto-subtitle">
            Accessoires premium • Qualité professionnelle • Garantie constructeur
          </p>
          
          {/* Sélecteur de sous-catégorie */}
          <div className="auto-sous-categories">
            <button 
              className="auto-sous-categorie-toggle"
              onClick={() => setShowSousCategories(!showSousCategories)}
            >
              {activeSousCategorie === 'Tous' ? 'Toutes les sous-catégories' : activeSousCategorie}
              {showSousCategories ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {showSousCategories && (
              <div className="auto-sous-categories-dropdown">
                <button
                  className={`auto-sous-categorie-item ${activeSousCategorie === 'Tous' ? 'active' : ''}`}
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
                    className={`auto-sous-categorie-item ${activeSousCategorie === sousCat ? 'active' : ''}`}
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

        <div className="auto-products-grid">
          {isSearching ? (
            <div className="auto-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedProduits.length > 0 ? (
            displayedProduits.map((produit, index) => (
              <div
                key={produit.id || index}
                className="auto-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="auto-card-image-wrapper">
                  <img
                    src={produit.images?.[0] || ''}
                    alt={produit.nom || 'Accessoire auto'}
                    className="auto-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="auto-image-dots">
                    {Array.isArray(produit.images) &&
                      produit.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`auto-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(produit);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="auto-card-overlay">
                    <button
                      className="auto-quick-view-btn"
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
                    className="auto-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {produit.nouveaute && <span className="auto-badge auto-badge-new">Nouveau</span>}
                  {produit.bestseller && <span className="auto-badge auto-badge-bestseller">Best-seller</span>}
                  {produit.promotion && <span className="auto-badge auto-badge-promo">-{produit.promotion}%</span>}
                  {produit.exclusivite && <span className="auto-badge auto-badge-exclu">Exclusivité</span>}
                </div>

                {/* Détails du produit */}
                <div className="auto-card-content">
                  <h3 className="auto-card-title">{produit.nom}</h3>
                  <p className="auto-card-marque">{produit.marque}</p>
                  <p className="auto-card-desc">{produit.descriptionCourte}</p>
                  {produit.modeleCompatible && (
                    <p className="auto-card-compatibility">
                      Compatible: {produit.modeleCompatible}
                    </p>
                  )}
                  {renderRating(produit.notation)}
                  <div className="auto-card-footer">
                    <div className="auto-price-container">
                      {produit.prixPromo && (
                        <span className="auto-card-price-promo">{produit.prixPromo} €</span>
                      )}
                      <span className={`auto-card-price ${produit.prixPromo ? 'old-price' : ''}`}>
                        {produit.prix} €
                      </span>
                    </div>
                    <button
                      className="auto-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="auto-no-results">
              <FiSearch size={48} />
              <h3>Aucun accessoire trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="auto-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="auto-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="auto-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="auto-modal-body">
              {/* Section images */}
              <div className="auto-modal-image-section">
                <div className="auto-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.nom || 'Accessoire auto'}
                    className="auto-modal-image"
                  />
                </div>
                <button className="auto-modal-nav auto-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="auto-modal-nav auto-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="auto-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`auto-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="auto-modal-info-section">
                <div className="auto-modal-header">
                  <h2 className="auto-modal-title">{quickViewProduct.nom}</h2>
                  <div className="auto-modal-price-container">
                    {quickViewProduct.prixPromo && (
                      <span className="auto-modal-price-promo">{quickViewProduct.prixPromo} €</span>
                    )}
                    <span className={`auto-modal-price ${quickViewProduct.prixPromo ? 'old-price' : ''}`}>
                      {quickViewProduct.prix} €
                    </span>
                    {quickViewProduct.prixPromo && (
                      <span className="auto-modal-promo-percent">-{quickViewProduct.promotion}%</span>
                    )}
                  </div>
                </div>
                <div className="auto-modal-rating">
                  {renderRating(quickViewProduct.notation)}
                  <span className="auto-modal-category">{quickViewProduct.sousCategorie}</span>
                </div>
                <p className="auto-modal-marque">Marque: {quickViewProduct.marque}</p>
                {quickViewProduct.modeleCompatible && (
                  <p className="auto-modal-compatibility">
                    <strong>Modèles compatibles:</strong> {quickViewProduct.modeleCompatible}
                  </p>
                )}
                <p className="auto-modal-desc">{quickViewProduct.descriptionLongue}</p>
                <div className="auto-modal-details">
                  <h4>Caractéristiques techniques</h4>
                  <ul>
                    {quickViewProduct.caracteristiques?.map((carac, index) => (
                      <li key={index}>
                        <FiStar size={14} /> <strong>{carac.nom}:</strong> {carac.valeur}
                      </li>
                    ))}
                  </ul>
                  <div className="auto-modal-specs">
                    <p><strong>Garantie:</strong> {quickViewProduct.garantie}</p>
                    {quickViewProduct.matiere && <p><strong>Matière:</strong> {quickViewProduct.matiere}</p>}
                    {quickViewProduct.couleurs && <p><strong>Couleurs disponibles:</strong> {quickViewProduct.couleurs}</p>}
                    {quickViewProduct.installation && <p><strong>Installation:</strong> {quickViewProduct.installation}</p>}
                  </div>
                </div>
                <div className="auto-modal-actions">
                  <button className="auto-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="auto-modal-wishlist">
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

export default BoutiqueAuto;