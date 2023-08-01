// Import dependencies
const inquirer = require("inquirer");
const { viewAllDepartments } = require("./displays");

const question2 = [
  {
    type: "input",
    name: "departmentName",
    message: "What department would you like to add?",
  },
];



const question4 = [
  {
    type: "input",
    name: "firstName",
    message: "What is the first name of the employee?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the last name of the employee?",
  },
  {
    type: "input",
    name: "role_id",
    message: "What is the role id they will do?",
  },
  {
    type: "input",
    name: "manager_id",
    message: "Who is the person's manager's id?",
  },
];

function addDepartment(db, runQueryLoop) {
  
  inquirer.prompt(question2).then((answers) => {
    const departmentName = answers.departmentName;
    const sqlQuery = "INSERT INTO department (name) VALUES (?)";
    
    db.query(sqlQuery, [departmentName], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Could not make change`);
        runQueryLoop();
      }
    });
  });
}

function addRole(db, runQueryLoop) {
  
  viewAllDepartments(db,(departments) => {
    const departmentChoices = departments.map((department) => ({
      name: department.department_name,
      value: department.department_id,
    }));
    // console.log(departmentChoices);
    const question3 = [
      {
        type: "input",
        name: "role",
        message: "What is the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department",
        message: "Select the department for the role",
        choices: departmentChoices,
      },
    ];
  
    inquirer.prompt(question3).then((answers) => {
      const role = answers.role;
      const salary = answers.salary;
      const department_id = answers.department;
      const sqlQuery =
      "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
      db.query(sqlQuery, [role, salary, department_id], (err, result) => {
        if (err) {
          console.log(err);
          console.log(`Could not make change`);
        } else {
          console.log(`Change made successfully`)
          runQueryLoop();
        }
      });
    });
  });
}

function addEmployee(db, runQueryLoop) {
  inquirer.prompt(question4).then((answers) => {
    const firstName = answers.firstName;
    const lastName = answers.lastName;
    const role_id = answers.role_id;
    const manager_id = answers.manager_id;
    const sqlQuery =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";

    db.query(
      sqlQuery,
      [firstName, lastName, role_id, manager_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Could not make change`);
          runQueryLoop();
        }
      }
    );
  });
}

module.exports = { addDepartment, addEmployee, addRole };
