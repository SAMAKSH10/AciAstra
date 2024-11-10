import React from 'react';

const BlogCard = ({ blog }) => {
  const { title, description, publishDate } = blog;

  // Check if createdAt is a Firebase Timestamp or regular ISO string, then format the date
  const formattedDate = publishDate
    ? new Date(publishDate.seconds * 1000).toLocaleDateString() // Firebase Timestamp conversion
    : "Date not available";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative text-black">
      {/* Blog Title */}
      <h4 className="text-xl font-semibold mb-3 text-gray-800 hover:text-blue-500 transition-colors">{title}</h4>
      
      {/* Blog Description */}
      <p className="text-sm text-gray-600 mb-6">{description || 'No description available'}</p>

      {/* Blog Date */}
      <span className="text-sm text-gray-500 absolute bottom-4 left-4">{formattedDate}</span>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 hover:opacity-10 transition-opacity"></div>
    </div>
  );
};

export default BlogCard;
