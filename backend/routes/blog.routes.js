const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

let db;
(async () => {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Brajpal@1363',
    database: 'BlogDB',
    port: 3306
  });
  console.log('✅ MySQL Connected (Blog)');
})();

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blogs ORDER BY createdAt DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM blogs WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Blog not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create blog
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content required' });

  try {
    const [result] = await db.query('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content]);
    res.json({ id: result.insertId, title, content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update blog
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content required' });

  try {
    const [result] = await db.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Blog not found' });
    res.json({ id, title, content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete blog
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM blogs WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
