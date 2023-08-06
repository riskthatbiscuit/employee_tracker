// Import dependencies
const inquirer = require("inquirer");
const { viewAllDepartments, viewAllEmployees, viewAllRoles } = require("./displays");

function deleteDepartment(db, runQueryLoop) {
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

        inquirer.prompt(question5).then((answers) => {
        const department_id = answers.department;
        const selectedDepartment = departmentChoices.find((department) => department.value === department_id);

        const sqlQuery = "DELETE FROM department WHERE id = ?";
        db.query(sqlQuery, department_id, (err, result) => {
            if (err) {
            console.log(err);
            console.log(`Could not make change`);
            } else {
            console.log(`Change made successfully, ${selectedDepartment.name} deleted`);
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
    const question5 = [
        {
        type: "list",
        name: "role",
        message: "Select the role to remove",
        choices: roleChoices,
        },
    ];
    
    inquirer.prompt(question5).then((answers) => {
        const role_id = answers.role;
        const selectedRole = roleChoices.find((role) => role.value === role_id);

        const sqlQuery = "DELETE FROM roles WHERE id = ?";
        db.query(sqlQuery, role_id, (err, result) => {
            if (err) {
            console.log(err);
            console.log(`Could not make change`);
            } else {
            console.log(`Change made successfully, ${selectedRole} deleted`);
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
        const chosenEmployee = employeeChoices.find((employee) => employee.value === employee_id);

        const sqlQuery = "DELETE FROM employee WHERE id = ?";
        db.query(sqlQuery, employee_id, (err, result) => {
            if (err) {
                console.log(err);
                console.log(`Could not make change`);
            } else {
                console.log(`Change made successully, ${chosenEmployee.name} deleted`)
                runQueryLoop();
            }
        });
    });
  });
}

module.exports = { deleteDepartment, deleteEmployee, deleteRole };
