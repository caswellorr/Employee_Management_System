
const mysql = require("mysql2/promise");
const server = require('./server');

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

//   view roles(startProgram, database)

// const viewRoles = async (startProgram, database) 

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

// role => another query, before prompt, similar to update role that gets roles then -- watch recording and based on the role youll have id --and for who is the manager of the employee
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

const addRole = async () => {

  const { title, salary, department_id } = await inquirer.prompt([
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

  let [rows, fields] = await (await database).execute(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id]);

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

  let [rows, fields] = await (await database).execute(`INSERT INTO departments (name) VALUES ?`, [name]);

  [rows, fields] = await (await database).execute("SELECT * FROM departments;");

  console.table(rows);

  startProgram();

};

//  ========= UPDATE FUNCTIONS ==========

const updateRole = async () => {

  // create database
  const database = await mysql.createdatabase(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "employee_db",
    },

    console.log(`Connected to the employee_db database.`)

  );

  // query database

  const [rows, fields] = await database.query("SELECT * FROM employees;");

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

module.exports = {viewEmployees};