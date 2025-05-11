import { useTodoStore } from "./todo-store";

export function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();
  return (
    <ul className="list shadow-lg">
      {todos.map((todo) => (
        <li key={todo.id} className="list-row bg-base-200 flex justify-between">
          <label
            className={`flex cursor-pointer items-center gap-2 ${todo.isPending ? "opacity-50" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              className="checkbox"
              disabled={todo.isPending}
              onChange={() => {
                toggleTodo(todo.id);
              }}
            />
            <span>{todo.text}</span>
            {!!todo.isPending && (
              <div className="badge badge-primary badge-sm">
                Adding
                <span className="loading loading-dots" />
              </div>
            )}
          </label>
          <button
            className="btn btn-error"
            disabled={todo.isPending}
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
