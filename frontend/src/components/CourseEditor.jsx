import React, { useState } from 'react';
import { toast } from 'react-toastify';

function CourseEditor({ onSave, setCourseStatus }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSave = async () => {
    if (!title || !description || !price || !discount) {
      toast.error("All fields are required.");
      return;
    }

    const courseData = { title, description, price, discount };
  
    try {
      const response = await fetch(import.meta.env.VITE_COURSE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
  
      if (!response.ok) {
        console.error(`API call failed with status: ${response.status}`);
        throw new Error('Failed to save course');
      }
  
      // On successful save
      onSave && onSave(courseData);
      toast.success('Course saved successfully');
      setTitle('');
      setDescription('');
      setPrice('');
      setDiscount('');
      setCourseStatus(false);  // Close modal after saving
    } catch (err) {
      console.error('Error saving course:', err);
      toast.error('Failed to save course');
    }
  };

  // Function to handle modal close
  const handleClose = () => {
    setCourseStatus(false);
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 w-screen h-screen'>
      <div className="p-6 rounded-lg shadow-lg bg-gray-100 shadow-gray-600">
        <h2 className="text-2xl font-bold mb-4 text-gray-950 pt-3">Add or Edit Course</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-gray-200 outline-none text-gray-950"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-gray-200 outline-none text-gray-950"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-gray-200 outline-none text-gray-950"
        />
        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-gray-200 outline-none text-gray-950"
        />
        <div className='flex space-x-8 pt-6 '>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Save Course
          </button>
          <button
            onClick={handleClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseEditor;
