import React, { useState } from "react";
import "./Header.css";
import logoImg from "../assets/WhatsApp Image 2025-07-23 à 02.08.18_4916699a.jpg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const navLinks = [
  { name: "Accueil", href: "/accueil" },
  { name: "À propos", href: "/apropos" },
  { name: "Boutique", href: "/Boutique" },
  { name: "Nos services", href: "/Service" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="konashop-header">
      <div className="konashop-header__container">
        <div className="konashop-header__logo">
          <img src={logoImg} alt="Logo KonaShop" className="konashop-header__logo-img" />
          <span className="konashop-header__logo-text">
            <span className="konashop-header__logo-main">Kona</span>
            <span className="konashop-header__logo-highlight">Shop</span>
          </span>
        </div>
        <nav className={`konashop-header__nav ${menuOpen ? "konashop-header__nav--open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="konashop-header__nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="konashop-header__desktop-icons">
            <a href="#wishlist" className="konashop-header__icon-link" aria-label="Liste de souhaits">
              <FaHeart className="konashop-header__icon" />
            </a>
            <a href="#cart" className="konashop-header__icon-link" aria-label="Panier">
              <FaShoppingCart className="konashop-header__icon" />
            </a>
          </div>
        </nav>
        <div className="konashop-header__mobile-controls">
          <div className="konashop-header__mobile-icons">
            <a href="#wishlist" className="konashop-header__icon-link" aria-label="Liste de souhaits">
              <FaHeart className="konashop-header__icon" />
            </a>
            <a href="#cart" className="konashop-header__icon-link" aria-label="Panier">
              <FaShoppingCart className="konashop-header__icon" />
            </a>
          </div>
          <button
            className={`konashop-header__burger ${menuOpen ? "konashop-header__burger--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && <div className="konashop-header__overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}