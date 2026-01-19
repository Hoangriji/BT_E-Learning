import React, { useState } from 'react';
import './register.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng ký:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Đăng Ký Tài Khoản</h1>
        <p>
          Tạo tài khoản để truy cập vào hệ thống học trực tuyến với hàng ngàn khóa học chất lượng cao.
        </p>
      </div>

      <div className="register-card">
        <div className="register-form-section">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label>Họ và Tên</label>
              <input 
                type="text" 
                name="fullName"
                placeholder="Nhập họ và tên" 
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="Nhập email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Mật Khẩu</label>
              <input 
                type="password" 
                name="password"
                placeholder="Nhập mật khẩu" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Xác Nhận Mật Khẩu</label>
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-submit">
              <button type="submit" className="btn-send">Đăng Ký</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;