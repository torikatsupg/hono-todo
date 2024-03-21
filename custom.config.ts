import type { Config } from 'drizzle-kit'
export default {
  driver: 'pg',
  dbCredentials: {
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'todo',
  },
} satisfies Config
