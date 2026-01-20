import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../services/authService';

function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const header = document.querySelector(".header-container");
    const footer = document.querySelector(".footer-container");
    const footer1 = document.querySelector("footer");
    // if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    if (footer1) footer1.style.display = "none";
    return () => {
      // if (header) header.style.display = "";
      if (footer) footer.style.display = "";
      if (footer1) footer1.style.display = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Lấy dữ liệu từ form
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Kiểm tra dữ liệu nhập vào
    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Đăng nhập: giải mã password từ Firestore và so sánh
      // Sau đó tạo token đã mã hóa và lưu vào localStorage
      const result = await loginUser(email, password);

      console.log('Đăng nhập thành công:', result);
      alert(`Chào mừng trở lại, ${result.fullName}!`);
      
      // Chuyển đến trang chủ
      navigate('/');
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      setError(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="content-wrapper">

        {/* Phần bên trái: Testimonials */}
        <div className="testimonial-section">
          <h1>Students Testimonials</h1>
          <p className="intro-text">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et.
            Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
          </p>

          <div className="testimonial-box">
            <p className="testimonial-text">
              The web design course provided a solid foundation for me. The instructors were
              knowledgeable and supportive, and the interactive learning environment was engaging.
              I highly recommend it!
            </p>
            <div className="testimonial-user">
              <div className="user-profile">
                <img src="https://via.placeholder.com/40" alt="Sarah L" />
                <span className="user-name">Sarah L</span>
              </div>
              <button className="btn-read-more">Read More</button>
            </div>
          </div>
{/* 
          <div className="slider-controls">
            <button className="slider-btn">←</button>
            <button className="slider-btn">→</button>
          </div> */}
        </div>

        {/* Phần bên phải: Login Form */}
        <div className="form-section">
          <div className="login-card">
            <h2>Login</h2>
            <p className="welcome-msg">Welcome back! Please log in to access your account.</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="input-field">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your Email" 
                />
              </div>

              <div className="input-field">
                <label>Password</label>
                <div className="password-input-container">
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Enter your Password" 
                  />
                </div>
                <div className="forgot-password-link">
                  <a href="#">Forgot Password?</a>
                </div>
              </div>

              <div className="remember-me-container">
                <input 
                  type="checkbox" 
                  id="remember" 
                  name="remember"
                />
                <label htmlFor="remember">Remember Me</label>
              </div>

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* <div className="separator">
              <span>OR</span>
            </div>

            <button className="btn-google">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" />
              Login with Google
            </button> */}

            <p className="signup-prompt">
              Don't have an account?
              <NavLink to="/sign-up">
                <a href="#"> Sign Up</a>
              </NavLink>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;