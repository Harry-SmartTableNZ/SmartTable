import "./ContactPage.css";
import Footer from "./components/Footer";
import AppHeader from "./components/AppHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 리다이렉트 방지
    setLoading(true);

    // 구글 리캡차 검증 요구
    if (!recaptchaToken) {
      alert("Please verify that you are not a robot.");
      setLoading(false);
      return;
    }

    const formData = new FormData(event.target);

    // Web3Forms 전송용 객체 생성 (FormData를 JSON 객체로 변환)
    const object = Object.fromEntries(formData);

    // 리캡차 토큰 추가
    object["g-recaptcha-response"] = recaptchaToken;

    const body = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: body,
      });

      const res = await response.json();

      if (response.ok && res.success) {
        navigate("/thank-you");
      } else {
        throw new Error(res.message || "Submission failed on the server.");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      // 리캡차 토큰 초기화 (재인증 필요하게 만듦)
      setRecaptchaToken("");
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
              {/* Web3Forms 전송에 필요한 히든 필드들 */}
              <input
                type="hidden"
                name="access_key"
                value="8291d6f9-6561-4655-bb8e-894d91a34d16"
              />
              <input
                type="hidden"
                name="subject"
                value="New Submission from Smart Table Contact Form"
              />
              <input
                type="hidden"
                name="from_name"
                value="Smart Table - Contact Page"
              />
              <input
                type="hidden"
                name="botcheck"
                style={{ display: "none" }}
              />

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

              <label className="form-label">
                Message<span className="required-asterisk"> *</span>
              </label>
              <textarea
                name="message"
                rows="4"
                required
                className="form-textarea"
              />

              {/* reCAPTCHA */}
              <div style={{ margin: "12px 0 16px" }}>
                <ReCAPTCHA
                  sitekey="6LcBe4IrAAAAAHILeyKl2MWyYBfCbHTFy31y6DXn"
                  onChange={(token) => setRecaptchaToken(token || "")}
                  onExpired={() => setRecaptchaToken("")}
                />
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading || !recaptchaToken}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                <button
                  type="reset"
                  className="reset-button"
                  onClick={() => {
                    setRecaptchaToken("");
                    // 리캡차 UI도 초기화하고 싶다면 별도의 ref를 사용해야 합니다.
                  }}
                >
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
