const question2 = [
  {
    type: "input",
    name: "departmentName",
    message: "What department would you like to add?",
  },
];

const question3 = [
  {
    type: "input",
    name: "role",
    message: "What is the role?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role?",
  },
  {
    type: "input",
    name: "department",
    message: "What is the id of the department to which the role belongs?",
  },
];

const question4 = [
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
    type: "input",
    name: "role",
    message: "What is the role they will do?",
  },
  {
    type: "input",
    name: "managerName",
    message: "Who is the person's manager?",
  },
];

function addDepartment(db, runQueryLoop) {
  inquirer.prompt(question2).then((answers) => {
    const departmentName = answers.departmentName;
    const sqlQuery = "INSERT INTO department (name) VALUES (?)";

    db.query(sqlQuery, [departmentName], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Could not make change`);
        runQueryLoop();
      }
    });
  });
}

function addRole(db, runQueryLoop) {
  inquirer.prompt(question3).then((answers) => {
    const role = answers.role;
    const salary = answers.salary;
    const department_id = answers.department_id;
    const sqlQuery =
      "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);";

    db.query(sqlQuery, [role, salary, department_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Could not make change`);
        runQueryLoop();
      }
    });
  });
}
