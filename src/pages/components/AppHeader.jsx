import logo from "../../assets/images/DarkLogo.png";
import ResponsiveNav from "./ResponsiveNav";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-box">
        <nav>
          <div className="app-header-logo">
            <img src={logo} alt="Smart Table Logo" />
          </div>
          <ResponsiveNav />
        </nav>
      </div>
    </header>
  );
}
