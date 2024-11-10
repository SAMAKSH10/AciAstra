// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import PaymentForm from './components/PaymentForm';
import AdminDashBoard from './pages/AdminDashBoard';
import BlogEditor from './pages/BlogEditor';
import CourseEditor from './components/CourseEditor';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Load the Stripe API with your publishable key
const stripePromise = loadStripe('your_publishable_key');

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/admin/blog-editor" element={<BlogEditor />} />
        <Route path="/admin/course-editor" element={<CourseEditor />} />
        {/* Payment route */}
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentForm amount={5000} /> {/* Adjust the amount dynamically as needed */}
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
