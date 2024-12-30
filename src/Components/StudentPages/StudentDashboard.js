import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHome, faGraduationCap, faPlayCircle, faTrophy, faCheckCircle, faChartBar, faTasks, faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./StudentDashboard.css";
import { useNavigate, useParams } from "react-router-dom";


function StudentDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null); 
    const { id } = useParams(); // Access user ID from the URL
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
            navigate(`/student-dashboard/${id}`);
        } else {
            navigate("/login");  // If no user, redirect to login page
        }
    }, [navigate, id]);
    const courses = [
        {
            name: "React Basics",
            rating: "4.5",
            fees: "$200",
            description: "Learn React fundamentals, components, and state management.",
            image: "https://th.bing.com/th/id/OIP.8Lt8uT-zSFkOwOf3-Qn8SgHaD4?rs=1&pid=ImgDetMain"
        },
        {
            name: "Advanced JavaScript",
            rating: "4.8",
            fees: "$250",
            description: "Master ES6+ features and JavaScript concepts for modern development.",
            image: "https://i.ytimg.com/vi/IljVmcDDrOg/maxresdefault.jpg"
        },
        {
            name: "Python for Beginners",
            rating: "4.6",
            fees: "$180",
            description: "Start programming with Python and build practical projects.",
            image: "https://i.ytimg.com/vi/sxTmJE4k0ho/maxresdefault.jpg"
        },
        {
            name: "Data Structures & Algorithms",
            rating: "4.9",
            fees: "$300",
            description: "Strengthen your problem-solving skills with DSA concepts.",
            image: "https://miro.medium.com/v2/resize:fit:1200/1*-EFdnPuVrwUOmYte11v0OA.png"
        },
        {
            name: "Web Development Bootcamp",
            rating: "4.5",
            fees: "$200",
            description: "Learn React fundamentals, components, and state management.",
            image: "https://th.bing.com/th?id=OIP.vjP7-scP0x4XUpr62tdYmgHaEO&w=330&h=188&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
        },
        {
            name: "Machine Learning with Python",
            rating: "4.8",
            fees: "$250",
            description: "Master ES6+ features and JavaScript concepts for modern development.",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20210629203724/MachineLearningwithPythonmin.png"
        },
        {
            name: "Introduction to SQL",
            rating: "4.6",
            fees: "$180",
            description: "Start programming with Python and build practical projects.",
            image: "https://i.ytimg.com/vi/xBcrP74uYas/maxresdefault.jpg"
        },
        {
            name: "Full Stack Development",
            rating: "4.9",
            fees: "$300",
            description: "Strengthen your problem-solving skills with DSA concepts.",
            image: "https://th.bing.com/th/id/OIP.UhnZs_RgbtVTR56Rsrm40gHaEE?w=298&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
        },
        
    ];
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (
        <div className="dashboard-container">
            <div className="sidebar1">
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
            <div className="main-content1">
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
                    {user && (
                        <div className="username">
                            <p>Hello, <strong> {studentDetails.firstName} {studentDetails.lastName}</strong></p>  {/* Displaying username */}
                        </div>
                    )}
                </header>
            <section className="banner">
                <div className="banner-text">
                    <h1 className="welcome-heading">Welcome to the Ultimate Online Learning Platform</h1>
                    <p className="welcome-paragraph">Explore courses, enhance your skills, and achieve your goals. Start learning today!</p>
                    <button className="btn-primary">Browse All Courses</button>
                </div>
            </section>
            <h6>Avaible Courses</h6>
                <div className="courses-home">
                    {courses.map((course, index) => (
                        <div className="course-card" key={index}>
                            <img src={course.image} alt={course.name} className="course-image" />
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <p><strong>Rating:</strong> {course.rating} ⭐</p>
                            <p><strong>Fees:</strong> {course.fees}</p>
                        </div>
                    ))}
                </div>
                <section className="key-features">
                <h2>Why Choose Us?</h2>
                <div className="features-list">
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faPlayCircle} size="3x" />
                        <h3>Interactive Learning</h3>
                        <p>Engage in hands-on projects and real-time coding challenges.</p>
                    </div>
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                        <h3>Certification</h3>
                        <p>Get certified upon completion of each course and boost your resume.</p>
                    </div>
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faTrophy} size="3x" />
                        <h3>Top-rated Courses</h3>
                        <p>Choose from top-rated courses by industry experts with proven track records.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta">
                <h2>Ready to Start Your Learning Journey?</h2>
                <p>Join thousands of students around the world who are taking their learning to the next level.</p>
                <button className="btn-primary">Get Started</button>
            </section>
            </div>
        </div>
    );
}

export default StudentDashboard;
