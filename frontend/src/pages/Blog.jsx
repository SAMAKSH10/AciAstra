import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { toast } from 'react-toastify';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BLOG_API_URL); // Replace with your actual blog API URL
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        toast.error('Failed to load blogs');
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Blogs</h1>
      <section className='mb-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {blogs.length > 0 ? (
            blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <p>No blogs available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
