import "./homepage.css";
import CardCourse from "../../components/card-course/card-course";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500",
      title: "Web Design Fundamentals",
      description: "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
      duration: "4 Weeks",
      level: "Beginner",
      instructor: "John Smith"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500",
      title: "UI/UX Design",
      description: "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
      duration: "6 Weeks",
      level: "Intermediate",
      instructor: "Emily Johnson"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
      title: "Mobile App Development",
      description: "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-standard tools and frameworks.",
      duration: "8 Weeks",
      level: "Intermediate",
      instructor: "David Brown"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      title: "Graphic Design for Beginners",
      description: "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs.",
      duration: "10 Weeks",
      level: "Beginner",
      instructor: "Sarah Lee"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
      title: "Front-End Web Development",
      description: "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like React to build interactive and responsive websites.",
      duration: "10 Weeks",
      level: "Intermediate",
      instructor: "Michael Chen"
    },
    {
      id: 6,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
      title: "Advanced JavaScript",
      description: "Take your JavaScript skills to the next level. Explore advanced concepts including ES6+, async programming, design patterns, and performance optimization.",
      duration: "6 Weeks",
      level: "Advanced",
      instructor: "Jennifer White"
    }
  ];

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
          <div className="category-card">
            <h3>Web Development</h3>
            <p>Learn to build modern web applications.</p>
          </div>
          <div className="category-card">
            <h3>Data Science</h3>
            <p>Dive into data analysis and machine learning.</p>
          </div>
          <div className="category-card">
            <h3>Graphic Design</h3>
            <p>Master the art of visual communication.</p>
          </div>
          <div className="category-card">
            <h3>Mobile Development</h3>
            <p>Build applications for mobile devices.</p>
          </div>
          <div className="category-card">
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
        <div className="courses-grid">
          {courses.map((course) => (
            <CardCourse
              key={course.id}
              thumbnail={course.thumbnail}
              title={course.title}
              description={course.description}
              duration={course.duration}
              level={course.level}
              instructor={course.instructor}
            />
          ))}
        </div>
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
