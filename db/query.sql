-- Full Table
SELECT *
FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id;

-- WHEN I choose to view all departments
-- THEN I am presented with a formatted table showing department names and department ids
SELECT id AS department_id, name AS department_name
FROM department;

-- WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT title AS job_title, roles.id AS role_id, department.name AS department, salary
FROM roles
JOIN department ON roles.department_id = department.id;

-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
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
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

