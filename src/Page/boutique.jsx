import React, { useState, Suspense, lazy, useRef, useEffect } from 'react';
import {
  Shirt,
  SprayCan,
  Smile,
  Gamepad2,
  Smartphone,
  Home,
  Gem,
  Car,
  ArrowRight,
  Sparkles,
  Search,
  ChevronDown,
  X
} from 'lucide-react';
import './boutique.css';

// Lazy load components
const PretAPorter = lazy(() => import('../boutiques/PretAPorter'));
const Parfumerie = lazy(() => import('../boutiques/Parfumerie'));
const Cosmetique = lazy(() => import('../boutiques/Cosmetique'));
const Jouets = lazy(() => import('../boutiques/Jouets'));
const Electronique = lazy(() => import('../boutiques/Electronique'));
const DecorationMaison = lazy(() => import('../boutiques/Decorationmaison'));
const Bijouterie = lazy(() => import('../boutiques/Bijouterie'));
const AccesoiresAuto = lazy(() => import('../boutiques/AccesoiresAuto'));

const premiumCategories = [
  { 
    id: 'ready-to-wear', 
    label: 'Prêt-à-Porter', 
    description: 'Pour sublimer votre style, au quotidien comme lors d\'occasions spéciales.',
    icon: Shirt,
    productCount: '85 produits'
  },
  { 
    id: 'perfumery', 
    label: 'Parfumerie', 
    description: 'Des fragrances inoubliables, pour affirmer votre personnalité.',
    icon: SprayCan,
    productCount: '42 produits'
  },
  { 
    id: 'cosmetics', 
    label: 'Beauté & Soin', 
    description: 'Des formules haut de gamme, pensées pour révéler votre éclat naturel.',
    icon: Smile,
    productCount: '23 produits'
  },
  { 
    id: 'toys', 
    label: 'Jouets', 
    description: 'Offrez des pièces uniques qui font rêver petits et grands.',
    icon: Gamepad2,
    productCount: '15 produits'
  },
  { 
    id: 'electronics', 
    label: 'Tech Élite', 
    description: 'Quand innovation et design se conjuguent au service de votre quotidien.',
    icon: Smartphone,
    productCount: '42 produits'
  },
  { 
    id: 'home-decor', 
    label: 'Décoration', 
    description: 'Apportez une touche d\'âme et d\'élégance à votre intérieur.',
    icon: Home,
    productCount: '23 produits'
  },
  { 
    id: 'jewelry', 
    label: 'Bijoux', 
    description: 'Exprimez votre singularité grâce à des pièces uniques et précieuses.',
    icon: Gem,
    productCount: '15 produits'
  },
  { 
    id: 'auto-luxury', 
    label: 'Accessoires Auto', 
    description: 'Alliez performance et raffinement jusque dans les moindres détails.',
    icon: Car,
    productCount: '15 produits'
  }
];

const BoutiqueLuxe = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const productsSectionRef = useRef(null);

  useEffect(() => {
    if (activeCategory && productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeCategory]);

  const filteredCategories = premiumCategories.filter(category =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (!activeCategory) {
      return (
        <div className="premium-placeholder animate-fade-in">
          <div className="premium-placeholder-icon animate-float">
            <Sparkles size={80} strokeWidth={1.5} />
          </div>
          <h2 className="premium-placeholder-title">Découvrez l'univers Kona-shop</h2>
          <p className="premium-placeholder-subtitle">
            Sélectionnez la boutique qui vous attire et laissez-vous guider parmi nos sélections exclusives.
          </p>
        </div>
      );
    }

    const components = {
      'ready-to-wear': <PretAPorter />,
      'perfumery': <Parfumerie />,
      'cosmetics': <Cosmetique />,
      'toys': <Jouets />,
      'electronics': <Electronique />,
      'home-decor': <DecorationMaison />,
      'jewelry': <Bijouterie />,
      'auto-luxury': <AccesoiresAuto />
    };

    const activeCatData = premiumCategories.find(cat => cat.id === activeCategory);

    return (
      <div className="premium-products-container animate-fade-in">
        <div className="premium-products-header">
          <div className="flex items-center gap-4">
            <div className="category-icon-container">
              <activeCatData.icon size={24} className="category-icon" />
            </div>
            <div>
              <h2 className="premium-products-title">{activeCatData.label}</h2>
              <p className="premium-products-description">{activeCatData.description}</p>
            </div>
          </div>
          <button className="premium-explore-button group">
            <span>Explorer cette boutique</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="premium-products-grid">
          <Suspense fallback={
            <div className="premium-loader">
              <div className="premium-loader-spinner"></div>
              <span>Chargement des produits...</span>
            </div>
          }>
            {components[activeCategory]}
          </Suspense>
        </div>
      </div>
    );
  };

  return (
    <div className="premium-ecommerce">
      {/* Hero Section */}
      <section className="premium-hero-container">
        <div className="premium-hero-background"></div>
        <div className="premium-hero-overlay"></div>
        <div className="premium-hero-content">
          <h1 className="premium-hero-title">
            Notre <span className="premium-hero-accent">Boutique</span>
          </h1>
          <p className="premium-hero-subtitle">
            Découvrez notre sélection de produits high-tech premium, soigneusement choisis pour vous.
          </p>
        </div>
        <div className="premium-hero-scroll-indicator"></div>
      </section>

      {/* Categories Navigation */}
      <section className="premium-categories-nav">
        <div className="premium-search-container">
          <Search size={20} className="premium-search-icon" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="premium-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="premium-search-clear"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Mobile Categories Toggle */}
        <button 
          className="premium-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {activeCategory ? 
            premiumCategories.find(cat => cat.id === activeCategory)?.label : 
            'Catégories'
          }
          <ChevronDown size={18} className={`transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Categories List */}
        <div className={`premium-categories-list ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              className={`premium-category-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span>{category.label}</span>
              <span className="premium-product-count">{category.productCount}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="premium-products-section" ref={productsSectionRef}>
        {renderContent()}
      </section>
    </div>
  );
};

export default BoutiqueLuxe;