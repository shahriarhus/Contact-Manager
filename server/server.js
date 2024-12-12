const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');

// Initialize app and middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/contacts', contactRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contact_manager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Start server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
