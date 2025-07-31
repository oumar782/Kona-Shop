import React, { useState, useEffect } from 'react';
import { Sparkles, Shirt, Zap, Diamond, Palette, Gamepad2, ArrowRight, Crown, CheckCircle, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import './store.css';

const EliteCategories = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const categories = [
    { 
      name: "Parfumerie", 
      icon: Sparkles, 
      description: "Essences rares, notes inoubliables", 
      bgGradient: "radial-gradient(circle at 30% 30%, rgba(254,243,199,0.15) 0%, transparent 50%)",
      link: "/parfumerie"
    },
    { 
      name: "Prêt-à-porter", 
      icon: Shirt, 
      description: "Élégance contemporaine et savoir-faire", 
      bgGradient: "radial-gradient(circle at 70% 30%, rgba(243,244,246,0.15) 0%, transparent 50%)",
      link: "/pret-a-porter"
    },
    { 
      name: "Électronique", 
      icon: Zap, 
      description: "Innovation, design et performance", 
      bgGradient: "radial-gradient(circle at 30% 70%, rgba(239,246,255,0.15) 0%, transparent 50%)",
      link: "/electronique"
    },
    { 
      name: "Bijouterie", 
      icon: Diamond, 
      description: "Brillance éternelle et finesse artisanale", 
      bgGradient: "radial-gradient(circle at 70% 70%, rgba(254,243,199,0.15) 0%, transparent 50%)",
      link: "/bijouterie"
    },
    { 
      name: "Cosmétiques", 
      icon: Palette, 
      description: "Formules rares pour une beauté sublimée", 
      bgGradient: "radial-gradient(circle at 50% 30%, rgba(252,231,243,0.15) 0%, transparent 50%)",
      link: "/cosmetiques"
    },
    { 
      name: "Décoration Maison", 
      icon: Palette, 
      description: "Objets d'art et design intemporel", 
      bgGradient: "radial-gradient(circle at 50% 70%, rgba(252,231,243,0.15) 0%, transparent 50%)",
      link: "/decoration"
    },
    { 
      name: "Jouetterie", 
      icon: Gamepad2, 
      description: "Loisirs haut de gamme et raffinement", 
      bgGradient: "radial-gradient(circle at 30% 50%, rgba(236,253,245,0.15) 0%, transparent 50%)",
      link: "/jouets"
    },
    { 
      name: "Accessoires automobile", 
      icon: Car, 
      description: "Élégance et puissance discrète", 
      bgGradient: "radial-gradient(circle at 70% 50%, rgba(236,253,245,0.15) 0%, transparent 50%)",
      link: "/automobile"
    }
  ];

  return (
    <section className={`elite-showcase ${isVisible ? 'elite-showcase--visible' : ''}`}>
      <div className="elite-showcase__gold-veil"></div>
      <div className="elite-showcase__diamond-pattern"></div>

      <div className="elite-showcase__container">
        <div className="elite-showcase__header">
          <div className="elite-crown">
            <div className="elite-crown__content">
              <Crown className="elite-crown__icon" />
              <span>Collection Signature</span>
              <div className="elite-crown__light"></div>
            </div>
          </div>

          <div className="elite-titles">
            <h1 className="elite-titles__main">
              <span>Artéfacts</span>
              <span>d'Exception</span>
            </h1>
            <div className="elite-titles__divider"></div>
            <h2 className="elite-titles__sub">
              Objets uniques pour passionnés et esthètes
            </h2>
          </div>

          <p className="elite-showcase__description">
            Chaque création incarne un équilibre parfait entre audace contemporaine et héritage artisanal.
          </p>
        </div>

        <div className="elite-gallery">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <article
                key={category.name}
                className="elite-artifact"
                style={{
                  '--artifact-delay': `${index * 100}ms`,
                  '--artifact-bg': category.bgGradient
                }}
              >
                <div className="elite-artifact__canvas">
                  <div className="elite-artifact__background"></div>
                  <div className="elite-artifact__reflection"></div>

                  <div className="elite-artifact__content">
                    <div className="elite-artifact__badge">
                      <div className="elite-artifact__icon-frame">
                        <Icon className="elite-artifact__icon" />
                      </div>
                      <CheckCircle className="elite-artifact__certification" />
                    </div>

                    <div className="elite-artifact__details">
                      <h3 className="elite-artifact__title">{category.name}</h3>
                      <p className="elite-artifact__description">{category.description}</p>
                    </div>

                    <Link to={category.link} className="elite-artifact__explore">
                      <span>Découvrir la collection</span>
                      <div className="elite-artifact__arrow">
                        <ArrowRight className="elite-artifact__arrow-icon" />
                      </div>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EliteCategories;