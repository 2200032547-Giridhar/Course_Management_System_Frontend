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

function AdminDashboard() {
  const [user, setUser] = useState(null); // For user details from local storage
  const { id } = useParams(); // Access user ID from the URL
  const [studentDetails, setStudentDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // Search functionality
  const navigate = useNavigate();

  // Fetch student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(
          `https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch student details.");
        const data = await response.json();
        setStudentDetails(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    if (id) fetchStudentDetails();
  }, [id]);

  // Authenticate and redirect user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user info to state
    } else {
      navigate("/login"); // If no user, redirect to login page
    }
  }, [navigate]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
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
    <Link to="/login">
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span>Logout</span>
    </Link>
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
                Hello, <strong>{studentDetails.firstName} {studentDetails.lastName}</strong>
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
                  To view all users, go to the "Users List" section from the
                  sidebar. You can filter users by role (students, faculties,
                  admins).
                </p>
              </li>
              <li>
                <strong>2. How do I manage courses?</strong>
                <p>
                  Navigate to the "Courses List" section to manage all available
                  courses. From here, you can add, edit, or delete courses as
                  needed.
                </p>
              </li>
              <li>
                <strong>3. How can I edit a user's role?</strong>
                <p>
                  You can edit user roles by accessing the user's profile in the
                  "Users List" section. There, you can assign roles like
                  Student, Faculty, or Admin.
                </p>
              </li>
              <li>
                <strong>4. How do I generate reports for users and courses?</strong>
                <p>
                  Reports for users and courses can be generated by clicking on
                  the "Generate Report" button within the "Users List" or
                  "Courses List" sections.
                </p>
              </li>
              <li>
                <strong>5. How can I manage course content?</strong>
                <p>
                  To manage course content, select a course from the "Courses
                  List" section. You can upload new materials, edit existing
                  content, and set prerequisites for courses.
                </p>
              </li>
              <li>
                <strong>6. How do I reset a user's password?</strong>
                <p>
                  If a user forgets their password, you can reset it by visiting
                  their profile in the "Users List" and clicking the "Reset
                  Password" option.
                </p>
              </li>
              <li>
                <strong>7. Can I view user activity?</strong>
                <p>
                  Yes, user activity can be tracked by visiting the "User
                  Profile" page. You can view courses they've enrolled in,
                  completion status, and other activity details.
                </p>
              </li>
              <li>
                <strong>8. How do I contact technical support?</strong>
                <p>
                  If you need assistance, use the "Contact Us" section or email
                  us at support@codingcourses.com for help with technical issues
                  or system errors.
                </p>
              </li>
              <li>
                <strong>9. How do I customize settings for the platform?</strong>
                <p>
                  Go to the "Settings" page to adjust platform settings, such as
                  managing payment options, notification preferences, and other
                  administrative tools.
                </p>
              </li>
              <li>
                <strong>10. Can I export course data?</strong>
                <p>
                  Yes, you can export course data by clicking the "Export"
                  button on the "Courses List" page. The data will be available
                  in CSV format for further analysis.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
