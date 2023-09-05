const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.PASSWORD,
      database: 'employee_db'
    },
    console.log(`Connected to employee_db.`)
  );

module.exports = connection;