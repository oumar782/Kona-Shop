import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  SortAsc, 
  Grid, 
  List, 
  ShoppingBag, 
  SprayCan, 
  Smartphone, 
  Shirt,
  Smile,
  Gamepad2,
  Gem,
  Home
} from 'lucide-react';
import './boutique.css';

// Données des produits par catégorie
const productsByCategory = {
  'pret-a-porter': [
    { id: 1, name: 'Robe de soirée', price: '1200 DH', image: 'https://via.placeholder.com/300x400?text=Robe+Soirée' },
    { id: 2, name: 'Costume sur mesure', price: '2500 DH', image: 'https://via.placeholder.com/300x400?text=Costume' },
    { id: 3, name: 'Ensemble décontracté', price: '800 DH', image: 'https://via.placeholder.com/300x400?text=Ensemble' }
  ],
  'parfumerie': [
    { id: 4, name: 'Parfum floral', price: '600 DH', image: 'https://via.placeholder.com/300x400?text=Parfum+Floral' },
    { id: 5, name: 'Eau de toilette', price: '450 DH', image: 'https://via.placeholder.com/300x400?text=Eau+Toilette' },
    { id: 6, name: 'Parfum oriental', price: '750 DH', image: 'https://via.placeholder.com/300x400?text=Parfum+Oriental' }
  ],
  'cosmetique': [
    { id: 7, name: 'Crème hydratante', price: '300 DH', image: 'https://via.placeholder.com/300x400?text=Crème' },
    { id: 8, name: 'Rouge à lèvres', price: '150 DH', image: 'https://via.placeholder.com/300x400?text=Rouge+Lèvres' },
    { id: 9, name: 'Palette maquillage', price: '400 DH', image: 'https://via.placeholder.com/300x400?text=Palette' }
  ],
  'jouets': [
    { id: 10, name: 'Poupée interactive', price: '350 DH', image: 'https://via.placeholder.com/300x400?text=Poupée' },
    { id: 11, name: 'Jeu de construction', price: '280 DH', image: 'https://via.placeholder.com/300x400?text=Jeu+Construction' },
    { id: 12, name: 'Voiture télécommandée', price: '420 DH', image: 'https://via.placeholder.com/300x400?text=Voiture' }
  ],
  'electronique': [
    { id: 13, name: 'Smartphone haut de gamme', price: '4500 DH', image: 'https://via.placeholder.com/300x400?text=Smartphone' },
    { id: 14, name: 'Casque audio', price: '600 DH', image: 'https://via.placeholder.com/300x400?text=Casque' },
    { id: 15, name: 'Montre connectée', price: '1200 DH', image: 'https://via.placeholder.com/300x400?text=Montre' }
  ],
  'Tapisserie': [
    { id: 16, name: 'Tapis moderne', price: '1800 DH', image: 'https://via.placeholder.com/300x400?text=Tapis' },
    { id: 17, name: 'Rideaux luxueux', price: '2200 DH', image: 'https://via.placeholder.com/300x400?text=Rideaux' },
    { id: 18, name: 'Coussin décoratif', price: '350 DH', image: 'https://via.placeholder.com/300x400?text=Coussin' }
  ],
  'bijouterie': [
    { id: 19, name: 'Collier en or', price: '3200 DH', image: 'https://via.placeholder.com/300x400?text=Collier' },
    { id: 20, name: 'Bague diamant', price: '5800 DH', image: 'https://via.placeholder.com/300x400?text=Bague' },
    { id: 21, name: 'Bracelet argent', price: '1500 DH', image: 'https://via.placeholder.com/300x400?text=Bracelet' }
  ]
};

