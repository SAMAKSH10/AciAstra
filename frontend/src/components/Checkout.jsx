// Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Fetch course details by ID from the backend (replace with actual API)
    fetch(`/api/courses/${courseId}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error fetching course:', error));
  }, [courseId]);

  const handleConfirmSelection = () => setStep(2);
  const handlePaymentSubmit = () => setStep(3);

  return (
    <div className="checkout">
      {step === 1 && course && (
        <div>
          <h2>Confirm Your Course</h2>
          <p>{course.title}</p>
          <p>Price: ${course.price}</p>
          <button onClick={handleConfirmSelection}>Confirm Selection</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Payment Details</h2>
          <form onSubmit={handlePaymentSubmit}>
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="Expiry Date" required />
            <input type="text" placeholder="CVV" required />
            <button type="submit">Submit Payment</button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Order Confirmed!</h2>
          <p>Redirecting to Two-Step Verification...</p>
          {navigate(`/verify/${courseId}`)}
        </div>
      )}
    </div>
  );
};

export default Checkout;
