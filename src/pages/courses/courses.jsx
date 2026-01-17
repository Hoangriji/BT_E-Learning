import "./courses.css";
import CourseDetailCard from "../../components/course-detail-card/course-detail-card";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", "Web Development", "Design", "Mobile Development", "Data Science", "Marketing", "Cloud Computing"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const allCourses = [
    {
      id: 1,
      title: "Web Design Fundamentals",
      description: "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
      duration: "4 Weeks",
      level: "Beginner",
      instructor: "John Smith",
      category: "Web Development",
      images: [
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400",
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400",
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400"
      ],
      curriculum: [
        { title: "Introduction to HTML", description: "" },
        { title: "Styling with CSS", description: "" },
        { title: "Introduction to Responsive Design", description: "" },
        { title: "Design Principles for Web", description: "" },
        { title: "Building a Basic Website", description: "" }
      ]
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
      duration: "6 Weeks",
      level: "Intermediate",
      instructor: "Emily Johnson",
      category: "Design",
      images: [
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400",
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400"
      ],
      curriculum: [
        { title: "Introduction to UI/UX", description: "" },
        { title: "User Research Methods", description: "" },
        { title: "Wireframing & Prototyping", description: "" },
        { title: "Visual Design Principles", description: "" },
        { title: "Usability Testing", description: "" }
      ]
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-standard tools and frameworks.",
      duration: "8 Weeks",
      level: "Intermediate",
      instructor: "David Brown",
      category: "Mobile Development",
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400"
      ],
      curriculum: [
        { title: "Mobile Development Basics", description: "" },
        { title: "iOS Development", description: "" },
        { title: "Android Development", description: "" },
        { title: "Cross-Platform Solutions", description: "" },
        { title: "App Publishing", description: "" }
      ]
    },
    {
      id: 4,
      title: "Graphic Design for Beginners",
      description: "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs.",
      duration: "10 Weeks",
      level: "Beginner",
      instructor: "Sarah Lee",
      category: "Design",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400",
        "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400"
      ],
      curriculum: [
        { title: "Design Fundamentals", description: "" },
        { title: "Typography Basics", description: "" },
        { title: "Color Theory", description: "" },
        { title: "Layout & Composition", description: "" },
        { title: "Image Editing", description: "" }
      ]
    },
    {
      id: 5,
      title: "Front-End Web Development",
      description: "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like React to build interactive and responsive websites.",
      duration: "10 Weeks",
      level: "Intermediate",
      instructor: "Michael Chen",
      category: "Web Development",
      images: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
        "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400"
      ],
      curriculum: [
        { title: "HTML & CSS Advanced", description: "" },
        { title: "JavaScript Fundamentals", description: "" },
        { title: "React Framework", description: "" },
        { title: "State Management", description: "" },
        { title: "Building Projects", description: "" }
      ]
    },
    {
      id: 6,
      title: "Advanced JavaScript",
      description: "Take your JavaScript skills to the next level. Explore advanced concepts including ES6+, async programming, design patterns, and performance optimization.",
      duration: "6 Weeks",
      level: "Advanced",
      instructor: "Jennifer White",
      category: "Web Development",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
        "https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=400"
      ],
      curriculum: [
        { title: "ES6+ Features", description: "" },
        { title: "Async Programming", description: "" },
        { title: "Design Patterns", description: "" },
        { title: "Performance Optimization", description: "" },
        { title: "Testing & Debugging", description: "" }
      ]
    }
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="courses-page">
      <section className="courses-hero">
        <h1>Explore Our Courses</h1>
        <p>Discover a wide range of courses designed to help you achieve your learning goals.</p>
      </section>

      <section className="courses-main">
        <div className="courses-filters">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <div className="filter-item">
              <label>
                <FontAwesomeIcon icon={faFilter} /> Category
              </label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label>
                <FontAwesomeIcon icon={faFilter} /> Level
              </label>
              <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="filter-select"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="courses-results">
          <div className="results-header">
            <h2>All Courses</h2>
            <p className="results-count">
              Showing {filteredCourses.length} of {allCourses.length} courses
            </p>
          </div>

          <div className="courses-list-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseDetailCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  duration={course.duration}
                  level={course.level}
                  instructor={course.instructor}
                  images={course.images}
                  curriculum={course.curriculum}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>No courses found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
