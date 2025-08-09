import "./ContactPage.css";
import Footer from "./components/Footer";
import AppHeader from "./components/AppHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop the normal redirect
    setLoading(true);

    // Copy email input into _replyto before sending
    const emailValue = event.target.email.value;
    event.target._replyto.value = emailValue;

    const formData = new FormData(event.target);

    try {
      await fetch("https://formsubmit.co/contact@smarttable.co.nz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      // ✅ Go straight to Thank You page without ugly URL
      navigate("/thank-you");
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <AppHeader />

      <section className="contact-section">
        <div className="content-wrapper contact-page-content-wrapper">
          {/* Left Side */}
          <div className="contact-left">
            <p className="contact-subtitle">Contact Us</p>
            <h1 className="contact-title">How can we help?</h1>
            <p className="contact-description">
              Let's kick-start the conversation and discuss your path to
              transformative growth.
            </p>
          </div>

          {/* Right Side (Form) */}
          <div className="contact-right">
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Hidden fields */}
              <input
                type="hidden"
                name="_autoresponse"
                value="Thank you for contacting Smart Table! We'll get back to you shortly."
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_honey" />
              <input type="hidden" name="_replyto" id="hidden-replyto" />

              <label className="form-label">
                Name<span className="required-asterisk"> *</span>
              </label>
              <input type="text" name="name" required className="form-input" />

              <label className="form-label">
                Email<span className="required-asterisk"> *</span>
              </label>
              {/* ✅ Keep as "email" so it shows in your inbox */}
              <input
                type="email"
                name="email"
                required
                className="form-input"
              />

              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-input" />

              <label className="form-label">
                Message<span className="required-asterisk"> *</span>
              </label>
              <textarea
                name="message"
                rows="4"
                required
                className="form-textarea"
              />

              <div className="button-container">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                <button type="reset" className="reset-button">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
