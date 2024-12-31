import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './CourseDetails.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHome, faGraduationCap, faChartBar, faTasks, faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function CourseDetails({ userId }) {
    const { courseId } = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [course, setCourse] = useState(null);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [ratedCourses, setRatedCourses] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null); 
    const { id } = useParams(); // Access user ID from the URL
    const [studentDetails, setStudentDetails] = useState({});

    useEffect(() => {
        fetch(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`)
            .then((response) => response.json())
            .then((data) => setStudentDetails(data))
            .catch((error) => console.error(error));
    }, [id]);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/courses/${id}/${courseId}/is-enrolled`)
            .then(response => setIsEnrolled(response.data))
            .catch(error => console.error('Error checking enrollment status:', error));
    }, [id, courseId]);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);  // Set the user info to state
            // Redirect to the dashboard with student ID in the URL (assuming the student ID is stored in user.id)
            navigate(`/courses/${id}/${courseId}`);
        } else {
            navigate("https://coursemanagementsystembackend-production.up.railway.app/api/v1/login");  // If no user, redirect to login page
        }
    }, [navigate, id, courseId]);

    const handleEnroll = async () => {
        if (!id) {
            alert("Please log in first to enroll in a course.");
            console.log('userId:', id);  // Debugging statement
            return;
        }
    
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/courses/${id}/${courseId}/enroll`, null, {
                params: {
                    id: id,
                    courseId: course.courseId
                }
            });
            alert(response.data); // Show success message
        } catch (error) {
            console.error('There was an error enrolling the course:', error);
            alert('Enrollment failed');
        }
    };
    

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/courses/${id}/${courseId}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(error => console.error('Error fetching course details', error));

        axios.get('http://localhost:8080/api/v1/courses/course-list')
            .then(response => {
                const shuffledCourses = response.data.sort(() => Math.random() - 0.5);
                setRelatedCourses(shuffledCourses.slice(0, 6)); 
            })
            .catch(error => console.error('Error fetching related courses', error));
    }, [courseId, id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/courses/${id}/${courseId}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(error => console.error('Error fetching course details', error));

        axios.get('http://localhost:8080/api/v1/courses/course-list')
            .then(response => {
                const shuffledCourses = response.data.sort(() => Math.random() - 0.5);
                setRatedCourses(shuffledCourses.slice(0, 6)); 
            })
            .catch(error => console.error('Error fetching related courses', error));
    }, [courseId, id]);

    if (!course) return <div className="loading">Loading...</div>;

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="title">
                    <div className="logo">Coding Courses</div>
                </div>
                <ul>
  <li>
    <Link to={`/student-dashboard/${id}`}>
      <FontAwesomeIcon icon={faHome} />
      <span>Home</span>
    </Link>
  </li>
  <li>
    <Link to={`/courses/${id}`}>
      <FontAwesomeIcon icon={faGraduationCap} />
      <span>Courses</span>
    </Link>
  </li>
  <li>
    <Link to={`/${id}/enrolled-courses`}>
      <FontAwesomeIcon icon={faChartBar} />
      <span>My Courses</span>
    </Link>
  </li>
  <li>
    <Link to="/tasks">
      <FontAwesomeIcon icon={faTasks} />
      <span>Tasks</span>
    </Link>
  </li>
  <li>
    <Link to={`/settings/${id}`}>
      <FontAwesomeIcon icon={faCog} />
      <span>Profile</span>
    </Link>
  </li>
  <li>
    <Link to={`/Help/${id}`}>
      <FontAwesomeIcon icon={faQuestionCircle} />
      <span>Help</span>
    </Link>
  </li>
  <li>
    <Link to="/login">
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span>Logout</span>
    </Link>
  </li>
</ul>

                <footer>
                    <p>&copy; 2024 Uppada Giridhar. All Rights Reserved.</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/sanjay.uppada.7/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="https://x.com/giridhar_uppada" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/in/uppada-giridhar/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/__sanjay__uppada__/?__pwa=1" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    </div>
                </footer>
            </div>
            <div className="main-content">
                <header className="dashboard-header">
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search courses..." 
                            value={searchQuery} 
                            onChange={handleSearchChange} 
                        />
                    </div>
                    <h2>Welcome to the Student Dashboard</h2>
                    <div className="username">
                    {user && (
                        <div className="username">
                            <p>Hello, <strong> {studentDetails.firstName} {studentDetails.lastName}</strong></p>  {/* Displaying username */}
                        </div>
                    )}
                    </div>
                </header>

                <div className="course-details-container">
                    <div className="course-banner">
                        <img src={course.image} alt={course.courseName} className="course-banner-img" />
                    </div>

                    <div className="course-info">
                        <h1 className="course-title">{course.courseName}</h1>
                        <p className="course-subtitle">{course.shortDescription}</p>

                        <div className="course-overview">
                            <h2>About This Course</h2>
                            <p>{course.description}</p>
                        </div>

                        <div className="course-details">
                            <div className="course-duration">
                                <strong>Duration:</strong> {course.duration}
                            </div>
                            <div className="course-fees">
                                <strong>Fees:</strong> {course.price}
                            </div>
                            <div className="course-rating">
                                <strong>Rating:</strong> {course.rating} ⭐
                            </div>
                        </div>

                        <div className="enroll-btn-container">
                        {!isEnrolled ? (
                            <button className="enroll-btn" onClick={handleEnroll}>Enroll Now</button>
                        ) : (
                            <p className="already-enrolled">You are already enrolled in this course.</p>
                        )}
                        </div>
                    </div>

                    <div className="related-courses">
                        <h2>Related Courses</h2>
                        <div className="courses-home1">
                            {relatedCourses.map((relatedCourse, index) => (
                                <div className="course-card" key={index}>
                                    <img src={relatedCourse.image} alt={relatedCourse.courseName} className="course-image" />
                                    <h3>{relatedCourse.courseName}</h3>
                                    <p>{relatedCourse.description}</p>
                                    <p><strong>Rating:</strong> {relatedCourse.rating} ⭐</p>
                                    <p><strong>Fees:</strong> {relatedCourse.price}</p>
                                    <Link to={`/courses/${id}/${relatedCourse.courseId}`} className="button-link">View Details</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rated-courses">
                        <h2>Top Rated Courses</h2>
                        <div className="courses-home1">
                            {ratedCourses.map((ratedCourses, index) => (
                                <div className="course-card" key={index}>
                                    <img src={ratedCourses.image} alt={ratedCourses.courseName} className="course-image" />
                                    <h3>{ratedCourses.courseName}</h3>
                                    <p>{ratedCourses.description}</p>
                                    <p><strong>Rating:</strong> {ratedCourses.rating} ⭐</p>
                                    <p><strong>Fees:</strong> {ratedCourses.price}</p>
                                    <Link to={`/courses/${id}/${ratedCourses.courseId}`} className="button-link">View Details</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;
