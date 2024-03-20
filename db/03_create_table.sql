\c todo

CREATE TYPE api.todo_status AS ENUM ('todo', 'doing', 'done');

CREATE TABLE api.todo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       TEXT NOT NULL,
    description TEXT NOT NULL,
    status      api.todo_status NOT NULL,
    archived_at TIMESTAMPTZ DEFAULT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON api.todo TO api_user;

-- When a user is updated, we want to refresh the updated_at column
CREATE TRIGGER refresh_users_updated_at_step1
  BEFORE UPDATE ON api.todo FOR EACH ROW
  EXECUTE PROCEDURE api.refresh_updated_at_step1();

CREATE TRIGGER refresh_users_updated_at_step2
  BEFORE UPDATE OF updated_at ON api.todo FOR EACH ROW
  EXECUTE PROCEDURE api.refresh_updated_at_step2();

CREATE TRIGGER refresh_users_updated_at_step3
  BEFORE UPDATE ON api.todo FOR EACH ROW
  EXECUTE PROCEDURE api.refresh_updated_at_step3();
