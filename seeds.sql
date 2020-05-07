INSERT INTO departments (department_name)
VALUES ("Marketing");
INSERT INTO departments (department_name)
VALUES ("Human Resources");
INSERT INTO departments (department_name)
VALUES ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Specialist", 50, 100);
INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources Generalist", 45.5, 200);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 65, 300);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Smith", 100, 150);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Elizabeth", "Johnson", 200, 250 );
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Rogers", 300);