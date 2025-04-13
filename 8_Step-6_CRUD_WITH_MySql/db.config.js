const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

const { DB_host, DB_user, DB_password, DB_database } = process.env;


const db = mysql.createConnection({
    host: DB_host,
    user: DB_user,
    password: DB_password,
    database: DB_database,
    port: 3306,
});

module.exports = db;
