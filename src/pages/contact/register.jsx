import React, { useState } from 'react';
import './register.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng ký khóa học:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Đăng Ký Khóa Học</h1>
        <p>
          Điền thông tin của bạn để đăng ký tham gia khóa học. Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
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
              <label>Số Điện Thoại</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="Nhập số điện thoại" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Khóa Học Quan Tâm</label>
              <input 
                type="text" 
                name="course"
                placeholder="Nhập tên khóa học" 
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Lời Nhắn</label>
              <textarea 
                name="message"
                placeholder="Nhập lời nhắn của bạn" 
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-submit">
              <button type="submit" className="btn-send">Gửi Đăng Ký</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;