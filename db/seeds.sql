INSERT INTO department
(name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role
(title, salary, department_id)
VALUES
('Software Engineer', 150000, 1),
('Lead Engineer', 200000, 1),
('Accountant', 120000, 2),
('Account Manager', 150000, 2),
('Lawyer', 180000, 3),
('Legal Team Lead', 220000, 3),
('Sales Associate', 85000, 4),
('Sales Lead', 120000,4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
  ('Jack', 'London', 2, NULL),
  ('Peter', 'Greenaway', 4, NULL),
  ('Paolo', 'Pasolini', 6, NULL),
  ('Sandy', 'Powell', 8, NULL),
  ('James', 'Fraser', 1, 2),  
  ('Robert', 'Bruce', 3, 4),  
  ('Derek', 'Jarman', 5, 6),  
  ('Heathcote', 'Williams', 7, 8);
  