// Import dependencies
const inquirer = require('inquirer');
// const fs = require('fs')

// Define questions for user
const question1 = [
      {
        type: 'list',
        name: 'question1',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles' ,'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee']
     }
    ]

// Create a function to initialize app
function init(db) {

  // Prompt the user with the questions and handle the answers
  inquirer.prompt(question1).then((answers) => {
    // Get the user's choice
    const optionChoice = answers.question1;

    // Handle the selected option based on user's choice
    switch (optionChoice) {
      case "View all departments":
        viewAllDepartments(db);
        break;
      case "View all roles":
        viewAllRoles(db);
        break;
      case "View all employees":
        viewAllEmployees(db);
        break;
      case "Add a department":
        addDepartment(db);
        break;
      case "Add a role":
        addRole(db);
        break;
      case "Add an employee":
        addEmployee(db);
        break;
      case "Update an employee":
        updateEmployee(db);
        break;
      default:
        console.log("Invalid option choice.");
        return;
    }
  });
}

module.exports = { init };