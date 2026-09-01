const { Pool } = require('pg');
require('dotenv').config();

const hasDatabaseConfig = () => {
  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  return Boolean(host && host !== 'localhost' ? true : host) &&
    Boolean(database && database !== 'wecow_db' ? true : database) &&
    Boolean(user && user !== 'postgres' ? true : user) &&
    Boolean(password && password !== 'your_password' ? true : password);
};

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    if (!hasDatabaseConfig()) {
      console.warn('Database is not configured. Continuing in demo mode without PostgreSQL.');
      return;
    }

    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.warn('Database unavailable. Continuing without persistent storage:', error.message);
  }
};

module.exports = { pool, initializeDatabase };
