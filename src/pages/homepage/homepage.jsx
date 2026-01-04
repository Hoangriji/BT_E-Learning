import React from "react";
import "./homepage.css";

const Home = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-section-top">
          <h1>
            Welcome to <b>E-Learning Platform</b>
          </h1>
          <p>Your journey to knowledge starts here.</p>
          <button className="cta-button">Get Started</button>
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
    </div>
  );
};

export default Home;
