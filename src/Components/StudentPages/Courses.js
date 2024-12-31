import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHome, faGraduationCap, faChartBar, faTasks, faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./Courses.css";
import { useNavigate, useParams } from "react-router-dom";

function Courses() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null); 
    const [studentDetails, setStudentDetails] = useState({});

    useEffect(() => {
        fetch(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`)
            .then((response) => response.json())
            .then((data) => setStudentDetails(data))
            .catch((error) => console.error(error));
    }, [id]);
  
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);  // Set the user info to state
            // Redirect to the dashboard with student ID in the URL (assuming the student ID is stored in user.id)
            navigate(`/courses/${id}`);
        } else {
            navigate("/login");  // If no user, redirect to login page
        }
    }, [navigate, id]);

    useEffect(() => {
      // Fetch all courses from the backend API
      axios
        .get('https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/course-list')
        .then((response) => {
          // Set the courses data received from the API
          setCourses(response.data);
        })
        .catch((error) => {
          // Handle errors in case of failure
          //setMessage('Error fetching courses');
        });
    }, []);
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
            {/* Header Section */}
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
                <div className="courses-home">
                    {courses.map((course, index) => (
                        <div className="course-card" key={index}>
                            <img src={course.image} alt={course.courseName} className="course-image" />
                            <h3>{course.courseName}</h3>
                            <p>{course.description}</p>
                            <p><strong>Rating:</strong> {course.rating} ⭐</p>
                            <p><strong>Fees:</strong> {course.price}</p>
                            <Link to={`/courses/${id}/${course.courseId}`} className="button-link">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Courses;
