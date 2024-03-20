type TodoStatus = "todo" | "doing" | "done";

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  archived_at: null | Date;
  created_at: Date;
  updated_at: Date;
};

export const newTodo = (
  id: string,
  title: string,
  description: string,
  status: TodoStatus,
  archived_at: null | Date,
  created_at: Date,
  updated_at: Date,
): Todo => {
  return {
    id: id,
    title,
    description,
    status,
    archived_at,
    created_at,
    updated_at,
  };
};
