import postgres from 'postgres'

const sql = postgres({
  // host: 'db',
  host: 'localhost',
  port: 5432,
  database: 'todo',
  username: 'postgres',
  password: 'password',
})

export default sql
