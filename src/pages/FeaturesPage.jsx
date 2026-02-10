import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import { useLocation, Link } from "react-router-dom";

import Image1 from "../assets/images/POS 1.png";
import Image2 from "../assets/images/Table Management.png";
import Image3 from "../assets/images/Menu Management.png";
import Image4 from "../assets/images/Sales Analytics.png";
import Image5 from "../assets/images/Orders.png";
import Image6 from "../assets/images/Staff Permission.png";
import Image7 from "../assets/images/Payment Type.png";
import Image8 from "../assets/images/Online Ordering 1.png";
import Image9 from "../assets/images/Online Reservation 1.png";
import Image10 from "../assets/images/Loyalty.png";
import Image11 from "../assets/images/Custom Discount.png";
import Image12 from "../assets/images/Uber Eats.png";
import Image14 from "../assets/images/Coming Soon1.png";
import Image16 from "../assets/images/Kiosk 1.png";
import Image17 from "../assets/images/Table Kiosk.png";
import Image18 from "../assets/images/KDS 1.png";
import Image19 from "../assets/images/Coming Soon1.png";
import Image20 from "../assets/images/Coming Soon1.png";
import Image21 from "../assets/images/Coming Soon1.png";
import Image22 from "../assets/images/Coming Soon1.png";
import Image23 from "../assets/images/QR Ordering 1.png";
import Image24 from "../assets/images/Staff Timesheet.png";
import Image25 from "../assets/images/Self-Ordering Kiosk.png";

import "./FeaturesPage.css";
import AppHeader from "./components/AppHeader";

const FeaturesPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Standard");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (["Standard", "Premium", "addons"].includes(hash)) {
      setActiveTab(hash);
      const el = document.getElementById("feature-tabs");
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <AppHeader />

      <div className="features-page-skin">
        <section
          className="segmented-tab-wrapper"
          style={{ marginTop: "80px" }}
        >
          {activeTab === "Standard" && <div id="restaurant-Standard" />}
          {activeTab === "Premium" && <div id="Premium-of-house" />}
          {activeTab === "addons" && <div id="optional-addons" />}
          <div className="segmented-tab-background-wrapper">
            <div className="segmented-tab-background">
              {[
                { key: "Standard", label: "Standard Features" },
                { key: "Premium", label: "Premium Features" },
                { key: "addons", label: "Optional Add-Ons" },
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

          <div className="segmented-tab-features">
            {{
              Standard: [
                {
                  title: "Point of Sales (POS)",
                  content:
                    "A robust point-of-sale system that lets your staff process orders quickly, manage payments seamlessly, and sync data across all devices in real-time. Designed for speed and reliability, it keeps your service running smoothly even during peak hours. Every transaction, discount, and modification is tracked with precision for complete operational visibility.",
                  image: Image1,
                },
                {
                  title: "Table Management",
                  content:
                    "Visually manage your entire floor plan with drag-and-drop table assignments, real-time status tracking, and color-coded availability. Whether it’s dine-in, pickup, or delivery, staff can instantly see which tables are occupied or ready for the next guests. The result is smoother seating flow and reduced waiting times.",
                  image: Image2,
                },
                {
                  title: "Menu Management",
                  content:
                    "Easily customize and update your menu items, prices, and categories with flexible scheduling options for breakfast, lunch, and dinner. Include allergen notes, preparation times, and required modifiers to guide both staff and customers. Changes sync instantly across POS, kiosks, and online orders.",
                  image: Image3,
                },
                {
                  title: "Sales & Analytics",
                  content:
                    "Gain deep insights into your business performance with real-time dashboards showing total sales, popular items, and order trends. Compare day, week, and month statistics to identify growth patterns and seasonal shifts. Export detailed reports for accounting and forecasting at the click of a button.",
                  image: Image4,
                },
                {
                  title: "Order Records",
                  content:
                    "Access a complete history of every order by table, date, or staff member, with filters for payments, refunds, and discounts. Quickly reprint receipts, review previous dockets, or check transaction notes for auditing. It’s your central logbook for transparent and accountable service operations.",
                  image: Image5,
                },
                {
                  title: "Staff Access Control",
                  content:
                    "Assign roles and permissions to your team to safeguard sensitive data and maintain accountability. Limit access to key functions such as voids, refunds, and reports, ensuring each user sees only what they need. Manage roles easily as your team grows and your operation scales.",
                  image: Image6,
                },
                {
                  title: "Multiple Payment Type",
                  content:
                    "Accept cash, EFTPOS, credit card, or contactless payments with built-in split bill options for groups. Transactions automatically sync with the POS and are logged for reporting. Simplify end-of-day reconciliation and reduce manual input errors for faster, accurate closings.",
                  image: Image7,
                },
              ],
              Premium: [
                {
                  title: "Online Ordering",
                  content:
                    "Allow customers to browse your live menu and place orders directly from your website or mobile devices. Orders instantly sync with your POS and kitchen display, clearly marked for pickup or delivery. Boost revenue and reduce phone orders with a seamless online experience.",
                  image: Image8,
                },
                {
                  title: "Online Reservation",
                  content:
                    "Let guests book tables online with real-time availability linked to your POS seating plan. Reservations appear instantly on your dashboard, helping your team prepare for incoming bookings. Send automatic confirmations or reminders to reduce no-shows and improve table turnover.",
                  image: Image9,
                },
                {
                  title: "QR Ordering",
                  content:
                    "Empower your guests with a seamless, contactless ordering experience. With QR Ordering, customers can simply scan a QR code at their table to instantly access your digital menu, customize their selections, and place orders directly from their own devices. Orders are sent straight to the POS and kitchen displays in real time, reducing wait times and improving service efficiency — all without the need for additional hardware.",
                  image: Image23,
                },
                {
                  title: "Loyalty Program",
                  content:
                    "Reward loyal customers with points, cashbacks, or digital vouchers directly integrated into your POS. Track every redemption and purchase to build personalized promotions that keep guests returning. Increase repeat business while maintaining full control over program rules and budgets.",
                  image: Image10,
                },
                {
                  title: "Custom Discount",
                  content:
                    "Create flexible discounts and promotions that can be applied per item, order, or customer group. From happy hour specials to staff perks, each discount is tracked in reports for transparency. Manage promotional campaigns easily without affecting your accounting accuracy.",
                  image: Image11,
                },
                {
                  title: "Uber Eats Integration",
                  content:
                    "Connect your Uber Eats account directly to Smart Table to eliminate manual tablet handling. Incoming delivery orders appear instantly in your POS and KDS, tagged by channel and order type. This integration saves time, prevents errors, and keeps all sales data unified.",
                  image: Image12,
                },
                {
                  title: "Staff Timesheets",
                  content:
                    "Track staff clock-ins and clock-outs directly through your POS, linked to assigned shifts. Automatically calculate hours worked and export timesheets for payroll. Gain clear visibility into attendance, overtime, and scheduling efficiency across your team.",
                  image: Image24,
                },
                {
                  title: "Inventory Management",
                  content:
                    "Monitor stock levels, ingredient usage, and supplier orders in real-time to prevent shortages. Receive automatic alerts when items run low and generate purchase orders instantly. Maintain tighter cost control with live inventory data across all connected devices.",
                  image: Image14,
                },
              ],
              addons: [
                {
                  title: "Self Ordering Kiosk",
                  content:
                    "Empower customers to browse the menu, customize items, and place orders at a freestanding kiosk. Reduce queues and wait times during peak hours while improving order accuracy. Perfect for fast-paced venues that want to streamline service without extra staff.",
                  image: Image25,
                },
                {
                  title: "Portable Tablet",
                  content:
                    "Equip your staff with lightweight tablets to take orders from anywhere in the venue. Orders sync directly with the kitchen display and POS in real-time. Improve efficiency and guest satisfaction by cutting down on wait times and unnecessary walking.",
                  image: Image16,
                },
                {
                  title: "Table Order Kiosk",
                  content:
                    "Install mountable touchscreen kiosks at each table for guests to order directly without waiting for service. Increase average spend with built-in upselling prompts and easy reordering. Every order is automatically sent to the kitchen and POS for seamless fulfillment.",
                  image: Image17,
                },
                {
                  title: "Kitchen Display System",
                  content:
                    "Replace paper dockets with digital kitchen screens that update instantly as new orders arrive. Organize by station, display timers, and track preparation status for faster service. Reduce mistakes and paper waste while keeping chefs fully in sync with the front of house.",
                  image: Image18,
                },
                {
                  title: "Service Display",
                  content:
                    "Show ready orders on a staff-facing screen to streamline communication between kitchen and service teams. Highlight completed items, pending plates, and pickup priorities. Ensure faster service delivery and a smoother flow between kitchen and staff.",
                  image: Image19,
                },
                {
                  title: "Pickup & Service Display",
                  content:
                    "Offer customers a clear view of their order status on a pickup screen in real-time. Display order numbers, progress updates, and notifications for ready-to-collect items. Ideal for takeaway counters and cafes that handle high-volume online or app-based orders.",
                  image: Image20,
                },
                {
                  title: "Customer Facing Display",
                  content:
                    "Enhance transparency at checkout with a dual-screen setup showing the customer’s order details, pricing, and promotional content. Encourage upsells while providing confidence and clarity during every transaction. A modern, professional experience for your counter.",
                  image: Image21,
                },
                {
                  title: "Digital Menu Display",
                  content:
                    "Showcase your live menu and promotions on digital screens that automatically update from your POS system. Schedule content by time or day to feature happy hour specials or limited-time offers. Keep guests informed and engaged while reducing print costs.",
                  image: Image22,
                },
                {
                  title: "Smart Ordering in 3 Steps",
                  content:
                    "A simple overview of how customers order via the Smart Table Kiosk",
                  isCarousel: true,
                },
                {
                  title: "Table Kiosk FAQ",
                  content:
                    "Frequently asked questions about how Smart Table Kiosk works",
                  isFaq: true,
                },
              ],
            }[activeTab].map((feature, index) => {
              const isFaq = feature.isFaq;
              const isCarousel = feature.isCarousel;

              if (isCarousel) {
                return (
                  <div key={index} className="carousel-centered-wrapper">
                    <h3 className="carousel-title">{feature.title}</h3>
                    <p className="carousel-description">{feature.content}</p>
                    <div className="carousel-container">
                      <ImageCarousel />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`feature-split-row ${
                    index % 2 === 0 ? "normal" : "reverse"
                  }`}
                >
                  {isFaq ? (
                    <div
                      className="feature-split-text faq-wide"
                      style={{ width: "100%" }}
                    >
                      <h3>{feature.title}</h3>
                      <p>{feature.content}</p>
                      <div className="faq-list">
                        {[
                          {
                            question:
                              "Does Smart Table Kiosk support multiple languages?",
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
                            question:
                              "What happens if the Smart Table malfunctions?",
                            answer:
                              "While we prioritise reliability, in the rare event of a malfunction, our 24/7 online management support is available to ensure uninterrupted restaurant Standard.",
                          },
                          {
                            question:
                              "How can I get a Smart Table for my business?",
                            answer:
                              "Contact us today, and our team will get back to you as soon as possible! Email us at: contact@smarttable.co.nz",
                          },
                          {
                            question: "Can customers customise their orders?",
                            answer:
                              "Yes, customers can modify their orders using the menu options and add special instructions, which are sent directly to both the POS and KDS.",
                          },
                        ].map((item, faqIndex) => (
                          <details className="faq-item" key={faqIndex}>
                            <summary>
                              <span className="faq-question">
                                {item.question}
                              </span>
                              <span className="arrow">&#9662;</span>
                            </summary>
                            <div className="faq-answer">{item.answer}</div>
                          </details>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="feature-split-image">
                        {feature.image && (
                          <img src={feature.image} alt={feature.title} />
                        )}
                      </div>
                      <div className="feature-split-text">
                        <h3>{feature.title}</h3>
                        <p>{feature.content}</p>

                        {feature.subFeatures?.length > 0 &&
                          feature.subFeatures.map((sub, subIndex) => {
                            const isOpen = openIndex === `${index}-${subIndex}`;
                            const showNumber = [
                              "Online Ordering",
                              "Online Reservations",
                              "QR Code Ordering",
                            ].includes(feature.title);

                            return (
                              <div
                                key={subIndex}
                                className={`accordion-item ${
                                  isOpen ? "open" : ""
                                }`}
                                onClick={() =>
                                  setOpenIndex(
                                    isOpen ? null : `${index}-${subIndex}`
                                  )
                                }
                              >
                                <div className="accordion-header">
                                  <span className="icon-left">
                                    {showNumber ? `${subIndex + 1}.` : "✔"}
                                  </span>
                                  <span className="accordion-title">
                                    {sub.title}
                                  </span>
                                  {sub.content && (
                                    <span
                                      className={`icon-right ${
                                        isOpen ? "rotated" : ""
                                      }`}
                                    >
                                      ›
                                    </span>
                                  )}
                                </div>
                                {isOpen && (
                                  <div className="accordion-content">
                                    {sub.content}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="ready-to-start">
        <div className="content-wrapper">
          <h2 className="section-title">Interested in Smart Table?</h2>
          <hr className="section-divider" />
          <div className="demo-content">
            <p>
              Contact us today and see how Smart Table can transform your
              Standard.
            </p>
            <Link
              to="/contact"
              className="cta-button"
              style={{ marginTop: "30px", display: "inline-block" }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FeaturesPage;
