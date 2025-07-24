import "./ContactPage.css";
import Footer from "./components/Footer";
import AppHeader from "./components/AppHeader";

const ContactPage = () => {
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
            <form
              action="https://formsubmit.co/contact@smarttable.co.nz"
              method="POST"
              className="contact-form"
            >
              <input
                type="hidden"
                name="_autoresponse"
                value="Thank you for contacting Smart Table! We'll get back to you shortly."
              />
              <input
                type="hidden"
                name="_next"
                value="https://smarttable.co.nz/thank-you"
              />
              <input type="text" name="_honey" className="hidden" />

              <label className="form-label">
                Name<span className="required-asterisk"> *</span>
              </label>
              <input type="text" name="name" required className="form-input" />

              <label className="form-label">
                Email<span className="required-asterisk"> *</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="form-input"
              />

              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-input" />

              <label className="form-label">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="form-textarea"
              />

              <div className="button-container">
                <button type="submit" className="submit-button">
                  Submit
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
