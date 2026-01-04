import "./header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        {/* logo */}
        <div className="header-left">
          <div className="logo">
            <img src={logo} alt="E-Learning Logo" />
          </div>
          {/* navigation */}
          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/courses" className="nav-link">Courses</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        {/* btn-login */}
        <div className="header-right">
          <button className="signup-btn">Sign Up</button>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
