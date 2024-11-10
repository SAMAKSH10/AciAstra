// routes/courses.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new course
router.post('/', async (req, res) => {
  const { title, description, price, discount } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO courses (title, description, price, discount) VALUES (?, ?, ?, ?)',
      [title, description, price, discount]
    );
    res.json({ success: true, courseId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, discount } = req.body;
  try {
    await db.query(
      'UPDATE courses SET title = ?, description = ?, price = ?, discount = ? WHERE id = ?',
      [title, description, price, discount, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const [courses] = await db.query('SELECT * FROM courses');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
});

module.exports = router;
