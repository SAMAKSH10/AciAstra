const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the db connection

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blogs');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Create a new blog
router.post('/', async (req, res) => {
  const { title, description, publishDate } = req.body; // Matching frontend fields
  try {
    const [result] = await db.query(
      'INSERT INTO blogs (title, content, created_at) VALUES (?, ?, ?)',
      [title, description, publishDate]
    );
    const newBlog = { id: result.insertId, title, content: description, created_at: publishDate };
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog' });
  }
});

// Update a blog by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  try {
    await db.query('UPDATE blogs SET title = ?, content = ?, author = ? WHERE id = ?', [title, content, author, id]);
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog' });
  }
});

// Delete a blog by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM blogs WHERE id = ?', [id]);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

module.exports = router;
