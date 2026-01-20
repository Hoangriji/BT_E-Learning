import React, { useEffect, useState } from 'react';
import './signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

function SignUp() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const header = document.querySelector(".header-container");
    const footer = document.querySelector(".footer-container");
    const footer1 = document.querySelector(".footer-bottom");
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
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const terms = formData.get('terms');

    // Kiểm tra dữ liệu nhập vào
    if (!fullName) {
      setError('Full name is required');
      setLoading(false);
      return;
    }
    if (!/^[\p{L}\s]+$/u.test(fullName)) {
      setError('Name cannot contain special characters or numbers');
      setLoading(false);
      return;
    }
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
    if (!terms) {
      setError('You must agree to the terms');
      setLoading(false);
      return;
    }

    try {
      // Đăng ký user và lưu mật khẩu đã mã hóa vào Firestore
      const result = await registerUser({
        fullName,
        email,
        password,
      });

      console.log('Đăng ký thành công:', result);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      
      // Chuyển đến trang đăng nhập
      navigate('/login');
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      setError(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      {/* Cột trái: Testimonials */}
      <div className="left-section">
        <h1>Students Testimonials</h1>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et.
          Cras eu sit dignissim lorem nibh et.
        </p>

        <div className="testimonial-card">
          <p className="quote">
            The web design course provided a solid foundation for me. The instructors were
            knowledgeable and supportive, and the interactive learning environment was engaging.
            I highly recommend it!
          </p>
          <div className="testimonial-footer">
            <div className="user-info">
              <img src="https://via.placeholder.com/40" alt="Sarah L" className="avatar" />
              <span className="name">Sarah L</span>
            </div>
            <button className="read-more">Read More</button>
          </div>
        </div>

        {/* <div className="navigation-buttons">
          <button className="nav-btn">←</button>
          <button className="nav-btn">→</button>
        </div> */}
      </div>

      {/* Cột phải: Sign Up Form */}
      <div className="right-section">
        <div className="form-container">
          <h2>Sign Up</h2>
          <p className="subtitle">Create an account to unlock exclusive features.</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName"
                placeholder="Enter your Name" 
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your Email" 
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter your Password" 
                />
              </div>
            </div>

            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms"
              />
              <label htmlFor="terms">
                I agree with <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" />
            Sign Up with Google
          </button> */}

          <p className="footer-link">
            Already have an account?
            <NavLink to="/login">
              <a href="#"> Login</a>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;