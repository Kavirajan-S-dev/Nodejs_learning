const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

// Load environment variables
dotenv.config();

const { PORT, HOST, NODE_ENV } = process.env; // To access .env Install dotenv

// Middleware
app.use(express.json());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

// Routers
const StudentRouter = require("./Routes/Student.Routes");
app.use("/api/v1/student", StudentRouter);

// Error handler (optional but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, HOST, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server started in ${NODE_ENV} mode: http://${HOST}:${PORT}`);
    }
});
