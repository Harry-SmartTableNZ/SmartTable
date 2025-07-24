import { useState } from "react";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import "./HomePage.css";
import AppHeader from "./components/AppHeader";
import { Link } from "react-router-dom";

const HomePage = () => {
  const featureHighlights = [
    {
      title: "Point of Sales (POS)",
      img: require("../assets/images/POS.png"),
      desc: "Create a seamless online experience with your brand front and center.",
    },
    {
      title: "Kitchen Disply System",
      img: require("../assets/images/KDS.png"),
      desc: "Give your customers more reasons to return with custom rewards.",
    },
    {
      title: "Multiple POS & KDS",
      img: require("../assets/images/POS.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
    {
      title: "Online Ordering",
      img: require("../assets/images/POS.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
    {
      title: "Online Reservation",
      img: require("../assets/images/POS.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
    {
      title: "QR Ordering",
      img: require("../assets/images/POS.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
    {
      title: "Sales Analytics",
      img: require("../assets/images/Sales.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
    {
      title: "Inventory Management",
      img: require("../assets/images/POS.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
    {
      title: "Loyalty Program",
      img: require("../assets/images/Loyalty.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
    {
      title: "Delievery App Integration",
      img: require("../assets/images/POS.png"),
      desc: "Serve diverse communities with support for multiple languages.",
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState(featureHighlights[0]);

  return (
    <div className="home-page">
      <AppHeader />
      <section className="full-banner">
        <div className="banner-content">
          <h1>
            ELEVATE DINING
            <br />
            SIMPLIFY OPERATIONS
          </h1>
          <p>
            Enhance your customers' experience while reducing costs and
            increasing efficiency with Smart Table
          </p>
          <Link
            to="/contact"
            className="banner-button"
            onClick={() => window.scrollTo(0, 0)}
          >
            CONTACT US
          </Link>
        </div>
      </section>

      <section id="why" className="why-smart-table-icons">
        <div className="content-wrapper">
          <h2 className="section-title">Why choose SMART TABLE?</h2>
          <hr className="section-divider" />
          <div className="smart-table-icon-grid">
            {[
              {
                icon: "⚡",
                title: "Speed Up Service",
                desc: "Reduce wait times and serve more customers with faster, more efficient ordering and processing.",
              },
              {
                icon: "💸",
                title: "Cut Down Costs",
                desc: "Lower your labor expenses by automating routine tasks with integrated technology.",
              },
              {
                icon: "🧩",
                title: "All-in-One System",
                desc: "POS, KDS, QR ordering, loyalty programs, and more—all managed in a single platform.",
              },
              {
                icon: "💬",
                title: "Boost Customer Experience",
                desc: "Interactive, contactless, and personalized—customers enjoy smooth and modern dining.",
              },
              {
                icon: "📈",
                title: "Actionable Insights",
                desc: "Access powerful analytics to make data-driven decisions and grow your business.",
              },
              {
                icon: "📦",
                title: "Scalable & Flexible",
                desc: "Whether you're a small cafe or a multi-location chain, Smart Table grows with you.",
              },
            ].map((item, i) => (
              <div className="smart-table-icon-card" key={i}>
                <div className="icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="content-wrapper">
          <h2 className="section-title">Features</h2>
          <hr className="section-divider" />
          <div className="feature-tag-grid">
            {featureHighlights.map((feature, index) => (
              <button
                key={index}
                className="feature-tag"
                onClick={() => setSelectedFeature(feature)}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedFeature && (
        <div className="selected-feature-display">
          <img
            src={selectedFeature.img}
            alt={selectedFeature.title}
            className="selected-feature-image"
          />
          <h2>{selectedFeature.title}</h2>
          <p>{selectedFeature.desc}</p>
        </div>
      )}

      <section id="optional-addon" className="highlighted-feature">
        <div className="content-wrapper kiosk-layout">
          <div className="kiosk-text">
            <h2 className="section-title">
              Optional Add-On: Table Order Kiosk
            </h2>
            <hr className="section-divider" />
            <p>
              Our Table Order Kiosk system transforms dining with securely
              mounted tablets at each table. This premium solution streamlines
              operations, speeds up service, and enhances the customer
              experience with seamless interactive ordering.
            </p>
          </div>
          <div className="kiosk-image">
            <img
              src={require("../assets/images/Table Kiosk.png")}
              alt="Table Order Kiosk"
            />
          </div>
        </div>
      </section>

      <section id="kiosk-steps" className="section kiosk-steps-section">
        <div className="content-wrapper">
          <h2 className="section-title">
            Smart Ordering in 3 Steps Using Table Kiosk
          </h2>
          <hr className="section-divider" />
          <ImageCarousel />
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="content-wrapper">
          <h2 className="section-title">FAQ on Table Kiosk</h2>
          <hr className="section-divider" />
          <div className="faq-list">
            {[
              {
                question: "Does Smart Table Kiosk support multiple languages?",
                answer:
                  "Yes, we currently support English, Korean, Chinese & Japanese. If you require additional languages, please reach out to us for customization options.",
              },
              {
                question:
                  "Is internet connectivity required for the Smart Table Kiosk to function?",
                answer:
                  "Yes, an internet connection is required for the Smart Table to function properly. However, if the connection is lost, the table kiosks will automatically display QR codes to allow customers to continue ordering without disruption.",
              },
              {
                question: "What happens if the Smart Table malfunctions?",
                answer:
                  "While we prioritise reliability, in the rare event of a malfunction, our 24/7 online management support is available to ensure uninterrupted restaurant operations.",
              },
              {
                question: "How can I get a Smart Table for my business?",
                answer:
                  "Contact us today, and our team will get back to you as soon as possible! Email us at: contact@smarttable.co.nz",
              },
              {
                question: "Can customers customise their orders?",
                answer:
                  "Yes, customers can modify their orders using the menu options and add special instructions, which are sent directly to both the POS and KDS.",
              },
              {
                question:
                  "How is this beneficial over ordering through QR code?",
                answer:
                  "Ordering via QR codes requires scanning, accessing a website, and manually entering payment details. With Smart Table, customers enjoy a hassle-free ordering experience with a fully integrated and streamlined system.",
              },
            ].map((item, index) => (
              <details className="faq-item" key={index}>
                <summary>
                  <span className="faq-question">{item.question}</span>
                  <span className="arrow">&#9662;</span>
                </summary>
                <div className="faq-answer">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ready-to-start">
        <div className="content-wrapper">
          <h2 className="section-title">Ready to get Started?</h2>
          <hr className="section-divider" />

          <div className="demo-content">
            <p>
              Contact us today and see how Smart Table can transform your
              operations.
            </p>
            <Link
              to="/contact"
              className="cta-button"
              style={{ marginTop: "30px", display: "inline-block" }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
