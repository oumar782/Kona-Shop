import React from 'react';
import { Truck, Shield, Headphones, CreditCard, Settings, Smartphone, Clock, Award } from 'lucide-react';
import './service.css';

const PremiumServices = () => {
  const servicesData = [
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Livraison gratuite dans tout le Maroc pour les commandes supérieures à 500 DH.",
      features: ["Livraison express 24h", "Suivi en temps réel", "Emballage sécurisé"],
      price: "Gratuit"
    },
    {
      icon: Shield,
      title: "Garantie Étendue",
      description: "Extension de garantie jusqu'à 3 ans sur tous nos produits électroniques.",
      features: ["Réparation gratuite", "Remplacement immédiat", "Support technique"],
      price: "À partir de 200 DH"
    },
    {
      icon: Settings,
      title: "Installation & Configuration",
      description: "Service d'installation et de configuration de vos appareils par nos experts.",
      features: ["Installation à domicile", "Configuration personnalisée", "Formation utilisateur"],
      price: "150 DH"
    },
    {
      icon: Smartphone,
      title: "Réparation Express",
      description: "Service de réparation rapide pour smartphones et ordinateurs portables.",
      features: ["Diagnostic gratuit", "Réparation en 2h", "Pièces d'origine"],
      price: "Variable"
    }
  ];

  const supportServicesData = [
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Notre équipe est disponible 24h/24 et 7j/7 pour vous assister."
    },
    {
      icon: CreditCard,
      title: "Paiement Flexible",
      description: "Plusieurs options de paiement incluant le paiement en 3x sans frais."
    },
    {
      icon: Clock,
      title: "Service Rapide",
      description: "Traitement express de vos commandes et livraison dans les délais."
    },
    {
      icon: Award,
      title: "Expertise Certifiée",
      description: "Nos techniciens sont certifiés par les plus grandes marques."
    }
  ];

  return (
    <div className="premium-services-container">
      {/* Hero Section */}
      <section className="premium-hero-section">
        <div className="premium-hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Services Premium" 
            className="premium-hero-background-image"
          />
          <div className="premium-hero-overlay"></div>
          <div className="premium-hero-gradient-overlay"></div>
        </div>
        
        <div className="premium-hero-content">
          <div className="premium-hero-text-container">
            <h1 className="premium-hero-title">
              Nos <span className="premium-gradient-text">Services</span>
            </h1>
            <p className="premium-hero-subtitle">
              Des services premium pour accompagner vos achats technologiques et garantir votre satisfaction totale.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="premium-main-services">
        <div className="premium-services-header">
          <h2 className="premium-section-title">Services <span className="premium-gradient-text">Premium</span></h2>
          <p className="premium-section-subtitle">
            Une gamme complète de services pour enrichir votre expérience technologique.
          </p>
        </div>
        
        <div className="premium-services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="premium-service-card">
              <div className="premium-service-icon-container">
                <div className="premium-service-icon-wrapper">
                  <service.icon className="premium-service-icon" />
                </div>
              </div>
              
              <div className="premium-service-content">
                <div className="premium-service-header">
                  <h3 className="premium-service-title">{service.title}</h3>
                  <span className="premium-service-price">{service.price}</span>
                </div>
                
                <p className="premium-service-description">{service.description}</p>
                
                <ul className="premium-service-features">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="premium-feature-item">
                      <div className="premium-feature-bullet"></div>
                      <span className="premium-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="premium-service-button">En savoir plus</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Services */}
      <section className="premium-support-section">
        <div className="premium-support-header">
          <h2 className="premium-section-title">Support & <span className="premium-gradient-text">Assistance</span></h2>
          <p className="premium-section-subtitle">
            Un accompagnement personnalisé à chaque étape de votre parcours client.
          </p>
        </div>
        
        <div className="premium-support-grid">
          {supportServicesData.map((service, index) => (
            <div key={index} className="premium-support-card">
              <div className="premium-support-icon-container">
                <div className="premium-support-icon-wrapper">
                  <service.icon className="premium-support-icon" />
                </div>
              </div>
              
              <h3 className="premium-support-title">{service.title}</h3>
              <p className="premium-support-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="premium-cta-section">
        <div className="premium-cta-content">
          <h2 className="premium-cta-title">Besoin d'un service <span className="premium-gradient-text">personnalisé</span> ?</h2>
          <p className="premium-cta-subtitle">
            Contactez notre équipe d'experts pour une solution sur-mesure adaptée à vos besoins spécifiques.
          </p>
          <div className="premium-cta-buttons">
            <button className="premium-cta-button premium-primary">Nous contacter</button>
            <button className="premium-cta-button premium-secondary">Demander un devis</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumServices;