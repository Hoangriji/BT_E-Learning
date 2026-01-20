import "./card-course.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faSignal, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const CardCourse = ({ id, thumbnail, title, description, duration, level, instructor }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (id) {
      navigate(`/courses/${id}`);
    }
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    if (id) {
      navigate(`/courses/${id}`);
    }
  };

  return (
    <div className="card-course" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className="course-thumbnail-wrapper">
            <img src={thumbnail || "https://via.placeholder.com/350x200"} alt={title} className="course-thumbnail" />
        </div>
        <div className="course-details">
            <div className="course-meta">
                <span className="course-duration">
                    <FontAwesomeIcon icon={faClock} /> {duration}
                </span>
                <span className="course-level">
                    <FontAwesomeIcon icon={faSignal} /> {level}
                </span>
            </div>
            <h3 className="course-title">{title}</h3>
            <p className="course-description">{description}</p>
            <div className="course-footer">
                <span className="course-instructor">
                    <FontAwesomeIcon icon={faUser} /> By {instructor}
                </span>
                <button className="enroll-button" onClick={handleEnrollClick}>Get it Now</button>
            </div>
        </div>
    </div>
  )
}

export default CardCourse