import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Footer.css";

const Footer = () => {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  // ✅ Features 페이지로 갈 때는 먼저 맨 위로
  const handleFeatureLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Home</h4>
          <HashLink smooth to="/#why" scroll={scrollWithOffset}>
            Find Smart Table solutions tailored to your Restaurant
          </HashLink>
          <HashLink smooth to="/#features" scroll={scrollWithOffset}>
            App Features
          </HashLink>
          <HashLink smooth to="/#optional-addons" scroll={scrollWithOffset}>
            Optional Add-Ons
          </HashLink>
          <HashLink smooth to="/#faq" scroll={scrollWithOffset}>
            FAQ for Smart Table
          </HashLink>
        </div>

        <div className="footer-column">
          <h4>Features</h4>
          <HashLink
            smooth
            to="/features#Standard"
            scroll={scrollWithOffset}
            onClick={handleFeatureLinkClick}
          >
            Standard Features
          </HashLink>
          <HashLink
            smooth
            to="/features#Premium"
            scroll={scrollWithOffset}
            onClick={handleFeatureLinkClick}
          >
            Premium Features
          </HashLink>
          <HashLink
            smooth
            to="/features#addons"
            scroll={scrollWithOffset}
            onClick={handleFeatureLinkClick}
          >
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
