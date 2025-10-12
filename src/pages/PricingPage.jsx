import { useState } from "react";
import Footer from "./components/Footer";
import "./PricingPage.css";
import AppHeader from "./components/AppHeader";

/* ====== 월 비용 계산기 ====== */
function PricingCalculator() {
  // ---- 가격 상수 ----
  const PLAN_PRICE = { standard: 50, premium: 150 };
  const RENTAL_TABLET_PRICE = 50;

  const ADDON_PRICES = {
    kds: 30,
    selfKiosk: 180,
    tableKiosk: 40,
    portableTablet: 25,
    serviceDisplay: 30,
    pickupServiceDisplay: 30,
    customerFacingDisplay: 30,
    digitalMenuDisplay: 30,
  };

  const ADDON_MAX_QTY = {
    kds: 5,
    selfKiosk: 5,
    tableKiosk: 50,
    portableTablet: 20,
    serviceDisplay: 5,
    pickupServiceDisplay: 5,
    customerFacingDisplay: 5,
    digitalMenuDisplay: 5,
  };

  const addonList = [
    { key: "kds", label: "Kitchen Display System" },
    { key: "selfKiosk", label: "Self Ordering Kiosk" },
    { key: "tableKiosk", label: "Table Order Kiosk" },
    { key: "portableTablet", label: "Portable Tablet" },
    { key: "serviceDisplay", label: "Service Display" },
    { key: "pickupServiceDisplay", label: "Pickup & Service Display" },
    { key: "customerFacingDisplay", label: "Customer Facing Display" },
    { key: "digitalMenuDisplay", label: "Digital Menu Display" },
  ];

  // ---- UI 상태 ----
  const [plan, setPlan] = useState("standard");
  const [rentHardware, setRentHardware] = useState("no");
  const [tabletCount, setTabletCount] = useState(1);

  const [addonsQuestion, setAddonsQuestion] = useState("no");
  const [addons, setAddons] = useState({
    kds: { enabled: false, qty: 1 },
    selfKiosk: { enabled: false, qty: 1 },
    tableKiosk: { enabled: false, qty: 1 },
    portableTablet: { enabled: false, qty: 1 },
    serviceDisplay: { enabled: false, qty: 1 },
    pickupServiceDisplay: { enabled: false, qty: 1 },
    customerFacingDisplay: { enabled: false, qty: 1 },
    digitalMenuDisplay: { enabled: false, qty: 1 },
  });

  // ---- 합계 계산 ----
  let total = PLAN_PRICE[plan];
  if (rentHardware === "yes") total += RENTAL_TABLET_PRICE * tabletCount;
  if (addonsQuestion === "yes") {
    for (const k of Object.keys(addons)) {
      const { enabled, qty } = addons[k];
      if (enabled && qty > 0) total += (ADDON_PRICES[k] || 0) * qty;
    }
  }

  // 하드웨어 포함 안내
  const isIncludingHardware = (key) =>
    key === "selfKiosk" || key === "tableKiosk" || key === "portableTablet";

  return (
    <div className="calc-grid">
      {/* LEFT: inputs */}
      <div
        className="calc-card calc-left"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: 12,
          padding: 20,
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Plan */}
        <div className="form-row">
          <label htmlFor="plan">Select Your Features</label>
          <select
            id="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="form-select"
          >
            <option value="standard">Standard ($50 / month)</option>
            <option value="premium">Premium ($150 / month)</option>
          </select>
        </div>

        {/* Hardware rental */}
        <div className="form-row">
          <label htmlFor="rentHw">
            Do you want to rent POS/KDS tablets from Smart Table?
          </label>
          <select
            id="rentHw"
            value={rentHardware}
            onChange={(e) => setRentHardware(e.target.value)}
            className="form-select"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Tablet count (only when yes) */}
        {rentHardware === "yes" && (
          <div className="form-row">
            <label htmlFor="tabletCount">Number of Tablets</label>
            <select
              id="tabletCount"
              value={tabletCount}
              onChange={(e) => setTabletCount(Number(e.target.value))}
              className="form-select"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Add-ons master yes/no */}
        <div className="form-row">
          <label htmlFor="addonsYesNo">
            Would you like any Optional Add-Ons?
          </label>
          <select
            id="addonsYesNo"
            value={addonsQuestion}
            onChange={(e) => setAddonsQuestion(e.target.value)}
            className="form-select"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Add-ons list */}
        {addonsQuestion === "yes" && (
          <div className="addons-wrap">
            {addonList.map((a) => {
              const state = addons[a.key];
              const maxQty = ADDON_MAX_QTY[a.key] || 20;
              return (
                <div key={a.key} className="addon-row">
                  <input
                    type="checkbox"
                    id={`chk-${a.key}`}
                    checked={state.enabled}
                    onChange={(e) =>
                      setAddons((prev) => ({
                        ...prev,
                        [a.key]: { ...prev[a.key], enabled: e.target.checked },
                      }))
                    }
                  />
                  <label htmlFor={`chk-${a.key}`} className="addon-label">
                    {a.label}
                    <span className="addon-price">
                      (${ADDON_PRICES[a.key]}/month each
                      {isIncludingHardware(a.key) ? ", Including hardware" : ""}
                      )
                    </span>
                  </label>

                  <select
                    disabled={!state.enabled}
                    value={state.qty}
                    onChange={(e) =>
                      setAddons((prev) => ({
                        ...prev,
                        [a.key]: {
                          ...prev[a.key],
                          qty: Number(e.target.value),
                        },
                      }))
                    }
                    className="form-select addon-qty"
                    aria-label={`${a.label} quantity`}
                  >
                    {Array.from({ length: maxQty }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      )
                    )}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT: result */}
      <div className="calc-right">
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Your Monthly Cost</h3>
        <div className="calc-total">
          ${total.toFixed(2)} <span className="calc-gst-tag">+ GST</span>
        </div>
        <hr
          style={{
            border: 0,
            height: 1,
            background: "#e8e8ef",
            margin: "12px 0 16px",
          }}
        />
        <div className="calc-breakdown">
          <div>
            Plan:{" "}
            <strong style={{ textTransform: "capitalize" }}>{plan}</strong> ($
            {PLAN_PRICE[plan]}/month)
          </div>
          <div>
            Hardware Rental:{" "}
            <strong>{rentHardware === "yes" ? "Yes" : "No"}</strong>
            {rentHardware === "yes" &&
              ` — ${tabletCount} tablet${
                tabletCount > 1 ? "s" : ""
              } @ $${RENTAL_TABLET_PRICE}`}
          </div>

          {addonsQuestion === "yes" && (
            <>
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Optional Add-Ons:
              </div>
              <ul style={{ margin: "8px 0 0 18px", padding: 0 }}>
                {addonList
                  .filter((a) => addons[a.key].enabled)
                  .map((a) => (
                    <li key={`sum-${a.key}`}>
                      {a.label} — {addons[a.key].qty} × ${ADDON_PRICES[a.key]}
                      {isIncludingHardware(a.key)
                        ? " (Including hardware)"
                        : ""}
                    </li>
                  ))}
                {addonList.every((a) => !addons[a.key].enabled) && (
                  <li>None selected</li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const PricingPage = () => {
  const pricingOptions = [
    {
      title: "Smart Table Software — Standard Features",
      price: "$50 / month",
      blurb:
        "Everything you need to run daily operations with speed and control.",
      color: "#00bcd4",
      features: [
        "Point of Sales (POS)",
        "Table Management",
        "Menu Management",
        "Sales & Analytics",
        "Order Records",
        "Staff Access Control",
        "Multiple Payment Types",
      ],
    },
    {
      title: "Smart Table Software — Premium Features",
      price: "$150 / month",
      blurb:
        "Advanced tools to grow online sales and streamline complex workflows.",
      color: "#e35484ff",
      features: [
        "Online Ordering",
        "Online Reservation",
        "Loyalty Program",
        "Custom Discount",
        "Uber Eats Integration",
        "Staff Timesheets",
        "Inventory Management",
      ],
    },
  ];

  return (
    <div className="pricing-page">
      <AppHeader />
      <div className="spacer" />

      {/* Plans */}
      <section className="features-section">
        <div className="content-wrapper">
          <h2 className="feature-section-title section-title">Pricing Plans</h2>
          <hr className="section-divider" />
          <div className="feature-card-grid">
            {pricingOptions.map((option) => (
              <div
                key={option.title}
                className="plan-card"
                style={{ borderColor: option.color }}
              >
                {option.badge && (
                  <span className="plan-badge">{option.badge}</span>
                )}
                <h3 className="plan-title" style={{ color: option.color }}>
                  {option.title}
                </h3>
                <p className="plan-price">{option.price}</p>
                {option.blurb && <p className="plan-blurb">{option.blurb}</p>}
                {option.features?.length > 0 && (
                  <>
                    <hr className="plan-divider" />
                    <ul className="feature-list">
                      {option.features.map((feat) => (
                        <li key={feat} className="feature-item">
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimate */}
      <section className="features-section">
        <div className="content-wrapper">
          <h2 className="feature-section-title section-title">
            Estimate Your Monthly Cost
          </h2>
          <hr className="section-divider" />
          <PricingCalculator />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
