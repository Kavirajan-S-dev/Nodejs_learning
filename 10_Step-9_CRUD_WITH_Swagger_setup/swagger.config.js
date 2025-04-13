const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student API",
            version: "1.0.0",
            description: "A simple CRUD API for managing students",
        },
        servers: [
            {
                url: "http://192.168.0.17:3000/api/v1",
            },
        ],
    },
    apis: ["./Routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
