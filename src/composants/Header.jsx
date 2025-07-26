import React, { useState } from "react";
import "./Header.css";
import logoImg from "../assets/WhatsApp Image 2025-07-23 à 02.08.18_4916699a.jpg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const navLinks = [
  { name: "Accueil", href: "/accueil" },
  { name: "À propos", href: "/apropos" },
  { name: "Boutique", href: "#boutique" },
  { name: "Nos services", href: "/Service" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header2026">
      <div className="header2026__container">
        <div className="header2026__logo">
          <img src={logoImg} alt="Logo KonaShop" className="header2026__logo-img" />
          <span className="header2026__logo-text"><span className="header2026__logo-main">Kona</span><span className="header2026__logo--highlight">Shop</span></span>
        </div>
        <nav className={`header2026__nav ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="header2026__nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="header2026__icons">
            <a href="#wishlist" className="header2026__icon-link" aria-label="Liste de souhaits">
              <FaHeart className="header2026__icon" />
            </a>
            <a href="#cart" className="header2026__icon-link" aria-label="Panier">
              <FaShoppingCart className="header2026__icon" />
            </a>
          </div>
        </nav>
        <div className="header2026__mobile-icons">
          <a href="#wishlist" className="header2026__icon-link" aria-label="Liste de souhaits">
            <FaHeart className="header2026__icon" />
          </a>
          <a href="#cart" className="header2026__icon-link" aria-label="Panier">
            <FaShoppingCart className="header2026__icon" />
          </a>
          <button
            className={`header2026__burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && <div className="header2026__overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}