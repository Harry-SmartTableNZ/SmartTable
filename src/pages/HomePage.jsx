import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel"; // unchanged; optional for your steps section
import "./HomePage.css";
import AppHeader from "./components/AppHeader";
import { Link } from "react-router-dom";
import heroImg from "../assets/images/FullBanner.jpeg";

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
  const [activeTab, setActiveTab] = useState("ordering");

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
    // Extra for Basic preview
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
    // Premium extras
    {
      title: "Custom Discount",
      img: require("../assets/images/Custom Discount.png"),
      desc: "Configure percentage or fixed discounts with rules that suit your business policies.",
    },
    {
      title: "Staff Timesheets",
      img: require("../assets/images/Coming Soon1.png"),
      desc: "Track staff logins and work hours for payroll accuracy and operational visibility.",
    },
    {
      title: "Multiple Payment Type",
      img: require("../assets/images/Payment Type.png"),
      desc: "Accept EFTPOS, cash, and split payments with a seamless checkout experience.",
    },
    {
      title: "QR Ordering",
      img: require("../assets/images/QR Ordering 1.png"),
      desc: "Allow customers to scan a QR code at their table to browse the menu, place orders, and pay directly from their own devices — enabling a faster, contactless dining experience.",
    },
  ];

  // esc to close any open preview
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

      {/* Hero (image background) */}
      <section
        className="full-banner full-banner--image"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-label="Smart Table restaurant hero"
      >
        <div className="full-banner__overlay" />
        <div className="banner-content">
          <h1>
            ELEVATE DINING
            <br />
            SIMPLIFY OPERATIONS
          </h1>
          <p>
            Enhance your customers&apos; experience while reducing costs and
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

      {/* Solutions picker */}
      <section id="why" className="why-smart-table-icons">
        <div className="content-wrapper">
          <h2 className="section-title">
            Find Smart Table solutions tailored to your Restaurant
          </h2>
          <div className="content-wrapper" />
          <hr className="section-divider" />

          <div className="sol-grid">
            {[
              { label: "Full Service Restaurant", icon: "cloche" },
              { label: "Quick Service Restaurant", icon: "burger" },
              { label: "Bar", icon: "martini" },
              { label: "Food Court", icon: "foodcourt" },
              { label: "Cafe", icon: "coffee" },
              { label: "Self Service", icon: "kiosk" },
              { label: "Enterprise", icon: "building" },
              { label: "Online Ordering", icon: "phonecart" },
            ].map((it) => (
              <Link
                key={it.label}
                to="/pricing"
                className="sol-card"
                onClick={() => window.scrollTo(0, 0)}
                aria-label={`${it.label} – view pricing`}
              >
                <span className="sol-icon">{getIcon(it.icon)}</span>
                <span className="sol-text">{it.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="content-wrapper">
          <h2 className="section-title">App Features</h2>
          <hr className="section-divider" />
        </div>

        {/* Standard */}
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
              aria-label="Close preview"
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

        {/* PREMIUM */}
        <div className="plan-block">
          <h3 className="premium-subheader">Premium — $150 / month</h3>
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
              aria-label="Close preview"
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

      {/* Optional Add-Ons (with per-feature gallery) */}
      <section
        id="optional-addons"
        className="segmented-tab-wrapper1"
        style={{ marginTop: "20px", paddingBottom: "40px" }}
      >
        <div className="content-wrapper">
          <h2 className="section-title">Optional Add-Ons</h2>
          <hr className="section-divider" />

          {/* Segmented Tabs */}
          <div className="segmented-tab-background-wrapper1">
            <div className="segmented-tab-background1">
              {[
                { key: "ordering", label: "Ordering" },
                { key: "kitchen", label: "Kitchen" },
                { key: "displays", label: "Displays" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`segmented-tab-button ${
                    activeTab === tab.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="segmented-tab-features">
            {activeTab === "ordering" && (
              <>
                {[
                  {
                    title: "Self-Ordering Kiosk - ($180/month/kiosk)",
                    content:
                      "Freestanding or counter-top kiosks that empower guests to browse menus at their own pace. Customers can place and pay for orders without staff assistance, reducing wait times. Perfect for quick-service environments looking to streamline ordering and payment.",
                    images: [
                      require("../assets/images/Kiosk 1.png"),
                      // add more images here when available
                    ],
                  },
                  {
                    title: "Portable Tablet - ($25/month/tablet)",
                    content:
                      "Lightweight handheld tablets that staff can carry around the venue to take orders directly at the table. Improves service efficiency, minimizes errors, and allows staff to stay closer to guests. Ideal for larger restaurants or outdoor dining areas where mobility is key.",
                    images: [require("../assets/images/Kiosk 1.png")],
                  },
                  {
                    title: "Table Order Kiosk - ($40/month/tablet)",
                    content:
                      "Secure, table-mounted tablets designed for contactless ordering. Guests can browse the full menu, customize items, and send orders straight to the kitchen. Enhances customer experience by giving diners complete control over their meal ordering process.",
                    images: [require("../assets/images/Table Kiosk.png")],
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-split-row ${
                      index % 2 === 0 ? "normal" : "reverse"
                    }`}
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

                {/* Steps Section */}
                <section
                  id="kiosk-steps"
                  className="section kiosk-steps-section"
                  style={{ marginTop: "20px" }}
                >
                  <div className="content-wrapper">
                    <h2 className="section-title">
                      Smart Ordering in 3 Steps Using Table Kiosk
                    </h2>
                  </div>
                  <div className="content-wrapper">
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
                      "Replace messy paper dockets with a digital kitchen display system. Orders are routed to the right stations in real time with bump and recall functions. Includes item timers and station-specific views to keep the back-of-house efficient.",
                    images: [require("../assets/images/KDS 1.png")],
                  },
                  {
                    title: "Service Display - ($30/month)",
                    content:
                      "Front-of-house screens that keep staff updated on which orders are ready to serve. Improves communication between kitchen and floor staff, ensuring smooth service. Helps reduce delays and ensures customers receive their food at the right time.",
                    images: [require("../assets/images/Coming Soon3.png")],
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-split-row ${
                      index % 2 === 0 ? "normal" : "reverse"
                    }`}
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
              <>
                {[
                  {
                    title: "Pickup & Service Display - ($30/month)",
                    content:
                      "Dedicated display for pickup counters showing ready orders. Guests can clearly see when their order is ready without staff intervention. Streamlines hand-off, reduces congestion, and keeps operations flowing smoothly.",
                    images: [require("../assets/images/Coming Soon1.png")],
                  },
                  {
                    title: "Customer Facing Display - ($30/month)",
                    content:
                      "Checkout-facing screen that shows items, totals, and payment details in real time. Improves transparency, builds trust, and allows guests to confirm their orders. Also supports tips, split payments, and digital receipt options.",
                    images: [require("../assets/images/Coming Soon1.png")],
                  },
                  {
                    title: "Digital Menu Display - ($30/month)",
                    content:
                      "Dynamic digital boards that update automatically with your POS. Supports daypart scheduling, promotions, and live price syncing. Reduces printing costs and keeps menus accurate across all locations.",
                    images: [require("../assets/images/Coming Soon1.png")],
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-split-row ${
                      index % 2 === 0 ? "normal" : "reverse"
                    }`}
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
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq-section">
        <div className="content-wrapper">
          <h2 className="section-title">FAQ for Smart Table</h2>
        </div>
        <div className="content-wrapper">
          <hr className="section-divider" />
          <div className="faq-list">
            {[
              {
                question: "Does Smart Table Kiosk provide hardware?",
                answer:
                  "Yes, you can decide whether you want to purchase software only or including hardware. Hardware for Self-Ordering Kiosk and Table Order Kiosk will be provided by us within the cost provided",
              },
              {
                question: "Does Smart Table Kiosk support multiple languages?",
                answer:
                  "Yes, we currently support English, Korean, Chinese & Japanese. If you require additional languages, please reach out to us for customization options.",
              },
              {
                question:
                  "Is internet connectivity required for the Smart Table App to function?",
                answer:
                  "Yes, an internet connection is required for the Smart Table App to function properly. However, if the connection is lost, the table kiosks will automatically display QR codes to allow customers to continue ordering without disruption.",
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

      {/* CTA */}
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

// ---------- Icons for the solutions cards ----------
function getIcon(name) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };
  switch (name) {
    case "cloche":
      return (
        <svg {...common}>
          <path d="M4 11h16" />
          <path d="M6 11a6 6 0 0 1 12 0" />
          <path d="M3 17h18" />
          <path d="M12 5v-1" />
          <path d="M5 17v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" />
        </svg>
      );
    case "burger":
      return (
        <svg {...common}>
          <path d="M3 10h18M4 14h16" />
          <rect x="4" y="6" width="16" height="4" rx="2" />
          <rect x="4" y="14" width="16" height="4" rx="2" />
        </svg>
      );
    case "martini":
      return (
        <svg {...common}>
          <path d="M3 3h18L12 12 3 3z" />
          <path d="M12 12v7" />
          <path d="M8 21h8" />
        </svg>
      );
    case "foodcourt":
      return (
        <svg {...common}>
          <path d="M6 10h12" />
          <path d="M12 10v4" />
          <path d="M5 10v6M5 16h3M5 12h3" />
          <path d="M19 10v6M16 16h3M16 12h3" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path d="M6 8h11a3 3 0 0 1 0 6H6a3 3 0 0 1-3-3" />
          <path d="M5 14v1a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-1" />
          <path d="M9 5c0 1-.8 1.5-.8 2.5M12 5c0 1-.8 1.5-.8 2.5M15 5c0 1-.8 1.5-.8 2.5" />
        </svg>
      );
    case "kiosk":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <rect x="7" y="6" width="10" height="7" rx="1" />
          <path d="M12 13v4m0 0l-2-2m2 2l2-2" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2" />
          <path d="M11 21v-3h2v3" />
        </svg>
      );
    case "phonecart":
      return (
        <svg {...common}>
          <rect x="5" y="2" width="10" height="20" rx="2" />
          <circle cx="10" cy="18" r="0.7" />
          <path d="M14.5 8h4l-.6 3.2a1 1 0 0 1-1 .8H14" />
          <circle cx="15" cy="14.5" r="1" />
          <circle cx="18" cy="14.5" r="1" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-3h4v3" />
        </svg>
      );
  }
}

export default HomePage;
