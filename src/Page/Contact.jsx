import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Globe } from 'lucide-react';
import './Contact.css';

// Configuration de l'icône du marqueur
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message envoyé ! Nous vous répondrons dans les plus brefs délais.");
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+212 5 22 34 56 78", "+212 6 61 23 45 67"],
      description: "Lun - Ven: 9h - 18h"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@techmaroc.ma", "support@techmaroc.ma"],
      description: "Réponse sous 24h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: ["123 Avenue Mohammed V", "Casablanca, Maroc"],
      description: "Showroom ouvert 6j/7"
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun - Sam: 9h - 19h", "Dimanche: 10h - 16h"],
      description: "Support 24/7 en ligne"
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Chat en direct",
      description: "Assistance immédiate",
      action: "Démarrer le chat"
    },
    {
      icon: Headphones,
      title: "Support technique",
      description: "Aide spécialisée",
      action: "Contacter un expert"
    },
    {
      icon: Globe,
      title: "FAQ",
      description: "Réponses rapides",
      action: "Consulter la FAQ"
    }
  ];

  // Coordonnées de la carte (remplacer par vos coordonnées)
  const mapPosition = [33.5731, -7.5898];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">
            Nous <span className="contact-gradient-text">Contacter</span>
          </h1>
          <p className="contact-hero-subtitle">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions et vous accompagner.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="contact-quick-actions-section">
        <div className="contact-quick-actions-container">
          <div className="contact-quick-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className="contact-quick-action-card">
                <div className="contact-quick-action-icon-wrapper">
                  <action.icon className="contact-quick-action-icon" />
                </div>
                <h3 className="contact-quick-action-title">{action.title}</h3>
                <p className="contact-quick-action-description">{action.description}</p>
                <button className="contact-quick-action-button">
                  {action.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="contact-main-container">
          <div className="contact-main-grid">
            {/* Contact Form */}
            <div className="contact-form-card">
              <h2 className="contact-section-title">
                Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="contact-form-input"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="contact-form-input"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="contact-form-input"
                      placeholder="+212 6 XX XX XX XX"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-form-label">
                      Sujet
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="contact-form-select"
                      required
                    >
                      <option value="">Choisir un sujet</option>
                      <option value="info">Demande d'information</option>
                      <option value="support">Support technique</option>
                      <option value="commande">Suivi de commande</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="contact-form-textarea"
                    placeholder="Décrivez votre demande en détail..."
                    required
                  />
                </div>
                <button type="submit" className="contact-submit-button">
                  <Send className="contact-submit-icon" />
                  Envoyer le message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="contact-info-column">
              <div className="contact-info-card">
                <h2 className="contact-section-title">
                  Informations de contact
                </h2>
                <div className="contact-info-list">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="contact-info-item">
                      <div className="contact-info-icon-wrapper">
                        <info.icon className="contact-info-icon" />
                      </div>
                      <div className="contact-info-content">
                        <h3 className="contact-info-title">{info.title}</h3>
                        {info.details.map((detail, dIndex) => (
                          <p key={dIndex} className="contact-info-detail">{detail}</p>
                        ))}
                        <p className="contact-info-description">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Map */}
              <div className="contact-map-card">
                {isClient && (
                  <MapContainer 
                    center={mapPosition} 
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={mapPosition} icon={customIcon}>
                      <Popup>
                        123 Avenue Mohammed V, Casablanca
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;