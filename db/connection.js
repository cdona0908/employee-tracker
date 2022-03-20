const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  //  MySQL username,
  user: 'root',
  //  MySQL password
  password: 'Od1nC@c41t0!',
  database: 'employees'
});

connection.connect( function (err) {
  if(err) throw err;
});

module.exports = db;