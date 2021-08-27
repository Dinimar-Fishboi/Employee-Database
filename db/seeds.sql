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
       ("Account Manager", 160000,3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kari", "Bailey", 2, 10),
       ("Luther", "Harrington", 8, 4),
       ("Janie", "Zhang", 2, 10),
       ("Parker", "Le", 7),
       ("Rolando", "Gutierrez", 3),
       ("Ora", "Suarez", 6),
       ("Ashley", "Pacheco", 4, 5),
       ("Lacey", "Schroeder", 5),
       ("Max", "Wilkins", 2, 10),
       ("Marisa", "Gallegos", 1);

SELECT * FROM department;
SELECT * FROM staff_role;
SELECT * FROM employee;