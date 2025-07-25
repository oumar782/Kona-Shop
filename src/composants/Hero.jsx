import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 1,
      category: "Parfumerie",
      title: "L'art de la fragrance",
      subtitle: "Des essences qui captivent chez Kona Shop",
      description: "Découvrez nos parfums exclusifs créés par les meilleurs nez du monde pour une expérience olfactive inoubliable.",
      badges: ["Nouveautés 2024", "Éditions Limitées", "100% Naturel"],
      ctaPrimary: "Voir les parfums",
      ctaSecondary: "Créer son parfum",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      bgColor: "linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)",
      accentColor: "#a18cd1",
      overlay: "rgba(161, 140, 209, 0.15)"
    },
    {
      id: 2,
      category: "Prêt-à-Porter",
      title: "Élégance moderne",
      subtitle: "Des collections qui vous ressemblent",
      description: "Parcourez nos dernières collections de vêtements conçus avec des matériaux premium pour un style unique au quotidien.",
      badges: ["Nouvelle Collection", "Tendances 2024", "Fabriqué en France"],
      ctaPrimary: "Découvrir la collection",
      ctaSecondary: "Style Guide",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      bgColor: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
      accentColor: "#e2d1c3",
      overlay: "rgba(226, 209, 195, 0.15)"
    },
    {
      id: 3,
      category: "Électronique",
      title: "Composants High-Tech",
      subtitle: "L'avenir à portée de main avec Kona Shop",
      description: "Découvrez les dernières innovations technologiques pour équiper votre maison et votre bureau avec des produits high-tech de pointe.",
      badges: ["Nouveautés Tech", "Garantie 3 ans", "Écologique"],
      ctaPrimary: "Voir les produits",
      ctaSecondary: "Comparer",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      bgColor: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
      accentColor: "#00bcd4",
      overlay: "rgba(0, 188, 212, 0.15)"
    }
  ];

  // Gestion du touch pour mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  // Effet parallaxe pour les images
  useEffect(() => {
    const handleScroll = () => {
      animationFrameRef.current = requestAnimationFrame(() => {
        const slides = document.querySelectorAll('.hero-slide');
        slides.forEach((slide, index) => {
          const img = slide.querySelector('.hero-slide__img');
          const content = slide.querySelector('.hero-slide__content');
          if (img && content) {
            const rect = slide.getBoundingClientRect();
            const isActive = rect.left >= 0 && rect.right <= window.innerWidth;
            if (isActive) {
              const offsetY = (window.innerHeight - rect.top) * 0.1;
              const offsetX = (window.innerWidth - rect.left) * 0.05;
              img.style.transform = `perspective(1200px) rotateY(-8deg) rotateX(2deg) translateY(${offsetY}px) translateX(${offsetX}px)`;
              content.style.transform = `translateY(${-offsetY * 0.3}px)`;
            }
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Défilement automatique
  useEffect(() => {
    const playNextSlide = () => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    if (autoPlay && !isHovering) {
      timeoutRef.current = setTimeout(playNextSlide, 7000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoPlay, currentSlide, isHovering, slides.length]);

  // Synchronisation du scroll
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentSlide * window.innerWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Effet de particules élégant
  const createParticles = () => {
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 10 + 3;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      const shape = Math.random() > 0.7 ? '50%' : '0';
      
      particles.push(
        <div 
          key={i}
          className="hero-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: Math.random() * 0.4 + 0.1,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            background: `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`,
            borderRadius: shape,
            filter: `blur(${Math.random() * 2}px)`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <section 
      className="hero-section"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-carousel" ref={carouselRef}>
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              background: slide.bgColor,
              '--accent-color': slide.accentColor,
              '--overlay-color': slide.overlay
            }}
          >
            {createParticles()}
            <div className="hero-slide__overlay"></div>
            
            <div className="hero-slide__content">
              <span className="hero-slide__category">{slide.category}</span>
              
              <div className="hero-slide__badges">
                {slide.badges.map((badge, i) => (
                  <span 
                    key={i} 
                    className="hero-slide__badge" 
                    style={{ '--delay': `${i * 0.1}s` }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              
              <h1 className="hero-slide__title">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className="hero-slide__title-word" style={{ '--word-index': i }}>
                    {word.split('').map((letter, j) => (
                      <span 
                        key={j} 
                        className="hero-slide__title-letter"
                        style={{ '--letter-index': j }}
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
                <a href="#shop" className="hero-slide__cta hero-slide__cta--primary">
                  <span className="hero-slide__cta-text">{slide.ctaPrimary}</span>
                  <span className="hero-slide__cta-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </span>
                </a>
                <a href="#about" className="hero-slide__cta hero-slide__cta--secondary">
                  <span className="hero-slide__cta-text">{slide.ctaSecondary}</span>
                  <span className="hero-slide__cta-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            
            <div className="hero-slide__imgwrap">
              <div className="hero-slide__imgdeco"></div>
              <div className="hero-slide__imglight"></div>
              <img 
                src={slide.image} 
                alt={slide.title}
                className="hero-slide__img"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="hero-nav">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-nav__dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller à la catégorie ${slides[index].category}`}
          >
            <span className="hero-nav__dot-progress"></span>
            <span className="hero-nav__dot-label">{slides[index].category}</span>
          </button>
        ))}
      </div>

      <button 
        className="hero-autoplay"
        onClick={() => setAutoPlay(!autoPlay)}
        aria-label={autoPlay ? 'Pause' : 'Lecture automatique'}
      >
        <div className={`hero-autoplay__icon ${autoPlay ? 'pause' : 'play'}`}>
          <span></span>
          <span></span>
        </div>
      </button>

      <button className="hero-nav__btn hero-nav__btn--prev" onClick={prevSlide} aria-label="Slide précédent">
        <svg viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
        </svg>
      </button>
      <button className="hero-nav__btn hero-nav__btn--next" onClick={nextSlide} aria-label="Slide suivant">
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </button>
    </section>
  );
};

export default Hero;