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
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
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
  { id: 'pret-a-porter', label: 'Prêt-à-Porter', description: 'Élégance taillée sur mesure...', icon: Shirt, productCount: '85 produits' },
  { id: 'parfumerie', label: 'Parfumerie', description: 'Des fragrances rares...', icon: SprayCan, productCount: '42 produits' },
  { id: 'cosmetique', label: 'Cosmetique', description: 'Des soins haute performance...', icon: Smile, productCount: '23 produits' },
  { id: 'jouets', label: 'Jouets', description: 'Des créations uniques...', icon: Gamepad2, productCount: '15 produits' },
  { id: 'electronique', label: 'Electronique', description: 'Quand la technologie rencontre l’art...', icon: Smartphone, productCount: '42 produits' },
  { id: 'decoration-maison', label: 'Décoration-Maison', description: 'Des pièces design...', icon: Home, productCount: '23 produits' },
  { id: 'bijouterie', label: 'Bijouterie', description: 'Exprimez votre singularité...', icon: Gem, productCount: '15 produits' },
  { id: 'accesoires-auto', label: 'Accessoires Auto', description: 'Alliez raffinement et performance...', icon: Car, productCount: '15 produits' }
];

const BoutiqueLuxe = () => {
  const { category } = useParams(); // on lit la catégorie dans l'URL
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const productsSectionRef = useRef(null);

  useEffect(() => {
    if (category && productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [category]);

  const filteredCategories = premiumCategories;

  const components = {
    'pret-a-porter': <PretAPorter />,
    'parfumerie': <Parfumerie />,
    'cosmetique': <Cosmetique />,
    'jouets': <Jouets />,
    'electronique': <Electronique />,
    'decoration-maison': <DecorationMaison />,
    'bijouterie': <Bijouterie />,
    'accesoires-auto': <AccesoiresAuto />
  };

  const activeCatData = premiumCategories.find(cat => cat.id === category);

  const renderContent = () => {
    if (!category) {
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
            {components[category]}
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
          {category ? activeCatData?.label : 'Catégories'}
          <ChevronDown size={18} className={`transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className={`premium-categories-list ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              className={`premium-category-item ${category === cat.id ? 'active' : ''}`}
              onClick={() => {
                navigate(`/${cat.id}`); // redirige vers la route de la catégorie
                setIsMobileMenuOpen(false);
              }}
            >
              <span>{cat.label}</span>
              <span className="premium-product-count">{cat.productCount}</span>
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
