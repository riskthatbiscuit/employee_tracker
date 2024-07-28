// File for Addition functions (x3)

// Import dependencies
const { executeQuery} = require("./displays");

function addEmployee(db, firstName, lastName, role_id, manager_id) {
  const sqlQuery = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
  const ansArray = [firstName, lastName, role_id, manager_id];
  const successMessage = `Change made successfully, ${firstName} ${lastName} added`;

  executeQuery(db, sqlQuery, ansArray, successMessage);
}

function addRole(db, title, salary, department_id) {
  const sqlQuery = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
  const ansArray = [title, salary, department_id];
  console.log(ansArray);
  console.log("how was that?")
  const successMessage = `Change made successfully, ${title} added`;

  executeQuery(db, sqlQuery, ansArray, successMessage);
}

function addDepartment(db, department_name) {
  const sqlQuery = "INSERT INTO department (name) VALUES (?)";
  const ansArray = [department_name];
  const successMessage = `Change made successfully, ${department_name} added`;

  executeQuery(db, sqlQuery, ansArray, successMessage);
}

// Export addition functions
module.exports = { addDepartment, addEmployee, addRole };