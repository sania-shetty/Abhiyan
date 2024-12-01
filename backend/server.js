const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userdetails=require("./details")
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/abhiyan'; // Replace with your MongoDB URI
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.use('/',userdetails)

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error saving user' });
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).send({ message: 'Sign-in successful' });
        } else {
            res.status(400).send({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error signing in' });
    }
});

/* const details = require('./details'); // Import details.js
console.log(details.getDetails());


app.get('/', (req, res) => {
    res.send(details.getDetails());
}); */

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });


// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
