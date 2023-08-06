// File for Amendment functions (x2)

// Import dependencies
const inquirer = require("inquirer");
const {viewAllDepartments, viewAllEmployees, viewAllRoles} = require("./displays");

// Common function for running SQL query and displaying console message
function executeQuery(db, sqlQuery, ansArray, successMessage, runQueryLoop){
    db.query(sqlQuery, ansArray, (err, result) => {
      if (err) {
        console.log(err);
        console.log(`Could not make change`);
      } else {
        console.log(successMessage);
        runQueryLoop();
      }
    });
}

function updateRole(db, runQueryLoop) {
  viewAllRoles(db, (roles) => {
    const roleChoices = roles.map((role) => ({
      name: role.job_title,
      value: role.role_id,
    }));
    const question7 = [
      {
        type: "list",
        name: "role",
        message: "Select the role to update",
        choices: roleChoices,
      },
    ];

    inquirer.prompt(question7).then((answers) => {
      const role_id = answers.role;
      const selectedRole = roleChoices.find((role) => role.value === role_id);
      const sqlQuery = `
            SELECT title AS job_title, department.name AS department, salary
            FROM roles 
            JOIN department ON roles.department_id = department.id
            WHERE roles.id = ?`;

      db.query(sqlQuery, role_id, (err, result) => {
        if (err) {
          console.log(err);
          console.log(`Could not find job`);
        }
        console.table(result);
        console.log(
          `Current ${selectedRole} shown. Enter updated values for salary & department`
        );
      });

      viewAllDepartments(db, (departments) => {
        const departmentChoices = departments.map((department) => ({
          name: department.department_name,
          value: department.department_id,
        }));

        const question8 = [
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

        inquirer.prompt(question8).then((answers) => {
            const salary = answers.salary;
            const department_id = answers.department;
            const sqlQuery = `UPDATE roles 
                        SET salary = ?, department_id = ? 
                        WHERE roles.id = ?`;
            const asnArray = [salary, department_id, role_id];
            const successMessage = `Change made successfully, ${selectedRole} updated`;

            executeQuery(db, sqlQuery, ansArray, successMessage, runQueryLoop);
        });
      });
    });
  });
}

function updateEmployee(db, runQueryLoop) {
  viewAllEmployees(db, (employee) => {
    const employeeChoices = employee.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.employee_id,
    }));

    const question9 = [
      {
        type: "list",
        name: "employee_id",
        message: "Select an employee to update",
        choices: employeeChoices,
      },
    ];

    inquirer.prompt(question9).then((answers) => {
      const employee_id = answers.employee_id;
      const chosenEmployee = employeeChoices.find(
        (employee) => employee.value === employee_id
      );

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
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
            WHERE employee.id = ?`;

      db.query(sqlQuery, employee_id, (err, result) => {
        if (err) {
          console.log(err);
          console.log(`Could not find person`);
        }
        console.table(result);
        console.log(
          `Current ${chosenEmployee} shown. Enter updated values for first name, last name, role & manager`
        );
      });

      viewAllRoles(db, (roles) => {
        const roleChoices = roles.map((role) => ({
          name: role.job_title,
          value: role.role_id,
        }));

        viewAllEmployees(db, (employees) => {
          const employeeChoices = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.employee_id,
          }));

          const question10 = [
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

          inquirer.prompt(question10).then((answers) => {
            const firstName = answers.firstName;
            const lastName = answers.lastName;
            const role_id = answers.role_id;
            const manager_id = answers.manager_id;
            const sqlQuery = `UPDATE employee 
                            SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? 
                            WHERE employee.id = ?`;
            const asnArray = [firstName, lastName, role_id, manager_id, employee_id];
            const successMessage = `Change made successfully, ${chosenEmployee} updated`;

            executeQuery(db, sqlQuery, ansArray, successMessage, runQueryLoop);
          });
        });
      });
    });
  });
}

// Export amendment functions
module.exports = { updateRole, updateEmployee };
