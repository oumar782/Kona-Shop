import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { FiSearch, FiHeart, FiX, FiChevronRight, FiChevronLeft, FiShoppingBag, FiStar } from 'react-icons/fi';
import './PretAporte.css';

const CollectionLuxe = () => {
  const [activeCategory, setActiveCategory] = useState('Homme');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState({});

  // --- Optimized Product Data ---
  const productsData = useMemo(() => ({
    Homme: [
      {
        id: 1,
        name: "Costume trois pièces Dior",
        description: "Laine premium, coupe sur mesure avec détails en soie. Pièce iconique de la collection Printemps-Été.",
        price: "3 200€",
        images: [
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "100% laine vierge de mérinos",
          "Doublure en soie 100% mûrier",
          "Boutons en corne naturelle",
          "Coupe slim fit ajustée",
          "Finition main avec surpiqûres",
          "Poche poitrine biaisée"
        ],
        category: "Homme",
        isNew: true,
        bestseller: true,
        rating: 5
      },
      {
        id: 2,
        name: "Veste en cuir Brunello Cucinelli",
        description: "Cuir italien vieilli à la main, finition impeccable. Pièce intemporelle pour une élégance discrète.",
        price: "2 850€",
        images: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cuir d'agneau pleine fleur italien",
          "Doublure en cachemire 100%",
          "Coutures réalisées à la main",
          "Fermeture à pression invisible",
          "Poches intérieures en soie",
          "Teinture végétale vieillissante"
        ],
        category: "Homme",
        isNew: false,
        bestseller: true,
        rating: 4
      },
      {
        id: 3,
        name: "Chemise en soie Brioni",
        description: "Soie du Japon, coupe classique avec col boutonné. L'essence même du luxe discret.",
        price: "890€",
        images: [
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Soie 100% mûrier du Japon",
          "Col boutonné avec armature",
          "Boutons en nacre véritable",
          "Ourlets roulés à la main",
          "Forme classique légèrement ajustée",
          "Lavable en machine délicat"
        ],
        category: "Homme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 4,
        name: "Pantalon en laine Ermenegildo Zegna",
        description: "Laine super 150's, coupe parfaite pour une élégance sans effort.",
        price: "1 150€",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Laine Super 150's australienne",
          "Coupe droite légèrement évasée",
          "Passepoil de propreté en soie",
          "Braguette à boutons cachés",
          "Poches italiennes inclinées",
          "Ourlets faits main"
        ],
        category: "Homme",
        isNew: false,
        bestseller: true,
        rating: 4
      },
      {
        id: 5,
        name: "Manteau en cachemire Loro Piana",
        description: "Cachemire 100%, poids plume, chaleur exceptionnelle. Le summum du confort élégant.",
        price: "4 200€",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cachemire 100% mongol",
          "Poids de 380g seulement",
          "Finition main surpiquée",
          "Capuche amovible",
          "Doublure en soie",
          "Entretien pressing"
        ],
        category: "Homme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 5,
        name: "Manteau en cachemire Loro Piana",
        description: "Cachemire 100%, poids plume, chaleur exceptionnelle. Le summum du confort élégant.",
        price: "4 200€",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cachemire 100% mongol",
          "Poids de 380g seulement",
          "Finition main surpiquée",
          "Capuche amovible",
          "Doublure en soie",
          "Entretien pressing"
        ],
        category: "Homme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 5,
        name: "Manteau en cachemire Loro Piana",
        description: "Cachemire 100%, poids plume, chaleur exceptionnelle. Le summum du confort élégant.",
        price: "4 200€",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cachemire 100% mongol",
          "Poids de 380g seulement",
          "Finition main surpiquée",
          "Capuche amovible",
          "Doublure en soie",
          "Entretien pressing"
        ],
        category: "Homme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 5,
        name: "Manteau en cachemire Loro Piana",
        description: "Cachemire 100%, poids plume, chaleur exceptionnelle. Le summum du confort élégant.",
        price: "4 200€",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cachemire 100% mongol",
          "Poids de 380g seulement",
          "Finition main surpiquée",
          "Capuche amovible",
          "Doublure en soie",
          "Entretien pressing"
        ],
        category: "Homme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
       {
        id: 5,
        name: "Manteau en cachemire Loro Piana",
        description: "Cachemire 100%, poids plume, chaleur exceptionnelle. Le summum du confort élégant.",
        price: "4 200€",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cachemire 100% mongol",
          "Poids de 380g seulement",
          "Finition main surpiquée",
          "Capuche amovible",
          "Doublure en soie",
          "Entretien pressing"
        ],
        category: "Homme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 6,
        name: "Chaussures en cuir John Lobb",
        description: "Chaussures en cuir pleine fleur fabriquées à la main en Angleterre.",
        price: "1 250€",
        images: [
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cuir pleine fleur français",
          "Semelle en cuir de veau",
          "Goodyear welted",
          "Doublure en cuir de mouton",
          "Finition à la main",
          "Fabriqué en Angleterre"
        ],
        category: "Homme",
        isNew: false,
        bestseller: true,
        rating: 5
      }
    ],
    Femme: [
      {
        id: 7,
        name: "Robe en soie Chanel",
        description: "Élégance intemporelle, coupe parfaite. La robe qui sublime toutes les silhouettes.",
        price: "1 850€",
        images: [
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Soie 100% mûrier française",
          "Broderies main en fils d'or",
          "Zip invisible dissimulé",
          "Doublure en satin de soie",
          "Ourlets roulés à la main",
          "Forme ajustée avec drapé"
        ],
        category: "Femme",
        isNew: true,
        bestseller: true,
        rating: 5
      },
      {
        id: 8,
        name: "Veste brodée Gucci",
        description: "Artisanat italien, détails uniques. Une pièce signature de la maison milanaise.",
        price: "2 400€",
        images: [
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Mélange laine et soie 70/30",
          "Broderies à la main motifs floraux",
          "Boutons en résine laquée",
          "Doublure en satin imprimé",
          "Poches plaquées cachées",
          "Finition entièrement artisanale"
        ],
        category: "Femme",
        isNew: false,
        bestseller: true,
        rating: 4
      },
      {
        id: 9,
        name: "Jupe plissée Dior",
        description: "Plissés soleil, mouvement fluide. L'iconique jupe Bar revisitée pour la modernité.",
        price: "1 650€",
        images: [
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "100% soie mousseline",
          "120 plis permanents",
          "Ceinture taille ajustable",
          "Longueur midi à 55cm",
          "Ourlet invisible main",
          "Entretien pressing uniquement"
        ],
        category: "Femme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 10,
        name: "Ensemble tailleur Saint Laurent",
        description: "Ligne structurée, allure puissante. Le pouvoir du tailleur féminin réinventé.",
        price: "2 950€",
        images: [
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Laine et cachemire 80/20",
          "Veste cintrée épaule naturelle",
          "Pantalon à taille haute",
          "Boutons métal mat signature",
          "Doublure en soie imprimée",
          "Finition atelier parisien"
        ],
        category: "Femme",
        isNew: false,
        bestseller: true,
        rating: 5
      },
      {
        id: 11,
        name: "Robe de soirée Valentino",
        description: "Tulle brodé main, silhouette divine. Pour les nuits les plus magiques.",
        price: "5 200€",
        images: [
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Tulle italien 100%",
          "Broderie main perles et cristaux",
          "Soutien-gorge intégré",
          "Traîne de 1.2m",
          "Fermeture invisible",
          "Pièce unique"
        ],
        category: "Femme",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 12,
        name: "Sac à main Hermès Kelly",
        description: "Cuir de veau tanné végétal, finition main. L'icône intemporelle du luxe.",
        price: "8 500€",
        images: [
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Cuir de veau tanné végétal",
          "Fermoir à clic en métal palladié",
          "Doublure en chèvre",
          "Sangle amovible",
          "Dimensions 28cm",
          "Fabriqué en France"
        ],
        category: "Femme",
        isNew: false,
        bestseller: true,
        rating: 5
      }
    ],
    Enfant: [
      {
        id: 13,
        name: "Ensemble junior Dior",
        description: "Réplique miniature des collections adultes. L'élégance dès le plus jeune âge.",
        price: "1 200€",
        images: [
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Coton organique certifié GOTS",
          "Coupe ajustée confortable",
          "Détails identiques version adulte",
          "Boutons en corozo naturel",
          "Ourlets renforcés pour durabilité",
          "Lavable en machine 30°"
        ],
        category: "Enfant",
        isNew: true,
        bestseller: true,
        rating: 4
      },
      {
        id: 14,
        name: "Manteau enfant Burberry",
        description: "Trench miniature, héritage britannique. La classe intemporelle pour les petits.",
        price: "950€",
        images: [
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Coton gabardine imperméable",
          "Doublure en cachemire",
          "Ceinture et patte de serrage",
          "Boutons signature en corozo",
          "Poche poitrine caractéristique",
          "Fabriqué en Angleterre"
        ],
        category: "Enfant",
        isNew: false,
        bestseller: true,
        rating: 5
      },
      {
        id: 15,
        name: "Robe fillette Dolce & Gabbana",
        description: "Soie et dentelle, détails siciliens. Pour les petites princesses.",
        price: "1 100€",
        images: [
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Soie 100% et dentelle",
          "Broderies main motifs floraux",
          "Ceinture en satin",
          "Boutons en nacre",
          "Ourlet en dentelle",
          "Lavage à la main"
        ],
        category: "Enfant",
        isNew: true,
        bestseller: false,
        rating: 5
      },
      {
        id: 16,
        name: "Costume garçon Versace",
        description: "Miniature des collections adultes avec motifs iconiques.",
        price: "1 350€",
        images: [
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=800&auto=format&fit=crop&q=80"
        ],
        details: [
          "Laine et soie 70/30",
          "Motifs Medusa imprimés",
          "Boutons métallisés",
          "Doublure en satin",
          "Poches plaquées",
          "Entretien pressing"
        ],
        category: "Enfant",
        isNew: false,
        bestseller: true,
        rating: 4
      }
    ]
  }), []);
  // --- Filter products with debounce effect ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(true);
      if (!searchQuery.trim()) {
        setFilteredProducts(productsData);
      } else {
        const filtered = {};
        Object.keys(productsData).forEach(category => {
          filtered[category] = productsData[category].filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.details.some(detail => detail.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        });
        setFilteredProducts(filtered);
      }
      setIsSearching(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, productsData]);

  // --- Image Navigation ---
  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev + 1) % quickViewProduct.images.length);
  }, [quickViewProduct]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev - 1 + quickViewProduct.images.length) % quickViewProduct.images.length);
  }, [quickViewProduct]);

  const selectImage = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  // --- Memoized filtered products ---
  const displayedProducts = useMemo(() => {
    return searchQuery.trim()
      ? (filteredProducts[activeCategory] || [])
      : productsData[activeCategory];
  }, [searchQuery, filteredProducts, activeCategory, productsData]);

  // --- Render Star Rating ---
  const renderRating = (rating) => {
    return (
      <div className="luxe-rating">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={`luxe-star ${i < rating ? 'filled' : ''}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="luxe-root">
      {/* === Horizontal Navigation Bar === */}
    <header className="luxe-navbar">
  <div className="luxe-navbar-container">
    <nav className="luxe-nav">
      {['Homme', 'Femme', 'Enfant'].map(category => (
        <button
          key={category}
          className={`luxe-nav-item ${activeCategory === category ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory(category);
            setSearchQuery('');
          }}
        >
          {category}
        </button>
      ))}
    </nav>
    <div className="luxe-search-wrapper">
      <div className="luxe-search-box">
        <FiSearch className="luxe-search-icon" />
        <input
          type="text"
          placeholder="Rechercher un article..."
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
</header>
      {/* === Main Content === */}
      <main className="luxe-main">
        <div className="luxe-header-section">
          <h2 className="luxe-category-title">{activeCategory}</h2>
          <p className="luxe-subtitle">
            Collection exclusive • Artisanat d'exception • Pièces uniques
          </p>
        </div>
        <div className="luxe-products-grid">
          {displayedProducts?.map((product, index) => (
            <div
              key={product.id}
              className="luxe-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="luxe-card-image-wrapper">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="luxe-card-image"
                  loading="lazy"
                />
                {/* Image Gallery Dots */}
                <div className="luxe-image-dots">
                  {product.images.map((_, idx) => (
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
                {/* Hover Overlay */}
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
                {/* Wishlist Button */}
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
          ))}
          {displayedProducts?.length === 0 && !isSearching && (
            <div className="luxe-no-results">
              <FiSearch size={48} />
              <h3>Aucun produit trouvé</h3>
              <p>Essayez une autre recherche ou catégorie.</p>
            </div>
          )}
        </div>
      </main>

      {/* === Quick View Modal === */}
      {quickViewProduct && (
        <div className="luxe-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="luxe-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="luxe-modal-close" 
              onClick={() => setQuickViewProduct(null)}
            >
              <FiX />
            </button>
            <div className="luxe-modal-body">
              <div className="luxe-modal-image-section">
                <div className="luxe-modal-main-image">
                  <img
                    src={quickViewProduct.images[currentImageIndex]}
                    alt={quickViewProduct.name}
                    className="luxe-modal-image"
                  />
                </div>
                <button className="luxe-modal-nav luxe-modal-prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="luxe-modal-nav luxe-modal-next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                <div className="luxe-modal-thumbnails">
                  {quickViewProduct.images.map((img, idx) => (
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
                    {quickViewProduct.details.map((detail, idx) => (
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