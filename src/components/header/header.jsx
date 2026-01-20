import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.webp";
import defaultAvatar from "../../assets/imgs/defaultAvatar.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser, logout } from "../../services/authService";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Lưu thông tin user
  const [hasToken, setHasToken] = useState(false); // Check có token không (sync)
  const [showPopup, setShowPopup] = useState(false); // Hiển thị popup đăng xuất
  const navigate = useNavigate();

  // Kiểm tra user đã đăng nhập chưa
  useEffect(() => {
    // Bước 1: Check có token không (sync) -> ẩn nút đăng ký/đăng nhập ngay
    const token = localStorage.getItem('auth_token');
    if (token) {
      setHasToken(true); // Có token -> ẩn nút đăng ký/đăng nhập
    }

    // Bước 2: Check token còn sống không (async)
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        // Token còn sống -> hiện avatar
        setUser(currentUser);
      } else if (token) {
        // Token chết -> xóa và chuyển về login
        localStorage.removeItem('auth_token');
        setHasToken(false);
        navigate('/login');
      }
    };
    
    if (token) {
      checkUser();
    }
  }, [navigate]);

  // Đóng popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPopup && !event.target.closest('.user-avatar-container')) {
        setShowPopup(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPopup]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Xử lý click avatar
  const handleAvatarClick = () => {
    setShowPopup(!showPopup);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout(); // Xoá token
    setUser(null);
    setShowPopup(false);
    navigate('/login'); // Quay về trang login
  };

  return (
    <header>
      <div className="header-container">
        {/* logo and navigation */}
        <div className="header-left">
          <NavLink to="/" className="logo">
            <img src={logo} alt="E-Learning Logo" />
          </NavLink>

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
            {user ? (
              // Avatar cho mobile nếu token còn sống
              <div className="user-avatar-container mobile">
                <img 
                  src={defaultAvatar} 
                  alt="User Avatar" 
                  className="user-avatar"
                  onClick={handleAvatarClick}
                />
                {showPopup && (
                  <div className="logout-popup">
                    <p className="user-name">{user.fullName}</p>
                    <button className="logout-btn" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : hasToken ? (
              // Có token nhưng đang check
              <div className="loading-avatar"></div>
            ) : (
              // Không có token -> hiện nút đăng ký/đăng nhập
              <>
                <NavLink to="/sign-up">
                  <button className="signup-btn" onClick={closeMenu}>Sign Up</button>
                </NavLink>
                <NavLink to="/login">
                  <button className="login-btn" onClick={closeMenu}>Login</button>
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* btn-login desktop hoặc avatar */}
        <div className="header-right">
          {user ? (
            // Hiển thị avatar nếu đã đăng nhập và token còn sống
            <div className="user-avatar-container">
              <img 
                src={defaultAvatar} 
                alt="User Avatar" 
                className="user-avatar"
                onClick={handleAvatarClick}
              />
              {/* Popup đăng xuất */}
              {showPopup && (
                <div className="logout-popup">
                  <p className="user-name">{user.fullName}</p>
                  <button className="logout-btn" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : hasToken ? (
            // Có token nhưng đang check -> hiện loading hoặc không hiện gì
            <div className="loading-avatar"></div>
          ) : (
            // Không có token -> hiển thị nút đăng nhập/đăng ký
            <>
              <NavLink to="/sign-up">
                <button className="signup-btn">Sign Up</button>
              </NavLink>
              <NavLink to="/login">
                <button className="login-btn">Login</button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
