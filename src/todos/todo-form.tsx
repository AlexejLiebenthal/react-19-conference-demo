import { forwardRef, useState, type ComponentProps } from "react";

import { useTodoStore } from "./todo-store";

export function TodoForm() {
  const { addTodo } = useTodoStore();
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsPending(true);
    setError(undefined);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const task = formData.get("task");
    if (typeof task !== "string") {
      return { error: "input[name] task is not defined" };
    }
    try {
      await addTodo(task);
      form.reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : JSON.stringify(error));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  // eslint-disable-next-line react/jsx-props-no-spreading
  (props, ref) => <input ref={ref} {...props} />,
);
Input.displayName = "Input";
