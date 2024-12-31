import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  faSignOutAlt,
  faUsersCog,
  faGraduationCap,
  faCog,
  faQuestionCircle,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./Help1.css";

function Help1() {
  const [user, setUser] = useState(null); // Stores user details from local storage
  const { id } = useParams(); // Retrieves user ID from the URL
  const [studentDetails, setStudentDetails] = useState({}); // Stores student details
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const navigate = useNavigate();

  // Fetch student details using the ID from URL
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(
          `https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch student details.");
        const data = await response.json();
        setStudentDetails(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    if (id) fetchStudentDetails();
  }, [id]);

  // Authenticate user and redirect to login if unauthenticated
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user details to state
    } else {
      navigate("/login"); // Redirect to login if no user data is found
    }
  }, [navigate]);

  // Handle search bar input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="title">
          <div className="logo">Coding Courses</div>
        </div>
        <ul>
          <li>
            <Link to={`/admin-dashboard/${id}`}>
              <FontAwesomeIcon icon={faHome} />
              <span className="nav-item">Home</span>
            </Link>
          </li>
          <li>
            <Link to={`/students-list/${id}`}>
              <FontAwesomeIcon icon={faUsersCog} />
              <span className="nav-item">Users List</span>
            </Link>
          </li>
          <li>
            <Link to={`/course-list/${id}`}>
              <FontAwesomeIcon icon={faGraduationCap} />
              <span className="nav-item">Courses List</span>
            </Link>
          </li>
          <li>
            <Link to={`/settings1/${id}`}>
              <FontAwesomeIcon icon={faCog} />
              <span className="nav-item">Profile</span>
            </Link>
          </li>
          <li>
            <Link to={`/help1/${id}`}>
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span className="nav-item">Help</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
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

      {/* Main Content */}
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
              <p>
                Hello,{" "}
                <strong>
                  {studentDetails.firstName} {studentDetails.lastName}
                </strong>
              </p>
            )}
          </div>
        </header>

        {/* Help Section */}
        <div className="help-container1">
          <h1 className="help">
            <FontAwesomeIcon icon={faQuestionCircle} /> Admin Help & Support
          </h1>
          <div className="faqs">
            <h2>Admin Tasks & Frequently Asked Questions</h2>
            <ul>
              <li>
                <strong>1. How do I view all users?</strong>
                <p>
                  Go to the "Users List" section from the sidebar to view all
                  users. Filter by role (students, faculties, admins).
                </p>
              </li>
              <li>
                <strong>2. How do I manage courses?</strong>
                <p>
                  Navigate to the "Courses List" section to add, edit, or delete
                  courses.
                </p>
              </li>
              <li>
                <strong>3. How can I edit a user's role?</strong>
                <p>
                  Edit roles by accessing a user’s profile in "Users List."
                </p>
              </li>
              <li>
                <strong>4. How do I generate reports?</strong>
                <p>
                  Generate reports using the "Generate Report" button in the
                  relevant sections.
                </p>
              </li>
              <li>
                <strong>5. How can I manage course content?</strong>
                <p>
                  Select a course from "Courses List" to upload or edit
                  materials.
                </p>
              </li>
              <li>
                <strong>6. How do I reset a user's password?</strong>
                <p>
                  Visit a user’s profile in "Users List" and click "Reset
                  Password."
                </p>
              </li>
              <li>
                <strong>7. Can I view user activity?</strong>
                <p>
                  Check "User Profile" for enrolled courses and activity
                  details.
                </p>
              </li>
              <li>
                <strong>8. How do I contact technical support?</strong>
                <p>
                  Use "Contact Us" or email support@codingcourses.com.
                </p>
              </li>
              <li>
                <strong>9. How do I customize settings?</strong>
                <p>
                  Visit "Settings" for notification preferences and tools.
                </p>
              </li>
              <li>
                <strong>10. Can I export course data?</strong>
                <p>
                  Export data as CSV using the "Export" button in "Courses
                  List."
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help1;
