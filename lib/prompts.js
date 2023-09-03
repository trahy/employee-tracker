const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./queryView.js')

// array of questions for user input
function prompts() {
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
                    addDepartment(response);
                    break;
                case 'Add a role':
                    addRole(response);
                    break;
                case 'Add an employee':
                    addEmployee(response);
                    break;
                case 'Update employee role':
                    updateEmployeeRole(response);
                    break;
                case 'Update employee manager':
                    updateEmployeeManager(response);
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
                case 'Quit':
                    quitPrompt();
                    break;
            }
        })
};

module.exports = prompts ;