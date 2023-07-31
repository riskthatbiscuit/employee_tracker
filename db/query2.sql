
-- WHEN I choose to add a department
-- THEN I am prompted to enter the name of the department and that department is added to the database
INSERT INTO department (name)
VALUES
    ("Geography");


-- WHEN I choose to add a role
-- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
INSERT INTO roles (id, title, salary, department_id)
VALUES
    (8, "Geography Teacher", 65000,8);

-- WHEN I choose to add an employee
-- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (31, "Harvey", "Hood", 8, 2);

-- WHEN I choose to update an employee role
-- THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

UPDATE employee
SET role_id = 6
WHERE id = 31;


-- Update employee managers.
UPDATE employee
SET manager_id = 1
WHERE id = 31;

-- View employees by manager.

-- View employees by department.

-- Delete departments, roles, and employees.

-- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.