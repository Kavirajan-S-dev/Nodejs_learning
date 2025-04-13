const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./student.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error("Database connection failed:", err.message);
    }
    console.log("Connection established");
});

const query = `
CREATE TABLE IF NOT EXISTS Student (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    major TEXT NOT NULL
)
`;

db.run(query, [], (err) => {
    if (err) {
        return console.error("Table creation failed:", err.message);
    }
    console.log("Table created or already exists");
});

module.exports = db;
