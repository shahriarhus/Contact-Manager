const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Create a new contact
router.post('/', async (req, res) => {
  const { name, email, number } = req.body;
  const contact = new Contact({ name, email, number });
  
  try {
    await contact.save();
    res.status(201).send(contact);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send('Contact not found');
    res.status(200).send(contact);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedContact);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send('Contact deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
