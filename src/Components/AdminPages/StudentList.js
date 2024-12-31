import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faSignOutAlt,
  faUsersCog,
  faCog,
  faQuestionCircle,
  faGraduationCap,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./StudentList.css";
import UpdateUser from "./UpdateUser";
import { useNavigate, useParams } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Access user ID from the URL
  const [studentDetails, setStudentDetails] = useState({});
  const navigate = useNavigate();

  const backendUrl = "https://coursemanagementsystembackend-production.up.railway.app/api/v1";

  useEffect(() => {
    fetch(`${backendUrl}/users/${id}`)
      .then((response) => response.json())
      .then((data) => setStudentDetails(data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set the user info to state
      // Redirect to the dashboard with student ID in the URL (assuming the student ID is stored in user.id)
      navigate(`/students-list/${id}`);
    } else {
      navigate("/login"); // If no user, redirect to login page
    }
  }, [navigate, id]);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(`${backendUrl}/users/students`, setStudents);
    fetchData(`${backendUrl}/users/faculties`, setFaculties);
    fetchData(`${backendUrl}/users/admins`, setAdmins);
  }, []);

  const handleUpdateClick = (id) => {
    setSelectedUserId(id);
    setShowUpdateForm(true); // Show the update form
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this entry?");
    if (confirmation) {
      fetch(`${backendUrl}/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("User deleted successfully!");
            // Removing the deleted user from each list to ensure UI consistency
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
            setFaculties((prevFaculties) => prevFaculties.filter((faculty) => faculty.id !== id));
            setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
          } else {
            alert("Error deleting user!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while deleting the user.");
        });
    }
  };

  const renderTable = (data, type) => (
    <div className="list-container">
      <h2>{`${type} List`}</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td className="action-buttons">
                  <button className="update-btn" onClick={() => handleUpdateClick(item.id)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No {type.toLowerCase()} found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

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
        <header className="dashboard-header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <h2>Welcome to the Admin Dashboard</h2>
          <div className="username">
            {user && (
              <div className="username">
                <p>Hello, <strong>{studentDetails.firstName} {studentDetails.lastName}</strong></p>
              </div>
            )}
          </div>
        </header>

        {/* Render UpdateUser component if the update form should be visible */}
        {showUpdateForm && (
          <UpdateUser userId={selectedUserId} onClose={handleCloseUpdateForm} />
        )}

        <div className="list-container">
          {renderTable(students, "Students")}
          {renderTable(faculties, "Faculties")}
          {renderTable(admins, "Admins")}
        </div>
      </div>
    </div>
  );
}

export default StudentList;
