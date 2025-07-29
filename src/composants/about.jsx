import React from 'react';
import { Shield, Users, Award, Globe } from 'lucide-react';
import './about.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">Notre Mission</h2>
            <p className="about-description">
            Faire du shopping un plaisir simple, accessible et unique pour tous.
            Rassembler en un seul endroit tout ce qui embellit la vie, du style, des senteurs, des idées déco, de la technologie et bien plus encore.
            </p>
            <p className="inspi" >
            Parce qu’on croit qu’on a tous envie de se faire plaisir, d’offrir, de surprendre… et que ça doit être facile, fun et inspirant. 
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: Shield,
                title: "Authenticité Garantie",
                description: "100% de produits originaux avec garantie constructeur."
              },
              {
                icon: Users,
                title: "50,000+ Clients",
                description: "Une communauté fidèle qui nous fait confiance."
              },
              {
                icon: Award,
                title: "Excellence Reconnue",
                description: " Notre plus grande fierté, c’est la confiance et la reconnaissance de nos clients."
              },
              {
                icon: Globe,
                title: "Vision Globale",
                description: " Tout ce qui rend la vie plus belle, à portée de clic."
              }
            ].map((item, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon-container">
                  <item.icon className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">{item.title}</h3>
                  <p className="feature-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-image-container">
          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&w=800"
              alt="TechMaroc Mission"
              className="about-image"
            />
          </div>
          <div className="decorative-element gold"></div>
          <div className="decorative-element navy"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;