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
      console.log("Please enter a value");
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

// Question asked when user selects 'Add Role'
const newRole = [
  {
    type: 'input',
    message: 'Please enter the new Role title:',
    name: 'newTitle',
    validate: confirmInput,
  },
  {
    type: 'number',
    message: 'Please enter the salary of this role:',
    name: 'newSalary',
    validate: confirmInput,
  }
]

const newEmployee = [
  {
    type: 'input',
    message: "Please enter the Employee's first name:",
    name: 'empFirstName',
    validate: confirmInput,
  },
  {
    type: 'input',
    message: "Please enter the Employee's first name:",
    name: 'empLastName',
    validate: confirmInput,
  }
]

// Function that initialises app - directory to database commands.
function init() {
  inquirer.prompt(openingQuestions)
  .then((answer => {

    // indicates where user will go depending on choice selected
    switch (answer.openingRequest){
      case "View all Employees":
        viewEmp();
        break;

      case "Add Employee":
        addEmp();
        break;

      case "Update Employee Role":
        updateEmp();
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

// Function to add new Role
function addRole() {
  inquirer.prompt(newRole)
  .then((answer => {
    const newTitle = answer.newTitle;
    const newSalary = answer.newSalary;   
  // Turning all departments into an array for follow up question.
      db.query('SELECT id, dept_name AS department FROM department', function (err, results) {
        if (err) {
          console.error(err);
        }

        // This line of code associates the Department name to the actual ID - 
        // so the user sees the words, but the value is logged.
        const allDept = results.map(({ id, department }) => ({ name: department, value: id}));

          // Struggled to figure out how to place this in the global code: so here it is.
          inquirer.prompt([
            {
                  type: 'list',
                  message: ' Department this role belong to:',
                  name: 'addToDept',
                  choices: allDept
                },
          ])
            .then((followUp => {
              const addToDept = followUp.addToDept;

              // The actual line that generates the new role
              db.query('INSERT INTO staff_role (title, salary, department_id) VALUES ("'+ newTitle + '", ' + newSalary + ', ' + addToDept +')', function (err, results) {
                if (err) {
                  console.error(err);
                }
                console.log("New role " + newTitle + " added.")
                init()
            }); 
    }))
  .catch((err) =>
    console.error(err));
}); 

  }))
  .catch((err) =>
  console.error(err));
}

function addEmp() {
  inquirer.prompt(newEmployee)
  .then((answer => {
    const firstName = answer.empFirstName;
    const lastName = answer.empLastName; 

    // Turning the list of Roles into an array for following statements:
    db.query('SELECT staff_role.title AS title, staff_role.role_id AS id FROM staff_role', function (err, results) {
      if (err) {
        console.error(err);
      }
      const allRoles = results.map(({ title, id }) => ({ name: title, value: id}));

          // Inquiring into the new hire's role
          inquirer.prompt([
            {
                  type: 'list',
                  message: 'Role this employee has:',
                  name: 'newHire',
                  choices: allRoles
                },
          ])
          .then((followUp => {
            console.log(followUp);
            const newHire = followUp.newHire;
            console.log(newHire + firstName + lastName);

            // Generating list of potential managers for new hire.
            db.query('SELECT employee.employee_id AS id, employee.first_name AS first_name, employee.last_name AS last_name FROM employee', function (err, results) {
              if (err) {
                console.error(err);
              }

              // The array that will go into the inquire prompt.
              const potentialManagers = results.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id}));
              potentialManagers.push({name: 'No manager', value: null})

              // Final question: does the new hire have a manager?
              inquirer.prompt([
                {
                      type: 'list',
                      message: 'Manager for new employee:',
                      name: 'addManager',
                      choices: potentialManagers
                    },
              ])

              .then((followUp => {
                console.log(followUp);
                const addManager = followUp.addManager;
                console.log(addManager + firstName + lastName + newHire);
                
                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("' + firstName +'", "'+ lastName +'",' +newHire +',' +addManager +')', function (err, results) {
                  if (err) {
                    console.error(err);
                  }
                  console.log("New hire " + firstName + " " + lastName + " added.")
                  init()
              }); 

               }));
           })
        })) .catch((err) =>
        console.error(err));
    })

}))
.catch((err) =>
console.error(err));
}

// Updating employee's role.
function updateEmp() {
  db.query('SELECT employee.employee_id AS id, employee.first_name AS first_name, employee.last_name AS last_name FROM employee', function (err, results) {
    if (err) {
      console.error(err);
    }

    //Providing list of potential employees
    const empList = results.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id}));
    inquirer.prompt([
      {
            type: 'list',
            message: 'Select an employee:',
            name: 'chosenEmp',
            choices: empList
          },
    ])
    .then((followUp => {
      console.log(followUp);
      const chosenEmp = followUp.chosenEmp;
      console.log(chosenEmp);
      
         // Turning the list of Roles into an array for following statements:
          db.query('SELECT staff_role.title AS title, staff_role.role_id AS id FROM staff_role', function (err, results) {
            if (err) {
              console.error(err);
            }
            const allRoles = results.map(({ title, id }) => ({ name: title, value: id}));

                inquirer.prompt([
                  {
                        type: 'list',
                        message: 'New role for this employee:',
                        name: 'updatedRole',
                        choices: allRoles
                      },
                ])
                .then((followUp => {
                  console.log(followUp);
                  const updatedRole = followUp.updatedRole;
                  console.log(updatedRole + " " + chosenEmp);
                  
                    db.query('UPDATE employee SET role_id = "' + updatedRole + '" WHERE employee_id = "' + chosenEmp + '"', function (err, results) {
                      if (err) {
                        console.error(err);
                      }
                      console.log("Employee details have been updated")
                      init()
                      }); 
  
                 }));
             }); 

         }));

  })

}

function closeApp(){
  
}

init();