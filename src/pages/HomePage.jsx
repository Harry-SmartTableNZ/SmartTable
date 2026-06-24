import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import "./HomePage.css";
import AppHeader from "./components/AppHeader";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/images/FullBanner.jpeg";
import ReCAPTCHA from "react-google-recaptcha";

// --- Static Logo Data ---
const integratedCompaniesLogos = [
  { name: "Verifone", src: require("../assets/images/Verifone.jpg") },
  { name: "Windcave", src: require("../assets/images/Windcave.jpg") },
  { name: "Shift4", src: require("../assets/images/Shift4.jpg") },
  { name: "Smartpay", src: require("../assets/images/Smartpay.jpg") },
  { name: "Sektor", src: require("../assets/images/Sektor.jpg") },
  { name: "Uber Eats", src: require("../assets/images/Uber Eats.jpg") },
];

const clientLogos = [
  { name: "Faro", src: require("../assets/images/Faro.jpg") },
  { name: "BBQ", src: require("../assets/images/BBQ.jpg") },
  { name: "Chimac", src: require("../assets/images/Chimac.jpg") },
  { name: "Sushi & Bento", src: require("../assets/images/Sushi & Bento.jpg") },
  { name: "PhoTen", src: require("../assets/images/PhoTen.jpg") },
  { name: "Hello Chicago", src: require("../assets/images/Hello Chicago.jpg") },
  {
    name: "Top 1 Korean Restuarnt",
    src: require("../assets/images/Top 1.jpg"),
  },
  { name: "Kchicken", src: require("../assets/images/Kchicken.jpg") },
  { name: "U-Sushi", src: require("../assets/images/U-Sushi.jpg") },
];

