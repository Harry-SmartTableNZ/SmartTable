import React, { useState, useEffect } from "react";
import logo from "../../assets/images/DarkLogo.png";
import ResponsiveNav from "./ResponsiveNav";
import "./AppHeader.css";

export default function AppHeader({ isHome }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // Track if the mobile drawer is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY < lastScrollY || window.scrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      /* Added mobile-menu-active class conditionally here */
      className={`app-header ${isVisible ? "nav-visible" : "nav-hidden"} ${isHome ? "home-header" : ""} ${isMenuOpen ? "mobile-menu-active" : ""}`}
    >
      <div className="app-header-box">
        <nav>
          <div className="app-header-logo">
            <img src={logo} alt="Smart Table Logo" />
          </div>
          {/* Pass down a function to toggle the state inside ResponsiveNav */}
          <ResponsiveNav onToggleMenu={setIsMenuOpen} />
        </nav>
      </div>
    </header>
  );
}
