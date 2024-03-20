import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { todoStatus } from '../../model/todo'
import {
  findTodoById,
  updateTodoStatus,
} from '../../repository/todo_repository'
import type { AppOptions } from '../../type'
import { notFound } from '../util/response'

const app = new OpenAPIHono<AppOptions>()

const ParamsSchema = z.object({
  id: z.string().uuid(),
})
const RequestSchema = z.object({
  status: z.enum(todoStatus),
})

const route = createRoute({
  method: 'patch',
  path: '/todo/:id/status',
  request: {
    params: ParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: RequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
})

app.openapi(route, async (c) => {
  const sql = c.get('sql')
  const params = c.req.valid('param')
  const data = c.req.valid('json')

  const target = await findTodoById(sql, params.id)
  if (target === null) {
    return c.json(...notFound)
  }

  await updateTodoStatus(sql, params.id, data.status)

  return c.json({}, 200)
})

export default app
