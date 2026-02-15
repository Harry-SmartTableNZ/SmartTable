import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import "./HomePage.css";
import AppHeader from "./components/AppHeader";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/images/FullBanner.jpeg";
import ReCAPTCHA from "react-google-recaptcha";

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

    setLoading(true);

    const submitData = new FormData();
    submitData.append("Full Name", formData.fullName);
    submitData.append("Email", formData.email);
    submitData.append("Phone", formData.phone);
    submitData.append("Business Type", formData.businessType);
    submitData.append("Estimated Tables", formData.tables);

    // FormSubmit Helpers
    submitData.append("_replyto", formData.email);
    submitData.append("_subject", "New Specialist Quote Request - Smart Table");
    submitData.append("_captcha", "false");
    submitData.append("g-recaptcha-response", recaptchaToken);

    try {
      await fetch("https://formsubmit.co/admin@smarttable.co.nz", {
        method: "POST",
        body: submitData,
        headers: { Accept: "application/json" },
      });
      navigate("/thank-you");
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      setRecaptchaToken("");
    }
  };

  // ---------- Feature data (used for Basic/Premium preview) ----------
  const featureHighlights = [
    {
      title: "Point of Sales (POS)",
      img: require("../assets/images/POS 1.png"),
      desc: "Process orders and payments quickly with an intuitive POS system designed for speed and reliability.",
    },
    {
      title: "Kitchen Display System",
      img: require("../assets/images/KDS 1.png"),
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
      img: require("../assets/images/Coming Soon1.png"),
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
      title: "Custom Discount",
      img: require("../assets/images/Custom Discount.png"),
      desc: "Configure percentage or fixed discounts with rules that suit your business policies.",
    },
    {
      title: "Staff Timesheets",
      img: require("../assets/images/Staff Timesheet.png"),
      desc: "Track staff logins and work hours for payroll accuracy and operational visibility.",
    },
    {
      title: "Multiple Payment Type",
      img: require("../assets/images/Payment Type.png"),
      desc: "Accept EFTPOS, cash, and split payments with a seamless checkout experience.",
    },
  ];

  const [selectedBasic, setSelectedBasic] = useState(null);
  const [selectedPremium, setSelectedPremium] = useState(null);

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

  return (
    <div>
      <AppHeader />
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
            <p>
              Enhance your customers' experience while reducing costs and
              increasing efficiency with Smart Table.
            </p>
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
            "Staff Access Control",
            "Multiple Payment Type",
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
            functionality and growth.
          </p>
        </div>

        <div className="feature-tag-grid" style={{ gap: "12px 14px" }}>
          {[
            "Online Ordering",
            "Online Reservation",
            "Loyalty Program",
            "Custom Discount",
            "Uber Eats Integration",
            "Staff Timesheets",
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
              onClick={() => {
                setSelectedPremium(null);
                setSelectedBasic(null);
              }}
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
                { key: "ordering", label: "Ordering" },
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
                {[
                  {
                    title: [
                      "14 inch Self-Ordering Kiosk",
                      "$100/month/kiosk",
                      "",
                      "21 inch Self-Ordering Kiosk",
                      "$200/month/kiosk",
                    ],
                    content:
                      "Elevate your guest experience with our versatile freestanding or counter-top kiosks.",
                    images: [
                      require("../assets/images/Self-Ordering Kiosk.png"),
                    ],
                  },
                  {
                    title: "Portable Tablet - ($25/month/tablet)",
                    content:
                      "Lightweight handheld tablets that staff can carry around the venue to take orders directly at the table.",
                    images: [require("../assets/images/Kiosk 1.png")],
                  },
                  {
                    title: "Table Order Kiosk - ($40/month/tablet)",
                    content:
                      "Secure, table-mounted tablets designed for contactless ordering.",
                    images: [require("../assets/images/Table Kiosk.png")],
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
                      <h3>
                        {Array.isArray(feature.title)
                          ? feature.title.map((line, i) => (
                              <span
                                key={i}
                                style={{
                                  display: "block",
                                  minHeight: line === "" ? "20px" : "auto",
                                }}
                              >
                                {line}
                              </span>
                            ))
                          : feature.title}
                      </h3>
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
                    <h2 className="section-title">
                      Smart Ordering in 3 Steps Using Table Kiosk
                    </h2>
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
                    title: "Kitchen Display System - ($30/month)",
                    content:
                      "Replace messy paper dockets with a digital kitchen display system.",
                    images: [require("../assets/images/KDS 1.png")],
                  },
                  {
                    title: "Service Display - ($30/month)",
                    content:
                      "Front-of-house screens that keep staff updated on ready orders.",
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
              </>
            )}
            {activeTab === "displays" && (
              <div className="feature-text-only">
                {[
                  {
                    title: "Pickup & Service Display - ($30/month)",
                    content:
                      "Dedicated display for pickup counters showing ready orders.",
                  },
                  {
                    title: "Customer Facing Display - ($30/month)",
                    content:
                      "Checkout-facing screen that shows items and totals in real time.",
                  },
                  {
                    title: "Digital Menu Display - ($30/month)",
                    content:
                      "Dynamic digital boards that update automatically with your POS.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="feature-text-block"
                    style={{ padding: "18px 0" }}
                  >
                    <h3 className="feature-text-title">{feature.title}</h3>
                    <p className="feature-text-desc">{feature.content}</p>
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
                  "Yes, hardware for Self-Ordering Kiosk and Table Order Kiosk will be provided by us within the cost provided.",
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
                answer:
                  "Our 24/7 online management support is available to ensure uninterrupted operations.",
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
