// routes/payments.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Endpoint to create a Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body; // Amount should be in the smallest currency unit

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card', 'upi'],  // Allows both card and UPI
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

module.exports = router;
