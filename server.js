// ===== NODE MODULES ======
const express = require('express');
const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

// ======= Express ========
const PORT = process.env.PORT || 3001;
const app = express();

// ===== Middleware =======
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ======== INITIALIZE PROGRAM ========

startProgram();

async function startProgram() {







  
  // console.table(rows);

  const { choice } = await inquirer.prompt([{

    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: ["View all employees", "View all roles", "View all departments", "Add an employee", "Add a role", "Add a department", "Update an employee role"]

  }])

  switch (choice) {

    case "View all employees":

      viewEmployees()
      break;

    case "View all roles":

      break;

    case "View all departments":

      break;

    case "Add an employee":

      break;

    case "Add a role":

      break;

    case "Add a department":

      break;

    case "Update an employee role":

      updateRole()
      break;

    default:

      break;

  }

};

const viewEmployees = async () => {

  // create connection
  const connection = await mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_db",
    },

    console.log(`Connected to the employee_db database.`)

  );

  // query database

  const [rows, fields] = await connection.execute("SELECT * FROM employees;");

  console.table(rows);

}












const updateRole = async () => {

  // create connection
  const connection = await mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_db",
    },

    console.log(`Connected to the employee_db database.`)

  );

  // query database

  const [rows, fields] = await connection.execute("SELECT * FROM employee;");

  const newChoices = rows.map((employee) => ({ name: employee.name, value: employee }))

  console.table(newChoices);

  const { choice } = await inquirer.prompt([{

    name: "choice",
    tyope: "list",
    message: "Which employee role do you want to update?",
    choices: newChoices

  }])

  console.log(choice);

}












// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
