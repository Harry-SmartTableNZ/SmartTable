import React, { useState, useEffect } from "react";
import logo from "../../assets/images/DarkLogo.png";
import ResponsiveNav from "./ResponsiveNav";
import "./AppHeader.css";

export default function AppHeader({ isHome }) {
  // 1. Add isHome here
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      // Show if we've scrolled up, or if we are at the very top
      if (window.scrollY < lastScrollY || window.scrollY < 50) {
        setIsVisible(true);
      } else {
        // Hide if we are scrolling down
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      /* 2. Add the conditional "home-header" class */
      className={`app-header ${isVisible ? "nav-visible" : "nav-hidden"} ${isHome ? "home-header" : ""}`}
    >
      <div className="app-header-box">
        <nav>
          <div className="app-header-logo">
            <img src={logo} alt="Smart Table Logo" />
          </div>
          <ResponsiveNav />
        </nav>
      </div>
    </header>
  );
}
