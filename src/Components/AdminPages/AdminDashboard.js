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
  });
  const [courseCount, setCourseCount] = useState(0);
  const [user, setUser] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams(); // Access user ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login"); // Redirect to login page if no user found
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch user details
        const userResponse = await fetch(
          `https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details.");
        }
        const userData = await userResponse.json();
        setStudentDetails(userData);

        // Fetch role counts
        const roleResponse = await fetch(
          "https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/overview"
        );
        if (!roleResponse.ok) {
          throw new Error("Failed to fetch role counts.");
        }
        const roleData = await roleResponse.json();
        setRoleCounts({
          students: roleData.students || 0,
          faculties: roleData.faculties || 0,
          admins: roleData.admins || 0,
        });

        // Fetch course count
        const courseResponse = await fetch(
          "https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/course-count"
        );
        if (!courseResponse.ok) {
          throw new Error("Failed to fetch course count.");
        }
        const courseData = await courseResponse.json();
        setCourseCount(courseData.courses || 0);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [id]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

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
            <a
              href="https://www.facebook.com/sanjay.uppada.7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://x.com/giridhar_uppada"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/uppada-giridhar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/__sanjay__uppada__/?__pwa=1"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            {studentDetails && (
              <p>
                Hello, <strong>{studentDetails.firstName} {studentDetails.lastName}</strong>
              </p>
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
