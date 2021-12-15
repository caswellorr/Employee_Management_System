

INSERT INTO departments (name)
VALUES ("Band"),
       ("Business"),
       ("Crew");
  
INSERT INTO roles (title, salary, department_id)
VALUES ("Guitar", 200000, 1),
       ("Bass", 300000, 1),
       ("Drums", 400000, 1),
       ("Vocals", 600000, 1),
       ("Band Manager", 900000, 2),
       ("Tour Manager", 500000, 3);
       
INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Lennon", 4, 1),
       ("Paul", "McCartney", 2, 1),
       ("George", "Harrison", 1, 1),
       ("Ringo", "Starr", 3, 1),
       ("Brian", "Epstein", 5, NULL),
       ("Mal", "Evans", 6, 1);