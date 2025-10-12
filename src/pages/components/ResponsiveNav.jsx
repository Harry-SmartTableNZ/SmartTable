import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ResponsiveNav.css";

const ResponsiveNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsFeaturesOpen(false); // reset dropdown on open/close
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsFeaturesOpen(false);
  };

  const toggleFeaturesDropdown = () => {
    setIsFeaturesOpen(!isFeaturesOpen);
  };

  const isActive = (path, hash = "") => {
    return (
      location.pathname === path && (hash === "" || location.hash === hash)
    );
  };

  return (
    <div className="responsive-nav-links">
      {/* Desktop Navigation */}
      <div className="responsive-desktop-nav">
        <Link to="/" className="responsive-nav-link">
          Home
        </Link>

        <div className="responsive-dropdown">
          <Link
            to="/Features"
            className="responsive-dropdown-toggle responsive-nav-link"
          >
            Features
          </Link>
          <div className="responsive-dropdown-content">
            <Link to="/Features#Standard" className="responsive-dropdown-link">
              Standard Features
            </Link>
            <Link to="/Features#Premium" className="responsive-dropdown-link">
              Premium Features
            </Link>
            <Link to="/Features#addons" className="responsive-dropdown-link">
              Optional Add-Ons
            </Link>
          </div>
        </div>

        <Link to="/pricing" className="responsive-nav-link">
          Pricing
        </Link>
        <Link to="/contact" className="responsive-nav-link">
          Contact
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className={`responsive-hamburger ${
          isMobileMenuOpen ? "responsive-hamburger-open" : ""
        }`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span className="responsive-hamburger-line"></span>
        <span className="responsive-hamburger-line"></span>
        <span className="responsive-hamburger-line"></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`responsive-mobile-nav ${
          isMobileMenuOpen ? "responsive-mobile-nav-open" : ""
        }`}
      >
        <div className="responsive-mobile-nav-content">
          <Link
            to="/"
            className={`responsive-mobile-nav-link ${
              isActive("/") ? "active" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <button
            className={`responsive-mobile-nav-link responsive-mobile-dropdown-toggle ${
              isFeaturesOpen ? "open" : ""
            }`}
            onClick={toggleFeaturesDropdown}
          >
            <span>Features</span>
            <span className="arrow">{isFeaturesOpen ? "▲" : "▼"}</span>
          </button>

          {isFeaturesOpen && (
            <div className="responsive-mobile-dropdown-links">
              <Link
                to="/Features#Standard Features"
                className={`responsive-mobile-nav-link ${
                  isActive("/Features", "#Standard Features") ? "active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Standard Features
              </Link>
              <Link
                to="/Features#Premium Features"
                className={`responsive-mobile-nav-link ${
                  isActive("/Features", "#Premium Features") ? "active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Premium Features
              </Link>
              <Link
                to="/Features#addons"
                className={`responsive-mobile-nav-link ${
                  isActive("/Features", "#addons") ? "active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Optional Add-Ons
              </Link>
            </div>
          )}

          <Link
            to="/pricing"
            className={`responsive-mobile-nav-link ${
              isActive("/pricing") ? "active" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Pricing
          </Link>

          <Link
            to="/contact"
            className={`responsive-mobile-nav-link ${
              isActive("/contact") ? "active" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="responsive-mobile-overlay"
          onClick={closeMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default ResponsiveNav;
