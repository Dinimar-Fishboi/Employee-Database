SELECT 
    employee.employee_id AS id, 
    employee.first_name, employee.last_name,
    staff_role.role_id, staff_role.title
FROM staff_role
JOIN employee
ON employee.role_id = staff_role.role_id
ORDER BY id ASC;

