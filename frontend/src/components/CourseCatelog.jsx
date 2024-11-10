// CourseCatalog.jsx
import React, { useState, useEffect } from 'react';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data from the backend (replace with actual API)
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="course-catalog">
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            {course.discount && (
              <p>Discount: {course.discount}% off</p>
            )}
            <button onClick={() => handleCourseSelect(course.id)}>Select Course</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Handle course selection
const handleCourseSelect = (courseId) => {
  // Redirect to checkout with selected course ID
  window.location.href = `/checkout/${courseId}`;
};

export default CourseCatalog;