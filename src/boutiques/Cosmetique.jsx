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
import './Cosmetiques.css';

// Import des produits cosmétiques
import { hommeProduits } from '../Donner-cosmetique/hommeProduits';
import { femmeProduits } from '../Donner-cosmetique/femmeProduits';
import { enfantProduits } from '../Donner-cosmetique/enfantProduits';

const CollectionCosmetiques = () => {
  // Données des cosmétiques par catégorie
  const cosmetiquesData = useMemo(() => ({
    Homme: hommeProduits || [],
    Femme: femmeProduits || [],
    Enfant: enfantProduits || []
  }), []);

  // États
  const [activeCategory, setActiveCategory] = useState('Femme');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredCosmetiques, setFilteredCosmetiques] = useState(cosmetiquesData);

  // Filtrage des cosmétiques avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      if (!searchQuery.trim()) {
        setFilteredCosmetiques(cosmetiquesData);
      } else {
        const filtered = {};
        Object.keys(cosmetiquesData).forEach(category => {
          filtered[category] = (cosmetiquesData[category] || []).filter(cosmetique =>
            (cosmetique.nom?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (cosmetique.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (cosmetique.ingredients?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (cosmetique.type?.toLowerCase() || '').includes(searchQuery.toLowerCase())
          );
        });
        setFilteredCosmetiques(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, cosmetiquesData]);

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

  // Cosmétiques à afficher
  const displayedCosmetiques = useMemo(() => {
    return filteredCosmetiques[activeCategory] || [];
  }, [filteredCosmetiques, activeCategory]);

  // Affichage des étoiles de notation
  const renderRating = (rating) => {
    const stars = [];
    const rate = rating || 0;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`cosmetique-star ${i < rate ? 'filled' : ''}`}
        />
      );
    }
    return <div className="cosmetique-rating">{stars}</div>;
  };

  return (
    <div className="cosmetique-root">
      {/* Navigation par catégorie */}
      <nav className="cosmetique-navbar">
        <div className="cosmetique-navbar-container">
          <div className="cosmetique-nav">
            {['Femme', 'Homme', 'Enfant'].map((category) => (
              <button
                key={category}
                className={`cosmetique-nav-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Barre de recherche */}
          <div className="cosmetique-search-wrapper">
            <div className="cosmetique-search-box">
              <FiSearch className="cosmetique-search-icon" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cosmetique-search-input"
              />
              {searchQuery && (
                <button
                  className="cosmetique-search-clear"
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
      <main className="cosmetique-main">
        <div className="cosmetique-header-section">
          <h1 className="cosmetique-category-title">Cosmétiques {activeCategory}</h1>
          <p className="cosmetique-subtitle">
            Collection premium • Formules naturelles • Soins expert
          </p>
        </div>

        <div className="cosmetique-products-grid">
          {isSearching ? (
            <div className="cosmetique-loading">
              <p>Recherche en cours...</p>
            </div>
          ) : displayedCosmetiques.length > 0 ? (
            displayedCosmetiques.map((cosmetique, index) => (
              <div
                key={cosmetique.id || index}
                className="cosmetique-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="cosmetique-card-image-wrapper">
                  <img
                    src={cosmetique.images?.[0] || ''}
                    alt={cosmetique.nom || 'Produit cosmétique'}
                    className="cosmetique-card-image"
                    loading="lazy"
                  />
                  {/* Indicateurs d'images */}
                  <div className="cosmetique-image-dots">
                    {Array.isArray(cosmetique.images) &&
                      cosmetique.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`cosmetique-dot ${idx === 0 ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(cosmetique);
                            setCurrentImageIndex(idx);
                          }}
                        />
                      ))}
                  </div>
                  {/* Overlay au survol */}
                  <div className="cosmetique-card-overlay">
                    <button
                      className="cosmetique-quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(cosmetique);
                        setCurrentImageIndex(0);
                      }}
                    >
                      Voir Détails
                    </button>
                  </div>
                  {/* Bouton favoris */}
                  <button
                    className="cosmetique-wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiHeart />
                  </button>
                  {/* Badges */}
                  {cosmetique.nouveaute && <span className="cosmetique-badge cosmetique-badge-new">Nouveau</span>}
                  {cosmetique.bestseller && <span className="cosmetique-badge cosmetique-badge-bestseller">Best-seller</span>}
                  {cosmetique.bio && <span className="cosmetique-badge cosmetique-badge-bio">Bio</span>}
                </div>

                {/* Détails du produit */}
                <div className="cosmetique-card-content">
                  <h3 className="cosmetique-card-title">{cosmetique.nom}</h3>
                  <p className="cosmetique-card-desc">{cosmetique.descriptionCourte}</p>
                  {renderRating(cosmetique.notation)}
                  <div className="cosmetique-card-footer">
                    <span className="cosmetique-card-price">{cosmetique.prix} €</span>
                    <button
                      className="cosmetique-add-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingBag /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cosmetique-no-results">
              <FiSearch size={48} />
              <h3>Aucun produit trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="cosmetique-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="cosmetique-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cosmetique-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="cosmetique-modal-body">
              {/* Section images */}
              <div className="cosmetique-modal-image-section">
                <div className="cosmetique-modal-main-image">
                  <img
                    src={quickViewProduct.images?.[currentImageIndex] || ''}
                    alt={quickViewProduct.nom || 'Produit cosmétique'}
                    className="cosmetique-modal-image"
                  />
                </div>
                <button className="cosmetique-modal-nav cosmetique-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="cosmetique-modal-nav cosmetique-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                {/* Miniatures */}
                <div className="cosmetique-modal-thumbnails">
                  {Array.isArray(quickViewProduct.images) &&
                    quickViewProduct.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        className={`cosmetique-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(idx)}
                      />
                    ))}
                </div>
              </div>

              {/* Section informations */}
              <div className="cosmetique-modal-info-section">
                <div className="cosmetique-modal-header">
                  <h2 className="cosmetique-modal-title">{quickViewProduct.nom}</h2>
                  <p className="cosmetique-modal-price">{quickViewProduct.prix} €</p>
                </div>
                <div className="cosmetique-modal-rating">
                  {renderRating(quickViewProduct.notation)}
                  <span className="cosmetique-modal-category">{quickViewProduct.type}</span>
                </div>
                <p className="cosmetique-modal-desc">{quickViewProduct.descriptionLongue}</p>
                <div className="cosmetique-modal-details">
                  <h4>Composition</h4>
                  <ul>
                    <li><FiStar size={14} /> <strong>Ingrédients clés:</strong> {quickViewProduct.ingredientsCle}</li>
                    <li><FiStar size={14} /> <strong>Type de peau:</strong> {quickViewProduct.typePeau}</li>
                    <li><FiStar size={14} /> <strong>Avantages:</strong> {quickViewProduct.avantages}</li>
                  </ul>
                  <div className="cosmetique-modal-specs">
                    <p><strong>Type:</strong> {quickViewProduct.type}</p>
                    <p><strong>Volume:</strong> {quickViewProduct.volume} ml</p>
                    <p><strong>Bio:</strong> {quickViewProduct.bio ? 'Oui' : 'Non'}</p>
                  </div>
                </div>
                <div className="cosmetique-modal-actions">
                  <button className="cosmetique-modal-add">
                    <FiShoppingBag /> Ajouter au panier
                  </button>
                  <button className="cosmetique-modal-wishlist">
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

export default CollectionCosmetiques;