import React, { useState, useEffect } from 'react';
import './UpdateCourse.css';

function UpdateCourse({ courseId, onClose, onUpdate }) {
  const [course, setCourse] = useState({
    courseName: '',
    description: '',
    duration: '',
    enrollmentCount: 0,
    image: '',
    price: 0,
    rating: 0,
    category: '',
  });

  useEffect(() => {
    // Fetch the course data from the API when the modal opens
    fetch(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data); // Set the course data from the API to state
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
        alert('Error fetching course data.');
      });
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated course data back to the API
    fetch(`https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/update/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    })
      .then((response) => {
        if (response.ok) {
          alert('Course updated successfully!');
          onUpdate(course); // Update the course list with the new data
          onClose(); // Close the modal
        } else {
          alert('Error updating course!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while updating the course.');
      });
  };

  return (
    <div className="course-update-modal">
      <div className="course-update-container">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Course Name:</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Enrollment Count:</label>
            <input
              type="number"
              name="enrollmentCount"
              value={course.enrollmentCount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={course.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={course.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={course.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Update Course</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCourse;
