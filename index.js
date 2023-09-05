const inquirer = require('inquirer');
const connection = require('./config/connection.js');
const figlet = require("figlet");

// adds a banner at the start
console.log(
    figlet.textSync("EMPLOYEE \n TRACKER", {
        font: "standard",
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
        whitespaceBreak: true,
    })
);

// main menu with array of questions for user input
function prompts() {
    inquirer.prompt([
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
                case 'Quit':
                    connection.end();
                    console.log('You have exited the session')
                    break;
            }
        })
};

// functions to VIEW tables

function viewAllDepartments() {
    connection.query(
        `SELECT id, dept_name AS department FROM departments`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

function viewAllRoles() {
    connection.query(
        `SELECT roles.id, title, salary, department_id AS department FROM roles
        INNER JOIN departments ON roles.department_id = departments.id
        ORDER BY roles.id`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

function viewAllEmployees() {
    connection.query(`SELECT * FROM employees`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

// functions to ADD to tables

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'dept_name',
        message: 'Enter department name',
    }).then((response) => {
        connection.query('INSERT INTO departments SET ?', { dept_name: response.dept_name },
            (err, res) => {
                if (err) throw err;
                console.log('Department created');
                prompts();
            });
    });
};

function addRole() {
    connection.query(`SELECT * FROM departments`, (err, departments) => {
        if (err) throw err;

        const deptChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));
        deptChoices.push({ name: 'None', value: null });

        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter title of role',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary of role',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Enter department ID number',
                choices: deptChoices,
            },
        ]).then((response) => {
            connection.query('INSERT INTO roles SET ?',
                response, (err, res) => {
                    if (err) throw err;
                    console.log('New role added');
                    prompts();
                });
        });
    });
};

function addEmployee() {
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', (err, employees) => {
        if (err) throw err;

        const managerChoices = employees.map(emp => ({ name: emp.name, value: emp.id }));
        managerChoices.push({ name: 'None', value: null });

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter employee first name',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter employee last name',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter role ID for employee',
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Enter manager for employee',
                choices: managerChoices,
            }
        ]).then((response) => {
            confirmManagerID(response.role_id, () => {
                if (response.manager_id !== null) {
                    confirmManagerID(response.manager_id, () => {
                        connection.query('INSERT INTO employees SET ?', response, (err, res) => {
                            if (err) throw err;
                            console.log('Employee added');
                            prompts();
                        });
                    });
                } else {
                    connection.query('INSERT INTO employees SET ?', response, (err, res) => {
                        if (err) throw err;
                        console.log('Employee added');
                        prompts();
                    });
                }
            });
        });
    });
};



prompts();