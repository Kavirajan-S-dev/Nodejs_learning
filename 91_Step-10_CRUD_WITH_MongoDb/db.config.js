const connection = require("mongoose");
require("dotenv").config();

const { ATLAS_CONN_STR } = process.env;

connection.connect(ATLAS_CONN_STR).then((con) => {
    // console.log(con);
    console.log("Db connection established");
}).catch((err) => {
    console.log("Failed to conenct!", err);
});

module.exports = connection;