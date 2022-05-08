
require('dotenv').config();
const mysql = require("mysql2");

// create connection to our db
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PW,
  database: 'employees',
});

module.exports = connection