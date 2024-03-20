import type { Sql } from 'postgres'
import { type Todo, newTodo } from '../model/todo'

export const createTodo = async (
  sql: Sql,
  title: string,
  description: string,
): Promise<string> => {
  const status = 'todo'
  const result = await sql`
    INSERT INTO api.todo (title, description, status) 
    VALUES (
        ${title},
        ${description},
        ${status}
    )
    RETURNING id
  `
  return result[0].id
}

export const archiveTodo = async (sql: Sql, id: string): Promise<void> => {
  await sql`
    UPDATE api.todo SET archived_at = NOW() WHERE id = ${id}
  `
}

export const deleteTodo = async (sql: Sql, id: string): Promise<void> => {
  await sql`
    DELETE FROM api.todo WHERE id = ${id}
  `
}

export const findTodoById = async (
  sql: Sql,
  id: string,
): Promise<Todo | null> => {
  const result = await sql`
    SELECT * FROM api.todo WHERE id = ${id}
  `
  if (!result[0]) {
    return null
  }
  return restoreTodoFromRow(result[0])
}

export const findAllTodoWithoutArchied = async (sql: Sql): Promise<Todo[]> => {
  const result = await sql`
    SELECT * FROM api.todo 
    WHERE archived_at IS NULL
  `
  return result.map(restoreTodoFromRow)
}

export const findAllTodo = async (sql: Sql): Promise<Todo[]> => {
  const result = await sql`
    SELECT * FROM api.todo
  `
  return result.map(restoreTodoFromRow)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const restoreTodoFromRow = (row: any): Todo => {
  return newTodo(
    row.id,
    row.title,
    row.description,
    row.status,
    row.archived_at,
    row.created_at,
    row.updated_at,
  )
}
