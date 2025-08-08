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
import './Bijouterie.css';

// Import des données de bijoux (corrigé avec default import)
import hommeBijoux from '../Donner-bijouterie/hommeBijoux';
import femmeBijoux from '../Donner-bijouterie/femmeBijoux';
import enfantBijoux from '../Donner-bijouterie/enfantBijoux';

const CollectionBijoux = () => {
  // Données des bijoux par catégorie
  const bijouxData = useMemo(() => ({
    Homme: hommeBijoux || [],
    Femme: femmeBijoux || [],
    Enfant: enfantBijoux || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Femme');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredBijoux, setFilteredBijoux] = useState(bijouxData);

  // Filtrage des bijoux avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      if (!searchQuery.trim()) {
        setFilteredBijoux(bijouxData);
      } else {
        const filtered = {};
        Object.keys(bijouxData).forEach(category => {
          filtered[category] = (bijouxData[category] || []).filter(bijou =>
            (bijou.nom?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (bijou.descriptionCourte?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (bijou.materiaux?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (bijou.type?.toLowerCase() || '').includes(searchQuery.toLowerCase())
          );
        });
        setFilteredBijoux(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, bijouxData]);

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

  // Bijoux à afficher
  const displayedBijoux = useMemo(() => {
    return filteredBijoux[activeCategory] || [];
  }, [filteredBijoux, activeCategory]);

  // Affichage des étoiles de notation
  const renderRating = (rating) => {
    const stars = [];
    const rate = rating || 0;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`bijou-star ${i < rate ? 'filled' : ''}`}
        />
      );
    }
    return <div className="bijou-rating">{stars}</div>;
  };

  return (
    <div className="bijou-root">
      {/* Navigation par catégorie */}
      <nav className="bijou-navbar">
        <div className="bijou-navbar-container">
          <div className="bijou-nav">
            {Object.keys(bijouxData).map((category) => (
              <button
                key={category}
                className={`bijou-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Barre de recherche */}
          <div className="bijou-search-wrapper">
            <div className="bijou-search-box">
              <FiSearch className="bijou-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un bijou..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bijou-search-input"
              />
              {searchQuery && (
                <button
                  className="bijou-search-clear"
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
      <main className="bijou-main">
        <div className="bijou-header-section">
          <h1 className="bijou-category-title">Bijoux {activeCategory}</h1>
          <p className="bijou-subtitle">
            Collection exclusive • Pièces uniques • Matériaux précieux
          </p>
        </div>

        <div className="bijou-products-grid">
          {isSearching ? (
            <div className="bijou-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedBijoux.length > 0 ? (
            displayedBijoux.map((bijou, index) => (
              <div
                key={bijou.id || index}
                className="bijou-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="bijou-card-image-wrapper">
                  <img
                    src={bijou.images?.[0] || ''}
                    alt={bijou.nom || 'Bijou'}
                    className="bijou-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="bijou-image-dots">
                    {Array.isArray(bijou.images) &&
                      bijou.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`bijou-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(bijou);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="bijou-card-overlay">
                    <button
                      className="bijou-quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(bijou);
                        setCurrentImageIndex(0);
                      }}
                    >
                      Voir Détails
                    </button>
                  </div>
                  {/* Bouton favoris */}
                  <button
                    className="bijou-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {bijou.nouveaute && <span className="bijou-badge bijou-badge-new">Nouveau</span>}
                  {bijou.bestseller && <span className="bijou-badge bijou-badge-bestseller">Best-seller</span>}
                  {bijou.limite && <span className="bijou-badge bijou-badge-limited">Édition limitée</span>}
                </div>

                {/* Détails du bijou */}
                <div className="bijou-card-content">
                  <h3 className="bijou-card-title">{bijou.nom}</h3>
                  <p className="bijou-card-desc">{bijou.descriptionCourte}</p>
                  {renderRating(bijou.notation)}
                  <div className="bijou-card-footer">
                    <span className="bijou-card-price">{bijou.prix} €</span>
                    <button
                      className="bijou-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bijou-no-results">
              <FiSearch size={48} />
              <h3>Aucun bijou trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="bijou-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="bijou-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="bijou-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="bijou-modal-body">
              {/* Section images */}
              <div className="bijou-modal-image-section">
                <div className="bijou-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.nom || 'Bijou'}
                    className="bijou-modal-image"
                  />
                </div>
                <button className="bijou-modal-nav bijou-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="bijou-modal-nav bijou-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="bijou-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`bijou-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="bijou-modal-info-section">
                <div className="bijou-modal-header">
                  <h2 className="bijou-modal-title">{quickViewProduct.nom}</h2>
                  <p className="bijou-modal-price">{quickViewProduct.prix} €</p>
                </div>
                <div className="bijou-modal-rating">
                  {renderRating(quickViewProduct.notation)}
                  <span className="bijou-modal-category">{quickViewProduct.type}</span>
                </div>
                <p className="bijou-modal-desc">{quickViewProduct.descriptionLongue}</p>
                <div className="bijou-modal-details">
                  <h4>Caractéristiques</h4>
                  <ul>
                    <li><FiStar size={14} /> <strong>Matériaux:</strong> {quickViewProduct.materiaux}</li>
                    <li><FiStar size={14} /> <strong>Poids:</strong> {quickViewProduct.poids}</li>
                    <li><FiStar size={14} /> <strong>Taille:</strong> {quickViewProduct.taille}</li>
                  </ul>
                  <div className="bijou-modal-specs">
                    <p><strong>Type:</strong> {quickViewProduct.type}</p>
                    <p><strong>Pureté:</strong> {quickViewProduct.purete}</p>
                    <p><strong>Garantie:</strong> {quickViewProduct.garantie}</p>
                  </div>
                </div>
                <div className="bijou-modal-actions">
                  <button className="bijou-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="bijou-modal-wishlist">
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

export default CollectionBijoux;