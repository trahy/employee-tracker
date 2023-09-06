const inquirer = require('inquirer');
const connection = require('./config/connection.js');
const figlet = require("figlet");

// adds banner at start of prompt
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

// --- views all departments of database ---
function viewAllDepartments() {
    connection.query(
        `SELECT id, dept_name AS department FROM departments;`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

// --- views all roles from database ---
function viewAllRoles() {
    connection.query(
        `SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department FROM roles
        INNER JOIN departments ON roles.department_id = departments.id
        ORDER BY roles.id;`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

// --- views all employees from database ---
function viewAllEmployees() {
    connection.query(`
    SELECT
    employees.first_name,
    employees.last_name,
    roles.title AS job_title,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

// --- functions to department to table ---
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'dept_name',
        message: 'Enter department name',
    }).then((response) => {
        connection.query(`INSERT INTO departments SET ?`, { dept_name: response.dept_name },
            (err, res) => {
                if (err) throw err;
                console.log('Department created');
                prompts();
            });
    });
};

// --- function to add role to table ---
function addRole() {
    // fetches departments database
    connection.query(`SELECT * FROM departments;`, (err, departments) => {
        if (err) throw err;

        // uses departments database to create choices
        const deptChoices = departments.map(dept => ({ name: dept.dept_name, value: dept.id }));
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
                message: 'Select department',
                choices: deptChoices,
            },
        ]).then((response) => {
            connection.query(`INSERT INTO roles SET ?`,
                response, (err, res) => {
                    if (err) throw err;
                    console.log('New role added');
                    prompts();
                });
        });
    });
};

// --- function to add employee to table ---
function addEmployee() {
    // fetches employees from database
    connection.query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees;`, (err, employees) => {
        if (err) throw err;

        // uses employee database to create choices
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
            connection.query(`INSERT INTO roles SET ?`,
                response, (err, res) => {
                    if (err) throw err;
                    console.log('Employee added');
                    prompts();
                });
        });
    });
};

// --- function to UPDATE employee role ---
function updateEmployeeRole() {
    // fetches employees from database
    connection.query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees;`, (err, employees) => {
        if (err) throw err;

        const employeeChoices = employees.map(emp => ({ name: emp.name, value: emp.id }));

        // fetches roles from database
        connection.query(`SELECT id, title FROM roles;`, (err, roles) => {
            if (err) throw err;

            const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeUpdate',
                    message: 'Select employee to update',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'roleUpdate',
                    message: 'Select role to update',
                    choices: roleChoices,
                }
            ]).then((response) => {
                connection.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [response.roleUpdate, response.employeeUpdate], (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated');
                    prompts();
                });
            });
        });
    });
};

// --- function to UPDATE employee manager ---
function updateEmployeeManager() {
    // fetches employees from database
    connection.query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees;`, (err, employees) => {
        if (err) throw err;

        const employeeChoices = employees.map(emp => ({ name: emp.name, value: emp.id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeManager',
                message: 'Select employee to update manager',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'managerUpdate',
                message: 'Select manager of employee',
                choices: [...employeeChoices, { name: 'None', value: null }],
            }
        ]).then((response) => {
            connection.query('UPDATE employees SET manager_id = ? WHERE id = ?', [response.managerUpdate, response.employeeManager], (err, res) => {
                if (err) throw err;
                console.log('Employee\'s manager updated');
                prompts();
            });
        });
    });
};

prompts();