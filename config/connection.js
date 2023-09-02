const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.PASSWORD,
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

module.exports = db;