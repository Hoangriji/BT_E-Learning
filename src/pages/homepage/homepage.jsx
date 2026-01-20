import "./homepage.css";
import CardCourse from "../../components/card-course/card-course";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../services/courseService";

const Home = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const data = await getAllCourses();
      setCourses(data.slice(0, 6));
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const faqs = [
    {
      id: 1,
      question: "How do I enroll in a course?",
      answer: "Simply click on the 'Enroll Now' button on any course card, create an account or log in, and complete the payment process. You'll get instant access to all course materials."
    },
    {
      id: 2,
      question: "Can I access courses on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers."
    },
    {
      id: 3,
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with a course, you can request a full refund within 30 days of purchase."
    },
    {
      id: 4,
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, you'll receive a certificate of completion for each course you finish. The certificate can be shared on LinkedIn and added to your resume."
    },
    {
      id: 5,
      question: "How long do I have access to a course?",
      answer: "Once you enroll in a course, you have lifetime access to all course materials, including future updates and additions."
    },
    {
      id: 6,
      question: "Are there any prerequisites for the courses?",
      answer: "Prerequisites vary by course. Each course page clearly lists any required knowledge or skills. Most beginner courses have no prerequisites."
    }
  ];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const handleCategoryClick = (category) => {
    navigate('/courses', { state: { selectedCategory: category } });
  };

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-section-top">
          <h1>
            Welcome to <b>E-Learning Platform</b>
          </h1>
          <p>Your journey to knowledge starts here.</p>
          <button className="cta-button" onClick={() => navigate('/courses')}>Get Started</button>
        </div>

        <div className="hero-section-categories">
          <div className="category-card" onClick={() => handleCategoryClick('Web Development')}>
            <h3>Web Development</h3>
            <p>Learn to build modern web applications.</p>
          </div>
          <div className="category-card" onClick={() => handleCategoryClick('Data Science')}>
            <h3>Data Science</h3>
            <p>Dive into data analysis and machine learning.</p>
          </div>
          <div className="category-card" onClick={() => handleCategoryClick('Graphic Design')}>
            <h3>Graphic Design</h3>
            <p>Master the art of visual communication.</p>
          </div>
          <div className="category-card" onClick={() => handleCategoryClick('Mobile Development')}>
            <h3>Mobile Development</h3>
            <p>Build applications for mobile devices.</p>
          </div>
          <div className="category-card" onClick={() => handleCategoryClick('Game Development')}>
            <h3>Game Development</h3>
            <p>Create immersive gaming experiences.</p>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <h2>Benefits</h2>
        <p>Discover the advantages of learning with us.</p>
        <div className="benefits-cards">
          <div className="benefits-card">
            <h3>Expert Instructors</h3>
            <p>
              Learn from industry experts who are passionate about teaching.
            </p>
          </div>
          <div className="benefits-card">
            <h3>Flexible Learning</h3>
            <p>Access courses anytime, anywhere, and learn at your own pace.</p>
          </div>
          <div className="benefits-card">
            <h3>Community Support</h3>
            <p>
              Join a vibrant community of learners and get support when you need
              it.
            </p>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <h2>Our Popular Courses</h2>
        <p>Explore our most popular courses and start learning today.</p>
        {loading ? (
          <div className="loading-message">Loading courses...</div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <CardCourse
                key={course.id}
                id={course.id}
                thumbnail={course.thumbnail}
                title={course.title}
                description={course.description}
                duration={course.duration}
                level={course.level}
                instructor={course.instructor}
              />
            ))}
          </div>
        )}
        <div className="courses-cta">
          <button className="view-all-button" onClick={() => navigate('/courses')}>View All Courses</button>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about our platform.</p>
        <div className="faq-container">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${activeQuestion === faq.id ? 'active' : ''}`}
              onClick={() => toggleQuestion(faq.id)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">{activeQuestion === faq.id ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${activeQuestion === faq.id ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
