import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_COURSE_URL);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BLOG_API_URL);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchCourses();
    fetchBlogs();

    // Set up polling to refetch data every 60 seconds (or adjust as needed)
    const interval = setInterval(() => {
      fetchCourses();
      fetchBlogs();
    }, 30000); // 60 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white text-gray-800 py-28 text-center border-b border-gray-200 mb-12 shadow-lg">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Learning Platform</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto font-semibold text-gray-500">
          Explore a variety of courses and insightful blogs to expand your knowledge and enhance your skills.
        </p>
        <button className="bg-blue-500 text-white px-8 py-4 font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-md">
          Get Started
        </button>
      </section>

      <div className="container w-screen lg:px-14 py-20 bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Featured Courses</h2>

        {/* Featured Courses Section */}
        <section className="mb-16 p-10 py-28 bg-gray-200 rounded-lg ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.filter(course => course.discount > 0).length > 0 ? (
              courses.filter(course => course.discount > 0).map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="text-gray-800 font-semibold text-center w-100">
                No featured courses available.
              </p>
            )}
          </div>
        </section>

        {/* Featured Blogs Section */}
        <h2 className="text-4xl font-bold text-gray-800 mb-8 pt-10">Latest Blogs</h2>
        <section className="mb-16 bg-gray-200 p-10 py-28 rounded-lg ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className='text-gray-700 font-semibold text-center'>Loading blogs...</p>
            ) : blogs.length > 0 ? (
              blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-gray-800 font-semibold text-center w-100">
                No blogs available.
              </p>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
