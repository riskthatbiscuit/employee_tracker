// File for Deletion functions (x3)

// Import dependencies
const inquirer = require("inquirer");
const { viewAllDepartments, viewAllEmployees, viewAllRoles } = require("./displays");

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

function deleteDepartment(db, runQueryLoop) {
  // Getting list of departments to create list for deletion
  viewAllDepartments(db, (departments) => {
    const departmentChoices = departments.map((department) => ({
      name: department.department_name,
      value: department.department_id,
    }));
    const question5 = [
      {
        type: "list",
        name: "department",
        message: "Select the department to remove",
        choices: departmentChoices,
      },
    ];

    // Recieving response, generating SQL and inputting into executeQuery
    inquirer.prompt(question5).then((answers) => {
      const department_id = answers.department;
      const selectedDepartment = departmentChoices.find(
        (department) => department.value === department_id
      );
      const sqlQuery = "DELETE FROM department WHERE id = ?";
      const ansArray = [department_id];
      const successMessage = `Change made successfully, ${selectedDepartment.name} deleted`;

      executeQuery(db, sqlQuery, ansArray, successMessage, runQueryLoop);
    });
  });
}

function deleteRole(db, runQueryLoop) {
  // Getting list of roles to create list for deletion
  viewAllRoles(db, (roles) => {
    const roleChoices = roles.map((role) => ({
      name: role.job_title,
      value: role.role_id,
    }));
    const question5 = [
      {
        type: "list",
        name: "role",
        message: "Select the role to remove",
        choices: roleChoices,
      },
    ];
    //   Recieving response, generating SQL and inputting into executeQuery
    inquirer.prompt(question5).then((answers) => {
      const role_id = answers.role;
      const selectedRole = roleChoices.find((role) => role.value === role_id);
      const sqlQuery = "DELETE FROM roles WHERE id = ?";
      const ansArray = [role_id];
      const successMessage = `Change made successfully, ${selectedRole.name} deleted`;

      executeQuery(db, sqlQuery, ansArray, successMessage, runQueryLoop);
    });
  });
}

function deleteEmployee(db, runQueryLoop) {
  // Getting list of employees to create list for deletion
  viewAllEmployees(db, (employees) => {
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.employee_id,
    }));

    const question6 = [
      {
        type: "list",
        name: "employee_id",
        message: "Select the employee to remove",
        choices: employeeChoices,
      },
    ];
    // Recieving response, generating SQL and inputting into executeQuery
    inquirer.prompt(question6).then((answers) => {
      const employee_id = answers.employee_id;
      const chosenEmployee = employeeChoices.find(
        (employee) => employee.value === employee_id
      );

      const sqlQuery = "DELETE FROM employee WHERE id = ?";
      const ansArray = [employee_id];
      const successMessage = `Change made successfully, ${chosenEmployee.name} deleted`;

      executeQuery(db, sqlQuery, ansArray, successMessage, runQueryLoop);
    });
  });
}

// Export deletion functions
module.exports = { deleteDepartment, deleteEmployee, deleteRole };
