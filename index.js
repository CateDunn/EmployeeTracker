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
                    "Delete",
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
                case ("Delete"):
                    deleteSomething();
                    break;
                case ("Exit"):
                    connection.end();
                    break;
                default:
                    console.log("default")
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
        connection.query(`INSERT INTO departments (department_name) VALUES ("${answer.department_name}");`, function(err,res) {
            if (err) throw err;
        }
        )
        prompt()
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
        connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${answer.department_id}");`, function(err,res) {
            if (err) throw err;
        }
        )
        prompt()
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
        connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}");`, function(err,res) {
            if (err) throw err;
        }
        )
        prompt()
    })
};

function viewDepartments() {
    connection.query(`SELECT * FROM departments`, function (err, res) {
        if (err) throw err;
        console.table(res)
        prompt()
    })

};

function viewRoles(){
    connection.query(`SELECT * FROM roles`, function (err, res) {
        if (err) throw err;
        console.table(res)
        prompt()
    })
};

function viewEmployees(){
    connection.query(`SELECT * FROM employees`, function (err, res) {
        if (err) throw err;
        console.table(res)
        prompt()
    })
};

function updateRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "role_id",
            message: "What is the id of the role that you would like to update?"
        },
        {
            type: "input",
            name: "newrole_title",
            message: "What is the new title of the role?"
        },
        {
            type: "input",
            name: "newrole_salary",
            message: "What is the new salary for the role?"
        },
        {
            type: "input",
            name: "newrole_department_id",
            message: "What is the new id for the role?"
        }

    ])
    .then(function(answer) {
        connection.query(`UPDATE roles SET title = "${answer.newrole_title}", salary = ${answer.newrole_salary}, department_id = ${answer.newrole_department_id} WHERE id = ${answer.role_id};`, function(err,res) {
            if (err) throw err;
        }
        )
        prompt()
    })
};

function deleteSomething(){
    // DELETE from employees where id = 1
    inquirer.prompt([
        {
            type: "list",
            name: "delete",
            message: "What would you like to delete?",
            choices: [
                "departments",
                "roles",
                "employees",
                "Main Menu"
                ]
        }
    ])
    .then(function (answer) {
        switch (answer.delete) {
            case ("departments"):
                inquirer.prompt([
                    {
                        type: "input",
                        name: "department_delete",
                        message: "What is the name of the department that you would like to delete?"
                    }  
                ])
                .then(function(answer) {
                    connection.query(`DELETE FROM departments WHERE department_name = "${answer.department_delete}"`, function(err,res) {
                        if (err) throw err;
                    })
                    console.log("Department successfully deleted!")
                    prompt()
                })
                break;
            case ("roles"):
                inquirer.prompt([
                    {
                        type: "input",
                        name: "role_delete",
                        message: "What is the name of the role that you would like to delete?"
                    }  
                ])
                .then(function(answer) {
                    connection.query(`DELETE FROM roles WHERE title = "${answer.role_delete}"`, function(err,res) {
                        if (err) throw err;
                    })
                    console.log("Role successfully deleted!")
                    prompt()
                })
                break;
            case ("employees"):
                inquirer.prompt([
                    {
                        type: "input",
                        name: "employee_delete",
                        message: "What is the id of the employee that you would like to delete?"
                    }
                      
                ])
                .then(function(answer) {
                    connection.query(`DELETE FROM employees WHERE id = ${answer.employee_delete}`, function(err,res) {
                        if (err) throw err;
                    })
                    console.log("Employee successfully deleted!")
                    prompt()
                })
                break;
            case ("Exit"):
                prompt();
                break;
            default:
                console.log("default")
                break;
        }
    })
   

};

function deleteRole(){

};

function deleteEmployee(){

}