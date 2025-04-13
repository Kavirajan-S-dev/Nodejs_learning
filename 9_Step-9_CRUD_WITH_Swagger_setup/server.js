const dotenv = require("dotenv");
const app = require("./index");
const db = require('./db.config');

// Load environment variables
// dotenv.config({path:"."});path can be added
dotenv.config();

const { PORT, HOST, NODE_ENV } = process.env;

async function ensureTableExists() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS student (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            age VARCHAR(10),
            major VARCHAR(100)
        );`;
    await db.query(createTableQuery).then(() => console.log('Table "student" is ready'))
        .catch(err => console.error('Table creation error:', err.message));
};

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