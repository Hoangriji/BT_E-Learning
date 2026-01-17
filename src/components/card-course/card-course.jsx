import "./card-course.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faSignal, faUser } from '@fortawesome/free-solid-svg-icons'

const CardCourse = ({ thumbnail, title, description, duration, level, instructor }) => {
  return (
    <div className="card-course">
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
                <button className="enroll-button">Get it Now</button>
            </div>
        </div>
    </div>
  )
}

export default CardCourse