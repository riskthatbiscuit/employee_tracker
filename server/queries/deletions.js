// File for Deletion functions (x3)

const { executeQuery} = require("./displays");

function deleteDepartment(db, department_id) {
  console.log(department_id);
  const sqlQuery = "DELETE FROM department WHERE id = ?";
  const ansArray = [department_id];
  const successMessage = `Change made successfully, department deleted`;

  executeQuery(db, sqlQuery, ansArray, successMessage);
}

function deleteRole(db, role_id) {
  console.log(`In the deleteRole function, Role ID: ${role_id}`);
  const sqlQuery = "DELETE FROM roles WHERE id = ?";
  const ansArray = [role_id];
  const successMessage = `Change made successfully, role deleted`;

  executeQuery(db, sqlQuery, ansArray, successMessage);
}

function deleteEmployee(db, employee_id) {
  console.log(`Employee ID: ${employee_id}`);
  const sqlQuery = "DELETE FROM employee WHERE id = ?";
  const ansArray = [employee_id];
  const successMessage = `Change made successfully, employee deleted`;

  executeQuery(db, sqlQuery, ansArray, successMessage);
}

// Export deletion functions
module.exports = { deleteDepartment, deleteEmployee, deleteRole };
