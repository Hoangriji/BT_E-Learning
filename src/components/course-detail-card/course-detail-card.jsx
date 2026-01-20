import "./course-detail-card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSignal, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CourseDetailCard = ({ 
  id,
  title, 
  description, 
  duration, 
  level, 
  instructor, 
  images,
  curriculum 
}) => {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    if (id) {
      navigate(`/courses/${id}`);
    }
  };

  const handleCardClick = () => {
    if (id) {
      navigate(`/courses/${id}`);
    }
  };

  return (
    <div className="course-detail-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="course-detail-header">
        <div className="course-detail-info">
          <h3 className="course-detail-title">{title}</h3>
          <p className="course-detail-description">{description}</p>
        </div>
        <button 
          className="view-course-button" 
          onClick={(e) => {
            e.stopPropagation();
            handleViewCourse();
          }}
        >
          View Course
        </button>
      </div>

      <div className="course-detail-images">
        {images && images.map((img, index) => (
          <div key={index} className="detail-image-wrapper">
            <img src={img} alt={`${title} preview ${index + 1}`} className="detail-image" />
          </div>
        ))}
      </div>

      <div className="course-detail-meta">
        <span className="detail-meta-item">
          <FontAwesomeIcon icon={faClock} /> {duration}
        </span>
        <span className="detail-meta-item">
          <FontAwesomeIcon icon={faSignal} /> {level}
        </span>
        <span className="detail-meta-item detail-instructor">
          <FontAwesomeIcon icon={faUser} /> By {instructor}
        </span>
      </div>

      {curriculum && curriculum.length > 0 && (
        <div className="course-curriculum">
          <h4 className="curriculum-title">Curriculum</h4>
          <div className="curriculum-grid">
            {curriculum.map((item, index) => (
              <div key={index} className="curriculum-item">
                <div className="curriculum-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="curriculum-content">
                  <h5 className="curriculum-item-title">{item.title}</h5>
                  {item.description && (
                    <p className="curriculum-item-description">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailCard;
