import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { findTodoById } from '../../repository/todo_repository'
import type { AppOptions } from '../../type'
import { notFound } from '../util/response'
import { TodoSchema } from './const'

const app = new OpenAPIHono<AppOptions>()

const ParamsSchema = z.object({
  id: z.string().uuid(),
})
const ResponseSchema = TodoSchema

const route = createRoute({
  method: 'get',
  path: '/todo/:id',
  description: 'Get a todo by id',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
        },
      },
      description: 'OK',
    },
    404: {
      description: 'not found',
    },
  },
})

app.openapi(route, async (c) => {
  const sql = c.get('sql')
  const params = c.req.valid('param')

  const result = await findTodoById(sql, params.id)
  if (result === null) {
    return c.json(...notFound)
  }

  return c.json(
    ResponseSchema.parse({
      id: result.id,
      title: result.title,
      description: result.description,
      status: result.status,
      archived_at: result.archived_at?.toISOString() ?? null,
      updated_at: result.updated_at.toISOString(),
      created_at: result.created_at.toISOString(),
    }),
  )
})

export default app
