import React, { useState } from 'react';
import { Sparkles, Shirt, Zap, Diamond, Palette, Gamepad2, ArrowRight } from 'lucide-react';
import './store.css';

const CategoriesSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    { name: "Perfumery", icon: Sparkles, count: "120+ Items", color: "linear-gradient(135deg, #FEF3C7 0%, #FEF9C3 100%)" },
    { name: "Fashion", icon: Shirt, count: "300+ Items", color: "linear-gradient(135deg, #F3F4F6 0%, #F1F5F9 100%)" },
    { name: "Electronics", icon: Zap, count: "200+ Items", color: "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)" },
    { name: "Jewelry", icon: Diamond, count: "80+ Items", color: "linear-gradient(135deg, #FEF3C7 0%, #FFEDD5 100%)" },
    { name: "Cosmetics", icon: Palette, count: "150+ Items", color: "linear-gradient(135deg, #FCE7F3 0%, #FFE4E6 100%)" },
    { name: "Tapisserie", icon: Palette, count: "150+ Items", color: "linear-gradient(135deg, #FCE7F3 0%, #FFE4E6 100%)" },
    { name: "Toys", icon: Gamepad2, count: "90+ Items", color: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)" }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <div className="premium-badge">
            <Diamond className="icon" />
            <span>Premium Categories</span>
          </div>
          <h2>Curated Collections</h2>
          <p>
            Explore our meticulously curated categories, each offering the finest selection of luxury products
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.name}
                className={`category-card ${hoveredCategory === index ? 'hovered' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="card-bg" style={{ background: category.color }}></div>
                
                <div className="card-content">
                  <div className="card-header">
                    <div className="icon-container">
                      <Icon className="card-icon" />
                    </div>
                    <div className="item-count">
                      <p>{category.count}</p>
                    </div>
                  </div>
                  
                  <h3>{category.name}</h3>
                  <p className="description">
                    Discover premium {category.name.toLowerCase()} collection
                  </p>
                  
                  <div className="explore-link">
                    <span>Explore Now</span>
                    <ArrowRight className="arrow-icon" />
                  </div>
                </div>

                {hoveredCategory === index && (
                  <div className="pulse-indicator"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      
    </section>
  );
};

export default CategoriesSection;