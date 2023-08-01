// Import dependencies
const inquirer = require("inquirer");
const { viewAllDepartments, viewAllEmployees, viewAllRoles } = require("./displays");

function deleteDepartment(db, runQueryLoop) {
  
    viewAllDepartments(db, (departments) => {
        const departmentChoices = departments.map((department) => ({
        name: department.department_name,
        value: department.department_id,
        }));
        console.log(departmentChoices);
        const question5 = [
        {
            type: "list",
            name: "department",
            message: "Select the department to remove",
            choices: departmentChoices,
        },
        ];

        inquirer.prompt(question5).then((answers) => {
        const department_id = answers.department;
        const sqlQuery = "DELETE FROM department WHERE id = ?";
        db.query(sqlQuery, department_id, (err, result) => {
            if (err) {
            console.log(err);
            console.log(`Could not make change`);
            } else {
            console.log(`Change made successfully`);
            runQueryLoop();
            }
        });
        });
    });
}

function deleteRole(db, runQueryLoop) {
  
    viewAllRoles(db,(roles) => {
    const roleChoices = roles.map((role) => ({
        name: role.job_title,
        value: role.role_id,
    }));
    // console.log(departmentChoices);
    const question5 = [
        {
        type: "list",
        name: "role",
        message: "Select the role to remove",
        choices: roleChoices,
        },
    ];
    
    inquirer.prompt(question5).then((answers) => {
      const role = answers.role;
      const sqlQuery = "DELETE FROM roles WHERE id = ?";
      db.query(sqlQuery, role, (err, result) => {
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

function deleteEmployee(db, runQueryLoop) {
    viewAllEmployees(db, (employees) => {
    const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employee_id,
    }));
        // console.log(employeeChoices);

    const question6 = [
        {
            type: "list",
            name: "employee_id",
            message: "Select the employee to remove",
            choices: employeeChoices,
        },
    ];

    inquirer.prompt(question6).then((answers) => {
        const employee_id = answers.employee_id;
        const sqlQuery = "DELETE FROM employee WHERE id = ?";
        db.query(sqlQuery, employee_id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Could not make change`);
                runQueryLoop();
            }
        });
    });
  });
}

module.exports = { deleteDepartment, deleteEmployee, deleteRole };
