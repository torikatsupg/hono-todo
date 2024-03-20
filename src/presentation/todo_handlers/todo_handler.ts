import { zValidator } from '@hono/zod-validator'
import {
  findAllTodoWithoutArchied,
  createTodo,
  findTodoById,
  archiveTodo,
  deleteTodo,
} from '../../repository/todo_repository'
import type { App } from '../../type'
import { createTodoSchema } from './dto'
import { notFound } from '../response'

export const setupTodoHandler = (app: App) => {
  app.get('/todo', async (c) => {
    const sql = c.get('sql')
    const result = await findAllTodoWithoutArchied(sql)

    return c.json(result)
  })

  app.post('/todo', zValidator('json', createTodoSchema), async (c) => {
    const sql = c.get('sql')
    const body = c.req.valid('json')

    const id = await createTodo(sql, body.title, body.description)
    const result = await findTodoById(sql, id)

    return c.json(result)
  })

  app.get('/todo/:id', async (c) => {
    const sql = c.get('sql')
    const id = c.req.param('id')

    const result = await findTodoById(sql, id)
    if (result === null) {
      return notFound(c)
    }

    return c.json(result)
  })

  app.patch('/todo/:id/archive', async (c) => {
    const sql = c.get('sql')
    const id = c.req.param('id')

    await archiveTodo(sql, id)
    return c.json({})
  })

  app.delete('/todo/:id', async (c) => {
    const sql = c.get('sql')
    const id = c.req.param('id')

    await deleteTodo(sql, id)
    return c.json({})
  })
}
