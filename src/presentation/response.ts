import type { Context } from 'hono'

export const notFound = (c: Context) => {
  return c.json({ message: 'Not Found' }, 404)
}

export const internalServerError = (c: Context) => {
  return c.json({ message: 'Not Found' }, 404)
}
