// Import dependencies
const inquirer = require("inquirer");
const {viewAllDepartments, viewAllEmployees, viewAllRoles} = require("./displays");


function updateRole(db, runQueryLoop) {
    viewAllRoles(db,(roles) => {
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
            console.table(result)
            console.log(`Current ${selectedRole} shown. Enter updated values for salary & department`);
            });
            
            
            viewAllDepartments(db,(departments) => {
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
                    }
                ]
                
                inquirer.prompt(question8).then((answers) => {
                    const salary = answers.salary;
                    const department_id = answers.department;
                    const sqlQuery =
                    `UPDATE roles 
                    SET salary = ?, department_id = ? 
                    WHERE roles.id = ?`;
                    db.query(sqlQuery, [salary, department_id, role_id], (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log(`Could not make change`);
                        } else {
                            console.log(`Change made successfully, ${selectedRole} updated`)
                            runQueryLoop();
                        }
                    });
                });
            });
        });
    });
    
}
            
        
function updateEmployee(db, runQueryLoop) {
            
}
        
module.exports = {updateRole, updateEmployee};