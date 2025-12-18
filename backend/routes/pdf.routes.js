const express = require('express');
const router = express.Router();
const connectDB = require('../db');
const multer = require('multer');
const path = require('path');

let db;
(async () => {
  db = await connectDB();
  console.log("✅ MySQL Connected (pdf)");
})();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'), // folder on your backend
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// ===== ADD PDF (with file upload) =====
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
    res.status(500).json(err);
  }
});

// ===== LIST PDF =====
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

// ===== UPDATE PDF =====
// Optional: If you want to allow file replacement on update
router.put('/update/:id', upload.single('file'), async (req, res) => {
  const pdfId = req.params.id;
  const { title } = req.body;
  const file = req.file;

  if (!title) return res.status(400).json({ message: 'Title required' });

  let fileUrl;
  if (file) {
    fileUrl = `/uploads/${file.filename}`;
  } else {
    // Keep existing URL if no file uploaded
    const [rows] = await db.query('SELECT url FROM pdf_links WHERE id = ?', [pdfId]);
    if (rows.length === 0) return res.status(404).json({ message: 'PDF not found' });
    fileUrl = rows[0].url;
  }

  try {
    const [result] = await db.query(
      'UPDATE pdf_links SET title = ?, url = ? WHERE id = ?',
      [title, fileUrl, pdfId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'PDF not found' });

    res.json({ id: Number(pdfId), title, url: fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ===== DELETE PDF =====
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
