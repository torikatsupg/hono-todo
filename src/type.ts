import type { Sql } from 'postgres'
import type { Hono } from 'hono'

export type AppOptions = {
  Variables: {
    sql: Sql
  }
}

export type App = Hono<AppOptions>
