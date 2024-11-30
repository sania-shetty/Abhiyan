// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/abhiyan')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a schema for the form data
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  nationality: String,
  age: Number,
  city: String,
  area: String,
  income: Number,
  caste: String,
});

// Create a model based on the schema
//const User = mongoose.model('User', userSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    // Extract data from the request body
    const { firstname, lastname, nationality, age, city, area, income, caste } = req.body;

    // Create a new user document
    const newUser = new User({
      firstname,
      lastname,
      nationality,
      age,
      city,
      area,
      income,
      caste,
    });

    // Save the document to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

module.exports = {
  getDetails: () => {
      return "Details from details.js";
  }
};
