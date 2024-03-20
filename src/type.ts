import type { Hono } from 'hono'
import type { Sql } from 'postgres'

export type AppOptions = {
  Variables: {
    sql: Sql
  }
}

export type App = Hono<AppOptions>
