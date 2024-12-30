import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './Register.css';

function RegisterComponent() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'STUDENT',
    });

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://coursemanagementsystembackend-production.up.railway.app/v1/users/register", user)
            .then(() => {
                setPopupMessage("Registration successful!");
                setIsError(false);
                setShowPopup(true);
            })
            .catch((error) => {
                setPopupMessage(error.response?.data?.message || "Registration failed!");
                setIsError(true);
                setShowPopup(true);
            });
    };

    const closePopup = () => {
        setShowPopup(false);
        if (!isError) {
            navigate('/login');
        }
    };

    return (
        <div>
            <video autoPlay loop muted className="background-video">
                <source src="https://assets.mixkit.co/videos/31549/31549-720.mp4" type="video/mp4" />
            </video>
            <div className="form-container">
                <h2 className="form-title">Register</h2>
                <form onSubmit={handleSubmit} className="form-box">
                    <div className="input-field1">
                        <div className="input-field">
                            <input
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                required
                            />
                            <label>First Name</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                required
                            />
                            <label>Last Name</label>
                        </div>
                    </div>
                    <div className="input-field">
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                        <label>Password</label>
                    </div>
                    <div className="input-field">
                        <select name="role" value={user.role} onChange={handleChange}>
                            <option value="STUDENT">Student</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="form-button">Register</button>
                </form>
                <div className="create-account-container">
                    <p>Already have an account?</p>
                    <button className="form-button" onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>

            {/* Popup Modal */}
            <Modal show={showPopup} onHide={closePopup} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isError ? "Error" : "Success"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{popupMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={isError ? "danger" : "success"}
                        onClick={closePopup}
                    >
                        {isError ? "Close" : "Proceed"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RegisterComponent;
