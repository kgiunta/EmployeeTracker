const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const express = require("express");
const res = require("express/lib/response");
const { ifError } = require("assert");
const cTable = require("console.table");
const { info } = require("console");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "19951995",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do? ",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])

    .then((data) => {
      if (data.action === "View All Employees") {
        viewAllEmployees();
      } else if (data.action === "Add Employee") {
        addEmployee();
      } else if (data.action === "Update Employee Role") {
        updateRole();
      } else if (data.action === "View All Roles") {
        viewAllRoles();
      } else if (data.action === "Add Role") {
        addingRole();
      } else if (data.action === "View All Departments") {
        viewAllDepartments();
      } else if (data.action === "Add Department") {
        addDepartment();
      } else {
        // Call rendering function
      }
    });
}

var rolesArr = [];
function selectRole() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      rolesArr.push(res[i].title);
    }
  });
  return rolesArr;
}
var managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employees", function (err, res) {
    console.log(res);
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }
    console.log(managersArr);
    //   return managersArr;
  });
}

// adding employee
function addEmployee() {
  db.query("SELECT * FROM employees", function (err, data) {
    const employeeArray = data.map(
      (employees) => employees.first_name + " " + employees.last_name
    );
    db.query("SELECT * FROM roles", function (err, roles) {
      const rolesArray = roles.map((roles) => roles.title);
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee's role",
            choices: rolesArray,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager:",
            choices: employeeArray,
          },
        ])
        .then(async function (val) {
          var roleId = rolesArray.indexOf(val.role) + 1;
          // selectManager();
          var managerId = employeeArray.indexOf(val.manager) + 1;
          console.log(roleId);
          db.query(
            "INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)",
            [val.firstName, val.lastName, roleId, managerId],
            function (err) {
              if (err) throw err;
              console.table(val);
              init();
            }
          );
        });
    });
  });
}

// view employees
function viewAllEmployees() {
  db.query(
    "SELECT * FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN department on department.id = roles.department_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

// view roles
function viewAllRoles() {
  db.query("SELECT roles.title FROM roles;", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}
// viewAllDepartments
function viewAllDepartments() {
  db.query("SELECT * FROM department AS Department ", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}
async function updateRole() {
  db.query("SELECT * FROM employees ", function (err, data) {
    const employeeArray = data.map(
      (employees) => employees.first_name + " " + employees.last_name
    );
    db.query("SELECT * FROM roles ", function (err, dataTwo) {
      const rolesArray = dataTwo.map((roles) => roles.title);

      inquirer
        .prompt([
          {
            type: "list",
            name: "roleUpdate",
            message: "Choose employee role to update",
            choices: employeeArray,
          },
          {
            type: "list",
            name: "roleUpdateTwo",
            message: "What is the employee's updated role?",
            choices: rolesArray,
          },
        ])
        .then((info) => {
          console.log(info);
          init();
        });
    });
  });
}
function addDepartment() {
  inquirer

    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentAdd",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (departmentName) VALUES (?)",
        answer.departmentAdd,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}
function addingRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleAdd",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "What department does the role belong to?",
        name: "roleDepartment",
        choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
      },
    ])
    .then(function (res) {
      db.query(
        "SELECT * FROM department where departmentName = (?)",
        res.roleDepartment,
        (err, resTwo) => {
          if (err) throw err;
          console.log(resTwo);
          db.query(
            "INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)",
            [res.roleAdd, res.roleSalary, resTwo.id],
            function (err) {
              if (err) throw err;
              console.table(res);
              init();
            }
          );
        }
      );
    });
}
init();
