export const todoStatus = ['todo', 'doing', 'done'] as const

export type TodoStatus = (typeof todoStatus)[number]

export type Todo = {
  id: string
  title: string
  description: string
  status: TodoStatus
  archivedAt: null | Date
  createdAt: Date
  updatedAt: Date
}

export const newTodo = (
  id: string,
  title: string,
  description: string,
  status: TodoStatus,
  archivedAt: null | string,
  createdAt: string,
  updatedAt: string,
): Todo => {
  return {
    id: id,
    title,
    description,
    status,
    archivedAt: archivedAt ? new Date(archivedAt) : null,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  }
}
