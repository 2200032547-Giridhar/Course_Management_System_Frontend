import React, { useState, useEffect } from "react";
import "./UpdateUser.css";

function UpdateUser({ userId, onClose }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Fetch user data based on userId and update state
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data.");
      });
  }, [userId]);

  // Handle changes to form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request with updated user data
    fetch(`http://localhost:8080/api/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          alert("User updated successfully!");
          onClose(); // Close the modal after successful update
        } else {
          alert("Error updating user!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the user.");
      });
  };

  return (
    <div className="update-form-modal">
      <div className="update-form-container">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName} // Display fetched data
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName} // Display fetched data
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email} // Display fetched data
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password} // Display fetched data
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
