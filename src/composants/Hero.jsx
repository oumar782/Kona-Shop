import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const lastScrollTime = useRef(0);

  const slides = [
    {
      id: 1,
      category: "Parfumerie",
      title: "L'Art de la Fragrance",
      subtitle: "Des essences qui captivent",
      description: "Découvrez nos parfums exclusifs créés par les meilleurs nez du monde pour une expérience olfactive inoubliable.",
      badges: ["Nouveautés 2024", "Éditions Limitées", "100% Naturel"],
      ctaPrimary: "Voir les parfums",
      ctaSecondary: "Créer son parfum",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      bgColor: "linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)",
      accentColor: "#a18cd1",
      overlay: "rgba(161, 140, 209, 0.15)"
    },
    // ... autres slides
  ];

  // Gestion du redimensionnement et détection mobile
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du touch pour mobile
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  }, []);

  // Effet parallaxe optimisé
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < 16) return; // Limite à ~60fps
      lastScrollTime.current = now;

      animationFrameRef.current = requestAnimationFrame(() => {
        const slides = document.querySelectorAll('.hero-slide');
        slides.forEach((slide) => {
          const img = slide.querySelector('.hero-slide__img');
          const content = slide.querySelector('.hero-slide__content');
          if (img && content) {
            const rect = slide.getBoundingClientRect();
            const isActive = rect.left >= 0 && rect.right <= windowSize.width;
            if (isActive) {
              const offsetY = (windowSize.height - rect.top) * 0.1;
              const offsetX = (windowSize.width - rect.left) * 0.05;
              img.style.transform = `perspective(1200px) rotateY(-8deg) rotateX(2deg) translateY(${offsetY}px) translateX(${offsetX}px)`;
              content.style.transform = `translateY(${-offsetY * 0.3}px)`;
            }
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [windowSize]);

  // Défilement automatique optimisé
  useEffect(() => {
    if (!autoPlay || isHovering) return;

    const playNextSlide = () => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    timeoutRef.current = setTimeout(playNextSlide, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [autoPlay, currentSlide, isHovering, slides.length]);

  // Synchronisation du scroll
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentSlide * windowSize.width,
        behavior: 'smooth'
      });
    }
  }, [currentSlide, windowSize.width]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    resetTimer();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    resetTimer();
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  }, [slides.length]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Effet de particules performant
  const createParticles = useCallback(() => {
    const particles = [];
    const particleCount = isMobile ? 12 : 24;
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 15 + 5;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particles.push(
        <div 
          key={`particle-${i}`}
          className="hero-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: Math.random() * 0.3 + 0.1,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            filter: `blur(${Math.random() * 3}px)`
          }}
        />
      );
    }
    return particles;
  }, [isMobile]);

  return (
    <section 
      className="hero-section"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Carousel de présentation"
    >
      <div className="hero-carousel" ref={carouselRef}>
        {slides.map((slide, index) => (
          <article 
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              background: slide.bgColor,
              '--accent-color': slide.accentColor,
              '--overlay-color': slide.overlay,
              minWidth: `${windowSize.width}px`
            }}
            aria-hidden={index !== currentSlide}
            aria-labelledby={`slide-${slide.id}-title`}
          >
            {createParticles()}
            <div className="hero-slide__overlay" aria-hidden="true"></div>
            
            <div className="hero-slide__content-container">
              <div className="hero-slide__content">
                <span className="hero-slide__category">{slide.category}</span>
                
                <div className="hero-slide__badges">
                  {slide.badges.map((badge, i) => (
                    <span key={i} className="hero-slide__badge" style={{ '--delay': `${i * 0.1}s` }}>
                      {badge}
                    </span>
                  ))}
                </div>
                
                <h1 id={`slide-${slide.id}-title`} className="hero-slide__title">
                  {slide.title.split(' ').map((word, i) => (
                    <span key={i} className="hero-slide__title-word" style={{ '--word-index': i }}>
                      {word.split('').map((letter, j) => (
                        <span 
                          key={j} 
                          className="hero-slide__title-letter"
                          style={{ '--letter-index': j }}
                          aria-hidden="true"
                        >
                          {letter}
                        </span>
                      ))}
                      {i < slide.title.split(' ').length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </h1>
                
                <p className="hero-slide__subtitle">{slide.subtitle}</p>
                <p className="hero-slide__desc">{slide.description}</p>
                
                <div className="hero-slide__actions">
                  <a 
                    href="#shop" 
                    className="hero-slide__cta hero-slide__cta--primary"
                    aria-label={slide.ctaPrimary}
                  >
                    <span className="hero-slide__cta-text">{slide.ctaPrimary}</span>
                    <span className="hero-slide__cta-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </span>
                  </a>
                  <a 
                    href="#about" 
                    className="hero-slide__cta hero-slide__cta--secondary"
                    aria-label={slide.ctaSecondary}
                  >
                    <span className="hero-slide__cta-text">{slide.ctaSecondary}</span>
                    <span className="hero-slide__cta-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            
            <figure className="hero-slide__img-container">
              <div className="hero-slide__imgwrap">
                <div className="hero-slide__imgdeco" aria-hidden="true"></div>
                <div className="hero-slide__imglight" aria-hidden="true"></div>
                <img 
                  src={slide.image} 
                  alt="" 
                  className="hero-slide__img"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="sr-only">{slide.title}</figcaption>
            </figure>
          </article>
        ))}
      </div>

      <nav className="hero-nav" aria-label="Navigation du carousel">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`hero-nav__dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller à la diapositive ${index + 1}: ${slide.category}`}
            aria-current={index === currentSlide}
          >
            <span className="hero-nav__dot-progress"></span>
            <span className="hero-nav__dot-label">{slide.category}</span>
          </button>
        ))}
      </nav>

      <button 
        className="hero-autoplay"
        onClick={() => setAutoPlay(!autoPlay)}
        aria-label={autoPlay ? 'Arrêter le défilement automatique' : 'Démarrer le défilement automatique'}
      >
        <div className={`hero-autoplay__icon ${autoPlay ? 'pause' : 'play'}`}>
          <span></span>
          <span></span>
        </div>
      </button>

      <button 
        className="hero-nav__btn hero-nav__btn--prev" 
        onClick={prevSlide} 
        aria-label="Diapositive précédente"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
        </svg>
      </button>
      <button 
        className="hero-nav__btn hero-nav__btn--next" 
        onClick={nextSlide} 
        aria-label="Diapositive suivante"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </button>
    </section>
  );
};

export default Hero;