import { Hono } from 'hono'
import { logger } from 'hono/logger'
import type { App } from './type'
import { withCatchAllErrors, withTransaction } from './presentation/middlewares'
import { setupTodoHandler } from './presentation/todo_handlers/todo_handler'

const app: App = new Hono()

// middlewares
app.use(logger())
app.use(withCatchAllErrors)
app.use(withTransaction)

// handlers
setupTodoHandler(app)

export default app
