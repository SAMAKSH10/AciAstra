import React from 'react';
import { editData, deleteData } from '../../api';
import { toast } from 'react-toastify';

const CourseList = ({ courses, fetchCourses }) => {
  const handleDeleteCourse = async (id) => {
    try {
      await deleteData(id); // Call delete function
      toast.success('Course deleted successfully');
      fetchCourses(); // Refresh course list after deletion
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error('Error deleting course');
    }
  };

  const handleEditCourse = async (id, updatedData) => {
    try {
      await editData(id, updatedData); // Call edit function with data
      toast.success('Course edited successfully');
      fetchCourses(); // Refresh course list after editing
    } catch (err) {
      console.error("Error editing course:", err);
      toast.error('Error editing course');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 mt-10">
      {courses.map((course) => (
        <div key={course.id} className="flex bg-white shadow-md hover:shadow-lg transition-shadow duration-300 mb-8 rounded-lg overflow-hidden">
          <div className="w-1/4">
            <img src={course.imageUrl || "https://pcicompliancehub.com/wp-content/uploads/masteriyo/placeholder.jpg"} alt={course.title} className="w-full h-full object-cover" />
          </div>
          <div className="w-3/4 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">{course.title}</h2>
              <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
              <p className="font-semibold text-sm text-gray-500">
                Status: <span className="text-gray-700">{course.status}</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={() => handleEditCourse(course.id, { title: course.title, description: course.description })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteCourse(course.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
