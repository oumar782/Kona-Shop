import React, { useState, useEffect, useRef } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight, Gem, Sparkles, Watch, Headphones } from 'lucide-react';
import './veddette.css';

const LuxuryShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const showcaseRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      if (!isHovered) {
        goToNext();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, currentSlide]);

  const featuredItems = [
    {
      id: 1,
      name: "Montre Élite Diamant",
      price: "2 899 €",
      originalPrice: "3 299 €",
      image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
      category: "Horlogerie",
      rating: 5,
      badge: "Édition Limitée",
      Icon: Watch,
      accentColor: "linear-gradient(135deg, rgba(254,243,199,0.15) 0%, rgba(255,247,205,0.2) 100%)"
    },
    {
      id: 2,
      name: "Essence de Minuit",
      price: "189 €",
      originalPrice: "249 €",
      image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg",
      category: "Parfumerie",
      rating: 5,
      badge: "Best-seller",
      Icon: Sparkles,
      accentColor: "linear-gradient(135deg, rgba(252,231,243,0.15) 0%, rgba(255,228,230,0.2) 100%)"
    },
    {
      id: 3,
      name: "Veston Soie Luxe",
      price: "899 €",
      originalPrice: "1 199 €",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
      category: "Haute Couture",
      rating: 5,
      badge: "Nouveauté",
      Icon: Gem,
      accentColor: "linear-gradient(135deg, rgba(245,245,245,0.15) 0%, rgba(255,255,255,0.2) 100%)"
    },
    {
      id: 4,
      name: "Écouteurs Premium",
      price: "599 €",
      originalPrice: "699 €",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      category: "Technologie",
      rating: 5,
      badge: "Choix Éditeur",
      Icon: Headphones,
      accentColor: "linear-gradient(135deg, rgba(239,246,255,0.15) 0%, rgba(224,231,255,0.2) 100%)"
    }
  ];

  const goToNext = () => {
    setCurrentSlide(prev => (prev === featuredItems.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide(prev => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goToNext();
    if (distance < -50) goToPrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleAddToCart = (productId) => {
    // Fonction pour ajouter au panier
    console.log(`Produit ${productId} ajouté au panier`);
  };

  return (
    <section 
      className={`prestige-showcase ${isVisible ? 'prestige-showcase--visible' : ''}`}
      ref={showcaseRef}
    >
      <div className="prestige-decoration prestige-decoration--diamond"></div>
      <div className="prestige-decoration prestige-decoration--gold"></div>
      <div className="prestige-decoration prestige-decoration--dark"></div>
      
      <div className="prestige-container">
        <div className="prestige-header">
          <div className="prestige-badge">
            <div className="prestige-badge__content">
              <Star className="prestige-badge__icon" />
              <span>Collection Exclusive</span>
            </div>
            <div className="prestige-badge__glow"></div>
          </div>
          
          <h2 className="prestige-title">
            <span className="prestige-title__main">Sélection d'Exception</span>
            {!isMobile && (
              <span className="prestige-title__sub">L'Élégance Redéfinie</span>
            )}
          </h2>
          
          <p className="prestige-description">
            Découvrez nos pièces les plus emblématiques, où l'artisanat rencontre l'innovation
          </p>
        </div>

        <div 
          className="prestige-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="prestige-carousel__track" 
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isHovered ? 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' : 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {featuredItems.map((item) => {
              const Icon = item.Icon;
              return (
                <div key={item.id} className="prestige-carousel__slide">
                  <div className="prestige-product">
                    <div className="prestige-product__visual">
                      <div className="prestige-product__frame" style={{ background: item.accentColor }}>
                        <img 
                          src={`${item.image}?auto=compress&cs=tinysrgb&w=${isMobile ? 400 : isTablet ? 600 : 800}`}
                          alt={item.name} 
                          className="prestige-product__image" 
                          loading="lazy"
                          width={isMobile ? 400 : isTablet ? 600 : 800}
                          height={isMobile ? 400 : isTablet ? 600 : 800}
                        />
                        <div className="prestige-product__tag prestige-product__tag--jewel">{item.badge}</div>
                        <div className="prestige-product__overlay"></div>
                        <div className="prestige-product__shine"></div>
                      </div>
                    </div>

                    <div className="prestige-product__details">
                      <div className="prestige-product__category">
                        <Icon className="prestige-product__category-icon" size={isMobile ? 14 : 16} />
                        <span>{item.category}</span>
                      </div>
                      
                      <h3 className="prestige-product__name">{item.name}</h3>
                      
                      <div className="prestige-product__rating">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="prestige-product__star" fill="currentColor" />
                        ))}
                        <span className="prestige-product__rating-text">Élu meilleur produit</span>
                      </div>
                      
                      <p className="prestige-product__description">
                        Pièce d'exception méticuleusement conçue par nos artisans. Chaque détail reflète notre engagement envers l'excellence.
                      </p>

                      <div className="prestige-product__pricing">
                        <div className="prestige-product__price-wrapper">
                          <span className="prestige-product__current-price">{item.price}</span>
                          <span className="prestige-product__original-price">{item.originalPrice}</span>
                        </div>
                        <span className="prestige-product__discount">ÉCONOMISEZ 25%</span>
                      </div>

                      <div className="prestige-product__actions">
                        <button 
                          className="prestige-button prestige-button--primary"
                          onClick={() => handleAddToCart(item.id)}
                          aria-label={`Ajouter ${item.name} au panier`}
                        >
                          <span>Ajouter au Panier</span>
                          <div className="prestige-button__hover"></div>
                        </button>
                        
                        <button className="prestige-button prestige-button--secondary">
                          <Heart className="prestige-button__icon" />
                          {!isMobile && <span>Liste de Souhaits</span>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isMobile && (
            <>
              <button 
                onClick={goToPrev} 
                className="prestige-carousel__nav prestige-carousel__nav--prev"
                aria-label="Précédent"
              >
                <ChevronLeft className="prestige-carousel__nav-icon" />
              </button>
              
              <button 
                onClick={goToNext} 
                className="prestige-carousel__nav prestige-carousel__nav--next"
                aria-label="Suivant"
              >
                <ChevronRight className="prestige-carousel__nav-icon" />
              </button>
            </>
          )}

          <div className="prestige-carousel__indicators">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`prestige-carousel__indicator ${index === currentSlide ? 'prestige-carousel__indicator--active' : ''}`}
                aria-label={`Aller au slide ${index + 1}`}
              >
                <div className="prestige-carousel__indicator-progress"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowcase;