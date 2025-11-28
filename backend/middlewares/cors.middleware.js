const cors = require('cors');

module.exports = cors({
  origin: '*', // allow all origins or specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
});
