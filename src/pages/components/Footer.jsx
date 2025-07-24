import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Footer.css";

const Footer = () => {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100; // Change this to your desired offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Home</h4>
          <HashLink smooth to="/#why" scroll={scrollWithOffset}>
            Why Choose Smart Table?
          </HashLink>
          <HashLink smooth to="/#features" scroll={scrollWithOffset}>
            Features
          </HashLink>
          <HashLink smooth to="/#optional-addon" scroll={scrollWithOffset}>
            Optional Add-On: Table Order Kiosk
          </HashLink>
          <HashLink smooth to="/#kiosk-steps" scroll={scrollWithOffset}>
            Smart Ordering in 3 Steps
          </HashLink>
          <HashLink smooth to="/#faq" scroll={scrollWithOffset}>
            FAQ on Table Kiosk
          </HashLink>
        </div>

        <div className="footer-column">
          <h4>Features</h4>
          <HashLink smooth to="/features#operations" scroll={scrollWithOffset}>
            Restaurant Operations
          </HashLink>
          <HashLink smooth to="/features#front" scroll={scrollWithOffset}>
            Front-of-House Features
          </HashLink>
          <HashLink smooth to="/features#addons" scroll={scrollWithOffset}>
            Optional Add-Ons
          </HashLink>
        </div>
        <div className="footer-column">
          <h4>Pricing</h4>
          <Link to="/pricing">Pricing Options</Link>
          <Link to="/pricing">Get Your Quote</Link>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <Link to="/contact">Get In Touch</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
