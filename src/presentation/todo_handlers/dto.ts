import { z } from 'zod'
import { todoStatus } from '../../model/todo'

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export const updateTodoStatusSchema = z.object({
  status: z.enum(todoStatus),
})
