const express = require('express');
const path = require('path');

const corsMiddleware = require('./middlewares/cors.middleware');
const bodyParserMiddleware = require('./middlewares/body-parser.middleware');

const blogRoutes = require('./routes/blog.routes');
const quoteRoutes = require('./routes/quote.routes');
const pdfRoutes = require('./routes/pdf.routes');
const app = express();

// Apply middlewares
app.use(corsMiddleware);
app.use(bodyParserMiddleware);

// API Routes
app.use('/blogs', blogRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/pdfs', pdfRoutes);

// Serve Angular static files
const angularDistPath = path.join(__dirname, 'dist/my-app'); // replace 'my-app' with your Angular output folder
app.use(express.static(angularDistPath));

// SPA Fallback: send index.html for unknown frontend routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/blogs') && !req.path.startsWith('/api/quotes')) {
    res.sendFile(path.join(angularDistPath, 'index.html'));
  } else {
    next();
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
