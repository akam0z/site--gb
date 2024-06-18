const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contactMessages.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contactMessages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        appointment TEXT,
        message TEXT,
        date TEXT DEFAULT CURRENT_TIMESTAMP
    )`);
});

db.close();
console.log('Database setup complete.');

