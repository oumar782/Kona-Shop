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
import './Electronique.css';

// Import des produits électroniques
import { electromenager } from '../Electronique/electromenager';
import { Multimedia } from '../Electronique/Mutimedia'; // Correction du nom ici

const BoutiqueElectronique = () => {
  // Sous-catégories
  const sousCategories = {
    Multimédia: [
      'Téléphones & Accessoires',
      'Informatique & Bureautique',
      'Consoles',
      'Jeux vidéo',
      'TV & Home Cinéma',
      'Audio / Sonorisation',
      'Caméras & Photo',
      'Objets connectés & domotique',
      'Accessoires Tech & Connectique',
      'Stockage & Mémoire'
    ],
    Électroménager: [
      'Froid',
      'Cuisson',
      'Petit Déjeuner',
      'Lavage / Entretien',
      'Confort / Air',
      'Électroménager encastrable',
      'Préparation culinaire',
      'Appareils spécifiques'
    ]
  };

  // Données des produits par catégorie
  const produitsData = useMemo(() => ({
    'Multimédia': Multimedia || [], // Utilisation du bon nom ici
    'Électroménager': electromenager || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Multimédia');
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
    <div className="electronique-root">
      {/* Navigation par catégorie */}
      <nav className="electronique-navbar">
        <div className="electronique-navbar-container">
          <div className="electronique-nav">
            {['Multimédia', 'Électroménager'].map((category) => (
              <button
                key={category}
                className={`electronique-nav-item ${activeCategory === category ? 'active' : ''}`}
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
          <div className="electronique-search-wrapper">
            <div className="electronique-search-box">
              <FiSearch className="electronique-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="electronique-search-input"
              />
              {searchQuery && (
                <button
                  className="electronique-search-clear"
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
      <main className="electronique-main">
        <div className="electronique-header-section">
          <h1 className="electronique-category-title">{activeCategory}</h1>
          <p className="electronique-subtitle">
            Technologies innovantes • Performances exceptionnelles • Qualité garantie
          </p>
          
          {/* Sélecteur de sous-catégorie */}
          <div className="electronique-sous-categories">
            <button 
              className="electronique-sous-categorie-toggle"
              onClick={() => setShowSousCategories(!showSousCategories)}
            >
              {activeSousCategorie === 'Tous' ? 'Toutes les sous-catégories' : activeSousCategorie}
              {showSousCategories ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {showSousCategories && (
              <div className="electronique-sous-categories-dropdown">
                <button
                  className={`electronique-sous-categorie-item ${activeSousCategorie === 'Tous' ? 'active' : ''}`}
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
                    className={`electronique-sous-categorie-item ${activeSousCategorie === sousCat ? 'active' : ''}`}
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

        <div className="electronique-products-grid">
          {isSearching ? (
            <div className="electronique-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedProduits.length > 0 ? (
            displayedProduits.map((produit, index) => (
              <div
                key={produit.id || index}
                className="electronique-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="electronique-card-image-wrapper">
                  <img
                    src={produit.images?.[0] || ''}
                    alt={produit.nom || 'Produit électronique'}
                    className="electronique-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="electronique-image-dots">
                    {Array.isArray(produit.images) &&
                      produit.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`electronique-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(produit);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="electronique-card-overlay">
                    <button
                      className="electronique-quick-view-btn"
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
                    className="electronique-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {produit.nouveaute && <span className="electronique-badge electronique-badge-new">Nouveau</span>}
                  {produit.bestseller && <span className="electronique-badge electronique-badge-bestseller">Best-seller</span>}
                  {produit.promotion && <span className="electronique-badge electronique-badge-promo">-{produit.promotion}%</span>}
                </div>

                {/* Détails du produit */}
                <div className="electronique-card-content">
                  <h3 className="electronique-card-title">{produit.nom}</h3>
                  <p className="electronique-card-marque">{produit.marque}</p>
                  <p className="electronique-card-desc">{produit.descriptionCourte}</p>
                  {renderRating(produit.notation)}
                  <div className="electronique-card-footer">
                    <div className="electronique-price-container">
                      {produit.prixPromo && (
                        <span className="electronique-card-price-promo">{produit.prixPromo} €</span>
                      )}
                      <span className={`electronique-card-price ${produit.prixPromo ? 'old-price' : ''}`}>
                        {produit.prix} €
                      </span>
                    </div>
                    <button
                      className="electronique-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="electronique-no-results">
              <FiSearch size={48} />
              <h3>Aucun produit trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="electronique-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="electronique-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="electronique-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="electronique-modal-body">
              {/* Section images */}
              <div className="electronique-modal-image-section">
                <div className="electronique-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.nom || 'Produit électronique'}
                    className="electronique-modal-image"
                  />
                </div>
                <button className="electronique-modal-nav electronique-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="electronique-modal-nav electronique-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="electronique-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`electronique-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="electronique-modal-info-section">
                <div className="electronique-modal-header">
                  <h2 className="electronique-modal-title">{quickViewProduct.nom}</h2>
                  <div className="electronique-modal-price-container">
                    {quickViewProduct.prixPromo && (
                      <span className="electronique-modal-price-promo">{quickViewProduct.prixPromo} €</span>
                    )}
                    <span className={`electronique-modal-price ${quickViewProduct.prixPromo ? 'old-price' : ''}`}>
                      {quickViewProduct.prix} €
                    </span>
                    {quickViewProduct.prixPromo && (
                      <span className="electronique-modal-promo-percent">-{quickViewProduct.promotion}%</span>
                    )}
                  </div>
                </div>
                <div className="electronique-modal-rating">
                  {renderRating(quickViewProduct.notation)}
                  <span className="electronique-modal-category">{quickViewProduct.sousCategorie}</span>
                </div>
                <p className="electronique-modal-marque">Marque: {quickViewProduct.marque}</p>
                <p className="electronique-modal-desc">{quickViewProduct.descriptionLongue}</p>
                <div className="electronique-modal-details">
                  <h4>Caractéristiques techniques</h4>
                  <ul>
                    {quickViewProduct.caracteristiques?.map((carac, index) => (
                      <li key={index}>
                        <FiStar size={14} /> <strong>{carac.nom}:</strong> {carac.valeur}
                      </li>
                    ))}
                  </ul>
                  <div className="electronique-modal-specs">
                    <p><strong>Garantie:</strong> {quickViewProduct.garantie}</p>
                    <p><strong>Énergie:</strong> {quickViewProduct.energie}</p>
                    <p><strong>Dimensions:</strong> {quickViewProduct.dimensions}</p>
                    <p><strong>Poids:</strong> {quickViewProduct.poids}</p>
                  </div>
                </div>
                <div className="electronique-modal-actions">
                  <button className="electronique-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="electronique-modal-wishlist">
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

export default BoutiqueElectronique;