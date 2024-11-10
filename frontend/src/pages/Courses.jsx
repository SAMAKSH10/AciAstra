import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_COURSE_URL); // Replace with your actual course API URL
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
    <Navbar/>
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Courses</h1>
      <section className='mb-10'>
        <h3 className='text-2xl mb-4'>Available Courses</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-80'>
          {courses.length > 0 ? (
            courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p>No courses available at the moment.</p>
          )}
        </div>
      </section>
    </div>
    </>
    
  );
};

export default Course;
