-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "todo_status" AS ENUM('done', 'doing', 'todo');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/