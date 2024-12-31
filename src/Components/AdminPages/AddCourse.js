import React, { useState } from 'react';
import axios from 'axios';
import './AddCourse.css';

const AddCourse = ({ onClose }) => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses';
  const CREATE_COURSE_API = `${API_URL}/create-course`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

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

    try {
      const response = await axios.post(CREATE_COURSE_API, newCourse);
      console.log('Course created successfully:', response.data);
      onClose(); // Close modal after success
    } catch (err) {
      setError('Failed to add course. Please try again.');
      console.error('Error creating course:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="course-add-modal">
      <div className="course-modal-container">
        <h2>Add New Course</h2>
        {error && <div className="error-message">{error}</div>}
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
              onChange={(e) => setEnrollmentCount(Number(e.target.value))}
              min="0"
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
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0"
              required
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="0"
              max="5"
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
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Course'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
