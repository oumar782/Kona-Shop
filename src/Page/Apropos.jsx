import React from 'react';
import { Shield, Award, Users, Globe, Star, Zap } from 'lucide-react';
import About from'../composants/about';
import Testimonial from'../composants/testimoniales';
import './apropos.css';

const apropos = () => {
  const values = [
    {
      icon: Shield,
      title: "Fiabilité",
      description: "Des produits authentiques avec garantie officielle pour votre tranquillité d'esprit."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Un service client exceptionnel et des produits de qualité supérieure depuis 2015."
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Une équipe marocaine dédiée à votre satisfaction, parlant votre langue."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Les dernières technologies mondiales adaptées au marché marocain."
    }
  ];

  const stats = [
    { number: "50,000", label: "Clients satisfaits" },
    { number: "15", label: "Marques partenaires" },
    { number: "8", label: "Années d'expérience" },
    { number: "99%", label: "Taux de satisfaction" }
  ];

  return (
    <div className="about-page">
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            À Propos de <span className="luxury-text">Kona Shop</span>
          </h1>
          <p className="hero-description">
            Votre partenaire technologique de confiance au Maroc. Nous révolutionnons l'expérience 
            d'achat de produits high-tech avec passion, expertise et engagement.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
       <About/>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="values-header">
            <h2 className="values-title">Nos Valeurs</h2>
            <p className="values-subtitle">
              Des principes qui guident chacune de nos actions pour vous offrir la meilleure expérience.
            </p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-container">
                  <value.icon className="value-icon" />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">Notre Équipe</h2>
            <p className="team-subtitle">
              Des experts passionnés de technologie, dédiés à votre satisfaction.
            </p>
          </div>
          
          <div className="team-grid">
            {[
              {
                name: "Youssef El Amrani",
                role: "Directeur Général",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=400",
                description: "Expert en technologie avec 15 ans d'expérience dans le secteur."
              },
              {
                name: "Fatima Benali",
                role: "Responsable Commercial",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=400",
                description: "Spécialiste des relations clients et du développement commercial."
              },
              {
                name: "Ahmed Tazi",
                role: "Expert Technique",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400",
                description: "Ingénieur système passionné par les dernières innovations technologiques."
              }
            ].map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="team-image"
                  />
                </div>
                <div className="team-card-content">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  <p className="team-member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Testimonial/>

    </div>
  );
};

export default apropos;