# hono-todo
This is a todo app created by hono and bun.

## requirements
- docker

## Getting started
To start server:
```sh
docker compose up
```

To stop server:
```sh
docker compose down
```

## API Defenition
1. Start server with `docker compose up`
2. Open `http://locaclhost:3000/doc` in browser

## Structure
- app
    - hono server
    - served localhost:3000
- db
    - postgresql
    - served localhost:5432