// --- Carousel Component ---
const LogoCarousel = React.memo(({ logoList, direction = "L2R" }) => {
  const directionClass =
    direction === "R2L" ? "logo-track-R2L" : "logo-track-L2R";

  return (
    <div className="scrolling-carousel-container">
      <div
        className={`logo-track ${directionClass}`}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {[...logoList, ...logoList, ...logoList].map((logo, index) => (
          <div className="logo-item" key={index}>
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
  );
});

/** Mini gallery for each feature (thumbs + main image) */
function FeatureGallery({ images = [], alt }) {
  const [i, setI] = useState(0);
  if (!images.length) return null;

  return (
    <div className="feature-gallery">
      <div className="feature-gallery-main">
        <img src={images[i]} alt={`${alt} ${i + 1}`} />
      </div>
      {images.length > 1 && (
        <div className="feature-gallery-thumbs">
          {images.map((src, idx) => (
            <button
              type="button"
              key={idx}
              className={`thumb ${i === idx ? "active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Show ${alt} image ${idx + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ordering");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [selectedBasic, setSelectedBasic] = useState(null);
  const [selectedPremium, setSelectedPremium] = useState(null);

  // --- Kiosk Main Image Slider State ---
  const [kioskSlide, setKioskSlide] = useState(0);

  // Kiosk specific data collection for sliding feature
  const kioskSlidesData = [
    {
      title: "Self-Order Kiosk (Standard Countertop)",
      price: "$75/month/kiosk",
      img: require("../assets/images/Kiosk Photo 1.png"),
    },
    {
      title: "Self-Order Kiosk (Premium Countertop)",
      price: "$125/month/kiosk",
      img: require("../assets/images/Kiosk Photo 3.png"),
    },
    {
      title: "Self-Order Kiosk (Floor Standing)",
      price: "$150/month/kiosk",
      img: require("../assets/images/Kiosk Photo 2.png"),
    },
  ];

  const nextKioskSlide = () => {
    setKioskSlide((prev) =>
      prev === kioskSlidesData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevKioskSlide = () => {
    setKioskSlide((prev) =>
      prev === 0 ? kioskSlidesData.length - 1 : prev - 1,
    );
  };

  // --- Form State ---
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: "",
    tables: "",
    fullName: "",
    email: "",
    phone: "",
    company: "",
  });

  const featureHighlights = [
    {
      title: "Point of Sales (POS)",
      img: require("../assets/images/POS 1.png"),
      desc: "Process orders and payments quickly with an intuitive POS system designed for speed and reliability.",
    },
    {
      title: "Kitchen Display System",
      img: require("../assets/images/KDS.png"),
      desc: "Replace paper dockets with real-time digital displays that streamline kitchen operations.",
    },
    {
      title: "Multiple POS & KDS",
      img: require("../assets/images/Multi KDS.png"),
      desc: "Run several POS and KDS stations at once for seamless service across busy restaurants.",
    },
    {
      title: "Online Ordering",
      img: require("../assets/images/Online Ordering 1.png"),
      desc: "Allow customers to place orders directly from your branded online menu for convenience and efficiency.",
    },
    {
      title: "Online Reservation",
      img: require("../assets/images/Online Reservation 1.png"),
      desc: "Manage bookings effortlessly with a smart reservation system that prevents overbooking.",
    },
    {
      title: "QR Ordering",
      img: require("../assets/images/QR Ordering 1.png"),
      desc: "Enable contactless ordering by letting guests scan a QR code to browse the menu and place orders.",
    },
    {
      title: "Sales & Analytics",
      img: require("../assets/images/Sales Analytics.png"),
      desc: "Gain valuable insights with reports that track sales trends, top items, and customer preferences.",
    },
    {
      title: "Inventory Management",
      img: require("../assets/images/Inventory management.png"),
      desc: "Monitor stock levels in real time to reduce waste and keep your supplies in check.",
    },
    {
      title: "Loyalty Program",
      img: require("../assets/images/Loyalty.png"),
      desc: "Encourage repeat business with customizable rewards and customer loyalty features.",
    },
    {
      title: "Uber Eats Integration",
      img: require("../assets/images/Uber Eats.png"),
      desc: "Connect with leading delivery platforms like Uber Eats to expand your reach and grow sales.",
    },
    {
      title: "Table Management",
      img: require("../assets/images/Table Management.png"),
      desc: "Create table plans, assign and move tables, and keep dining areas organised for efficient service.",
    },
    {
      title: "Menu Management",
      img: require("../assets/images/Menu Management.png"),
      desc: "Add, edit, and categorise items with options, modifiers, and availability controls in one place.",
    },
    {
      title: "Order Records",
      img: require("../assets/images/Orders.png"),
      desc: "Browse past and current orders with filters and details for auditing and customer service.",
    },
    {
      title: "Staff Access Control",
      img: require("../assets/images/Staff Permission.png"),
      desc: "Control who can view or perform actions with role-based permissions for managers and staff.",
    },
    {
      title: "Promotions",
      img: require("../assets/images/Custom Discount.png"),
      desc: "Configure percentage or fixed discounts with rules that suit your business policies.",
    },
    {
      title: "Staff Scheduling and Timesheets",
      img: require("../assets/images/Staff Timesheet.png"),
      desc: "Track staff logins and work hours for payroll accuracy and operational visibility.",
    },
    {
      title: "Multiple Payment Type",
      img: require("../assets/images/Payment Type.png"),
      desc: "Accept EFTPOS, cash, and split payments with a seamless checkout experience.",
    },
  ];

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedBasic(null);
        setSelectedPremium(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const pickFeature = (title) =>
    featureHighlights.find((f) => f.title === title) || {
      title,
      img: "",
      desc: "",
    };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (formData.businessType && formData.tables) {
      setFormStep(2);
    } else {
      alert("Please select both options to continue.");
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }
    loading(true);

    const submitData = {
      access_key: "8291d6f9-6561-4655-bb8e-894d91a34d16",
      name: formData.fullName,
      from_name: "Smart Table - Home Page Quote",
      email: formData.email,
      phone: formData.phone,
      businessType: formData.businessType,
      tables: formData.tables,
      subject: "New Specialist Quote Request - Smart Table",
      "g-recaptcha-response": recaptchaToken,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const res = await response.json();
      if (!res.success) throw new Error(res.message || "Server error");
      navigate("/thank-you");
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      setRecaptchaToken("");
    }
  };

  return (
    <div className="home-page-container">
      <AppHeader isHome={true} />

      {/* Hero Banner Section */}
      <section
        className="full-banner full-banner--image"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-label="Smart Table restaurant hero"
      >
        <div className="full-banner__overlay" />
        <div className="banner-container">
          <div className="banner-left">
            <h1>
              Operate smarter with Smart Table —
              <span className="sub-headline">
                Powerful POS & Kiosks customised for your restaurant
              </span>
            </h1>
            <div className="banner-trust-badges">
              <span>✔ Intuitive POS</span>
              <span>✔ 24/7 Support</span>
              <span>✔ Real-time Analytics</span>
            </div>
          </div>

          <div className="banner-right">
            <div className="specialist-card">
              <form onSubmit={handleFinalSubmit}>
                {formStep === 1 ? (
                  <div className="step-content">
                    <h3>Talk to a Specialist</h3>
                    <div className="form-group">
                      <label>Select a business type</label>
                      <select
                        className="form-select"
                        required
                        value={formData.businessType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessType: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select Restaurant Type
                        </option>
                        <option value="Fine Dining">
                          Fine Dining / Dine-in
                        </option>
                        <option value="Takeaway">
                          Takeaway / Quick Service
                        </option>
                        <option value="Cafe">Cafe / Bakery</option>
                        <option value="Bar">Bar / Nightclub</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Estimated Table Number</label>
                      <select
                        className="form-select"
                        required
                        value={formData.tables}
                        onChange={(e) =>
                          setFormData({ ...formData, tables: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          Estimated Table Number
                        </option>
                        <option value="1-5">1 - 5 Tables</option>
                        <option value="5-20">5 - 20 Tables</option>
                        <option value="20+">20+ Tables</option>
                        <option value="none">N/A (Takeaway only)</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="form-submit-btn"
                      onClick={handleNextStep}
                    >
                      Get Started
                    </button>
                  </div>
                ) : (
                  <div className="step-content fade-in">
                    <h3>Contact Details</h3>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="form-input"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="form-input"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="form-input"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div
                      style={{
                        margin: "10px 0",
                        transform: "scale(0.8)",
                        transformOrigin: "0 0",
                      }}
                    >
                      <ReCAPTCHA
                        sitekey="6LcBe4IrAAAAAHILeyKl2MWyYBfCbHTFy31y6DXn"
                        onChange={(token) => setRecaptchaToken(token || "")}
                        onExpired={() => setRecaptchaToken("")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="form-submit-btn"
                      disabled={loading || !recaptchaToken}
                    >
                      {loading ? "Sending..." : "Request a Quote"}
                    </button>
                    <p className="back-link" onClick={() => setFormStep(1)}>
                      ← Back to Step 1
                    </p>
                  </div>
                )}
              </form>
              <p className="form-disclaimer">
                By clicking {formStep === 1 ? "Get Started" : "Request a Quote"}{" "}
                you agree to our Terms and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Dual Carousel Section --- */}
      <div className="carousels-main-wrapper">
        <div className="carousel-header">Companies Integrated With Our App</div>
        <LogoCarousel logoList={integratedCompaniesLogos} direction="R2L" />
        <div className="carousel-header">Our Clients</div>
        <LogoCarousel logoList={clientLogos} direction="L2R" />
      </div>

      {/* Plans Section */}
      <section id="features" className="features-section">
        <div className="content-wrapper">
          <h2 className="section-title">Plans</h2>
          <hr className="section-divider" />
        </div>

        <div className="plan-block">
          <h3 className="plan-subheader">Standard — $50 / month</h3>
          <p className="plan-desc">
            Ideal for restaurants that need a solid core of essential tools.
          </p>
        </div>

        <div className="feature-tag-grid feature-grid-basic">
          {[
            "Point of Sales (POS)",
            "Table Management",
            "Menu Management",
            "Sales & Analytics",
            "Order Records",
            "Online Ordering",
            "Staff Access Control",
            "Loyalty Program",
            "Promotions",
          ].map((title) => (
            <button
              key={title}
              className="feature-tag"
              onClick={() => setSelectedBasic(pickFeature(title))}
            >
              {title}
            </button>
          ))}
        </div>

        {selectedBasic && (
          <div className="selected-feature-display">
            <button
              className="feature-close"
              type="button"
              onClick={() => setSelectedBasic(null)}
            >
              &times;
            </button>
            {selectedBasic.img && (
              <img
                src={selectedBasic.img}
                alt={selectedBasic.title}
                className="selected-feature-image"
              />
            )}
            <h2>{selectedBasic.title}</h2>
            <p>{selectedBasic.desc}</p>
          </div>
        )}

        <div className="plan-block">
          <h3 className="premium-subheader">
            Premium — $150 / month (Includes Standard Features)
          </h3>
          <p className="plan-desc">
            Perfect for fully-operating restaurants looking for advanced
            functionality.
          </p>
        </div>

        <div className="feature-tag-grid" style={{ gap: "12px 14px" }}>
          {[
            "Online Reservation",
            "Uber Eats Integration",
            "Staff Scheduling and Timesheets",
            "Inventory Management",
            "QR Ordering",
          ].map((title) => (
            <button
              key={title}
              className="feature-tag"
              onClick={() => setSelectedPremium(pickFeature(title))}
            >
              {title}
            </button>
          ))}
        </div>

        {selectedPremium && (
          <div className="selected-feature-display">
            <button
              className="feature-close"
              type="button"
              onClick={() => setSelectedPremium(null)}
            >
              &times;
            </button>
            {selectedPremium.img && (
              <img
                src={selectedPremium.img}
                alt={selectedPremium.title}
                className="selected-feature-image"
              />
            )}
            <h2>{selectedPremium.title}</h2>
            <p>{selectedPremium.desc}</p>
          </div>
        )}
      </section>

      {/* Optional Add-Ons */}
      <section
        id="optional-addons"
        className="segmented-tab-wrapper1"
        style={{ marginTop: "20px", paddingBottom: "40px" }}
      >
        <div className="content-wrapper">
          <h2 className="section-title">Optional Add-Ons</h2>
          <hr className="section-divider" />
          <div className="segmented-tab-background-wrapper1">
            <div className="segmented-tab-background1">
              {[
                { key: "ordering", label: "Kiosks" },
                { key: "kitchen", label: "Kitchen" },
                { key: "displays", label: "Displays" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`segmented-tab-button ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="segmented-tab-features">
            {activeTab === "ordering" && (
              <>
                {/* INTERACTIVE CAROUSEL ROW FOR KIOSKS */}
                <div
                  className="feature-split-row normal wrapper-kiosk-carousel"
                  style={{ padding: "30px 0" }}
                >
                  {/* Outer Slider Box Container */}
                  <div className="feature-split-image kiosk-slider-container">
                    <button
                      className="slider-btn prev"
                      type="button"
                      onClick={prevKioskSlide}
                    >
                      &#10094;
                    </button>

                    {/* Sliding film strip containing all three images horizontally */}
                    <div
                      className="kiosk-slides-wrapper"
                      style={{ transform: `translateX(-${kioskSlide * 100}%)` }}
                    >
                      {kioskSlidesData.map((slide, index) => (
                        <div className="kiosk-slide" key={index}>
                          <img src={slide.img} alt={slide.title} />
                        </div>
                      ))}
                    </div>

                    <button
                      className="slider-btn next"
                      type="button"
                      onClick={nextKioskSlide}
                    >
                      &#10095;
                    </button>

                    {/* Inline Slide Indicator Dots */}
                    <div className="carousel-nav-dots">
                      {kioskSlidesData.map((_, idx) => (
                        <span
                          key={idx}
                          className={`nav-dot ${idx === kioskSlide ? "active" : ""}`}
                          onClick={() => setKioskSlide(idx)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="feature-split-text">
                    <h3>
                      {kioskSlidesData.map((slide, i) => (
                        <span
                          key={i}
                          style={{
                            display: "block",
                            color: i === kioskSlide ? "#00bcd4" : "inherit",
                            fontWeight: i === kioskSlide ? "700" : "400",
                            fontSize: i === kioskSlide ? "1.1em" : "0.9em",
                            transition: "all 0.3s ease",
                            marginBottom: "8px",
                          }}
                        >
                          {slide.title}
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.85em",
                              opacity: 0.8,
                              fontWeight: "normal",
                              margin: "2px 0 6px",
                            }}
                          >
                            {slide.price}
                          </span>
                        </span>
                      ))}
                    </h3>
                    <p style={{ marginTop: "15px" }}>
                      Elevate your guest experience with our versatile kiosks.
                    </p>
                  </div>
                </div>

                {/* Remaining Static Rows */}
                {[
                  {
                    title: "Portable Tablet - ($25/month/tablet)",
                    content: "Lightweight handheld tablets for table service.",
                    images: [require("../assets/images/Kiosk 1.png")],
                  },
                  {
                    title: "Table Order Kiosk - ($30/month/tablet)",
                    content:
                      "Secure, table-mounted tablets for contactless ordering.",
                    images: [require("../assets/images/Table Kiosk.png")],
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-split-row ${index % 2 !== 0 ? "normal" : "reverse"}`}
                    style={{ padding: "30px 0" }}
                  >
                    <div className="feature-split-image">
                      <FeatureGallery
                        images={feature.images}
                        alt={feature.title}
                      />
                    </div>
                    <div className="feature-split-text">
                      <h3>{feature.title}</h3>
                      <p>{feature.content}</p>
                    </div>
                  </div>
                ))}

                <section
                  id="kiosk-steps"
                  className="section kiosk-steps-section"
                  style={{ marginTop: "20px" }}
                >
                  <div className="content-wrapper">
                    <h2 className="section-title">Smart Ordering in 3 Steps</h2>
                    <hr className="section-divider" />
                    <ImageCarousel />
                  </div>
                </section>
              </>
            )}

            {activeTab === "kitchen" && (
              <>
                {[
                  {
                    title: "Kitchen Display System - ($40/month)",
                    content: "Digital kitchen display system.",
                    images: [require("../assets/images/KDS.png")],
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="feature-split-row normal"
                    style={{ padding: "30px 0" }}
                  >
                    <div className="feature-split-image">
                      <FeatureGallery
                        images={feature.images}
                        alt={feature.title}
                      />
                    </div>
                    <div className="feature-split-text">
                      <h3>{feature.title}</h3>
                      <p>{feature.content}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "displays" && (
              <div className="feature-text-only">
                {[
                  {
                    title: "Pickup Display - ($40/month)",
                    content: "Pickup counter display.",
                    images: [require("../assets/images/Pickup Display.png")],
                  },
                  {
                    title: "Customer Facing Display - ($40/month)",
                    content: "Checkout-facing screen.",
                    images: [require("../assets/images/Customer Display.png")],
                  },
                  {
                    title: "Digital Menu Display - ($40/month)",
                    content: "Dynamic digital boards.",
                    images: [require("../assets/images/Coming Soon1.png")],
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-split-row ${index % 2 === 0 ? "normal" : "reverse"}`}
                    style={{ padding: "30px 0" }}
                  >
                    <div className="feature-split-image">
                      <FeatureGallery
                        images={feature.images}
                        alt={feature.title}
                      />
                    </div>
                    <div className="feature-split-text">
                      <h3>{feature.title}</h3>
                      <p>{feature.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section faq-section">
        <div className="content-wrapper">
          <h2 className="section-title">FAQ for Smart Table</h2>
          <hr className="section-divider" />
          <div className="faq-list">
            {[
              {
                question: "Does Smart Table Kiosk provide hardware?",
                answer:
                  "Yes, hardware for Self-Ordering Kiosk and Table Order Kiosk will be provided by us.",
              },
              {
                question: "Does Smart Table Kiosk support multiple languages?",
                answer:
                  "Yes, we currently support English, Korean, Chinese & Japanese.",
              },
              {
                question: "Is internet connectivity required?",
                answer:
                  "Yes, however, if connection is lost, kiosks display QR codes to continue ordering.",
              },
              {
                question: "What happens if it malfunctions?",
                answer: "Our 24/7 online management support is available.",
              },
              {
                question: "How can I get a Smart Table?",
                answer: "Email us at: contact@smarttable.co.nz",
              },
              {
                question: "Can customers customise orders?",
                answer:
                  "Yes, they can modify orders and add special instructions.",
              },
            ].map((item, idx) => (
              <details className="faq-item" key={idx}>
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

      {/* CTA Section */}
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
