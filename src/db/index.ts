import postgres from 'postgres'

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'api.todo',
  username: 'postgres',
  password: 'password',
})

export default sql
