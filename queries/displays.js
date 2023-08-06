// File for Display functions (x3)

// Common function for running SQL Query
function executeQuery(db, sqlQuery, callback) {
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    }
    callback(result);
  });
}

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

// Export display functions
module.exports = { viewAllDepartments, viewAllEmployees, viewAllRoles };
