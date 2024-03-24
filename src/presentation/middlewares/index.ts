import type { Context, Next } from 'hono'
import sql from '../../db'
import type { AppOptions } from '../../type'
import { internalServerError } from '../util/response'
import db from '../../db'

// NOTE: パフォーマンス上の懸念があるがテスト用プロジェクトのため無視している
export const withTransaction = async (c: Context<AppOptions>, next: Next) => {
  await db.transaction(async (tx) => {
    c.set('tx', tx)
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
    return c.json(...internalServerError)
  }
}
