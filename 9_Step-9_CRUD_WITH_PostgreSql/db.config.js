const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const { DB_host, DB_user, DB_password, DB_database } = process.env;

const db = new Pool({
    host: DB_host,
    user: DB_user,
    password: DB_password,
    database: DB_database,
    port: 5432,
});

module.exports = db;
