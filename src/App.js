import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "./pages/components/ScrollToTop";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import UberEatsPrivacyPage from "./pages/UberEatsPrivacyPage";
import ThankYouPage from "./pages/ThankYouPage";

const pageFade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: "easeInOut" },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* location + key 중요: 라우트 전환 시 exit 애니메이션 실행 */}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageFade}>
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/pricing"
          element={
            <motion.div {...pageFade}>
              <PricingPage />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div {...pageFade}>
              <ContactPage />
            </motion.div>
          }
        />
        <Route
          path="/thank-you"
          element={
            <motion.div {...pageFade}>
              <ThankYouPage />
            </motion.div>
          }
        />
        <Route
          path="/features*"
          element={
            <motion.div {...pageFade}>
              <FeaturesPage />
            </motion.div>
          }
        />
        <Route
          path="/ubereats-privacy-policy"
          element={
            <motion.div {...pageFade}>
              <UberEatsPrivacyPage />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div {...pageFade}>
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}
