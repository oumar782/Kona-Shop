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
import './Parfumerie.css';

// Import des produits de parfumerie
import { hommeParfums } from '../Donner-parfumerie/hommeParfums';
import { femmeParfums } from '../Donner-parfumerie/femmeParfums';
import { enfantParfums } from '../Donner-parfumerie/enfantParfums';

const CollectionParfums = () => {
  // Données des parfums par catégorie
  const parfumsData = useMemo(() => ({
    Homme: hommeParfums || [],
    Femme: femmeParfums || [],
    Enfant: enfantParfums || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Homme');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredParfums, setFilteredParfums] = useState(parfumsData);

  // Filtrage des parfums avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      if (!searchQuery.trim()) {
        setFilteredParfums(parfumsData);
      } else {
        const filtered = {};
        Object.keys(parfumsData).forEach(category => {
          filtered[category] = (parfumsData[category] || []).filter(parfum =>
            (parfum.nom?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (parfum.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (parfum.notes?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (parfum.concentration?.toLowerCase() || '').includes(searchQuery.toLowerCase())
          );
        });
        setFilteredParfums(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, parfumsData]);

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

  // Parfums à afficher
  const displayedParfums = useMemo(() => {
    return filteredParfums[activeCategory] || [];
  }, [filteredParfums, activeCategory]);

  // Affichage des étoiles de notation
  const renderRating = (rating) => {
    const stars = [];
    const rate = rating || 0;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`parfum-star ${i < rate ? 'filled' : ''}`}
        />
      );
    }
    return <div className="parfum-rating">{stars}</div>;
  };

  return (
    <div className="parfum-root">
      {/* Navigation par catégorie */}
      <nav className="parfum-navbar">
        <div className="parfum-navbar-container">
          <div className="parfum-nav">
            {['Homme', 'Femme', 'Enfant'].map((category) => (
              <button
                key={category}
                className={`parfum-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Barre de recherche */}
          <div className="parfum-search-wrapper">
            <div className="parfum-search-box">
              <FiSearch className="parfum-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un parfum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="parfum-search-input"
              />
              {searchQuery && (
                <button
                  className="parfum-search-clear"
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
      <main className="parfum-main">
        <div className="parfum-header-section">
          <h1 className="parfum-category-title">Parfums {activeCategory}</h1>
          <p className="parfum-subtitle">
            Collection exclusive • Créations artisanales • Essences rares
          </p>
        </div>

        <div className="parfum-products-grid">
          {isSearching ? (
            <div className="parfum-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedParfums.length > 0 ? (
            displayedParfums.map((parfum, index) => (
              <div
                key={parfum.id || index}
                className="parfum-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="parfum-card-image-wrapper">
                  <img
                    src={parfum.images?.[0] || ''}
                    alt={parfum.nom || 'Parfum'}
                    className="parfum-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="parfum-image-dots">
                    {Array.isArray(parfum.images) &&
                      parfum.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`parfum-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(parfum);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="parfum-card-overlay">
                    <button
                      className="parfum-quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(parfum);
                        setCurrentImageIndex(0);
                      }}
                    >
                      Voir Détails
                    </button>
                  </div>
                  {/* Bouton favoris */}
                  <button
                    className="parfum-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {parfum.nouveaute && <span className="parfum-badge parfum-badge-new">Nouveau</span>}
                  {parfum.bestseller && <span className="parfum-badge parfum-badge-bestseller">Best-seller</span>}
                  {parfum.limite && <span className="parfum-badge parfum-badge-limited">Édition limitée</span>}
                </div>

                {/* Détails du parfum */}
                <div className="parfum-card-content">
                  <h3 className="parfum-card-title">{parfum.nom}</h3>
                  <p className="parfum-card-desc">{parfum.descriptionCourte}</p>
                  {renderRating(parfum.notation)}
                  <div className="parfum-card-footer">
                    <span className="parfum-card-price">{parfum.prix} €</span>
                    <button
                      className="parfum-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="parfum-no-results">
              <FiSearch size={48} />
              <h3>Aucun parfum trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="parfum-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="parfum-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="parfum-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="parfum-modal-body">
              {/* Section images */}
              <div className="parfum-modal-image-section">
                <div className="parfum-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.nom || 'Parfum'}
                    className="parfum-modal-image"
                  />
                </div>
                <button className="parfum-modal-nav parfum-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="parfum-modal-nav parfum-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="parfum-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`parfum-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="parfum-modal-info-section">
                <div className="parfum-modal-header">
                  <h2 className="parfum-modal-title">{quickViewProduct.nom}</h2>
                  <p className="parfum-modal-price">{quickViewProduct.prix} €</p>
                </div>
                <div className="parfum-modal-rating">
                  {renderRating(quickViewProduct.notation)}
                  <span className="parfum-modal-category">{quickViewProduct.concentration}</span>
                </div>
                <p className="parfum-modal-desc">{quickViewProduct.descriptionLongue}</p>
                <div className="parfum-modal-details">
                  <h4>Notes du parfum</h4>
                  <ul>
                    <li><FiStar size={14} /> <strong>Notes de tête:</strong> {quickViewProduct.notesTete}</li>
                    <li><FiStar size={14} /> <strong>Notes de cœur:</strong> {quickViewProduct.notesCoeur}</li>
                    <li><FiStar size={14} /> <strong>Notes de fond:</strong> {quickViewProduct.notesFond}</li>
                  </ul>
                  <div className="parfum-modal-specs">
                    <p><strong>Concentration:</strong> {quickViewProduct.concentration}</p>
                    <p><strong>Volume:</strong> {quickViewProduct.volume} ml</p>
                    <p><strong>Type:</strong> {quickViewProduct.type}</p>
                  </div>
                </div>
                <div className="parfum-modal-actions">
                  <button className="parfum-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="parfum-modal-wishlist">
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

export default CollectionParfums;