import { pgTable, pgEnum, uuid, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const todoStatus = pgEnum("todo_status", ['done', 'doing', 'todo'])


export const todo = pgTable("todo", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	status: todoStatus("status").notNull(),
	archivedAt: timestamp("archived_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});