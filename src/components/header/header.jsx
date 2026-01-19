import "./header.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="header-container">
        {/* logo and navigation */}
        <div className="header-left">
          <div className="logo">
            <img src={logo} alt="E-Learning Logo" />
          </div>

          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/courses" className="nav-link">Courses</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">Register</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* hamburger button */}
        <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        {/* mobile menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <NavLink to="/" className="mobile-nav-link" onClick={closeMenu}>Home</NavLink>
              </li>
              <li className="mobile-nav-item">
                <NavLink to="/courses" className="mobile-nav-link" onClick={closeMenu}>Courses</NavLink>
              </li>
              <li className="mobile-nav-item">
                <NavLink to="/register" className="mobile-nav-link" onClick={closeMenu}>Register</NavLink>
              </li>
            </ul>
          </nav>

          <div className="mobile-buttons">
            <NavLink to="/sign-up">
              <button className="signup-btn" onClick={closeMenu}>Sign Up</button>
            </NavLink>
            <NavLink to="/login">
              <button className="login-btn" onClick={closeMenu}>Login</button>
            </NavLink>
          </div>
        </div>

        {/* btn-login desktop */}
        <div className="header-right">
          <NavLink to="/sign-up">
            <button className="signup-btn">Sign Up</button>
          </NavLink>
          <NavLink to="/login">
            <button className="login-btn">Login</button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
