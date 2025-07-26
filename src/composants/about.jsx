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
              Depuis 2015, TechMaroc révolutionne l'accès à la technologie au Maroc. 
              Notre mission est de démocratiser les produits high-tech en offrant 
              une expérience d'achat exceptionnelle, des produits authentiques et 
              un service client de classe mondiale.
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
                description: "Prix du meilleur e-commerce tech 2023 au Maroc."
              },
              {
                icon: Globe,
                title: "Vision Globale",
                description: "Les dernières innovations mondiales au Maroc."
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