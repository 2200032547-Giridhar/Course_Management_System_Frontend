import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSignOutAlt,
    faChalkboardTeacher,
    faBook,
    faUsers,
    faCog,
    faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./FacultyDashboard.css";

function FacultyDashboard() {
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
                            <a href="/faculty-dashboard/teaching-courses">
                                <FontAwesomeIcon icon={faChalkboardTeacher} />
                                <span>Teaching Courses</span>
                            </a>
                        </li>
                        <li>
                            <a href="/faculty-dashboard/student-interactions">
                                <FontAwesomeIcon icon={faUsers} />
                                <span>Student Interactions</span>
                            </a>
                        </li>
                        <li>
                            <a href="/faculty-dashboard/resources">
                                <FontAwesomeIcon icon={faBook} />
                                <span>Course Resources</span>
                            </a>
                        </li>
                        <li>
                            <a href="/faculty-dashboard/settings">
                                <FontAwesomeIcon icon={faCog} />
                                <span>Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="/faculty-dashboard/help">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span>Help</span>
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
                    <h2>Welcome to the Faculty Dashboard</h2>
                    <div className="username">
                        <p>Hello, <strong>John Doe</strong></p>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default FacultyDashboard;
