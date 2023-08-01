// Import dependencies
const inquirer = require('inquirer');

// Import scenarios
const displays = require('./displays');
const additions = require('./additions');
const deletions = require('./deletions');
const amendments = require('./amendments');

// Define initial question for user
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
          displays.viewAllDepartments(db, runQueryLoop);
          break;
        case "View all roles":
          displays.viewAllRoles(db, runQueryLoop);
          break;
        case "View all employees":
          displays.viewAllEmployees(db, runQueryLoop);
          break;
        case "Add a department":
          additions.addDepartment(db, runQueryLoop);
          break;
        case "Add a role":
          additions.addRole(db, runQueryLoop);
          break;
        case "Add an employee":
          additions.addEmployee(db, runQueryLoop);
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
            db.end();
            process.exit(0);
          }, 500);
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

