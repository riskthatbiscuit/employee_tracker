// Import dependencies
const inquirer = require('inquirer');
// const fs = require('fs')

// Define questions for user
const question1 = [
      {
        type: 'list',
        name: 'question1',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles' ,'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee','Other','Exit']
     }
    ]

// Create a function to initialize app
function init(db) {

  function runQueryLoop() {
    // Prompt the user with the questions and handle the answers
    inquirer.prompt(question1).then((answers) => {
      // Get the user's choice
      const optionChoice = answers.question1;

      // Handle the selected option based on user's choice
      switch (optionChoice) {
        case "View all departments":
          viewAllDepartments(db, runQueryLoop);
          break;
        case "View all roles":
          viewAllRoles(db, runQueryLoop);
          break;
        case "View all employees":
          viewAllEmployees(db, runQueryLoop);
          break;
        case "Add a department":
          addDepartment(db, runQueryLoop);
          break;
        case "Add a role":
          addRole(db, runQueryLoop);
          break;
        case "Add an employee":
          addEmployee(db, runQueryLoop);
          break;
        case "Update an employee":
          updateEmployee(db, runQueryLoop);
          break;
        case "Other":
          otherOptions(db, runQueryLoop);
          break;
        case "Exit":
          console.log("Exiting...");
          setTimeout(() => {
            db.end(); // Close the database connection
            process.exit(0); // Exit the process
          }, 500); // Wait for 500 milliseconds before exiting;
          return;
        default:
          console.log("Invalid option choice.");
          return;
      }
    });
  }
  runQueryLoop();

}

module.exports = { init };

function executeQuery(db, sqlQuery, callback) {
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    callback();
  });
}

// Usage example:
function viewAllDepartments(db, callback) {
  const sqlQuery = `
    SELECT id AS department_id, name AS department_name
    FROM department`;
  executeQuery(db, sqlQuery, callback);
}

function viewAllRoles(db, callback) {
  const sqlQuery = `
    SELECT title AS job_title, roles.id AS role_id, department.name AS department, salary
    FROM roles
    JOIN department ON roles.department_id = department.id`;
  executeQuery(db, sqlQuery, callback);
}

function viewAllEmployees(db, callback) {
  const sqlQuery = `
    SELECT 
    employee.id AS employee_id,
    employee.first_name,
    employee.last_name,
    roles.title AS job_title,
    department.name AS department,
    roles.salary AS salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN roles ON employee.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
  executeQuery(db, sqlQuery, callback);
}