const filters = [
  {
    title: 'Prix',
    options: [
      'Moins de 2000 DH',
      '2000 - 5000 DH',
      '5000 - 10000 DH',
      'Plus de 10000 DH'
    ]
  },
  {
    title: 'Marque',
    options: ['Chanel', 'Dior', 'Louis Vuitton', 'Gucci', 'Zara', 'H&M', 'Samsung', 'Apple']
  },
  {
    title: 'Disponibilité',
    options: ['En stock', 'Précommande']
  }
];

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'pret-a-porter', name: 'Prêt-à-porter', icon: Shirt, count: productsByCategory['pret-a-porter'].length },
    { id: 'parfumerie', name: 'Parfumerie', icon: SprayCan, count: productsByCategory['parfumerie'].length },
    { id: 'cosmetique', name: 'Cosmétique', icon: Smile, count: productsByCategory['cosmetique'].length },
    { id: 'jouets', name: 'Jouets', icon: Gamepad2, count: productsByCategory['jouets'].length },
    { id: 'electronique', name: 'Électronique', icon: Smartphone, count: productsByCategory['electronique'].length },
    { id: 'Tapisserie', name: 'Tapisserie', icon: Home, count: productsByCategory['Tapisserie'].length },
    { id: 'Accesoires automobile', name: 'Accesoires automobile', icon: Home, count: productsByCategory['Tapisserie'].length },
    { id: 'bijouterie', name: 'Bijouterie', icon: Gem, count: productsByCategory['bijouterie'].length }
  ];

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = selectedCategory === 'all' 
    ? Object.values(productsByCategory).flat() 
    : productsByCategory[selectedCategory] || [];

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            Notre <span className="luxury-text">Boutique Exclusive</span>
          </h1>
          <p>
            Découvrez notre sélection de produits premium dans toutes les catégories de luxe.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="view-controls">
              <div className="view-toggle">
                <button
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'active' : ''}
                >
                  <Grid className="view-icon" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'active' : ''}
                >
                  <List className="view-icon" />
                </button>
              </div>
              
              <button className="sort-button">
                <SortAsc className="button-icon" />
                Trier par
              </button>
              
              <button 
                className="filter-button"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="button-icon" />
                Filtres
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-grid">
          
            
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <category.icon className={`category-icon ${selectedCategory === category.id ? 'active' : ''}`} />
                <h3>{category.name}</h3>
                <span>{category.count} produits</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-container">
          {/* Mobile Filters */}
          {showFilters && (
            <div className="mobile-filters show">
              <div className="filters-header">
                <h3>Filtres</h3>
                <button onClick={() => setShowFilters(false)}>×</button>
              </div>
              {filters.map((filter, index) => (
                <div key={index} className="filter-group">
                  <h4>{filter.title}</h4>
                  <div className="filter-options">
                    {filter.options.map((option, optIndex) => (
                      <label key={optIndex} className="filter-option">
                        <input type="checkbox" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button className="apply-filters">Appliquer les filtres</button>
            </div>
          )}

          <div className="products-wrapper">
            {/* Sidebar Filters */}
            <div className="sidebar-filters">
              {filters.map((filter, index) => (
                <div key={index} className="filter-group">
                  <h4>{filter.title}</h4>
                  <div className="filter-options">
                    {filter.options.map((option, optIndex) => (
                      <label key={optIndex} className="filter-option">
                        <input type="checkbox" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid-view">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="product-card">
                        <div className="product-image-container">
                          <img src={product.image} alt={product.name} className="product-image" />
                          <button className="add-to-cart">Ajouter au panier</button>
                        </div>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <p className="product-price">{product.price}</p>
                          <button className="view-details">Voir détails</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="list-view">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-thumbnail" />
                        <div className="product-details">
                          <h3>{product.name}</h3>
                          <p className="product-price">{product.price}</p>
                          <p className="product-description">Description du produit ici...</p>
                          <div className="product-actions">
                            <button className="add-to-cart">Ajouter au panier</button>
                            <button className="view-details">Voir détails</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="no-products">
                  <p>Aucun produit trouvé dans cette catégorie.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ... (conservez tous les styles précédents) ... */

        /* Product Grid View */
        .grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
          width: 100%;
        }

        .product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }

        .product-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .add-to-cart {
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          padding: 10px;
          background-color: #d4af37;
          color: white;
          border: none;
          transition: bottom 0.3s ease;
          cursor: pointer;
          font-weight: 600;
        }

        .product-card:hover .add-to-cart {
          bottom: 0;
        }

        .product-info {
          padding: 15px;
        }

        .product-info h3 {
          margin: 0 0 10px;
          font-size: 1rem;
          color: #0a2540;
        }

        .product-price {
          font-weight: bold;
          color: #d4af37;
          margin: 0 0 15px;
        }

        .view-details {
          background: none;
          border: 1px solid #d4af37;
          color: #d4af37;
          padding: 8px 15px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .view-details:hover {
          background-color: #d4af37;
          color: white;
        }

        /* Product List View */
        .list-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .product-item {
          display: flex;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .product-thumbnail {
          width: 150px;
          height: 150px;
          object-fit: cover;
        }

        .product-details {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .product-details h3 {
          margin: 0 0 10px;
          font-size: 1.1rem;
          color: #0a2540;
        }

        .product-description {
          color: #666;
          font-size: 0.9rem;
          margin: 10px 0;
          flex-grow: 1;
        }

        .product-actions {
          display: flex;
          gap: 10px;
        }

        /* No Products */
        .no-products {
          text-align: center;
          padding: 50px;
          color: #666;
          font-size: 1.2rem;
          width: 100%;
        }

        @media (max-width: 768px) {
          .product-item {
            flex-direction: column;
          }
          
          .product-thumbnail {
            width: 100%;
            height: 200px;
          }
          
          .product-actions {
            flex-direction: column;
          }
          
          .grid-view {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .grid-view {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Shop;