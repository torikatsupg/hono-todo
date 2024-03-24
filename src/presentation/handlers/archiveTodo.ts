import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { archiveTodo, findTodoById } from '../../repository/todo_repository'
import type { AppOptions } from '../../type'
import { notFound } from '../util/response'

const app = new OpenAPIHono<AppOptions>()

const ParamsSchema = z.object({
  id: z.string().uuid(),
})

const route = createRoute({
  method: 'patch',
  path: '/todo/:id/archive',
  description: 'Archive a todo by id',
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
  const tx = c.get('tx')
  const id = c.req.param('id')

  const target = await findTodoById(tx, id)
  if (target === null) {
    return c.json(...notFound)
  }

  await archiveTodo(tx, id)
  return c.json({}, 200)
})

export default app
