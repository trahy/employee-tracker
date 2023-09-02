INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO role (department_id, title, salary)
VALUES (1,'Sales Lead', 90000),
       (2,'Salesperson', 70000),
       (3,'Lead Engineer', 150000),
       (4,'Software Engineer', 120000),
       (5,'Account Manager', 160000),
       (6,'Accountant', 120000),
       (7,'Legal Team Lead', 225000),
       (8,'Lawyer', 180000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Gill', 'Sanders', 1, NULL),
('Suresh', 'Adu', 3, NULL),
('Kiara', 'Williams', 8, 5),
('Carl', 'Young', 2, 1),
('Vaughn', 'Simmons', 7, NULL),
('Sophie', 'Lynn', 6, 7),
('Caitlyn', 'Lawson', 5, NULL),
('Keith', 'Nigh', 4, 2);