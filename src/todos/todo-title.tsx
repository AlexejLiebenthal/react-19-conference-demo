import { useTodoStore } from "./todo-store";

export function TodoTitle() {
  const { todos } = useTodoStore();
  const allNotPendingTodos = todos.filter((t) => !t.isPending);
  const completedTodos = allNotPendingTodos.filter((t) => t.completed);
  const title = `React 19 - Conference Demo - Todos Completed: ${completedTodos.length.toString()} of ${allNotPendingTodos.length.toString()}`;

  return (
    <>
      <title>{title}</title>
      <h2 className="text-center text-2xl font-bold">{title}</h2>
    </>
  );
}
