import React from 'react';
import { Truck, Shield, Headphones, CreditCard, Settings, Smartphone, Clock, Award } from 'lucide-react';
import './service.css';

const Services = () => {
  const services = [
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

  const supportServices = [
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
    <div className="services-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Nos <span className="gradient-text">Services</span>
          </h1>
          <p className="hero-subtitle">
            Des services premium pour accompagner vos achats technologiques et garantir votre satisfaction totale.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="main-services">
        <div className="services-header">
          <h2 className="section-title gradient-text">Services Premium</h2>
          <p className="section-subtitle">
            Une gamme complète de services pour enrichir votre expérience technologique.
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-container">
                <div className="service-icon-wrapper">
                  <service.icon className="service-icon" />
                </div>
              </div>
              
              <div className="service-content">
                <div className="service-header">
                  <h3 className="service-title">{service.title}</h3>
                  <span className="service-price">{service.price}</span>
                </div>
                
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="feature-item">
                      <div className="feature-bullet"></div>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="service-button">En savoir plus</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Services */}
      <section className="support-section">
        <div className="support-header">
          <h2 className="section-title gradient-text">Support & Assistance</h2>
          <p className="section-subtitle">
            Un accompagnement personnalisé à chaque étape de votre parcours client.
          </p>
        </div>
        
        <div className="support-grid">
          {supportServices.map((service, index) => (
            <div key={index} className="support-card">
              <div className="support-icon-container">
                <div className="support-icon-wrapper">
                  <service.icon className="support-icon" />
                </div>
              </div>
              
              <h3 className="support-title">{service.title}</h3>
              <p className="support-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Besoin d'un service personnalisé ?</h2>
          <p className="cta-subtitle">
            Contactez notre équipe d'experts pour une solution sur-mesure adaptée à vos besoins spécifiques.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Nous contacter</button>
            <button className="cta-button secondary">Demander un devis</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;