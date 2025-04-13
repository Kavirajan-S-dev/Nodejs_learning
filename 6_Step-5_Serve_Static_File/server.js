const dotenv = require("dotenv");
const app = require("./index");

// Load environment variables
// dotenv.config({path:"."});path can be added
dotenv.config();

const { PORT, HOST, NODE_ENV } = process.env;

app.listen(PORT, HOST, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server started in ${NODE_ENV} mode: http://${HOST}:${PORT}`);
    }
});