const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST - Submit contact form
router.post('/', contactController.submitContact);

// GET - Get all contacts (admin)
router.get('/', contactController.getAllContacts);

// GET - Get contact by ID
router.get('/:id', contactController.getContactById);

// PUT - Update contact status
router.put('/:id', contactController.updateContactStatus);

module.exports = router;
