const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Setup SQLite database
const db = new sqlite3.Database('./contactMessages.db');

// Route to handle form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, phone, appointment, message } = req.body;
    const stmt = db.prepare(`INSERT INTO contactMessages (name, email, phone, appointment, message) VALUES (?, ?, ?, ?, ?)`);
    stmt.run([name, email, phone, appointment, message], function(err) {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).send('Error saving message.');
        }
        res.status(200).send('Message saved successfully.');
    });
    stmt.finalize();
});

// Route to get all contact messages
app.get('/api/messages', (req, res) => {
    db.all(`SELECT * FROM contactMessages`, (err, rows) => {
        if (err) {
            console.error('Error retrieving messages:', err);
            return res.status(500).send('Error retrieving messages.');
        }
        res.status(200).json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

