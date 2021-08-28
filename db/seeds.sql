INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO staff_role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kari", "Bailey", 2),
       ("Luther", "Harrington", 8),
       ("Janie", "Zhang", 2),
       ("Parker", "Le", 7),
       ("Rolando", "Gutierrez", 3),
       ("Ora", "Suarez", 6),
       ("Ashley", "Pacheco", 4),
       ("Lacey", "Schroeder", 5),
       ("Max", "Wilkins", 2 ),
       ("Marisa", "Gallegos", 1);

UPDATE employee 
SET manager_id = 10
WHERE role_id = 2;

UPDATE employee 
SET manager_id = 5
WHERE role_id = 3;

UPDATE employee 
SET manager_id = 8
WHERE role_id = 6;

UPDATE employee 
SET manager_id = 4
WHERE role_id = 8;


SELECT * FROM department;
SELECT * FROM staff_role;
SELECT * FROM employee;