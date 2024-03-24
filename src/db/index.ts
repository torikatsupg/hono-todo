import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const queryClient = postgres({
  host: 'db',
  port: 5432,
  database: 'todo',
  username: 'postgres',
  password: 'password',
})

const db = drizzle(queryClient)

export default db
