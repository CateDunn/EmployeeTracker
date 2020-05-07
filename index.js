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
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the department that you would like to add?"
        }  
    ])

    .then(function(answer) {
        console.log(answer)
    })
};

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of this role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the id for the department that this role is in?"
        }
    ])

    .then(function(answer) {
        console.log(answer)
    })
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the id for this employee's role?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the id for this employee's manager"
        }
    ])
    .then(function(answer) {
        console.log(answer)
    })
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