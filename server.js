const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const figlet = require("figlet");

const PORT = process.env.PORT || 3001;

// adds a banner at the start
console.log(
    figlet.textSync("EMPLOYEE \n TRACKER", {
      font: "standard",
      horizontalLayout: "fitted",
      verticalLayout: "fitted",
      whitespaceBreak: true,
    })
  );

// array of questions for user input
inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices:
                [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee role',
                    'Update employee manager',
                    'Delete department',
                    'Delete role',
                    'Delete employee',
                    'Quit'
                ],
        }
    ])
    .then(result => {
        switch (result.options) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                updateEmployeeManager();
                break;
            case 'Delete department':
                deleteDepartment();
                break;
            case 'Delete role':
                deleteRole();
                break;
            case 'Delete employee':
                deleteEmployee();
                break;
        }
    });