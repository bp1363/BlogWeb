const express = require('express');
const path = require('path');

const corsMiddleware = require('./middlewares/cors.middleware');
const bodyParserMiddleware = require('./middlewares/body-parser.middleware');

const blogRoutes = require('./routes/blog.routes');
const quoteRoutes = require('./routes/quote.routes');
const pdfRoutes = require('./routes/pdf.routes');
const app = express();


app.use(corsMiddleware);
app.use(bodyParserMiddleware);


app.use('/blogs', blogRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/pdfs', pdfRoutes);


const angularDistPath = path.join(__dirname, 'dist/my-app'); 
app.use(express.static(angularDistPath));


app.use((req, res, next) => {
  if (!req.path.startsWith('/blogs') && !req.path.startsWith('/api/quotes')) {
    res.sendFile(path.join(angularDistPath, 'index.html'));
  } else {
    next();
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
