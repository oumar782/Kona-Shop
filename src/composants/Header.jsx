import React, { useState } from "react";
import "./Header.css";
import logoImg from "../assets/WhatsApp Image 2025-07-23 à 02.08.18_4916699a.jpg";

const navLinks = [
  { name: "Accueil", href: "#" },
  { name: "Boutique", href: "#boutique" },
  { name: "Nouveautés", href: "#nouveautes" },
  { name: "Contact", href: "#contact" },
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
        </nav>
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
      {menuOpen && <div className="header2026__overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
