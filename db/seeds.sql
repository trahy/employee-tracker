INSERT INTO departments (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

SELECT * FROM departments;


INSERT INTO roles (department_id, title, salary)
VALUES (4,'Sales Lead', 90000),
       (4,'Salesperson', 70000),
       (1,'Lead Engineer', 150000),
       (1,'Software Engineer', 120000),
       (2,'Account Manager', 160000),
       (2,'Accountant', 120000),
       (3,'Legal Team Lead', 225000),
       (3,'Lawyer', 180000);

SELECT * FROM roles;


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Gill', 'Sanders', 1, NULL),
        ('Suresh', 'Abdul', 3, NULL),
        ('Kiara', 'Williams', 8, 5),
        ('Carl', 'Young', 2, 1),
        ('Vaughn', 'Simmons', 7, NULL),
        ('Sophie', 'Lynn', 6, 7),
        ('Caitlyn', 'Lawson', 5, NULL),
        ('Keith', 'Nigels', 4, 2);

SELECT * FROM employees;