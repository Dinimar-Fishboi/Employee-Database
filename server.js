const express = require('express');
const inquirer = require('inquirer');
const fs = require('fs');
// Import and require mysql2
const mysql = require('mysql2');
const routes = require('./routes');
const cTable = require('console.table');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// Connect to database
const db = mysql.createConnection(
    process.env.DB_PASSWORD,
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: DB_PASSWORD,
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);

