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

// Lazy load des composants
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
    description: 'Élégance taillée sur mesure, pour un style qui laisse une empreinte inoubliable.',
    icon: Shirt,
    productCount: '85 produits'
  },
  { 
    id: 'perfumery', 
    label: 'Parfumerie', 
    description: 'Des fragrances rares pour sublimer votre présence et signer votre personnalité.',
    icon: SprayCan,
    productCount: '42 produits'
  },
  { 
    id: 'cosmetics', 
    label: 'Cosmetique', 
    description: 'Des soins haute performance qui révèlent votre éclat naturel.',
    icon: Smile,
    productCount: '23 produits'
  },
  { 
    id: 'toys', 
    label: 'Jouetterie', 
    description: 'Des créations uniques pour faire briller les yeux des petits et grands rêveurs.',
    icon: Gamepad2,
    productCount: '15 produits'
  },
  { 
    id: 'electronics', 
    label: 'Electronique', 
    description: 'Quand la technologie rencontre l’art du détail, pour sublimer votre quotidien.',
    icon: Smartphone,
    productCount: '42 produits'
  },
  { 
    id: 'home-decor', 
    label: 'Décoration-Maison', 
    description: 'Des pièces design et intemporelles pour créer un intérieur à votre image.',
    icon: Home,
    productCount: '23 produits'
  },
  { 
    id: 'jewelry', 
    label: 'Bijoux', 
    description: 'Exprimez votre singularité avec des créations précieuses façonnées avec passion.',
    icon: Gem,
    productCount: '15 produits'
  },
  { 
    id: 'auto-luxury', 
    label: 'Accessoires Auto', 
    description: 'Alliez raffinement et performance jusque dans les moindres détails de votre véhicule.',
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
          <h2 className="premium-placeholder-title">Découvrez l’univers Kona-shop</h2>
          <p className="premium-placeholder-subtitle">
            Parcourez nos univers exclusifs et laissez-vous séduire par des pièces rares et raffinées,
            pensées pour celles et ceux qui recherchent l’exception.
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
            L’art du <span className="premium-hero-accent">Shopping d’Exception</span>
          </h1>
          <p className="premium-hero-subtitle">
            Une sélection exclusive pour sublimer votre style, exprimer votre différence et vivre le luxe au quotidien.
          </p>
        </div>
        <div className="premium-hero-scroll-indicator"></div>
      </section>

      {/* Categories Navigation */}
      <section className="premium-categories-nav">


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
