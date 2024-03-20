import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { deleteTodo, findTodoById } from '../../repository/todo_repository'
import type { AppOptions } from '../../type'
import { notFound } from '../util/response'

const app = new OpenAPIHono<AppOptions>()

const ParamsSchema = z.object({
  id: z.string().uuid(),
})

const route = createRoute({
  method: 'delete',
  path: '/todo/:id',
  description: 'Delete a todo by id',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
    404: {
      description: 'not found',
    },
  },
})

app.openapi(route, async (c) => {
  const sql = c.get('sql')
  const param = c.req.valid('param')

  const target = await findTodoById(sql, param.id)
  if (target === null) {
    return c.json(...notFound)
  }

  await deleteTodo(sql, param.id)
  return c.json({}, 200)
})

export default app
