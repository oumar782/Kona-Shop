import React, { useState, Suspense, lazy } from 'react';
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
  Sparkles
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
    label: 'Prêt-à-Porter Signature', 
    description: 'Des pièces élégantes pour affirmer votre style',
    icon: Shirt 
  },
  { 
    id: 'perfumery', 
    label: 'Parfumerie d’Exception', 
    description: 'Fragrances rares, créées pour marquer les esprits',
    icon: SprayCan 
  },
  { 
    id: 'cosmetics', 
    label: 'Beauté & Soin', 
    description: 'Des formules premium pour sublimer chaque geste',
    icon: Smile 
  },
  { 
    id: 'toys', 
    label: 'Jouets d’Art', 
    description: 'Objets uniques pour éveiller petits et grands',
    icon: Gamepad2 
  },
  { 
    id: 'electronics', 
    label: 'Tech Élite', 
    description: 'Innovation et design réunis dans chaque appareil',
    icon: Smartphone 
  },
  { 
    id: 'home-decor', 
    label: 'Décoration Intemporelle', 
    description: 'L’art de vivre à travers des créations raffinées',
    icon: Home 
  },
  { 
    id: 'jewelry', 
    label: 'Bijoux Haute Création', 
    description: 'Des pièces uniques façonnées avec passion',
    icon: Gem 
  },
  { 
    id: 'auto-luxury', 
    label: 'Accessoires Auto Luxe', 
    description: 'L’élégance jusque dans les moindres détails',
    icon: Car 
  }
];

const BoutiqueLuxe = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const renderContent = () => {
    if (!activeCategory) {
      return (
        <div className="premium-placeholder">
          <div className="premium-placeholder-icon">
            <Sparkles size={80} strokeWidth={1.5} />
          </div>
          <h2 className="premium-placeholder-title">Découvrez l’univers Kona-shop</h2>
          <p className="premium-placeholder-subtitle">
            Parcourez nos collections soigneusement sélectionnées pour conjuguer élégance, innovation et raffinement.
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

    return (
      <div className="premium-products-container">
        <div className="premium-products-grid">
          {components[activeCategory]}
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
            Bienvenue dans l’univers <span className="premium-hero-accent">Kona-shop</span>
          </h1>
          <p className="premium-hero-subtitle">
            Explorez une sélection de créations uniques, alliant art, savoir-faire et modernité.
          </p>
        
        </div>
      </section>

      {/* Categories Section */}
      <section className="premium-categories-section">
        <div className="premium-section-header">
          <h2 className="premium-section-title">Nos univers d’exception</h2>
          <p className="premium-section-description">
            Chaque catégorie a été pensée pour offrir une expérience unique et intemporelle.
          </p>
        </div>
        <div className="premium-categories-grid">
          {premiumCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <div
                key={category.id}
                className={`premium-category-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="premium-category-icon">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="premium-category-name">{category.label}</h3>
                <p className="premium-category-hover-text">{category.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section className="premium-products-section">
        <Suspense fallback={
          <div className="premium-loader">
            <div className="premium-loader-content">
              <div className="premium-loader-spinner"></div>
              <span className="premium-loader-text">Chargement de la collection...</span>
            </div>
          </div>
        }>
          {renderContent()}
        </Suspense>
      </section>
    </div>
  );
};

export default BoutiqueLuxe;
