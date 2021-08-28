const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
// const {init} = require('./routes/index');
const cTable = require('console.table');
//const {viewDept} = require('./routes/api/getData');
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

// db.query('SELECT * FROM department', function (err, results) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(results);
//   console.table(results);
// });

// db.query('SELECT employee.employee_id AS id, employee.first_name, employee.last_name,staff_role.title, department.dept_name AS department FROM employee INNER JOIN staff_role ON employee.role_id = staff_role.role_id INNER JOIN department ON staff_role.department_id = department.id WHERE title = "Salesperson" ORDER BY id ASC;', function (err, results) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(results);
//   console.table(results);
// });

// function init() {
//   inquirer.prompt(openingQuestions)
//   .then((answer => {
//       viewDept();
//   }))
// }


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
          'Close application',
      ],
      }
]

function init() {
  inquirer.prompt(openingQuestions)
  .then((answer => {
    console.log(answer);
    console.log(answer.openingRequest);

    switch (answer.openingRequest){
      case "View all Departments":
        viewDept();
        break;
  }   

  }))
}

function viewDept() {
  db.query('SELECT * FROM department', function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log()
    console.table(results);
    init()
  }); 
}

init();