import { useState } from "react";
import Footer from "./components/Footer";
import "./PricingPage.css";
import AppHeader from "./components/AppHeader";

const PricingPage = () => {
  const [tabletCount, setTabletCount] = useState(0);
  const [kioskIncluded, setKioskIncluded] = useState("No");
  const [kioskContract, setKioskContract] = useState("3month");
  const [kioskTableCount, setKioskTableCount] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);

  const pricingOptions = [
    {
      title: "Software Only Subscription",
      price: "$150/month + $50 per tablet",
      description:
        "Includes all features. POS & KDS usage included. No hidden costs.",
      color: "#00bcd4",
    },
    {
      title: "Table Order Kiosk (1-Year Contract)",
      price: "$40/month per table",
      description: "Best value for committed venues using self-service kiosks.",
      color: "#26a69a",
    },
    {
      title: "Table Order Kiosk (3-Month Contract)",
      price: "$60/month per table",
      description: "Flexible short-term option to boost table-side efficiency.",
      color: "#ab47bc",
    },
  ];

  const handleCalculate = () => {
    const baseCost = 150;
    const tabletCost = tabletCount * 50;
    let total = baseCost + tabletCost;

    if (kioskIncluded === "Yes") {
      const rate = kioskContract === "1year" ? 40 : 60;
      const kioskCost = rate * kioskTableCount;
      total += kioskCost;
    }

    setMonthlyCost(total);
  };

  return (
    <div className="pricing-page">
      <AppHeader />
      <div className="spacer" />

      <section className="features-section">
        <div className="content-wrapper">
          <h2 className="feature-section-title section-title">Pricing Plans</h2>
          <hr className="section-divider" />
          <div className="feature-card-grid">
            {pricingOptions.map((option, i) => (
              <div
                key={i}
                className="feature-card"
                style={{
                  border: `2px solid ${option.color}`,
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <div className="feature-card-text">
                  <h3 style={{ color: option.color, marginBottom: "10px" }}>
                    {option.title}
                  </h3>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      marginBottom: "8px",
                    }}
                  >
                    {option.price}
                  </p>
                  <p style={{ color: "#ccc" }}>{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="content-wrapper">
          <h2 className="feature-section-title section-title">
            Estimate Your Monthly Cost
          </h2>
          <hr className="section-divider" />

          <div
            style={{
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Input Section */}
            <div style={{ maxWidth: "400px", flex: 1 }}>
              <label>Number of POS & KDS Tablets</label>
              <select
                value={tabletCount}
                onChange={(e) => setTabletCount(Number(e.target.value))}
                style={inputStyle}
              >
                {[...Array(21).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <label>Include Table Order Kiosk?</label>
              <select
                value={kioskIncluded}
                onChange={(e) => setKioskIncluded(e.target.value)}
                style={inputStyle}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              {kioskIncluded === "Yes" && (
                <>
                  <label>Contract Period</label>
                  <select
                    value={kioskContract}
                    onChange={(e) => setKioskContract(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="3month">
                      3-Month Contract ($60/table/month)
                    </option>
                    <option value="1year">
                      1-Year Contract ($40/table/month)
                    </option>
                  </select>

                  <label>Number of Tables (Kiosk)</label>
                  <select
                    value={kioskTableCount}
                    onChange={(e) => setKioskTableCount(Number(e.target.value))}
                    style={inputStyle}
                  >
                    {[...Array(51).keys()].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <div style={buttonContainerStyle}>
                <button onClick={handleCalculate} style={buttonStyle}>
                  Calculate Monthly Cost
                </button>
              </div>
            </div>

            {/* Result Section */}
            <div style={resultBoxStyle}>
              <h3 style={{ marginBottom: "10px", color: "#1b3662" }}>
                Your Monthly Cost
              </h3>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1b3662",
                }}
              >
                ${monthlyCost.toFixed(2)}
              </p>
              <p style={{ fontSize: "14px", color: "#1b3662" }}>
                {tabletCount === 0 &&
                (kioskIncluded === "No" || kioskTableCount === 0)
                  ? "Only includes software subscription. POS & KDS Android Tablets to be provided by the restaurant."
                  : `Includes software subscription, ${tabletCount} POS & KDS tablet${
                      tabletCount !== 1 ? "s" : ""
                    }${
                      kioskIncluded === "Yes" && kioskTableCount > 0
                        ? ` and ${kioskTableCount} table kiosk${
                            kioskTableCount !== 1 ? "s" : ""
                          }`
                        : ""
                    }.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#0077b6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0, 119, 182, 0.3)",
  transition: "background-color 0.3s",
};

const buttonContainerStyle = {
  backgroundColor: "#transparent",
  padding: "16px",
  borderRadius: "10px",
  marginTop: "20px",
};

const resultBoxStyle = {
  backgroundColor: "#ffffff",
  color: "#transparent",
  padding: "32px",
  borderRadius: "12px",
  textAlign: "center",
  flex: 1,
  minWidth: "280px",
  alignSelf: "center",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default PricingPage;
