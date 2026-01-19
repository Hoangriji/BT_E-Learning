import "./footer.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt,  } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <NavLink to="/">
            <img src={logo} alt="E-Learning Logo" className="footer-logo" />
          </NavLink>
          <div className="footer-left-contacts">
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> contact@elearning.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +1 234 567 890
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> 123 E-Learning St,
              Knowledge City
            </p>
          </div>
        </div>
        <div className="footer-right">
          <nav className="footer-nav">
            <h3>Navigation</h3>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <NavLink to="/" className="footer-nav-link">
                  Home
                </NavLink>
              </li>
              <li className="footer-nav-item">
                <NavLink to="/courses" className="footer-nav-link">
                  Courses
                </NavLink>
              </li>
              <li className="footer-nav-item">
                <NavLink to="/contact" className="footer-nav-link">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="footer-right-social">
            <h3>Social Profiles</h3>
            <div className="social-links-wrapper">
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;