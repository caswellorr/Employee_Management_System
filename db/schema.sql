
drop if 

create database employee_db;

USE emplpoyee_db


create table employee(

  id int auto_increment primary key,
  name varchar(30),
  role_id int

);

insert into employee (id, naem, role_id) values (1, "Jason", 1);