
--- Viewing all employees ---
SELECT 
    employee.employee_id AS id, 
    employee.first_name, employee.last_name,
    staff_role.title, department.dept_name AS department,
    staff_role.salary AS salary, employee.manager_id AS manager
FROM employee
INNER JOIN staff_role
ON employee.role_id = staff_role.role_id 
INNER JOIN department
ON staff_role.department_id = department.id
ORDER BY id ASC;

-- Selecting employee by role ---
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