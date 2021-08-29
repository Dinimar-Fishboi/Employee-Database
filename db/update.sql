-- Update Employee Role -- 
UPDATE employee
SET role_id = 1
WHERE employee_id = 9;

SELECT 
    employee.employee_id AS id, 
    employee.first_name, employee.last_name,
    staff_role.title, department.dept_name AS department
FROM employee
INNER JOIN staff_role
ON employee.role_id = staff_role.role_id 
INNER JOIN department
ON staff_role.department_id = department.id
WHERE title = "Sales Lead"
ORDER BY id ASC;