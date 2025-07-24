import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Generate static glow spots
const glowSpots = Array.from({ length: 5 }).map((_, i) => {
  const top = Math.floor(Math.random() * 90); // percentage
  const left = Math.floor(Math.random() * 90);
  const size = 200 + Math.floor(Math.random() * 200); // 200–400px
  return (
    <div
      key={i}
      className="glow-spot"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {glowSpots}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);

reportWebVitals();
