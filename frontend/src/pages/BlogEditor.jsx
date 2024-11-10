import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from "react-icons/fa";

function BlogEditor({ setBlogStatus, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');

  const handleSave = async() => {


    if (!title || !description || !publishDate) {
      toast.error("All fields are required.");
      return;
    }

    const blogData = { title, description, publishDate };
  
    try {
      const response = await fetch(import.meta.env.VITE_BLOG_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
  
      if (!response.ok) {
        console.error(`API call failed with status: ${response.status}`);
        throw new Error('Failed to save blog');
      }
  
      onSave&&onSave(blogData);
      toast.success('Blog saved successfully!');
      setTitle('');
      setDescription('');
      setPublishDate('');
    } catch (err) {
      console.error('Error in saving the blog data', err);
      toast.error('Error in saving the blog');
    }
  };

  const handleClose = () => {
    setBlogStatus(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="p-6 rounded-lg shadow-lg bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">New Blog Post</h2>
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-gray-200 text-gray-900 outline-none border-gray-400 focus:outline-gray-400"
        />
        
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md bg-gray-200 text-gray-900 outline-none border-gray-400 focus:outline-gray-400"
        ></textarea>
        
        <div className="relative">
          <input
            type="datetime-local"
            value={publishDate}
            onChange={e => setPublishDate(e.target.value)}
            className="border p-2 mb-4 w-full rounded-md bg-gray-200 text-gray-900 outline-none border-gray-400 focus:outline-gray-400"
          />
          <FaCalendarAlt className="absolute top-1/3 right-3 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
        </div>

        <div className="flex space-x-4 mt-5">
          <button onClick={handleSave} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Post
          </button>
          <button onClick={handleClose} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;
