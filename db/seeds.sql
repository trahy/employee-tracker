INSERT INTO departments (dept_name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 90000, 4),
       ('Salesperson', 70000, 4),
       ('Lead Engineer', 150000, 1),
       ('Software Engineer', 120000, 1),
       ('Account Manager', 160000, 2),
       ('Accountant', 120000, 2),
       ('Legal Team Lead', 225000, 3),
       ('Lawyer', 180000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Gill', 'Sanders', 1, NULL),
        ('Suresh', 'Abdul', 3, NULL),
        ('Kiara', 'Williams', 8, 5),
        ('Carl', 'Young', 2, 1),
        ('Vaughn', 'Simmons', 7, NULL),
        ('Sophie', 'Lynn', 6, 7),
        ('Caitlyn', 'Lawson', 5, NULL),
        ('Keith', 'Nigels', 4, 2);


SELECT * FROM departments;

SELECT * FROM roles;

SELECT * FROM employees;