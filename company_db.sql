DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL (9, 2) NOT NULL,
  dept_id INT NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE departments (
  dept_id INT NOT NULL AUTO_INCREMENT,
  deptName VARCHAR(30) NULL,
  PRIMARY KEY (dept_id)
);




-- CREATING EMPLOYEES
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Fury', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tony', 'Stark', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bruce', 'Banner', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Thor', 'Son of Odin', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Captain', 'America', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Natasha', 'Romanoff', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Peter', 'Quill', 4, 3);




-- CREATING ROLES
INSERT INTO role (title, salary, dept_id)
VALUES ('O.G.', 750000.00, 1);
INSERT INTO role (title, salary, dept_id)
VALUES ('Scientiest', 5000000.00, 2);
INSERT INTO role (title, salary, dept_id)
VALUES ('Engineer', 1000000.00, 2);
INSERT INTO role (title, salary, dept_id)
VALUES ('Soldier', 50000.00, 3);





-- CREATING DEPARTMENTS
INSERT INTO departments (deptName)
VALUES ('ADMINISTRATION');
INSERT INTO departments (deptName)
VALUES ('RESEARCH & DEVELOPMENT');
INSERT INTO departments (deptName)
VALUES ('CONTRACTORS');




SELECT * FROM departments;

SELECT * FROM role;

SELECT * FROM employee;


SELECT role.role_id first_name, last_name, title, deptName, salary FROM ((employee
INNER JOIN role ON employee.role_id = role.role_id)
INNER JOIN departments ON role.dept_id = departments.dept_id);

