import React from "react";

const CourseCard = ({ course }) => {
  const { title, description, price, discount } = course;
  const discountedPrice = (price * (1 - discount / 100)).toFixed(2);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 h-auto p-5 flex flex-col">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full self-start mb-3">
          {discount}% OFF
        </span>
      )}

      {/* Course Title */}
      <h4 className="text-lg font-semibold text-gray-900 text-center mb-4">Title : {title}</h4>

      {/* Course Description */}
      <p className="text-xs text-gray-600 text-center mb-6 px-4 font-semibold">Description: {description}</p>

      {/* Price Section */}
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-gray-900">
          ${discountedPrice}
          <span className="text-sm text-gray-500 line-through ml-2">${price}</span>
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-600 transition-all">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
