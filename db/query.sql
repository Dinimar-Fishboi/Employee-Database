SELECT employee.employee_id, staff_role.id
FROM employee
JOIN employee
ON staff_role.role_id = employee.role_id;

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