const Contact = require('../models/Contact');
const { sendAdminNotification, sendUserConfirmation } = require('../config/mail');

// Handle contact form submission
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    let contact = { id: null };
    let dbSaved = false;

    try {
      contact = await Contact.create(name, email, message);
      dbSaved = true;
    } catch (dbError) {
      console.warn('Database save skipped:', dbError.message);
    }

    const adminResult = await sendAdminNotification({ name, email, message });
    const userResult = await sendUserConfirmation(email, name);

    const responseMessage = dbSaved
      ? 'Your message has been received. We will get back to you soon.'
      : 'Your message has been received in demo mode. Add your PostgreSQL and Gmail credentials in server/.env to enable full email delivery.';

    res.status(201).json({
      success: true,
      message: responseMessage,
      contactId: contact.id,
      emailDelivery: {
        admin: adminResult?.skipped ? 'skipped' : 'sent',
        user: userResult?.skipped ? 'skipped' : 'sent',
      },
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

// Get all contacts (admin only)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAll();
    res.json({ success: true, contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.getById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true, contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const contact = await Contact.updateStatus(id, status);
    res.json({ success: true, message: 'Contact status updated', contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
};
