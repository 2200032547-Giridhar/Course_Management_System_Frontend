import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import {
  faSignOutAlt,
  faUsersCog,
  faGraduationCap,
  faCog,
  faQuestionCircle,
  faUser,
  faChalkboardTeacher,
  faUserShield,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [roleCounts, setRoleCounts] = useState({
    students: 0,
    faculties: 0,
    admins: 0,
    courses: 0,
  });
  const [user, setUser] = useState(null); 
  const { id } = useParams(); // Access user ID from the URL
  const [studentDetails, setStudentDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/${id}`)
        .then((response) => response.json())
        .then((data) => setStudentDetails(data))
        .catch((error) => console.error(error));
}, [id]);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
      setUser(storedUser);  // Set the user info to state
      // Redirect to the dashboard with student ID in the URL (assuming the student ID is stored in user.id)
      navigate(`/admin-dashboard/${id}`);
  } else {
      navigate("/login");  // If no user, redirect to login page
  }
}, [navigate, id]);

  const [courseCount, setCourseCount] = useState(0);
  useEffect(() => {
    // Function to fetch role counts
    async function fetchRoleCounts() {
      try {
        const response = await fetch("http://localhost:8080/api/v1/users/overview");
        const data = await response.json();
        setRoleCounts({
          students: data.students || 0,
          faculties: data.faculties || 0,
          admins: data.admins || 0,
        });
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    }

    // Function to fetch course count
    async function fetchCourseCount() {
      try {
        const response = await fetch("http://localhost:8080/api/v1/courses/course-count");
        const data = await response.json();
        setCourseCount(data.courses || 0); // Only updating course count
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    }

    // Fetching both sets of data
    fetchRoleCounts();
    fetchCourseCount();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const [searchQuery, setSearchQuery] = useState("");
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
            <a href={`/admin-dashboard/${id}`}>
              <FontAwesomeIcon icon={faHome} />
              <span className="nav-item">Home</span>
            </a>
          </li>
          <li>
            <a href={`/students-list/${id}`}>
              <FontAwesomeIcon icon={faUsersCog} />
              <span className="nav-item">Users List</span>
            </a>
          </li>
          <li>
            <a href={`/course-list/${id}`}>
              <FontAwesomeIcon icon={faGraduationCap} />
              <span className="nav-item">Courses List</span>
            </a>
          </li>
          <li>
            <a href={`/settings1/${id}`}>
              <FontAwesomeIcon icon={faCog} />
              <span className="nav-item">Profile</span>
            </a>
          </li>
          <li>
            <a href={`/help1/${id}`}>
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span className="nav-item">Help</span>
            </a>
          </li>
          <li>
            <a href="/login">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
        <footer>
          <p>&copy; 2024 Uppada Giridhar. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/sanjay.uppada.7/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://x.com/giridhar_uppada" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/uppada-giridhar/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/__sanjay__uppada__/?__pwa=1" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
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
          <h2>Welcome to the Admin Dashboard</h2>
          <div className="username">
          {user && (
                        <div className="username">
                            <p>Hello, <strong> {studentDetails.firstName} {studentDetails.lastName}</strong></p>  {/* Displaying username */}
                        </div>
                    )}
          </div>
        </header>

        {/* Stats Container */}
        <div className="stats-container">
          <div className="stat-item">
            <FontAwesomeIcon icon={faUser} size="3x" />
            <h3>{roleCounts.students}</h3>
            <p>Students</p>
          </div>
          <div className="stat-item">
            <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" />
            <h3>{roleCounts.faculties}</h3>
            <p>Faculties</p>
          </div>
          <div className="stat-item">
            <FontAwesomeIcon icon={faUserShield} size="3x" />
            <h3>{roleCounts.admins}</h3>
            <p>Admins</p>
          </div>
          <div className="stat-item">
            <FontAwesomeIcon icon={faGraduationCap} size="3x" />
            <h3>{courseCount}</h3>
            <p>Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
