import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import archiveTodo from './presentation/handlers/archiveTodo'
import createTodo from './presentation/handlers/createTodo'
import deleteTodo from './presentation/handlers/deleteTodo'
import getTodo from './presentation/handlers/getTodo'
import getTodos from './presentation/handlers/getTodos'
import updateTodoStatus from './presentation/handlers/updateTodoStatus'
import { withCatchAllErrors, withTransaction } from './presentation/middlewares'
import type { AppOptions } from './type'

const app = new OpenAPIHono<AppOptions>()

// middlewares
app.use(logger())
app.use(prettyJSON())
app.use(withCatchAllErrors)
app.use(withTransaction)

// handlers
app.route('', getTodos)
app.route('', createTodo)
app.route('', getTodo)
app.route('', updateTodoStatus)
app.route('', archiveTodo)
app.route('', deleteTodo)

// TODO(torikatsu): basic auth for specs
// for api docs
app
  .doc('/specification', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'hono-todo',
    },
  })
  .get(
    '/doc',
    swaggerUI({
      url: '/specification',
    }),
  )

export default app
