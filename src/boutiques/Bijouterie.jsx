import React from 'react';

const Bijouterie = () => {
  return (
    <div className="boutique-content">
      <h2 className="boutique-title">Prêt-à-Porter 👗</h2>
      <p className="boutique-desc">Collections exclusives de designers renommés.</p>
      <div className="produits-grid">
        <div className="produit-card">
          <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b" alt="Robe Chanel" />
          <h4>Robe en soie Chanel</h4>
          <p>Élégance intemporelle, coupe parfaite.</p>
          <strong>1 850€</strong>
        </div>
        <div className="produit-card">
          <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" alt="Veste Gucci" />
          <h4>Veste brodée Gucci</h4>
          <p>Artisanat italien, détails uniques.</p>
          <strong>2 400€</strong>
        </div>
      </div>
    </div>
  );
};

export default Bijouterie;