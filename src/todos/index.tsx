import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";
import { TodoStoreProvider } from "./todo-store";
import { TodoTitle } from "./todo-title";

export function Todos() {
  return (
    <TodoStoreProvider>
      <div className="container mx-auto flex min-h-dvh flex-col gap-8 p-4">
        <TodoTitle />
        <TodoForm />
        <TodoList />
      </div>
    </TodoStoreProvider>
  );
}
