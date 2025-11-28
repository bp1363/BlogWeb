const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Brajpal@1363',
    database: 'BlogDB',
    port: 3306
});
console.log('✅ MySQL Connected (pdf)');

// ================= ADD PDF =================
router.post('/add', (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) return res.status(400).json({ message: 'Title and URL required' });

  const sql = 'INSERT INTO pdf_links (title, url) VALUES (?, ?)';
  db.query(sql, [title, url], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, title, url });
  });
});

// ================= GET ALL PDFs =================
router.get('/list', (req, res) => {
  const sql = 'SELECT * FROM pdf_links ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ================= UPDATE PDF =================
router.put('/update/:id', (req, res) => {
  const pdfId = req.params.id;
  const { title, url } = req.body;

  if (!title || !url) return res.status(400).json({ message: 'Title and URL required' });

  const sql = 'UPDATE pdf_links SET title = ?, url = ? WHERE id = ?';
  db.query(sql, [title, url, pdfId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'PDF not found' });
    res.json({ id: Number(pdfId), title, url });
  });
});

// ================= DELETE PDF =================
router.delete('/delete/:id', (req, res) => {
  const pdfId = req.params.id;

  const sql = 'DELETE FROM pdf_links WHERE id = ?';
  db.query(sql, [pdfId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'PDF not found' });
    res.json({ message: 'PDF deleted successfully', id: Number(pdfId) });
  });
});

module.exports = router;
