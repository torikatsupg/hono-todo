\c todo

INSERT INTO api.todo (title, description, status, archived_at) VALUES
('First todo', 'This is the first todo', 'todo', NULL),
('Second todo', 'This is the second todo', 'doing', NULL),
('Third todo', 'This is the third todo', 'done', NULL),
('Fourth todo', 'This is the fourth todo', 'done', now());
