const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const {viewDept} = require('./api/getData');
const cTable = require('console.table');
require('dotenv').config();
require('dotenv').config({ debug: process.env.DEBUG })


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

const openingQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'openingRequest',
        choices: [
            'View all Employees',
            'Add Employee',
            'Update Employee Role',
            'View all Roles',
            'Add Role',
            'View all Departments',
            'Add Department',
        ],
        }
]

function init() {
    inquirer.prompt(openingQuestions)
    .then((answer => {
        viewDept();
    }))
}

init();

// module.exports = {init};