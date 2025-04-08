const express = require('express');
const multer = require('multer');
const Ticket = require('../models/Ticket');
const Ajv = require('ajv');
const ajv = new Ajv();
const fs = require('fs');

const router = express.Router();

// Set up Multer for file upload
const upload = multer({ dest: 'uploads/' });

// JSON Schema for validation
const ticketSchema = {
  type: 'object',
  required: ['tickets'],
  properties: {
    tickets: {
      type: 'array',
      items: {
        type: 'object',
        required: ['subject', 'description', 'team', 'status'],
        properties: {
          subject: { type: 'string' },
          description: { type: 'string' },
          team: { type: 'string' },
          status: { type: 'string' }
        }
      }
    }
  }
};

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    const data = JSON.parse(fileContent);
    const validate = ajv.compile(ticketSchema);
    const valid = validate(data);

    if (!valid) {
      return res.status(400).json({ errors: validate.errors });
    }

    const result = await Ticket.insertMany(data.tickets);
    res.json({ message: `${result.length} tickets successfully imported.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    fs.unlinkSync(req.file.path); // cleanup uploaded file
  }
});

module.exports = router;
