const { pool } = require('../config/database');

class Contact {
  // Create a new contact submission
  static async create(name, email, message) {
    try {
      const result = await pool.query(
        'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [name, email, message]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  // Get all contacts (for admin)
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }

  // Get contact by ID
  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  }

  // Update contact status
  static async updateStatus(id, status) {
    try {
      const result = await pool.query(
        'UPDATE contacts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [status, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  // Delete contact
  static async delete(id) {
    try {
      await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}

module.exports = Contact;
