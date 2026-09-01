-- WECOW LTD - PostgreSQL Database Setup Script
-- Run this in pgAdmin Query Tool or psql to create the database and tables

-- Create the database
CREATE DATABASE wecow_db;

-- Connect to the database
\c wecow_db;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Insert a test contact (optional)
INSERT INTO contacts (name, email, message, status) 
VALUES ('Test User', 'test@example.com', 'This is a test message', 'new');

-- Verify the table was created
SELECT * FROM contacts;

-- Display table structure
\d contacts;
