import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import "./UberEatsPrivacyPage.css";
import AppHeader from "./components/AppHeader";

const UberEatsPrivacyPage = () => {
  return (
    <div className="privacy-page">
      <AppHeader />
      <div className="spacer" />

      <section className="features-section">
        <div className="content-wrapper">
          <h2 className="feature-section-title section-title">UberEats Privacy Policy</h2>
          <hr className="section-divider" />
          
          <div className="privacy-content">
            <div className="privacy-section">
              <h3>Information We Collect</h3>
              <p>
                As a POS service provider, SmartTable collects and processes information on behalf of restaurant clients to integrate with UberEats. This includes:
              </p>
              <ul>
                <li>Restaurant account credentials and API access tokens for UberEats integration</li>
                <li>Order data retrieved from UberEats (order details, customer information, payment status)</li>
                <li>Restaurant operational data (menu items, pricing, availability)</li>
                <li>Usage analytics to improve our POS service performance</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>How We Use Your Information</h3>
              <p>
                The information we collect is used exclusively to:
              </p>
              <ul>
                <li>Provide real-time order management and status updates from UberEats</li>
                <li>Display order information within our POS system interface</li>
                <li>Synchronize menu items and availability between restaurant systems and UberEats</li>
                <li>Generate reports and analytics for restaurant management</li>
                <li>Provide technical support and system maintenance</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>Information Sharing</h3>
              <p>
                SmartTable acts as a data processor on behalf of our restaurant clients. We do not sell or share personal information for marketing purposes. Information may be shared with:
              </p>
              <ul>
                <li>Restaurant clients who own the data and for whom we process UberEats orders</li>
                <li>UberEats through authorized API connections to retrieve order data</li>
                <li>Technical service providers who assist in maintaining our POS infrastructure</li>
                <li>Legal authorities when required by law or to protect our rights</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h3>Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="privacy-section">
              <h3>Data Retention</h3>
              <p>
                We retain your information only as long as necessary to provide our services and comply with legal obligations. Order information is typically retained for accounting and customer service purposes.
              </p>
            </div>

            {/* <div className="privacy-section">
              <h3>Your Rights</h3>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div> */}

            <div className="privacy-section">
              <h3>UberEats Integration</h3>
              <p>
                SmartTable integrates with UberEats through authorized API connections to retrieve order data on behalf of restaurant clients. This integration allows restaurants to:
              </p>
              <ul>
                <li>View and manage UberEats orders within the SmartTable POS system</li>
                <li>Track order status and delivery updates in real-time</li>
                <li>Synchronize menu items and pricing across platforms</li>
              </ul>
              <p>
                Restaurant clients maintain ownership of their UberEats data. SmartTable acts solely as a technical service provider to facilitate this integration.
              </p>
            </div>

            <div className="privacy-section">
              <h3>Contact Us</h3>
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="contact-info">
                <p>
                  <Link to="/contact" className="contact-link">
                    Contact Us
                  </Link>
                </p>
              </div>
            </div>

            <div className="privacy-section">
              <h3>Changes to This Policy</h3>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on this page. We encourage you to review this policy periodically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UberEatsPrivacyPage;