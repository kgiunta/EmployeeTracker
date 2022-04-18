DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
departmentName VARCHAR(30)
);

CREATE TABLE roles(
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
  REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employees(
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT, 
FOREIGN KEY (role_id)
  REFERENCES roles(id)
   ON DELETE CASCADE, 
   FOREIGN KEY (manager_id) 
   REFERENCES employees(id) 
);



INSERT INTO department (departmentName)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");




INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 150000,1),
       ("Lead Engineer", 130000,2),
       ("Account Manager", 200000,3),
       ("Legal Team Lead", 300000, 4);




INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1),
        ("Mike", "Chan", 2, 2),
       ("Ashley", "Rodriguez", 3, 3),
       ("Kevin", "Tupik", 4, 4);