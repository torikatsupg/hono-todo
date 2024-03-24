import type { Sql } from 'postgres'
import { type Todo, type TodoStatus, newTodo } from '../model/todo'
import { todo } from '../../drizzle/schema'
import type { DefaultTransaction } from '../type'
import { createInsertSchema } from 'drizzle-zod'
import { eq, is, isNull } from 'drizzle-orm'
import { date } from 'drizzle-orm/pg-core'

export const createTodo = async (
  tx: DefaultTransaction,
  title: string,
  description: string,
): Promise<string> => {
  todo
  const result = await tx
    .insert(todo)
    .values({
      title,
      description,
      status: 'todo',
    })
    .returning({ id: todo.id })

  return result[0].id
}

export const archiveTodo = async (
  tx: DefaultTransaction,
  id: string,
): Promise<void> => {
  await tx
    .update(todo)
    .set({ archivedAt: new Date().toISOString() })
    .where(eq(todo.id, id))
}

export const updateTodoStatus = async (
  tx: DefaultTransaction,
  id: string,
  status: TodoStatus,
): Promise<void> => {
  await tx.update(todo).set({ status }).where(eq(todo.id, id))
}

export const deleteTodo = async (
  tx: DefaultTransaction,
  id: string,
): Promise<void> => {
  await tx.delete(todo).where(eq(todo.id, id))
}

export const findTodoById = async (
  tx: DefaultTransaction,
  id: string,
): Promise<Todo | null> => {
  const result = await tx.select().from(todo).where(eq(todo.id, id))
  const target = result[0]

  if (target == null) {
    return null
  }
  return restoreTodoFromRow(target)
}

export const findAllTodoWithoutArchied = async (
  tx: DefaultTransaction,
): Promise<Todo[]> => {
  const result = await tx.select().from(todo).where(isNull(todo.archivedAt))
  return result.map(restoreTodoFromRow)
}

export const findAllTodo = async (tx: DefaultTransaction): Promise<Todo[]> => {
  const result = await tx.select().from(todo)
  return result.map(restoreTodoFromRow)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const restoreTodoFromRow = (row: any): Todo => {
  return newTodo(
    row.id,
    row.title,
    row.description,
    row.status,
    row.archivedAt,
    row.createdAt,
    row.updatedAt,
  )
}
