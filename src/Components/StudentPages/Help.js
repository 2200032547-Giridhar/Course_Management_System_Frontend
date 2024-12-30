import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faHome,
  faGraduationCap,
  faChartBar,
  faTasks,
  faCog,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import "./Help.css";

function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [studentDetails, setStudentDetails] = useState({});

  // Fetch student details
  useEffect(() => {
    axios
      .get(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`)
      .then((response) => setStudentDetails(response.data))
      .catch((error) => console.error("Error fetching student details:", error));
  }, [id]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      navigate(`/Help/${id}`);
    } else {
      navigate("/login");
    }
  }, [navigate, id]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <div className="title">
          <div className="logo">Coding Courses</div>
        </div>
        <ul>
                    <li><a href={`https://coursemanagementsystembackend-production.up.railway.app/api/v1/student-dashboard/${id}`}><FontAwesomeIcon icon={faHome} /><span>Home</span></a></li>
                    <li><a href={`https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/${id}`}><FontAwesomeIcon icon={faGraduationCap} /><span>Courses</span></a></li>
                    <li><a href={`https://coursemanagementsystembackend-production.up.railway.app/api/v1/${id}/enrolled-courses`}><FontAwesomeIcon icon={faChartBar} /><span>My Courses</span></a></li>
                    <li><a href="https://coursemanagementsystembackend-production.up.railway.app/api/v1/tasks"><FontAwesomeIcon icon={faTasks} /><span>Tasks</span></a></li>
                    <li><a href={`https://coursemanagementsystembackend-production.up.railway.app/api/v1/settings/${id}`}><FontAwesomeIcon icon={faCog} /><span>Profile</span></a></li>
                    <li><a href={`https://coursemanagementsystembackend-production.up.railway.app/api/v1/Help/${id}`}><FontAwesomeIcon icon={faQuestionCircle} /><span>Help</span></a></li>
                    <li><a href="https://coursemanagementsystembackend-production.up.railway.app/api/v1/login"><FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span></a></li>
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

      {/* Main Content Section */}
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
          {user && (
            <div className="username">
              <p>
                Hello, <strong>{studentDetails.firstName} {studentDetails.lastName}</strong>
              </p>
            </div>
          )}
        </header>

        {/* Help & Support Section */}
        <div className="help-container">
          <h2>Help & Support</h2>
          <div className="faqs">
            <h3>Frequently Asked Questions</h3>
            <ul>
              <li>
                <strong>1. How do I enroll in a course?</strong>
                You can enroll by selecting a course from the "Courses" page and clicking the "Enroll" button.
              </li>
              <li>
                <strong>2. How do I access my enrolled courses?</strong>
                Go to the "My Courses" section from the sidebar to view all your enrolled courses.
              </li>
              <li>
                <strong>3. Can I get a refund if I cancel a course?</strong>
                Refund policies vary. Please check the refund terms mentioned on the course details page.
              </li>
              <li>
                <strong>4. Do I receive a certificate after completing a course?</strong>
                Yes, a certificate of completion is awarded after you successfully finish a course.
              </li>
              <li>
                <strong>5. What should I do if I forget my password?</strong>
                Click on the "Forgot Password" link on the login page and follow the instructions to reset your password.
              </li>
              <li>
                <strong>6. Can I access courses on multiple devices?</strong>
                Yes, you can access courses from any device by logging in with your registered credentials.
              </li>
              <li>
                <strong>7. Are there prerequisites for the courses?</strong>
                Prerequisites vary by course. Check the course details page for any specific requirements.
              </li>
              <li>
                <strong>8. How can I contact support?</strong>
                For support, use the "Contact Us" section or email us at support@codingcourses.com.
              </li>
              <li>
                <strong>9. How long do I have access to a course?</strong>
                Once enrolled, you’ll have lifetime access to the course content unless stated otherwise.
              </li>
              <li>
                <strong>10. Can I download course materials?</strong>
                Certain courses allow material downloads. Check the course description for availability.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
