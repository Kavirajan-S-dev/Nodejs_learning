const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.config");

const app = express();

const { NODE_ENV } = process.env;

const logger = (req, res, next) => {
    console.log("Custom middleware called");
    next();
};

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("./Public"));
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(logger);

const StudentRouter = require("./Routes/Student.Routes");

app.use("/api/v1/student", StudentRouter);

// Error handler (optional but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
