import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './testimoniales.css';

const testimoniales = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Youssef Benali",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=200",
      rating: 5,
      text: "Service exceptionnel ! J'ai acheté mon MacBook Pro chez TechMaroc et l'expérience était parfaite. Livraison rapide, produit authentique et excellent support client.",
      product: "MacBook Pro M2"
    },
    {
      name: "Fatima El Amrani",
      role: "Designer Graphique",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=200",
      rating: 5,
      text: "TechMaroc a dépassé mes attentes. Prix compétitifs, conseils d'experts et service après-vente irréprochable. Je recommande vivement !",
      product: "iPhone 15 Pro"
    },
    {
      name: "Ahmed Tazi",
      role: "Étudiant en Informatique",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=200",
      rating: 5,
      text: "Grâce à TechMaroc, j'ai trouvé l'ordinateur portable parfait pour mes études. Excellent rapport qualité-prix et équipe très professionnelle.",
      product: "ASUS ROG Strix"
    },
    {
      name: "Laila Senhaji",
      role: "Directrice Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=200",
      rating: 5,
      text: "Un service client remarquable ! L'équipe TechMaroc m'a aidé à choisir le smartphone idéal. Installation et configuration incluses, parfait !",
      product: "Samsung Galaxy S24"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-pattern">
        <div className="pattern-circle large"></div>
        <div className="pattern-circle small"></div>
      </div>

      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">
            Ce que disent nos <span className="gold-text">clients</span>
          </h2>
          <p className="testimonials-subtitle">
            Découvrez pourquoi plus de 50,000 clients nous font confiance pour leurs achats technologiques.
          </p>
        </div>

        <div className="testimonials-main">
          <div className="testimonial-card">
            <Quote className="quote-icon" />
            
            <div className="testimonial-content">
              <div className="rating-container">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="rating-star" />
                ))}
              </div>
              
              <p className="testimonial-text">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="testimonial-author">
                <img 
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="author-image"
                />
                <div className="author-info">
                  <h4 className="author-name">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="author-role">{testimonials[currentTestimonial].role}</p>
                  <p className="author-product">
                    A acheté: {testimonials[currentTestimonial].product}
                  </p>
                </div>
              </div>
            </div>

            <div className="testimonial-navigation">
              <button
                onClick={prevTestimonial}
                className="nav-button prev"
              >
                <ChevronLeft className="nav-icon" />
              </button>
              
              <div className="dots-container">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="nav-button next"
              >
                <ChevronRight className="nav-icon" />
              </button>
            </div>
          </div>

          <div className="testimonials-thumbnails">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`thumbnail-card ${
                  index === currentTestimonial ? 'active' : ''
                }`}
              >
                <div className="thumbnail-content">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="thumbnail-image"
                  />
                  <div>
                    <h5 className="thumbnail-name">
                      {testimonial.name}
                    </h5>
                    <div className="thumbnail-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="thumbnail-star" />
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default testimoniales;