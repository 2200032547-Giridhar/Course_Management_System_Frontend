import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './LoginComponent.css';

function LoginComponent() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    // Handles input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // Handles form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://coursemanagementsystembackend-production.up.railway.app/api/v1/users/login',
                credentials
            );

            const { id, role, token } = response.data;

            // Save user info to localStorage
            localStorage.setItem(
                'user',
                JSON.stringify({ id, role, token })
            );

            setPopupMessage(`Login successful! Welcome, ${role}`);
            setIsError(false);
            setShowPopup(true);

            // Redirect to the respective dashboard after modal closes
            setTimeout(() => {
                if (role === 'STUDENT') {
                    navigate(`/student-dashboard/${id}`);
                } else if (role === 'FACULTY') {
                    navigate(`/faculty-dashboard/${id}`);
                } else if (role === 'ADMIN') {
                    navigate(`/admin-dashboard/${id}`);
                }
            }, 1500); // Short delay to show success modal
        } catch (error) {
            console.error('Login error:', error.response || error.message);

            setPopupMessage(
                error.response?.data?.message || 'Invalid email or password!'
            );
            setIsError(true);
            setShowPopup(true);
        }
    };

    // Closes the modal
    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="login-page">
            {/* Background Video */}
            <video autoPlay loop muted className="background-video">
                <source
                    src="https://assets.mixkit.co/videos/31549/31549-720.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Login Form */}
            <div className="form-container">
                <h2 className="form-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-box">
                        <div className="input-field">
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                aria-label="Email"
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                aria-label="Password"
                            />
                            <label>Password</label>
                        </div>
                        <button type="submit" className="form-button">
                            Login
                        </button>
                    </div>
                </form>
                <div className="create-account-container">
                    <p>Don't have an account?</p>
                    <button
                        className="form-button"
                        onClick={() => navigate('/register')}
                    >
                        Create Account
                    </button>
                </div>
            </div>

            {/* Popup Modal */}
            <Modal
                show={showPopup}
                onHide={closePopup}
                centered
                aria-labelledby="modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">
                        {isError ? 'Error' : 'Success'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{popupMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={isError ? 'danger' : 'success'}
                        onClick={closePopup}
                    >
                        {isError ? 'Close' : 'Proceed'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginComponent;
