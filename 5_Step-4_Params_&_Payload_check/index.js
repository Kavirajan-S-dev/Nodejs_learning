const express = require("express");
const morgan = require("morgan");

const app = express();

const { NODE_ENV } = process.env;

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


module.exports = app;