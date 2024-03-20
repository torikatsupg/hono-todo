import { zValidator } from '@hono/zod-validator'
import {
  archiveTodo,
  createTodo,
  deleteTodo,
  findAllTodoWithoutArchied,
  findTodoById,
  updateTodoStatus,
} from '../../repository/todo_repository'
import type { App } from '../../type'
import { notFound } from '../response'
import { createTodoSchema, updateTodoStatusSchema } from './dto'

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

  app.patch(
    '/todo/:id/status',
    zValidator('json', updateTodoStatusSchema),
    async (c) => {
      const sql = c.get('sql')
      const id = c.req.param('id')
      const body = c.req.valid('json')

      const target = await findTodoById(sql, id)
      if (target === null) {
        return notFound(c)
      }

      await updateTodoStatus(sql, id, body.status)
      return c.json({})
    },
  )

  app.patch('/todo/:id/archive', async (c) => {
    const sql = c.get('sql')
    const id = c.req.param('id')

    const target = await findTodoById(sql, id)
    if (target === null) {
      return notFound(c)
    }

    await archiveTodo(sql, id)
    return c.json({})
  })

  app.delete('/todo/:id', async (c) => {
    const sql = c.get('sql')
    const id = c.req.param('id')

    const target = await findTodoById(sql, id)
    if (target === null) {
      return notFound(c)
    }

    await deleteTodo(sql, id)
    return c.json({})
  })
}
