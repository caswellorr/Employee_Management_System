const inquirer = require("inquirer");
const mysql = require("mysql2/promises");

startProgram();

async function startProgram (){

  console.table(rows);

  const {choice} = await inquirer.prompt([{

    name: "choice",
    tyope: "list",
    message: "what do you want to do?",
    choices: ["update role", "show employees"]

  }])

  console.log(choice);

  switch (choice) {
    case "show departments":
      updateRole()

      break;

    default:

       break;

  }
}

async function updateRole() {

  // create connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee_db",
  });

  // query databse

  const [rows, fields] = await connection.execute("select * from employee");

  const newChoices = rows.map((employee) => ({name: employee.name, value:employee}))

  console.table(newChoices);

  const {choice} = await inquirer.prompt([{

    name: "choice",
    tyope: "list",
    message: "which employee role do you want to update?",
    choices: newChoices

  }])

  console.log(choice);

}
