
-- View all Departments
SELECT * FROM department;

-- View all Roles --
SELECT 
    staff_role.title AS title, staff_role.role_id AS id,
    department.dept_name AS department, staff_role.salary AS salary
FROM staff_role
INNER JOIN department
ON staff_role.department_id = department.id
ORDER BY id ASC;

-- View all Employees -- 
SELECT 
    employee.employee_id AS id, 
    employee.first_name, employee.last_name,
    staff_role.title, department.dept_name AS department,
    staff_role.salary AS salary, employee.manager_id 
FROM employee
INNER JOIN staff_role
ON employee.role_id = staff_role.role_id 
INNER JOIN department
ON staff_role.department_id = department.id
ORDER BY id ASC;

-- View all Employees by Role ---
SELECT 
    employee.employee_id AS id, 
    employee.first_name, employee.last_name,
    staff_role.title, department.dept_name AS department
FROM employee
INNER JOIN staff_role
ON employee.role_id = staff_role.role_id 
INNER JOIN department
ON staff_role.department_id = department.id
WHERE title = "Salesperson"
ORDER BY id ASC;

--- Add Department ---
INSERT INTO department (dept_name)
  VALUES ('Marketing');

SELECT * FROM department;

--- Add Role ---
INSERT INTO staff_role (title, salary, department_id)
    VALUES ('Marketing Specialist', 80000, 5);

SELECT 
    staff_role.title AS title, staff_role.role_id AS id,
    department.dept_name AS department, staff_role.salary AS salary
FROM staff_role
INNER JOIN department
ON staff_role.department_id = department.id
ORDER BY id ASC;

--- Add Employee ---
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Simone", "Blake", 9, null);

SELECT 
    employee.employee_id AS id, 
    employee.first_name, employee.last_name,
    staff_role.title, department.dept_name AS department,
    staff_role.salary AS salary, employee.manager_id 
FROM employee
INNER JOIN staff_role
ON employee.role_id = staff_role.role_id 
INNER JOIN department
ON staff_role.department_id = department.id
ORDER BY id ASC;
