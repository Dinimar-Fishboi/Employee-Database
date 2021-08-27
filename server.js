const express = require('express');
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const routes = require('./routes');
const cTable = require('console.table');
require('dotenv').config();
require('dotenv').config({ debug: process.env.DEBUG })



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//  UNCOMMENT THIS NEXT LINE AFTER API CONTENT IS LINKED TO INDEX AND API PAGE
//app.use(routes);

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: process.env.DB_PASSWORD,
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);

// This is the DB structure we can place in the API files
db.query('SELECT * FROM department', function (err, results) {
  if (err) {
    console.error(err);
  }
  console.log(results);
  console.table(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});