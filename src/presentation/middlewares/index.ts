import type { Context, Next } from 'hono'
import sql from '../../db'
import type { AppOptions } from '../../type'
import { internalServerError } from '../response'

export const withTransaction = async (c: Context<AppOptions>, next: Next) => {
  await sql.begin(async (sql) => {
    c.set('sql', sql)
    return await next()
  })
}
export const withCatchAllErrors = async (
  c: Context<AppOptions>,
  next: Next,
) => {
  try {
    return await next()
  } catch (err) {
    console.error(err)
    return internalServerError(c)
  }
}
