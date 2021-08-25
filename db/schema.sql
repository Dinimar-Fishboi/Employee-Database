DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db; 

USE staff_db;

CREATE TABLE department (

    id INT NOT NULL UNIQUE AUTO_INCREMEMT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE staff_role (

    role_id INT NOT NULL UNIQUE AUTO_INCREMEMT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (

    employee_id INT NOT NULL UNIQUE AUTO_INCREMEMT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT, --EMPLOYEE_ID ALSO EQUALS MANAGER_ID
    FOREIGN KEY (role_id)
    REFERENCES staff_role(role_id)
    ON DELETE SET NULL
);

