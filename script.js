const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const express = require("express");

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
    //   need help setting up
    .then((data) => {
      if (data.action === "View All Employees") {
        console.log(data);
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
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      rolesArr.push(res[i].title);
    }
  });
  return rolesArr;
}

function addEmployee() {
  db.query("SELECT * FROM employees", function (err, data) {
    const employeeArray = data.map(
      (employees) => employees.first_name + " " + employees.last_name
    );

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
          choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
            "Customer Service",
          ],
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the employee's manager:",
          choices: employeeArray,
        },
      ])
      .then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1;
        var managerId = selectManager().indexOf(val.choice) + 1;
        db.query(
          "INSERT INTO employee SET ?",
          {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId,
          },
          function (err) {
            if (err) throw err;
            console.table(val);
            init();
          }
        );
      });
  });
}
// view employees
function viewAllEmployees() {
  db.query(
    "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

// view roles
function viewAllRoles() {
  db.query(
    "SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employee JOIN role ON employee.role_id = roles.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}
// viewAllDepartments
function viewAllDepartments() {
  db.query(
    "SELECT employees.first_name, employees.last_name, department.name AS Department FROM employees JOIN role ON employees.role_id = role.id JOIN department ON roles.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}
function updateRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleUpdate",
      message: "What is the employee's updated role?",
    },
  ]);
}
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "departmentAdd",
    },
    {
      type: "input",
      message: "What is the name of the department?",
      name: "departmentAdd",
    },
  ]);
}
function addingRole() {
  inquirer.prompt([
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
  ]);
}
init();
//     {
//       type: "input",
//       message: "quit function here",
//       name: "quit",
//       when: (response) => {
//         if (response.action === "Quit") return true;
//       },
//     },
//   ]);
//   //   .then(data)
//   //   let depart;
//   //       switch (data.role) {
//   //         case "What is the name of the department?":
//   //             teamMember = new Manager(
//   //               data.departmentAdd
//   //             );
//   //             managerArr.push(teamMember);
//   //             break
//   //   ;
// }
// getInfo();

// // function switchcase(){
// // inquirer.prompt().then(data)=>{
// //     switch(choices){
// //         case"View All Employees":
// //         showemployees(); which would be a db.query, make sure you use group by in sql lesson 23
// //     }break;
// //     case "View All Roles":
// //         showRoles();
// // }break;
// // case "View All Departments":
// //     showDepartments();
// //     break;
