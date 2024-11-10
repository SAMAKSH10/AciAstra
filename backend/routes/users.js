const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Add a new user (Create)
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
});

// Get all users (Read)
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users', details: err.message });
  }
});

// Get a single user by ID (Read)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user', details: err.message });
  }
});

// Update a user by ID (Update)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  
  let query = 'UPDATE users SET ';
  const params = [];

  if (name) {
    query += 'name = ?, ';
    params.push(name);
  }
  
  if (email) {
    query += 'email = ?, ';
    params.push(email);
  }
  
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += 'password = ?, ';
    params.push(hashedPassword);
  }
  
  query = query.slice(0, -2); // Remove trailing comma
  query += ' WHERE id = ?';
  params.push(id);

  try {
    const [result] = await db.query(query, params);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
});

// Delete a user by ID (Delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
});

module.exports = router;
