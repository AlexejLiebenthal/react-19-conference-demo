import { useActionState, type ComponentProps } from "react";

import { useTodoStore } from "./todo-store";

export function TodoForm() {
  const { addTodo } = useTodoStore();

  const [{ error }, formAction, isPending] = useActionState(
    async (_previousState: unknown, formData: FormData) => {
      const task = formData.get("task");
      if (typeof task !== "string") {
        return { error: "input[name] task is not defined" };
      }
      try {
        await addTodo(task);
        return { error: undefined };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : JSON.stringify(error),
        };
      }
    },
    { error: undefined },
  );

  return (
    <form action={formAction} className="flex flex-col">
      <div className="join">
        <Input
          ref={(input) => {
            console.log(input);
          }}
          type="text"
          name="task"
          className="input join-item w-full"
          placeholder="Add a new todo"
          disabled={isPending}
        />
        <button
          type="submit"
          className="btn btn-primary join-item"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              Adding
              <span className="loading loading-dots" />
            </div>
          ) : (
            "Add Todo"
          )}
        </button>
      </div>
      {!!error && <p className="text-error text-sm">{error}</p>}
    </form>
  );
}

function Input(props: ComponentProps<"input">) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input {...props} />;
}
