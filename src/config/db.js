/**
 * RouteCraft - Regional Day-Trip Planning System
 * Database Connection Pool Configuration
*/

const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool for concurrent query handling (REQ-NF-04)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'routecraft_db',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Test connection on server initialization
pool.getConnection()
  .then((conn) => {
    console.log('[RouteCraft DB] Successfully connected to MySQL database (routecraft_db)');
    conn.release();
  })
  .catch((err) => {
    console.error('[RouteCraft DB Error] Could not connect to MySQL:', err.message);
  });

module.exports = pool;