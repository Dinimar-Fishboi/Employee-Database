INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO staff_role (title, salary)
VALUES ("Sales Lead", 100000),
       ("Salesperson", 80000),
       ("Lead Engineer", 150000),
       ("Software Engineer", 120000),
       ("Account Manager", 160000),
       ("Accountant", 125000),
       ("Legal Team Lead", 250000),
       ("Lawyer", 190000);

INSERT INTO employee (first_name, last_name)
VALUES ("Kari", "Bailey"),
       ("Luther", "Harrington"),
       ("Janie", "Zhang"),
       ("Parker", "Le"),
       ("Rolando", "Gutierrez"),
       ("Ora", "Suarez"),
       ("Ashley", "Pacheco"),
       ("Lacey", "Schroeder"),
       ("Max", "Wilkins"),
       ("Marisa", "Gallegos");

SELECT * FROM department;
SELECT * FROM staff_role;
SELECT * FROM employee;