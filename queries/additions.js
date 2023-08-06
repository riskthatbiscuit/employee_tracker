// File for Addition functions (x3)

// Import dependencies
const inquirer = require("inquirer");
const { executeQuery, viewAllDepartments, viewAllEmployees, viewAllRoles } = require("./displays");

function addDepartment(db, runQueryLoop) {
  // Create questions for department input
  const question2 = [
    {
      type: "input",
      name: "departmentName",
      message: "What department would you like to add?",
    },
  ];
  
  // Recieving response, generating SQL and inputting into executeQuery
  inquirer.prompt(question2).then((answers) => {
    const departmentName = answers.departmentName;
    const sqlQuery = "INSERT INTO department (name) VALUES (?)";
    const ansArray = [departmentName];
    const successMessage = `Change made successfully, ${departmentName} added`;

    executeQuery(db, sqlQuery, runQueryLoop, ansArray, successMessage);
  });
}

function addRole(db, runQueryLoop) {
  // Getting list of departments to create list for selection
  viewAllDepartments(db,(departments) => {
    const departmentChoices = departments.map((department) => ({
      name: department.department_name,
      value: department.department_id,
    }));
    
    // Create questions for department input
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
    
    // Recieving response, generating SQL and inputting into executeQuery
    inquirer.prompt(question3).then((answers) => {
      const role = answers.role;
      const salary = answers.salary;
      const department_id = answers.department;
      const sqlQuery =
        "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
      const ansArray = [role, salary, department_id];
      const successMessage = `Change made successfully, ${role} added`;

      executeQuery(db, sqlQuery, runQueryLoop, ansArray, successMessage);
    });
  });
}

function addEmployee(db, runQueryLoop) {
  // Getting list of roles to create list for selection
  viewAllRoles(db,(roles) => {
  const roleChoices = roles.map((role) => ({
    name: role.job_title,
    value: role.role_id,
  }));

    // Getting list of employees to create list for manager selection
    viewAllEmployees(db, (employees) => {
      const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employee_id,
      }));

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
          type: "list",
          name: "role_id",
          message: "Select the role for the employee",
          choices: roleChoices,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the person's manager?",
          choices: employeeChoices,
        },
      ];
      
      // Recieving response, generating SQL and inputting into executeQuery
      inquirer.prompt(question4).then((answers) => {
        const firstName = answers.firstName;
        const lastName = answers.lastName;
        const role_id = answers.role_id;
        const manager_id = answers.manager_id;
        const sqlQuery =
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        const ansArray = [firstName, lastName, role_id, manager_id];
        const successMessage = `Change made successfully, ${firstName} ${lastName} added`;

        executeQuery(db, sqlQuery, runQueryLoop, ansArray, successMessage);
      });
    });
  });
}

// Export addition functions
module.exports = { addDepartment, addEmployee, addRole };