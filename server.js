// ===== NODE MODULES ======
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const connection = require("./index");

// ======= Express ========
const PORT = process.env.PORT || 3001;
const app = express();

// ===== Middleware =======
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ===== CONNECT TO DATABSE =======

const database = mysql.createConnection(

  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },

);

// ======== INITIALIZE PROGRAM ========

startProgram();

async function startProgram() {

  const { choice } = await inquirer.prompt([

    {

      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees",
        "View all roles",
        "View all departments",
        "Add an employee",
        "Add a role",
        "Add a department",
        "Update an employee role"]

    }

  ])

  switch (choice) {

    case "View all employees":

      viewEmployees(startProgram, database);
      break;

    case "View all roles":

      viewRoles();
      break;

    case "View all departments":

      viewDepartments();
      break;

    case "Add an employee":

      addEmployee();
      break;

    case "Add a role":

      addRole();
      break;

    case "Add a department":

      addDepartment();
      break;

    case "Update an employee role":

      updateRole()
      break;

    default:

      break;

  }

};

// ========== VIEW FUNCTIONS ==========

const viewEmployees = async () => {

  // query database
  const [rows, fields] = await (await database).execute("SELECT * FROM employees;");

  console.table(rows);

  startProgram();

};
 
const viewRoles = async () => {

  // query database

  const [rows, fields] = await (await database).execute("SELECT * FROM roles;");

  console.table(rows);

  startProgram();

};

const viewDepartments = async () => {

  // query database

  const [rows, fields] = await (await database).execute("SELECT * FROM departments;");

  console.table(rows);

  startProgram();

};

// ========== POST FUNCTIONS ==========

const addEmployee = async () => {

  const { first_name, last_name, roles_id } = await inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "Please enter the employee's first name: ",
    },
    {
      name: "last_name",
      type: "input",
      message: "Please enter the employee's last name: ",
    },
    {
      name: "roles_id",
      type: "input",
      message: "Please enter the employee's role: ",
    }
  ]);

  // query database

  let [rows, fields] = await (await database).execute(`INSERT INTO employees (first_name, last_name, roles_id) VALUES (?, ?, ?)`, [first_name, last_name, roles_id]);

  [rows, fields] = await (await database).execute("SELECT * FROM employees;");

  console.table(rows);

  startProgram();

};

// role => another query, before prompt, similar to update role that gets roles then -- watch recording and based on the role youll have id --and for who is the manager of the employee

const addRole = async () => {

  const { title, salary, department } = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Please enter the role's title: ",
    },
    {
      name: "salary",
      type: "input",
      message: "Please enter the role's salary: ",
    },
    {
      name: "department",
      type: "input",
      message: "What department does the role belong to?",
    }
  ]);

  // query database

  let [rows, fields] = await (await database).execute(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department]);

  [rows, fields] = await (await database).execute("SELECT * FROM roles;");

  console.table(rows);

  startProgram();

};

const addDepartment = async () => {

  const { name } = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Please enter the Department's name: ",
    }
  ]);

  // query database

  let [rows, fields] = await (await database).execute(`INSERT INTO departments (name) VALUE (?)`, [name]);

  [rows, fields] = await (await database).execute("SELECT * FROM departments;");

  console.table(rows);

  startProgram();

};

//  ========= UPDATE FUNCTIONS ==========

const updateRole = async () => {
  
  // query database

  const [rows, fields] = await (await database).execute("SELECT * FROM employees;");

  const newChoices = rows.map((employee) => ({ name: employee.name, value: employee }))

  console.table(newChoices);

  const { choice } = await inquirer.prompt([{

    name: "choice",
    tyope: "list",
    message: "Which employee role do you want to update?",
    choices: newChoices

  }])

  console.log(choice);

};

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
