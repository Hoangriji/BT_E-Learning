import "./courses.css";
import CourseDetailCard from "../../components/course-detail-card/course-detail-card";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { getAllCourses } from "../../services/courseService";

const Courses = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || "All";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Web Development", "Data Science", "Graphic Design", "Mobile Development", "Game Development"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const data = await getAllCourses();
      setAllCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

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
          </div>

          {loading ? (
            <div className="loading-message">Loading courses...</div>
          ) : (
            <div className="courses-list-grid">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseDetailCard
                    key={course.id}
                    id={course.id}
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
