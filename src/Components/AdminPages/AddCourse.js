import React, { useState } from 'react';
import axios from 'axios';
import "./AddCourse.css";

const AddCourse = ({ onClose }) => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');

  const API_URL = 'http://localhost:8080/api/v1/courses';
  const CREATE_COURSE_API = `${API_URL}/create-course`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      courseName,
      description,
      duration,
      enrollmentCount,
      image,
      price,
      rating,
      category,
    };

    axios
      .post(CREATE_COURSE_API, newCourse)
      .then((response) => {
        onClose(); // Close modal after success
      })
      .catch((error) => {
      });
  };

  return (
    <div className="course-add-modal">
      <div className="course-modal-container">
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Duration:</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Enrollment Count:</label>
            <input
              type="number"
              value={enrollmentCount}
              onChange={(e) => setEnrollmentCount(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Add Course</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
