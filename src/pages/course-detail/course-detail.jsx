import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../services/courseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSignal, faUsers, faGraduationCap, faTimes } from '@fortawesome/free-solid-svg-icons';
import { saveCourseRegistration } from '../../services/courseService';
import './course-detail.css';

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const courseData = await getCourseById(courseId);
      setCourse(courseData);
      setLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await saveCourseRegistration({
        ...formData,
        courseId: course.id,
        courseTitle: course.title,
        timestamp: new Date()
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="error-container">
        <h2>Course not found</h2>
        <p>The course you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      {/* Hero Section */}
      <div className="course-hero">
        <div className="course-hero-content">
          <div className="course-hero-text">
            <h1>{course.title}</h1>
            <p className="course-hero-description">{course.description}</p>
            <div className="course-meta-info">
              <span><FontAwesomeIcon icon={faClock} /> {course.duration}</span>
              <span><FontAwesomeIcon icon={faSignal} /> {course.level}</span>
              <span><FontAwesomeIcon icon={faUsers} /> {course.students || '0'} students</span>
              <span><FontAwesomeIcon icon={faGraduationCap} /> By {course.instructor}</span>
            </div>
            <button className="btn-enroll-now" onClick={() => setShowModal(true)}>
              Enroll Now
            </button>
          </div>
          <div className="course-hero-image">
            <img src={course.thumbnail} alt={course.title} />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="course-content-wrapper">
        <div className="course-content">
          {/* Section 01 */}
          <div className="course-section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h2>Introduction to {course.category || 'UI/UX'} Design</h2>
            </div>
            <div className="section-lessons">
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Understanding {course.category || 'UI/UX'} Design Principles</h4>
                  <p>Lesson 01</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> {course.lessonDuration || '45 Minutes'}</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Importance of User-Centered Design</h4>
                  <p>Lesson 02</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>The Role of {course.category || 'UI/UX'} Design in Product Development</h4>
                  <p>Lesson 03</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> {course.lessonDuration || '45 Minutes'}</span>
              </div>
            </div>
          </div>

          {/* Section 02 */}
          <div className="course-section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h2>User Research and Analysis</h2>
            </div>
            <div className="section-lessons">
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Conducting User Research and Interviews</h4>
                  <p>Lesson 01</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Analyzing User Needs and Behaviors</h4>
                  <p>Lesson 02</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Creating User Personas and Scenarios</h4>
                  <p>Lesson 03</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> {course.lessonDuration || '45 Minutes'}</span>
              </div>
            </div>
          </div>

          {/* Section 03 */}
          <div className="course-section">
            <div className="section-header">
              <span className="section-number">03</span>
              <h2>Wireframing and Prototyping</h2>
            </div>
            <div className="section-lessons">
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Introduction to Wireframing Tools and Techniques</h4>
                  <p>Lesson 01</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Creating Low-Fidelity Wireframes</h4>
                  <p>Lesson 02</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Prototyping and Interactive Mockups</h4>
                  <p>Lesson 03</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> {course.lessonDuration || '45 Minutes'}</span>
              </div>
            </div>
          </div>

          {/* Section 04 */}
          <div className="course-section">
            <div className="section-header">
              <span className="section-number">04</span>
              <h2>Visual Design and Branding</h2>
            </div>
            <div className="section-lessons">
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Color Theory and Typography in UI Design</h4>
                  <p>Lesson 01</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Visual Hierarchy and Layout Design</h4>
                  <p>Lesson 02</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Creating a Strong Brand Identity</h4>
                  <p>Lesson 03</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> {course.lessonDuration || '45 Minutes'}</span>
              </div>
            </div>
          </div>

          {/* Section 05 */}
          <div className="course-section">
            <div className="section-header">
              <span className="section-number">05</span>
              <h2>Usability Testing and Iteration</h2>
            </div>
            <div className="section-lessons">
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Usability Testing Methods and Techniques</h4>
                  <p>Lesson 01</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> 1 Hour</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Analyzing Usability Test Results</h4>
                  <p>Lesson 02</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> {course.lessonDuration || '45 Minutes'}</span>
              </div>
              <div className="lesson-item">
                <div className="lesson-info">
                  <h4>Iterating and Improving UI Designs</h4>
                  <p>Lesson 03</p>
                </div>
                <span className="lesson-duration"><FontAwesomeIcon icon={faClock} /> {course.lessonDuration || '45 Minutes'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <div className="modal-header">
              <h2>Enroll in {course.title}</h2>
              <p>Fill in your information to register for this course</p>
            </div>

            {submitSuccess ? (
              <div className="success-message">
                <h3>✓ Registration Successful!</h3>
                <p>We'll contact you soon.</p>
              </div>
            ) : (
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea 
                    name="message"
                    placeholder="Any questions or special requirements?" 
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
