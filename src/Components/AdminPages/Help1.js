import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
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
  const [user, setUser] = useState(null); 
  const { id } = useParams(); // Access user ID from the URL
  const [studentDetails, setStudentDetails] = useState({});
  const navigate = useNavigate();

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
      navigate(`/help1/${id}`);
  } else {
      navigate("/login");  // If no user, redirect to login page
  }
}, [navigate, id]);


 // Empty dependency array ensures this effect runs once when the component mounts

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
        <li><a href={`/admin-dashboard/${id}`}><FontAwesomeIcon icon={faHome} /> Home</a></li>
          <li><a href={`/students-list/${id}`}><FontAwesomeIcon icon={faUsersCog} /> Users List</a></li>
          <li><a href={`/course-list/${id}`}><FontAwesomeIcon icon={faGraduationCap} /> Courses List</a></li>
          <li><a href={`/settings1/${id}`}><FontAwesomeIcon icon={faCog} /> Profile</a></li>
          <li><a href={`/help1/${id}`}><FontAwesomeIcon icon={faQuestionCircle} /> Help</a></li>
          <li><a href="/login"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a></li>
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

        <div className="help-container1">
        <h1 className="help">
          <FontAwesomeIcon icon={faQuestionCircle} /> Admin Help & Support
        </h1>

      <div className="faqs">
        <h2>Admin Tasks & Frequently Asked Questions</h2>
        <ul>
          <li>
            <strong>1. How do I view all users?</strong>
            <p>To view all users, go to the "Users List" section from the sidebar. You can filter users by role (students, faculties, admins).</p>
          </li>
          <li>
            <strong>2. How do I manage courses?</strong>
            <p>Navigate to the "Courses List" section to manage all available courses. From here, you can add, edit, or delete courses as needed.</p>
          </li>
          <li>
            <strong>3. How can I edit a user's role?</strong>
            <p>You can edit user roles by accessing the user's profile in the "Users List" section. There, you can assign roles like Student, Faculty, or Admin.</p>
          </li>
          <li>
            <strong>4. How do I generate reports for users and courses?</strong>
            <p>Reports for users and courses can be generated by clicking on the "Generate Report" button within the "Users List" or "Courses List" sections.</p>
          </li>
          <li>
            <strong>5. How can I manage course content?</strong>
            <p>To manage course content, select a course from the "Courses List" section. You can upload new materials, edit existing content, and set prerequisites for courses.</p>
          </li>
          <li>
            <strong>6. How do I reset a user's password?</strong>
            <p>If a user forgets their password, you can reset it by visiting their profile in the "Users List" and clicking the "Reset Password" option.</p>
          </li>
          <li>
            <strong>7. Can I view user activity?</strong>
            <p>Yes, user activity can be tracked by visiting the "User Profile" page. You can view courses they've enrolled in, completion status, and other activity details.</p>
          </li>
          <li>
            <strong>8. How do I contact technical support?</strong>
            <p>If you need assistance, use the "Contact Us" section or email us at support@codingcourses.com for help with technical issues or system errors.</p>
          </li>
          <li>
            <strong>9. How do I customize settings for the platform?</strong>
            <p>Go to the "Settings" page to adjust platform settings, such as managing payment options, notification preferences, and other administrative tools.</p>
          </li>
          <li>
            <strong>10. Can I export course data?</strong>
            <p>Yes, you can export course data by clicking the "Export" button on the "Courses List" page. The data will be available in CSV format for further analysis.</p>
          </li>
        </ul>
      </div>
    </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
