import React, { useState, useEffect, useRef } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight, Gem, Sparkles, Watch, Headphones } from 'lucide-react';
import './veddette.css';

const LuxuryCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // Configuration responsive
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
  }, [isHovered]);

  const featuredProducts = [
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
      color: "linear-gradient(135deg, rgba(254,243,199,0.15) 0%, rgba(255,247,205,0.2) 100%)"
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
      color: "linear-gradient(135deg, rgba(252,231,243,0.15) 0%, rgba(255,228,230,0.2) 100%)"
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
      color: "linear-gradient(135deg, rgba(245,245,245,0.15) 0%, rgba(255,255,255,0.2) 100%)"
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
      color: "linear-gradient(135deg, rgba(239,246,255,0.15) 0%, rgba(224,231,255,0.2) 100%)"
    }
  ];

  const goToNext = () => {
    setCurrentSlide(prev => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide(prev => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Gestion du touch swipe
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

  return (
    <section 
      className={`luxury-carousel ${isVisible ? 'visible' : ''}`}
      ref={carouselRef}
    >
      {/* Éléments décoratifs */}
      <div className="luxury-decoration diamond-pattern"></div>
      <div className="luxury-decoration gold-blob"></div>
      <div className="luxury-decoration black-blob"></div>
      
      <div className="container">
        <div className="section-header">
          <div className="exclusive-badge">
            <div className="badge-content">
              <Star className="badge-icon" />
              <span>Collection Exclusive</span>
            </div>
            <div className="badge-glow"></div>
          </div>
          
          <h2>
            <span className="title-main">Sélection d'Exception</span>
            {!isMobile && (
              <span className="title-sub">L'Élégance Redéfinie</span>
            )}
          </h2>
          
          <p className="section-description">
            Découvrez nos pièces les plus emblématiques, où l'artisanat rencontre l'innovation
          </p>
        </div>

        <div 
          className="carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="carousel-track" 
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isHovered ? 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' : 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {featuredProducts.map((product) => {
              const Icon = product.Icon;
              return (
                <div key={product.id} className="carousel-slide">
                  <div className="product-grid">
                    <div className="product-image-container">
                      <div className="image-wrapper" style={{ background: product.color }}>
                        <img 
                          src={`${product.image}?auto=compress&cs=tinysrgb&w=${isMobile ? 400 : isTablet ? 600 : 800}`}
                          alt={product.name} 
                          className="product-image" 
                          loading="lazy"
                          width={isMobile ? 400 : isTablet ? 600 : 800}
                          height={isMobile ? 400 : isTablet ? 600 : 800}
                        />
                        <div className="product-badge">{product.badge}</div>
                        <div className="image-overlay"></div>
                        <div className="image-shine"></div>
                      </div>
                    </div>

                    <div className="product-details">
                      <div className="category-tag">
                        <Icon className="category-icon" size={isMobile ? 14 : 16} />
                        <span>{product.category}</span>
                      </div>
                      
                      <h3 className="product-name">{product.name}</h3>
                      
                      <div className="rating-container">
                        {[...Array(product.rating)].map((_, i) => (
                          <Star key={i} className="star-icon" fill="currentColor" />
                        ))}
                        <span className="rating-text">Élu meilleur produit</span>
                      </div>
                      
                      <p className="product-description">
                        Pièce d'exception méticuleusement conçue par nos artisans. Chaque détail reflète notre engagement envers l'excellence.
                      </p>

                      <div className="price-container">
                        <div className="price-wrapper">
                          <span className="current-price">{product.price}</span>
                          <span className="original-price">{product.originalPrice}</span>
                        </div>
                        <span className="discount-badge">ÉCONOMISEZ 25%</span>
                      </div>

                      <div className="action-buttons">
                        <button className="add-to-cart">
                          <span>Ajouter au Panier</span>
                          <div className="button-hover"></div>
                        </button>
                        <button className="wishlist">
                          <Heart className="heart-icon" />
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
                className="carousel-button prev"
                aria-label="Précédent"
              >
                <ChevronLeft className="arrow-icon" />
              </button>
              
              <button 
                onClick={goToNext} 
                className="carousel-button next"
                aria-label="Suivant"
              >
                <ChevronRight className="arrow-icon" />
              </button>
            </>
          )}

          <div className="carousel-indicators">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Aller au slide ${index + 1}`}
              >
                <div className="indicator-progress"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryCarousel;