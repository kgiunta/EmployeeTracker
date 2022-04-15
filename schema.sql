DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
Departmentid INT NOT NULL  PRIMARY KEY,
departmentName VARCHAR(30)
)

CREATE TABLE title(
Titleid INT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id: INT
FOREIGN KEY (Departmentid)
  REFERENCES department(Departmentid)
)

CREATE TABLE employee(
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
title_id: INT,
manager_id: INT 
)



INSERT INTO department (Departmentid, departmentName)
VALUES ( 1, "Sales")
       ( 1, "Sales"),
       ( 2 "Engineering"),
       ( 2,"Engineering");




INSERT INTO title (Titleid, title, salary, department_id)
VALUES ( 10, "Sales Lead", 150000,1),
       ( 11, "Salesperson", 80000,1),
       ( 12, "Lead Engineer", 150000,2),
       (13, "Software Engineer", 110000, 2);




INSERT INTO employees (first_name, last_name, title_id, manager_id)
VALUES ( "John", "Doe", "Sales Lead", "Sales","no"),
       ( "Mike", "Chan", "Salesperson", "Sales","no"),
       ( "Ashley", "Rodriguez", "Lead Engineer", "Engineering","no"),
       ("Kevin", "Tupik", "Software Engineer", "Engineering", "no");