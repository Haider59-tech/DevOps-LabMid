const express = require('express');
const app = express();
app.use(express.json());

let submissions = []; // Temporary storage for submissions

app.post('/submit', (req, res) => {
    const { name, regNo, title, url } = req.body;
    
    // Validate missing fields (Requirement: Missing registration number)
    if (!name || !regNo || !title || !url) {
        return res.status(400).json({ error: "Missing required fields. Registration number, name, title, and URL are required." });
    }
    
    // Validate URL format (Requirement: Invalid submission URL)
    try {
        new URL(url); 
    } catch (err) {
        return res.status(400).json({ error: "Invalid submission URL." });
    }
    
    // Save valid submission
    const submission = { name, regNo, title, url };
    submissions.push(submission);
    res.status(201).json({ message: "Broken submission", submission });
});

app.get('/submissions', (req, res) => {
    res.json(submissions); // Displays saved submissions
});

module.exports = app;