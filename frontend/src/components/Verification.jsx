// Verification.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Verification = () => {
  const { courseId } = useParams();
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP check - placeholder
    if (otp === '123456') {
      setVerified(true);
    } else {
      alert('Incorrect OTP, please try again.');
    }
  };

  return (
    <div className="verification">
      {!verified ? (
        <form onSubmit={handleOtpSubmit}>
          <h2>Two-Step Verification</h2>
          <p>An OTP has been sent to your email.</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify</button>
        </form>
      ) : (
        <div>
          <h2>Verification Successful!</h2>
          <p>Your course purchase is complete.</p>
        </div>
      )}
    </div>
  );
};

export default Verification;
