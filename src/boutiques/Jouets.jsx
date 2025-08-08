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
import './Jouetterie.css';

// Import des produits de jouetterie (corrigé avec default import)
import bebesJouets from '../Donner-jouetterie/bebesJouets';
import enfantsJouets from '../Donner-jouetterie/enfantsJouets';
import adosJouets from '../Donner-jouetterie/adosJouets';

const CollectionJouets = () => {
  // Données des jouets par catégorie
  const jouetsData = useMemo(() => ({
    Bébés: bebesJouets || [],
    Enfants: enfantsJouets || [],
    Ados: adosJouets || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Enfants');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredJouets, setFilteredJouets] = useState(jouetsData);

  // Filtrage des jouets avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      if (!searchQuery.trim()) {
        setFilteredJouets(jouetsData);
      } else {
        const filtered = {};
        Object.keys(jouetsData).forEach(category => {
          filtered[category] = (jouetsData[category] || []).filter(jouet =>
            (jouet.nom?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (jouet.descriptionCourte?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (jouet.caracteristiques?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (jouet.type?.toLowerCase() || '').includes(searchQuery.toLowerCase())
          );
        });
        setFilteredJouets(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, jouetsData]);

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

  // Jouets à afficher
  const displayedJouets = useMemo(() => {
    return filteredJouets[activeCategory] || [];
  }, [filteredJouets, activeCategory]);

  // Affichage des étoiles de notation
  const renderRating = (rating) => {
    const stars = [];
    const rate = rating || 0;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`jouet-star ${i < rate ? 'filled' : ''}`}
        />
      );
    }
    return <div className="jouet-rating">{stars}</div>;
  };

  return (
    <div className="jouet-root">
      {/* Navigation par catégorie */}
      <nav className="jouet-navbar">
        <div className="jouet-navbar-container">
          <div className="jouet-nav">
            {Object.keys(jouetsData).map((category) => (
              <button
                key={category}
                className={`jouet-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Barre de recherche */}
          <div className="jouet-search-wrapper">
            <div className="jouet-search-box">
              <FiSearch className="jouet-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un jouet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="jouet-search-input"
              />
              {searchQuery && (
                <button
                  className="jouet-search-clear"
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
      <main className="jouet-main">
        <div className="jouet-header-section">
          <h1 className="jouet-category-title">Jouets {activeCategory}</h1>
          <p className="jouet-subtitle">
            Magie de l'enfance • Sécurité garantie • Éducatifs et ludiques
          </p>
        </div>

        <div className="jouet-products-grid">
          {isSearching ? (
            <div className="jouet-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedJouets.length > 0 ? (
            displayedJouets.map((jouet, index) => (
              <div
                key={jouet.id || index}
                className="jouet-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="jouet-card-image-wrapper">
                  <img
                    src={jouet.images?.[0] || ''}
                    alt={jouet.nom || 'Jouet'}
                    className="jouet-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="jouet-image-dots">
                    {Array.isArray(jouet.images) &&
                      jouet.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`jouet-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(jouet);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="jouet-card-overlay">
                    <button
                      className="jouet-quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(jouet);
                        setCurrentImageIndex(0);
                      }}
                    >
                      Voir Détails
                    </button>
                  </div>
                  {/* Bouton favoris */}
                  <button
                    className="jouet-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {jouet.nouveaute && <span className="jouet-badge jouet-badge-new">Nouveau</span>}
                  {jouet.bestseller && <span className="jouet-badge jouet-badge-bestseller">Best-seller</span>}
                  {jouet.educatif && <span className="jouet-badge jouet-badge-educatif">Éducatif</span>}
                </div>

                {/* Détails du jouet */}
                <div className="jouet-card-content">
                  <h3 className="jouet-card-title">{jouet.nom}</h3>
                  <p className="jouet-card-desc">{jouet.descriptionCourte}</p>
                  {renderRating(jouet.notation)}
                  <div className="jouet-card-footer">
                    <span className="jouet-card-price">{jouet.prix} €</span>
                    <button
                      className="jouet-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="jouet-no-results">
              <FiSearch size={48} />
              <h3>Aucun jouet trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="jouet-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="jouet-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="jouet-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="jouet-modal-body">
              {/* Section images */}
              <div className="jouet-modal-image-section">
                <div className="jouet-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.nom || 'Jouet'}
                    className="jouet-modal-image"
                  />
                </div>
                <button className="jouet-modal-nav jouet-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="jouet-modal-nav jouet-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="jouet-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`jouet-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="jouet-modal-info-section">
                <div className="jouet-modal-header">
                  <h2 className="jouet-modal-title">{quickViewProduct.nom}</h2>
                  <p className="jouet-modal-price">{quickViewProduct.prix} €</p>
                </div>
                <div className="jouet-modal-rating">
                  {renderRating(quickViewProduct.notation)}
                  <span className="jouet-modal-category">{quickViewProduct.type}</span>
                </div>
                <p className="jouet-modal-desc">{quickViewProduct.descriptionLongue}</p>
                <div className="jouet-modal-details">
                  <h4>Caractéristiques</h4>
                  <ul>
                    <li><FiStar size={14} /> <strong>Âge recommandé:</strong> {quickViewProduct.age}</li>
                    <li><FiStar size={14} /> <strong>Matériaux:</strong> {quickViewProduct.materiaux}</li>
                    <li><FiStar size={14} /> <strong>Fonctions:</strong> {quickViewProduct.caracteristiques}</li>
                  </ul>
                  <div className="jouet-modal-specs">
                    <p><strong>Type:</strong> {quickViewProduct.type}</p>
                    <p><strong>Dimensions:</strong> {quickViewProduct.dimensions}</p>
                    <p><strong>Éducatif:</strong> {quickViewProduct.educatif ? 'Oui' : 'Non'}</p>
                  </div>
                </div>
                <div className="jouet-modal-actions">
                  <button className="jouet-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="jouet-modal-wishlist">
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

export default CollectionJouets;