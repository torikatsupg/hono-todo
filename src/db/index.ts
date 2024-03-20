import postgres from 'postgres'

const sql = postgres({
  host: 'db',
  port: 5432,
  database: 'todo',
  username: 'postgres',
  password: 'password',
})

export default sql
