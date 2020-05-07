const inquirer  = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "password",
    database: "employee_trackerDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
  });

  function prompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "main",
                message: "What would you like to do",
                choices: [
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "View departments",
                    "View roles",
                    "View employees",
                    "Update employee roles",
                    "Exit"]
            }])
        .then(function (answer) {
            switch (answer.main) {
                case ("Add a department"):
                    addDepartment();
                    break;
                case ("Add a role"):
                    addRole();
                    break;
                case ("Add an employee"):
                    addEmployee();
                    break;
                case ("View departments"):
                    viewDepartments();
                    break;
                case ("View roles"):
                    viewRoles();
                    break;
                case ("View employees"):
                    viewEmployees();
                    break;
                case ("Update employee roles"):
                    updateRole();
                    break;
                case ("Exit"):
                    connection.end();
                    break;
                default:
                    console.log("fubar")
                    break;
            }
        })
}

prompt()

function addDepartment() {
    console.log("adding a department!");
};

function addRole(){
    console.log("adding a role!");
};

function addEmployee() {
    console.log("adding an employee!");
};

function viewDepartments() {
    connection.query(`SELECT * FROM departments`, function (err, res) {
        if (err) throw err;
        console.table(res)
    })

};

function viewRoles(){
    connection.query(`SELECT * FROM roles`, function (err, res) {
        if (err) throw err;
        console.table(res)
    })
};

function viewEmployees(){
    connection.query(`SELECT * FROM employees`, function (err, res) {
        if (err) throw err;
        console.table(res)
    })
};

function updateRole(){
    console.log("updating employee roles!");
};