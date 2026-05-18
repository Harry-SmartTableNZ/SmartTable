import "./ContactPage.css";
import Footer from "./components/Footer";
import AppHeader from "./components/AppHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 리다이렉트 방지
    setLoading(true);

    const formData = new FormData(event.target);

    // 스팸 봇 필터링 (botcheck 필드에 값이 차 있으면 봇으로 판단하고 차단)
    if (formData.get("botcheck")) {
      setLoading(false);
      return;
    }

    // Web3Forms 전송용 객체 생성
    const object = Object.fromEntries(formData);
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
        // 성공 시 리액트 라우터로 thank-you 페이지 이동
        navigate("/thank-you");
      } else {
        alert(`Error: ${res.message || "Submission failed"}`);
      }
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
              {/* 스팸 봇을 낚기 위한 보이지 않는 허니팟 필드 */}
              <input type="text" name="botcheck" style={{ display: "none" }} />

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

              <div className="button-container" style={{ marginTop: "20px" }}>
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
