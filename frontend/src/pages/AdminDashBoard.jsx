import React, { useEffect, useState } from 'react';
import BlogList from '../components/BlogList';
import { toast } from 'react-toastify';
import BlogEditor from './BlogEditor';
import CourseEditor from '../components/CourseEditor';
import CourseList from '../components/CourseList';

const AdminDashBoard = () => {
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isBlogOpen, setBlogStatus] = useState(false);
  const [isCourseOpen, setCourseStatus] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BLOG_API_URL);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      toast.error('Error in fetching blogs');
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_COURSE_API_URL);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      toast.error('Error in fetching courses');
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCourses();
  }, []);

  const onSaveBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    setBlogStatus(false);
  };

  const onSaveCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setCourseStatus(false);
  };

  return (
    <div className="bg-gray-100 h-screen w-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white py-3 px-6 fixed top-0 w-full z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="space-x-4 flex">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() => setBlogStatus(true)}
            >
              Create Blog
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
              onClick={() => setCourseStatus(true)}
            >
              Create Course
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col pt-24 px-6 space-y-12">
        <div className="w-full">
          <h2 className="text-gray-800 text-2xl font-semibold mb-4">Blogs</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            {blogs.length > 0 ? (
              <div className="overflow-y-auto max-h-80">
                <BlogList blogs={blogs} fetchBlogs={fetchBlogs} />
              </div>
            ) : (
              <p className="text-gray-500 text-center">No blogs available.</p>
            )}
          </div>
        </div>

        <div className="w-full pb-10">
          <h2 className="text-gray-800 text-2xl font-semibold mb-4">Courses</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            {courses.length > 0 ? (
              <div className="overflow-y-auto max-h-80">
                <CourseList courses={courses} fetchCourses={fetchCourses} />
              </div>
            ) : (
              <p className="text-gray-500 text-center">No courses available.</p>
            )}
          </div>
        </div>
      </div>

      {isBlogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl">
            <BlogEditor setBlogStatus={setBlogStatus} onSave={onSaveBlog} />
          </div>
        </div>
      )}

      {isCourseOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-xl">
            <CourseEditor setCourseStatus={setCourseStatus} onSave={onSaveCourse} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
