const express = require('express');
const router = express.Router();
const connectDB = require('../db');

let db;

(async () => {
  db = await connectDB();
  console.log("✅ MySQL Connected (pdf)");
})();

// ADD PDF
router.post('/add', async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url)
    return res.status(400).json({ message: 'Title and URL required' });

  try {
    const [result] = await db.query(
      'INSERT INTO pdf_links (title, url) VALUES (?, ?)',
      [title, url]
    );

    res.status(201).json({ id: result.insertId, title, url });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// LIST PDF
router.get('/list', async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM pdf_links ORDER BY created_at DESC'
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE PDF
router.put('/update/:id', async (req, res) => {
  const pdfId = req.params.id;
  const { title, url } = req.body;

  if (!title || !url)
    return res.status(400).json({ message: 'Title and URL required' });

  try {
    const [result] = await db.query(
      'UPDATE pdf_links SET title = ?, url = ? WHERE id = ?',
      [title, url, pdfId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'PDF not found' });

    res.json({ id: Number(pdfId), title, url });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE PDF
router.delete('/delete/:id', async (req, res) => {
  const pdfId = req.params.id;

  try {
    const [result] = await db.query(
      'DELETE FROM pdf_links WHERE id = ?',
      [pdfId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'PDF not found' });

    res.json({ message: 'PDF deleted successfully', id: Number(pdfId) });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
