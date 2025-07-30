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
    description: 'Pour sublimer votre style, au quotidien comme lors d’occasions spéciales.',
    icon: Shirt 
  },
  { 
    id: 'perfumery', 
    label: 'Parfumerie d’Exception', 
    description: 'Des fragrances inoubliables, pour affirmer votre personnalité.',
    icon: SprayCan 
  },
  { 
    id: 'cosmetics', 
    label: 'Beauté & Soin', 
    description: 'Des formules haut de gamme, pensées pour révéler votre éclat naturel.',
    icon: Smile 
  },
  { 
    id: 'toys', 
    label: 'Jouets d’Art', 
    description: 'Offrez des pièces uniques qui font rêver petits et grands.',
    icon: Gamepad2 
  },
  { 
    id: 'electronics', 
    label: 'Tech Élite', 
    description: 'Quand innovation et design se conjuguent au service de votre quotidien.',
    icon: Smartphone 
  },
  { 
    id: 'home-decor', 
    label: 'Décoration Intemporelle', 
    description: 'Apportez une touche d’âme et d’élégance à votre intérieur.',
    icon: Home 
  },
  { 
    id: 'jewelry', 
    label: 'Bijoux Haute Création', 
    description: 'Exprimez votre singularité grâce à des pièces uniques et précieuses.',
    icon: Gem 
  },
  { 
    id: 'auto-luxury', 
    label: 'Accessoires Auto Luxe', 
    description: 'Alliez performance et raffinement jusque dans les moindres détails.',
    icon: Car 
  }
];

const BoutiqueLuxe = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const productsSectionRef = useRef(null);

  useEffect(() => {
    if (activeCategory && productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeCategory]);

  const renderContent = () => {
    if (!activeCategory) {
      return (
        <div className="premium-placeholder">
          <div className="premium-placeholder-icon">
            <Sparkles size={80} strokeWidth={1.5} />
          </div>
          <h2 className="premium-placeholder-title">Découvrez l’univers Kona-shop</h2>
          <p className="premium-placeholder-subtitle">
            Sélectionnez la boutique qui vous attire et laissez-vous guider parmi nos sélections exclusives.
          </p>
        </div>
      );
    }

    const components = {
      'ready-to-wear': (
        <div>
          <PretAPorter />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ),
      'perfumery': (
        <div>
          <Parfumerie />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ),
      'cosmetics': (
        <div>
          <Cosmetique />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ),
      'toys': (
        <div>
          <Jouets />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ),
      'electronics': (
        <div>
          <Electronique />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ),
      'home-decor': (
        <div>
          <DecorationMaison />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ),
      'jewelry': (
        <div>
          <Bijouterie />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ),
      'auto-luxury': (
        <div>
          <AccesoiresAuto />
          <div className="premium-explore-button-container">
            <button className="premium-explore-button">
              Explorer cette boutique <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )
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
            Entrez dans l’univers <span className="premium-hero-accent">Kona-shop</span>
          </h1>
          <p className="premium-hero-subtitle">
            Laissez-vous séduire par nos créations rares, pensées pour celles et ceux qui aiment se distinguer.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="premium-categories-section">
        <div className="premium-section-header">
          <h2 className="premium-section-title">Choisissez votre univers</h2>
          <p className="premium-section-description">
            Chaque boutique vous propose une expérience unique, où élégance et caractère se rencontrent.
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
      <section className="premium-products-section" ref={productsSectionRef}>
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
