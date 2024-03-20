import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { findAllTodoWithoutArchied } from '../../repository/todo_repository'
import type { AppOptions } from '../../type'
import { TodoSchema } from './const'

const app = new OpenAPIHono<AppOptions>()

const ResponseSchema = z.array(TodoSchema)

const route = createRoute({
  method: 'get',
  path: '/todo',
  description: 'Get all todos without archived',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
        },
      },
      description: 'OK',
    },
  },
})

app.openapi(route, async (c) => {
  const sql = c.get('sql')
  const result = await findAllTodoWithoutArchied(sql)

  return c.json(
    ResponseSchema.parse(
      result.map((v) => ({
        id: v.id,
        title: v.title,
        description: v.description,
        status: v.status,
        archived_at: v.archived_at?.toISOString() ?? null,
        updated_at: v.updated_at.toISOString(),
        created_at: v.created_at.toISOString(),
      })),
    ),
  )
})

export default app
