
USE tz4vbnbz7ertdgt7;

-- Insert departments
INSERT INTO department (name) VALUES
  ("Mathematics"),
  ("English"),
  ("History"),
  ("Languages"),
  ("Science"),
  ("Art"),
  ("Admin");

-- Insert roles
INSERT INTO roles (id, title, salary, department_id) VALUES
  (1, "Mathematics Teacher", 60000, 1),
  (2, "English Teacher", 55000, 2),
  (3, "History Teacher", 58000, 3),
  (4, "Spanish Teacher", 56000, 4),
  (5, "Science Teacher", 60000, 5),
  (6, "Art Teacher", 53000, 6),
  (7, "Department Head", 80000, 7);

-- Insert managers (John = Maths, Art & Science, Mia = English, History & Spanish)
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, "John", "Doe", 7, NULL),
  (2, "Mia", "Rodriguez", 7, NULL);

-- Employees in John's department (Maths, Art & Science)
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (3, "Jane", "Smith", 1, 1),
  (5, "Emily", "Williams", 1, 1),
  (7, "Olivia", "Lee", 1, 1),
  (9, "William", "Martinez", 1, 1),
  (11, "James", "Lopez", 1, 1),
  (13, "Alexander", "Miller", 5, 1),
  (15, "Ethan", "Hernandez", 5, 1),
  (17, "Michael", "Wilson", 5, 1),
  (19, "Daniel", "Green", 5, 1),
  (21, "David", "Taylor", 6, 1),
  (23, "Olivia", "Johnson", 6, 1),
  (25, "Lucas", "Martinez", 6, 1),
  (27, "Emma", "Smith", 6, 1),
  (28, "Aiden", "Rodriguez", 5, 2),
  (29, "Sophia", "Lee", 6, 1),
  (30, "Liam", "Williams", 5, 2);

-- Employees in Mia's department (English, History & Spanish)
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (4, "Michael", "Johnson", 2, 2), 
  (6, "Robert", "Brown", 2, 2), 
  (8, "Emma", "Davis", 2, 2), 
  (10, "Sophia", "Anderson", 2, 2), 
  (12, "Ava", "Gonzalez", 3, 2), 
  (14, "Mia", "Thomas", 3, 2), 
  (16, "Isabella", "Mitchell", 3, 2), 
  (18, "Amelia", "Lewis", 3, 2), 
  (20, "Sophia", "Anderson", 4, 2), 
  (22, "Oliver", "Thomas", 4, 2), 
  (24, "Ella", "Garcia", 4, 2), 
  (26, "Jackson", "Brown", 4, 2);