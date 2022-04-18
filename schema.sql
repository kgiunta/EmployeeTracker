DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
Departmentid INT NOT NULL  PRIMARY KEY,
departmentName VARCHAR(30)
);

CREATE TABLE roles(
id INT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT
);

CREATE TABLE employees(
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT 
);



INSERT INTO department (Departmentid, departmentName)
VALUES ( 1, "Sales"),
       ( 2, "Engineering"),
       ( 3, "Finance"),
       ( 4,"Legal");




INSERT INTO roles (id, title, salary, department_id)
VALUES ( 10, "Sales Lead", 150000,1),
       ( 11, "Lead Engineer", 130000,2),
       ( 12, "Account Manager", 200000,3),
       (13, "Legal Team Lead", 300000, 4);




INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 10, 1),
        ("Mike", "Chan", 11, 2),
       ("Ashley", "Rodriguez", 12, 4),
       ("Kevin", "Tupik", 13, 5);