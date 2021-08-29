const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
require('dotenv').config({ debug: process.env.DEBUG })


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);

// Ensures user enters input when required
const confirmInput = (value) => {
  if (value){
      return true;
  } else {
      console.log("Please answer the question or enter a keysmash");
      return false;
  }
}

// Initial question asked when opening application
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

// Question asked when user selects 'Add Department'
const newDept = [
  {
    type: 'input',
    message: 'Please enter the new Department name:',
    name: 'newDept',
    validate: confirmInput,
  }
]

// Function that initialises app - directory to database commands.
function init() {
  inquirer.prompt(openingQuestions)
  .then((answer => {
    console.log(answer);
    console.log(answer.openingRequest);

    // indicates where user will go depending on choice selected
    switch (answer.openingRequest){
      case "View all Employees":
        viewEmp();
        break;

      case "Add Employee":
        addEmp();
        break;

      case "Update Employee Role":
        UpdateEmp();
        break;

      case "View all Roles":
        viewRoles();
        break;

      case "Add Role":
        addRole();
        break;

      case "View all Departments":
        viewDept();
        break;

      case "Add Department":
        addDept();
        break;

      case "Close application":
        closeApp();
        break;
  }   

  }))
  .catch((err) =>
  console.error(err));
}

// Function to view all Departments
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

// Function to view all Roles
function viewRoles() {
  db.query('SELECT staff_role.title AS title, staff_role.role_id AS id, department.dept_name AS department, staff_role.salary AS salary FROM staff_role INNER JOIN department ON staff_role.department_id = department.id ORDER BY id ASC', function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log()
    console.table(results);
    init()
  }); 
}

// Function to view all Employees
function viewEmp() {
  db.query('SELECT employee.employee_id AS id, employee.first_name, employee.last_name, staff_role.title, department.dept_name AS department, staff_role.salary AS salary, employee.manager_id FROM employee INNER JOIN staff_role ON employee.role_id = staff_role.role_id INNER JOIN department ON staff_role.department_id = department.id ORDER BY id ASC;', function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log()
    console.table(results);
    init()
  }); 
}

// Function to add new Department
function addDept() {
  inquirer.prompt(newDept)
  .then((answer => {
    console.log(answer);
    console.log(answer.newDept);

    db.query('INSERT INTO department (dept_name) VALUES ("' + answer.newDept + '")', function (err, results) {
      if (err) {
        console.error(err);
      }
      console.log("Added new department " + answer.newDept + " to system");
      init()
  })
  }))
  .catch((err) =>
  console.error(err));
}




// This will launch the CLI on starting the program.
init();