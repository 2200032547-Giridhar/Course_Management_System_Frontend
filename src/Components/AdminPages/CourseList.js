import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faGraduationCap, faUsersCog, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './CourseList.css';
import CourseUpdateModal from './UpdateCourse';
import AddCourseModal from './AddCourse';
import { useNavigate, useParams, Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [studentDetails, setStudentDetails] = useState({});
  const navigate = useNavigate();
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/${id}`)
      .then((response) => response.json())
      .then((data) => setStudentDetails(data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      navigate(`/course-list/${id}`);
    } else {
      navigate("/login");
    }
  }, [navigate, id]);

  useEffect(() => {
    axios
      .get('https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/course-list')
      .then((response) => {
        setCourses(response.data);
      })
      .catch(() => {
        setMessage('Error fetching courses');
      });
  }, []);

  const handleDelete = (courseId) => {
    axios
      .delete(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/delete/${courseId}`)
      .then(() => {
        setCourses(courses.filter((course) => course.courseId !== courseId));
        setMessage('Course deleted successfully!');
      })
      .catch(() => {
        setMessage('Error deleting course');
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (courseId) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };

  const openAddCourseModal = () => {
    setIsAddCourseModalOpen(true);
  };

  const closeAddCourseModal = () => {
    setIsAddCourseModalOpen(false);
  };

  const handleCourseUpdate = (updatedCourse) => {
    setCourses(
      courses.map((course) =>
        course.courseId === updatedCourse.courseId ? updatedCourse : course
      )
    );
  };

  const openStudentListModal = (courseId) => {
    axios
      .get(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/${courseId}/students`)
      .then((response) => {
        setEnrolledStudents(response.data);
        setIsStudentsModalOpen(true);
      })
      .catch(() => {
        setMessage('Error fetching enrolled students');
      });
  };

  const closeStudentListModal = () => {
    setIsStudentsModalOpen(false);
    setEnrolledStudents([]);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">Coding Courses</div>
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
              onChange={handleSearchChange}
            />
          </div>
          <div className="add-course-btn-container">
            <button className="add-course-btn" onClick={openAddCourseModal}>Add New Course</button>
          </div>
          <h2>Welcome to the Admin Dashboard</h2>
          <div className="username">
            {user && (
              <p>Hello, <strong>{studentDetails.firstName} {studentDetails.lastName}</strong></p>
            )}
          </div>
        </header>

        {message && <p>{message}</p>}

        <div className="courses-home">
          {filteredCourses.map((course) => (
            <div className="course-card" key={course.courseId}>
              <img src={course.image} alt={course.courseName} className="course-image" />
              <h3>{course.courseName}</h3>
              <p>{course.description}</p>
              <p><strong>Rating:</strong> {course.rating} ⭐</p>
              <p><strong>Fees:</strong> {course.price}</p>
              <button onClick={() => openModal(course.courseId)}>Edit</button> |{' '}
              <button onClick={() => handleDelete(course.courseId)}>Delete</button> |{' '}
              <button onClick={() => openStudentListModal(course.courseId)}>View</button>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <CourseUpdateModal
            courseId={selectedCourseId}
            onClose={closeModal}
            onUpdate={handleCourseUpdate}
          />
        )}

        {isAddCourseModalOpen && (
          <AddCourseModal onClose={closeAddCourseModal} />
        )}

        {isStudentsModalOpen && (
          <div className="students-modal">
            <div className="students-modal-container">
              <h3>Enrolled Students</h3>
              {enrolledStudents.length === 0 ? (
                <p>No students enrolled in this course.</p>
              ) : (
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button onClick={closeStudentListModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
