import React from 'react';
import { editBlog, deleteBlog } from '../../api';
import { toast } from 'react-toastify';

const BlogList = ({ blogs, fetchBlogs }) => {
  
  const getDeleteData = async (id) => {
    try {
      await deleteBlog(id);
      toast.success('Data deleted successfully');
      fetchBlogs(); // Refetch data after deletion
    } catch (err) {
      console.error("Error in deleting the data:", err);
      toast.error('Error deleting data');
    }
  };

  const getEditData = async (id,updatedData) => {
    try {
      await editBlog(id,updatedData);
      toast.success('Data edited successfully');
      fetchBlogs(); // Refetch data after editing
    } catch (err) {
      console.error("Error in editing the data:", err);
      toast.error('Error editing data');
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 mt-10">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="flex bg-white shadow-md hover:shadow-lg transition-shadow duration-300 mb-8 rounded-lg overflow-hidden"
        >
          {/* Left Side: Image */}
          <div className="w-1/4">
            <img
              src={blog.imageUrl || "https://pcicompliancehub.com/wp-content/uploads/masteriyo/placeholder.jpg"}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-3/4 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">Title : {blog.title}</h2>
              <p className="text-gray-600 mb-6 line-clamp-3">Description : {blog.description}</p>
              <p className="font-semibold text-sm text-gray-500">
                Status: <span className="text-gray-700">{blog.status}</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={() => getEditData(blog.id,{ title: blog.title, description: blog.description,status:blog.status })} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                Edit
              </button>
              <button 
                onClick={() => getDeleteData(blog.id)} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
