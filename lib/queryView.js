const db = require('../config/connection.js');
const prompts = require('./prompts.js');

// handles the 'View' queries from prompts

function viewAllDepartments() {
    db.query(
    `
    SELECT * FROM departments;
    `,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

function viewAllRoles() {
    db.query(
    `
    SELECT roles.id,
    title,
    salary FROM roles;
    `,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

function viewAllEmployees() {
    db.query(
    `
    SELECT * FROM employees;
    `,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            prompts();
        });
};

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };