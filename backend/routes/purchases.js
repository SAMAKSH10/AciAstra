// routes/purchases.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const sendOtp = require('../utils/sendOtp');  // Separate file to handle OTP sending

// Create a new purchase
router.post('/', async (req, res) => {
  const { userId, courseId, amountPaid, phone } = req.body; // Added phone for OTP
  try {
    const [result] = await db.query('INSERT INTO purchases (user_id, course_id, amount) VALUES (?, ?, ?)', [userId, courseId, amountPaid]);
    
    // Send OTP for verification (Dummy for now)
    const otp = '123456';  // Replace with dynamically generated OTP
    sendOtp(phone, otp);

    res.status(201).json({ purchaseId: result.insertId, message: 'OTP sent for verification' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify purchase with OTP (dummy verification for now)
router.post('/verify', async (req, res) => {
  const { purchaseId, otp } = req.body;
  // Assuming OTP verification logic here
  if (otp === '123456') {
    await db.query('UPDATE purchases SET status = "completed" WHERE id = ?', [purchaseId]);
    res.json({ message: 'Purchase verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
