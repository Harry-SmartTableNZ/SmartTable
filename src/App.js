import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./pages/components/ScrollToTop";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import UberEatsPrivacyPage from "./pages/UberEatsPrivacyPage";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/Features*" element={<FeaturesPage />} />
        <Route
          path="/ubereats-privacy-policy"
          element={<UberEatsPrivacyPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
