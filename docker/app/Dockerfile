FROM oven/bun:latest

EXPOSE 3000

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

CMD ["bun", "run", "dev"]