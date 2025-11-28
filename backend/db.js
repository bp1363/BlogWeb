// server/db.js
const mysql = require('mysql2/promise');

let db;
async function connectDB() {
  if (db) return db; // Reuse connection
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Brajpal@1363',
    database: 'BlogDB',
    port: 3306
  });
  console.log('✅ MySQL Connected');
  return db;
}

module.exports = connectDB;
