import React, { useState } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import './veddette.css';

const FeaturedProductsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "Diamond Elite Watch",
      price: "$2,899",
      originalPrice: "$3,299",
      image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Jewelry",
      rating: 5,
      badge: "Limited Edition"
    },
    {
      id: 2,
      name: "Midnight Essence Perfume",
      price: "$189",
      originalPrice: "$249",
      image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Perfumery",
      rating: 5,
      badge: "Bestseller"
    },
    {
      id: 3,
      name: "Luxury Silk Blazer",
      price: "$899",
      originalPrice: "$1,199",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Fashion",
      rating: 5,
      badge: "New Arrival"
    },
    {
      id: 4,
      name: "Premium Wireless Headphones",
      price: "$599",
      originalPrice: "$699",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Electronics",
      rating: 5,
      badge: "Editor's Choice"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <div className="selection-badge">
            <Star className="icon" />
            <span>Handpicked Selection</span>
          </div>
          <h2>Featured Products</h2>
          <p>
            Discover our most coveted items, carefully selected for the ultimate luxury experience
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="carousel-slide">
                <div className="product-grid">
                  <div className="product-image-container">
                    <div className="image-wrapper">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <div className="product-badge">{product.badge}</div>
                    </div>
                  </div>

                  <div className="product-details">
                    <div className="category-tag">
                      <div className="dot"></div>
                      <span>{product.category}</span>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="rating-container">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="star-icon" />
                      ))}
                      <span className="rating-text">(4.9/5)</span>
                    </div>
                    <p className="product-description">
                      Experience unparalleled luxury with this exceptional piece from our exclusive collection. 
                      Crafted with precision and attention to detail.
                    </p>

                    <div className="price-container">
                      <span className="current-price">{product.price}</span>
                      <span className="original-price">{product.originalPrice}</span>
                      <span className="discount-badge">SAVE 25%</span>
                    </div>

                    <div className="action-buttons">
                      <button className="add-to-cart">
                        Add to Cart
                      </button>
                      <button className="wishlist">
                        <Heart className="heart-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={prevSlide} className="carousel-button prev">
            <ChevronLeft className="arrow-icon" />
          </button>
          
          <button onClick={nextSlide} className="carousel-button next">
            <ChevronRight className="arrow-icon" />
          </button>

          <div className="carousel-indicators">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

    
    </section>
  );
};

export default FeaturedProductsCarousel;