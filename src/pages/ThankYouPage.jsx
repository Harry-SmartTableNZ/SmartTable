import "./ThankYouPage.css";
import Footer from "./components/Footer";
import AppHeader from "./components/AppHeader";
import { useEffect } from "react";

const ThankYouPage = () => {
  useEffect(() => {
    // Remove query string immediately after page loads
    if (window.location.search) {
      window.history.replaceState({}, document.title, "/thank-you");
    }
  }, []);

  return (
    <div className="thankyou-page">
      <AppHeader />

      <section className="thankyou-section">
        <div className="content-wrapper thankyou-content-wrapper">
          <h1 className="thankyou-title">Thank You!</h1>
          <p className="thankyou-message">
            Your message has been successfully sent. <br />
            We appreciate you reaching out to Smart Table and will get back to
            you as soon as possible.
          </p>

          <a href="/" className="thankyou-button">
            Back to Home
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
