const dotenv = require("dotenv");
const app = require("./index");
const db = require('./db.config');

// Load environment variables
// dotenv.config({path:"."});path can be added
dotenv.config();

const { PORT, HOST, NODE_ENV } = process.env;

function ensureTableExists() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(20),
            age VARCHAR(3),
            major VARCHAR(20)
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error("Error creating table:", err);
        } else {
            console.log("Table 'students' ensured");
        }
    });
}

app.listen(PORT, HOST, async (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        await db.connect((err) => {
            if (err) {
                console.error("Failed to create database:", err);
                return;
            }
            else {
                console.log("Database connection successfull");
                ensureTableExists();
            }
        });
        console.log(`Server started in ${NODE_ENV} mode: http://${HOST}:${PORT}`);
    }
});
