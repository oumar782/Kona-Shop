import React, { useState, Suspense, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Shirt,
  SprayCan,
  Smile,
  Gamepad2,
  Smartphone,
  Home,
  Gem,
  Car,
  X,
  Search,
  Filter,
  SortAsc,
  Grid,
  List
} from 'lucide-react';
import './boutique.css';

// --- Lazy Load des boutiques ---
const PretAPorter = lazy(() => import('../boutiques/PretAPorter'));
const Parfumerie = lazy(() => import('../boutiques/Parfumerie'));
const Cosmetique = lazy(() => import('../boutiques/Cosmetique'));
const Jouets = lazy(() => import('../boutiques/Jouets'));
const Electronique = lazy(() => import('../boutiques/Electronique'));
const DecorationMaison = lazy(() => import('../boutiques/Decorationmaison'));
const Bijouterie = lazy(() => import('../boutiques/Bijouterie'));
const AccesoiresAuto = lazy(() => import('../boutiques/AccesoiresAuto'));

// --- Catégories ---
const categories = [
  { id: 'pret-a-porter', name: 'Prêt-à-Porter', icon: Shirt },
  { id: 'parfumerie', name: 'Parfumerie', icon: SprayCan },
  { id: 'cosmetique', name: 'Cosmétiques', icon: Smile },
  { id: 'jouets', name: 'Jouets Premium', icon: Gamepad2 },
  { id: 'electronique', name: 'Électronique', icon: Smartphone },
  { id: 'decoration-maison', name: 'Décoration Maison', icon: Home },
  { id: 'bijouterie', name: 'Bijouterie', icon: Gem },
  { id: 'accesoires-auto', name: 'Accessoires Auto', icon: Car }
];

const Boutique = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams();
  const navigate = useNavigate();

  // Priorité : URL > prop
  const activeCategory = paramCategory || propCategory;
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    navigate(`/Boutique/${id}`);
  };

  const renderSelectedCategory = () => {
    switch (selectedCategory) {
      case 'pret-a-porter': return <PretAPorter />;
      case 'parfumerie': return <Parfumerie />;
      case 'cosmetique': return <Cosmetique />;
      case 'jouets': return <Jouets />;
      case 'electronique': return <Electronique />;
      case 'decoration-maison': return <DecorationMaison />;
      case 'bijouterie': return <Bijouterie />;
      case 'accesoires-auto': return <AccesoiresAuto />;
      default:
        return (
          <div className="placeholder-text">
            🌟 Sélectionnez une boutique pour découvrir nos collections exclusives.
          </div>
        );
    }
  };

  return (
    <div className="boutique-layout">
      {/* Sidebar Animée */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h3>
            <span className="logo">✨ LUXE</span> Boutique
          </h3>
          <button onClick={toggleSidebar} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="search-sidebar">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher un produit"
            />
          </div>
        </div>

        <nav className="categories-list">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
                aria-label={cat.name}
              >
                <Icon size={20} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Contenu Principal */}
      <main className="main-content">
        {/* Barre de Contrôle */}
        <div className="control-bar">
          <button onClick={toggleSidebar} className="menu-toggle" aria-label="Menu">
            <Filter size={18} />
          </button>

          <div className="view-controls">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              aria-label="Vue en grille"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="Vue en liste"
            >
              <List size={16} />
            </button>
            <button className="sort-btn">
              <SortAsc size={16} /> Trier
            </button>
          </div>
        </div>

        {/* Zone de Rendu des Produits */}
        <div className={`products-display ${viewMode}`}>
          <Suspense fallback={<div className="loading">💫 Chargement de la collection...</div>}>
            {renderSelectedCategory()}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Boutique;