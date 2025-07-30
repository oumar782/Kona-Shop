import React from 'react';

const AccesoiresAuto = () => {
  return (
    <div className="boutique-content">
      <h2 className="boutique-title">Accessoires Automobile 🚗</h2>
      <p className="boutique-desc">Élégance et performance pour votre véhicule.</p>
      <div className="produits-grid">
        <div className="produit-card">
          <img src="https://images.unsplash.com/photo-1589519160752-574a8f862a32" alt="Tapis de luxe" />
          <h4>Tapis intérieur en cuir</h4>
          <p>Sublimez l'intérieur de votre voiture avec ce tapis sur mesure.</p>
          <strong>299€</strong>
        </div>
        <div className="produit-card">
          <img src="https://images.unsplash.com/photo-1578675270653-243088d57166" alt="Volant chauffant" />
          <h4>Volant chauffant intelligent</h4>
          <p>Technologie avancée, design premium.</p>
          <strong>450€</strong>
        </div>
      </div>
    </div>
  );
};

export default AccesoiresAuto;