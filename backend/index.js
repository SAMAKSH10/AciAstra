// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const courseRoutes = require('./routes/courses');
const purchaseRoutes = require('./routes/purchases');
const paymentRoutes = require('./routes/payments');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blog');  // Import blog routes

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.use('/api/courses', courseRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);  // Register blog routes

app.listen(3000, () => console.log('Server running on port 3000'));
