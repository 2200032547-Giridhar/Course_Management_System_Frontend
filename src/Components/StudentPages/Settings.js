import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faArrowLeft, faSave, faHome, faGraduationCap, faChartBar, faTasks, faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./Settings.css";
import { useNavigate, useParams } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();
    const { id } = useParams(); // Access user ID from the URL

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [studentDetails, setStudentDetails] = useState({});
    const [user, setUser] = useState(null); 

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
            navigate(`/settings/${id}`);
        } else {
            navigate("/login");  // If no user, redirect to login page
        }
    }, [navigate, id]);

    useEffect(() => {
        // Fetch user details to populate the form
        setLoading(true);
        axios
            .get(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`)
            .then((response) => {
                setUserDetails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .put(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`, userDetails)
            .then(() => {
                setMessage("Settings updated successfully!");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error updating settings:", error);
                setMessage("An error occurred while saving settings.");
                setLoading(false);
            });
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="title">
                    <div className="logo">Coding Courses</div>
                </div>
                <ul>
                    <li><a href={`/student-dashboard/${id}`}><FontAwesomeIcon icon={faHome} /><span>Home</span></a></li>
                    <li><a href={`/courses/${id}`}><FontAwesomeIcon icon={faGraduationCap} /><span>Courses</span></a></li>
                    <li><a href={`/${id}/enrolled-courses`}><FontAwesomeIcon icon={faChartBar} /><span>My Courses</span></a></li>
                    <li><a href="/tasks"><FontAwesomeIcon icon={faTasks} /><span>Tasks</span></a></li>
                    <li><a href={`/settings/${id}`}><FontAwesomeIcon icon={faCog} /><span>Profile</span></a></li>
                    <li><a href={`/help/${id}`}><FontAwesomeIcon icon={faQuestionCircle} /><span>Help</span></a></li>
                    <li><a href="/login"><FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span></a></li>
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <h2>Welcome to the Student Dashboard</h2>
                    {user && (
                        <div className="username">
                            <p>Hello, <strong> {studentDetails.firstName} {studentDetails.lastName}</strong></p>  {/* Displaying username */}
                        </div>
                    )}
                </header>
                <div className="settings-container">
                        <button className="back-button" onClick={() => navigate(`/student-dashboard/${id}`)}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </button>
                    <h2>Settings</h2>
                    <form className="settings-form" onSubmit={handleSave}>
                        <h3>Update Profile</h3>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userDetails.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userDetails.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                            />
                        </div>
                        <h3>Change Password</h3>
                        <div className="form-group">
                            <label htmlFor="password">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={userDetails.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="save-button" disabled={loading}>
                            <FontAwesomeIcon icon={faSave} /> {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Settings;
