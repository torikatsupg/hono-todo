import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { createTodo, findTodoById } from '../../repository/todo_repository'
import type { AppOptions } from '../../type'
import { TodoSchema } from './const'

const app = new OpenAPIHono<AppOptions>()

const RequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

const ResponseSchema = TodoSchema

const route = createRoute({
  method: 'post',
  path: '/todo',
  description: 'Create a todo',
  request: {
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
  const data = c.req.valid('json')
  const sql = c.get('sql')

  const id = await createTodo(sql, data.title, data.description)
  const result = await findTodoById(sql, id)

  return c.json(ResponseSchema.parse(result))
})

export default app
