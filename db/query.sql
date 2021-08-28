SELECT 
    employee.employee_id AS id, 
    employee.first_name, employee.last_name,
    staff_role.title, department.dept_name AS department
FROM employee
INNER JOIN staff_role
ON employee.role_id = staff_role.role_id 
INNER JOIN department
ON staff_role.department_id = department.id
ORDER BY id ASC;
