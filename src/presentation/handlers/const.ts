import { z } from '@hono/zod-openapi'
import { todoStatus } from '../../model/todo'

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(todoStatus),
  archived_at: z.string().nullable().describe('ISO8601'),
  updated_at: z.string().describe('ISO8601'),
  created_at: z.string().describe('ISO8601'),
})
