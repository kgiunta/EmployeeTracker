const inquirer = require("inquirer");
const fs = require("fs");
const departmentArr = [];

// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // MySQL password
//       password: '',
//       database: 'classlist_db'
//     },
//     console.log(`Connected to the classlist_db database.`)
//   );

function getInfo() {
  inquirer.prompt([
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

    {
      type: "input",
      message: "Showing Employees:",
      name: "viewEmployees",
      when: (response) => {
        if (response.action === "View All Employees") return true;
      },
    },
    {
      type: "input",
      name: "roleUpdate",
      message: "What is the employee's updated role?",
      when: (response) => {
        if (response.action === "Update Employee Role") return true;
      },
    },
    //   add employee line 30-73
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
      when: (response) => {
        if (response.action === "Add Employee") return true;
      },
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
      when: (response) => {
        if (response.action === "Add Employee") return true;
      },
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
      when: (response) => {
        if (response.action === "Add Employee") return true;
      },
    },
    {
      type: "list",
      name: "role",
      message: "Who is the employee's manager",
      choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik"],
      when: (response) => {
        if (response.action === "Add Employee") return true;
      },
    },
    {
      type: "input",
      message: "Showing all roles:",
      name: "viewRoles",
      when: (response) => {
        if (response.action === "View All Roles") return true;
      },
    },

    {
      type: "input",
      message: "Viewing Departments",
      name: "viewDepartments",
      when: (response) => {
        if (response.action === "View All Departments") return true;
      },
    },
    {
      type: "input",
      message: "What is the name of the department?",
      name: "departmentAdd",
      when: (response) => {
        if (response.action === "Add Department") return true;
      },
    },
    {
      type: "input",
      message: "What is the name of the role?",
      name: "roleAdd",
      when: (response) => {
        if (response.action === "Add Role") return true;
      },
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "roleSalary",
      when: (response) => {
        if (response.action === "Add Role") return true;
      },
    },
    {
      type: "list",
      message: "What department does the role belong to?",
      name: "roleDepartment",
      choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
      when: (response) => {
        if (response.action === "Add Role") return true;
      },
    },
    {
      type: "input",
      message: "quit function here",
      name: "quit",
      when: (response) => {
        if (response.action === "Quit") return true;
      },
    },
  ]);
  //   .then(data)
  //   let depart;
  //       switch (data.role) {
  //         case "What is the name of the department?":
  //             teamMember = new Manager(
  //               data.departmentAdd
  //             );
  //             managerArr.push(teamMember);
  //             break
  //   ;
}
getInfo();

// function switchcase(){
// inquirer.prompt().then(data)=>{
//     switch(choices){
//         case"View All Employees":
//         showemployees();
//     }break;
//     case "View All Roles":
//         showRoles();
// }break;
// case "View All Departments":
//     showDepartments();
//     break;
