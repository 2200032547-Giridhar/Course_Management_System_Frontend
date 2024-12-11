import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useParams, useNavigate } from 'react-router-dom';
import { faSignOutAlt, faHome, faGraduationCap, faChartBar, faTasks, faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import './EnrolledCourses.css';

function EnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
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
            //navigate(`${id}/enrolledd-courses`);
        } else {
            navigate("/login");  // If no user, redirect to login page
        }
    }, [navigate, id]);

    useEffect(() => {
        // Fetch enrolled courses
        axios.get(`http://localhost:8080/api/v1/enrollments/${id}/enrolled-courses`)
            .then(response => {
                setEnrolledCourses(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching enrolled courses:', error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

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
                    <li><a href={`/student-dashboard/${id}`}><FontAwesomeIcon icon={faHome} /><span>Home</span></a></li>
                    <li><a href={`/courses/${id}`}><FontAwesomeIcon icon={faGraduationCap} /><span>Courses</span></a></li>
                    <li><a href={`/${id}/enrolled-courses`}><FontAwesomeIcon icon={faChartBar} /><span>My Courses</span></a></li>
                    <li><a href="/tasks"><FontAwesomeIcon icon={faTasks} /><span>Tasks</span></a></li>
                    <li><a href={`/settings/${id}`}><FontAwesomeIcon icon={faCog} /><span>Profile</span></a></li>
                    <li><a href={`/Help/${id}`}><FontAwesomeIcon icon={faQuestionCircle} /><span>Help</span></a></li>
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
            <h1 className="heading">Enrolled Courses</h1>
            {enrolledCourses.length === 0 ? (
                <p>You have not enrolled in any courses yet.</p>
            ) : (
        <div className="courses-home2">
            {enrolledCourses.map((course, index) => (
                        <div className="course-card" key={index}>
                            <img src={course.image} alt={course.name} className="course-image" />
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <p><strong>Rating:</strong> {course.rating} ⭐</p>
                            <p><strong>Fees:</strong> {course.price}</p>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}

export default EnrolledCourses;
