import React, { useState, useEffect } from 'react';
import { Sparkles, Shirt, Zap, Diamond, Palette, Gamepad2, ArrowRight,Crown,CheckCircle } from 'lucide-react';
import './store.css';

const store= () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  
  const categories = [
    { 
      name: "Perfumery", 
      icon: Sparkles, 
      count: "120+ Items", 
      color: "linear-gradient(135deg, rgba(254,243,199,0.8) 0%, rgba(254,249,195,0.9) 100%)",
      accentColor: "#F59E0B"
    },
    { 
      name: "Fashion", 
      icon: Shirt, 
      count: "300+ Items", 
      color: "linear-gradient(135deg, rgba(243,244,246,0.8) 0%, rgba(241,245,249,0.9) 100%)",
      accentColor: "#4B5563"
    },
    { 
      name: "Electronics", 
      icon: Zap, 
      count: "200+ Items", 
      color: "linear-gradient(135deg, rgba(239,246,255,0.8) 0%, rgba(224,231,255,0.9) 100%)",
      accentColor: "#3B82F6"
    },
    { 
      name: "Jewelry", 
      icon: Diamond, 
      count: "80+ Items", 
      color: "linear-gradient(135deg, rgba(254,243,199,0.8) 0%, rgba(255,237,213,0.9) 100%)",
      accentColor: "#D97706"
    },
    { 
      name: "Cosmetics", 
      icon: Palette, 
      count: "150+ Items", 
      color: "linear-gradient(135deg, rgba(252,231,243,0.8) 0%, rgba(255,228,230,0.9) 100%)",
      accentColor: "#EC4899"
    },
    { 
      name: "Tapisserie", 
      icon: Palette, 
      count: "150+ Items", 
      color: "linear-gradient(135deg, rgba(252,231,243,0.8) 0%, rgba(255,228,230,0.9) 100%)",
      accentColor: "#EC4899"
    },
    { 
      name: "Toys", 
      icon: Gamepad2, 
      count: "90+ Items", 
      color: "linear-gradient(135deg, rgba(236,253,245,0.8) 0%, rgba(209,250,229,0.9) 100%)",
      accentColor: "#10B981"
    }
  ];


  return (
    <section className={`premium-selection ${isVisible ? 'visible' : ''}`}>
      {/* Blobs animés en arrière-plan */}
      <div className="gold-blob"></div>
      <div className="black-blob"></div>
      <div className="gold-blob-small"></div>
      
      <div className="container">
        <div className="section-header">
          <div className="exclusive-badge">
            <Crown className="badge-icon" />
            <span>Curated Excellence</span>
            <div className="badge-sparkles">
              {[...Array(3)].map((_, i) => <div key={i} className="sparkle"></div>)}
            </div>
          </div>
          
          <h1>
            <span className="title-main">Selection d'Exception</span>
            <span className="title-sub">Produits d'Excellence</span>
            <div className="title-underline"></div>
          </h1>
          
          <p className="section-description">
            Pièces rigoureusement sélectionnées, incarnant l'ultime expression du luxe contemporain
          </p>
        </div>

        <div className="selection-grid">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.name}
                className="selection-card"
                style={{ 
                  '--accent-color': item.accentColor,
                  animationDelay: `${index * 150}ms` 
                }}
              >
                <div className="card-background" style={{ background: item.color }}></div>
                <div className="card-glow" style={{ backgroundColor: item.accentColor }}></div>
                
                <div className="card-content">
                  <div className="card-header">
                    <div className="icon-wrapper">
                      <Icon className="card-icon" />
                      <div className="icon-halo"></div>
                    </div>
                    <div className="verification-badge">
                      <CheckCircle size={18} />
                    </div>
                  </div>
                  
                  <h3>{item.name}</h3>
                  <p className="item-count">{item.count}</p>
                  
                  <div className="discover-link">
                    <span>Découvrir</span>
                    <div className="arrow-wrapper">
                      <ArrowRight className="arrow-icon" />
                    </div>
                  </div>
                </div>
                
                <div className="card-decoration"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default store;