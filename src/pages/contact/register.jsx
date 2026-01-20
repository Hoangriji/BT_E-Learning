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
    console.log('Course registration:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Course Registration</h1>
        <p>
          Fill in your information to register for the course. We will contact you as soon as possible.
        </p>
      </div>

      <div className="register-card">
        <div className="register-form-section">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName"
                placeholder="Enter your full name" 
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
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Course of Interest</label>
              <input 
                type="text" 
                name="course"
                placeholder="Enter course name" 
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Message</label>
              <textarea 
                name="message"
                placeholder="Enter your message" 
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-submit">
              <button type="submit" className="btn-send">Submit Registration</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;