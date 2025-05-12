import {
  createContext,
  type ReactNode,
  useContext,
  useOptimistic,
  useSyncExternalStore,
} from "react";

import { delay } from "@/utils";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isPending?: boolean;
}

let listeners: (() => void)[] = [];
let todos: Todo[] = [
  { id: 1, text: "Attend MD-DevDays", completed: true },
  { id: 2, text: "Learn React 19", completed: false },
  { id: 3, text: "Build a todo app", completed: false },
];
let nextIdPtr = todos.length + 1;

const emitChange = () => {
  console.log(
    `emitting change to ${listeners.length.toString()} listeners`,
    listeners,
  );

  for (const listener of listeners) {
    listener();
  }
};

const todoStore = {
  addTodo: async (task: string) => {
    await delay(2000);
    if (task.trim() === "") {
      throw new Error("Todo can't be empty");
    }
    todos = [...todos, { id: nextIdPtr++, text: task, completed: false }];
    emitChange();
  },

  toggleTodo: (id: number) => {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    emitChange();
  },

  deleteTodo: (id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
    emitChange();
  },

  getSnapshot: () => todos,

  subscribe: (listener: () => void) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

const TodoStoreContext = createContext<{
  todos: Todo[];
  addTodo: (task: string) => Promise<void>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  // eslint-disable-next-line unicorn/no-null
} | null>(null);

export function TodoStoreProvider({ children }: { children: ReactNode }) {
  const todos = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getSnapshot,
  );

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, task: string) => {
      return [
        ...state,
        { id: nextIdPtr, text: task, completed: false, isPending: true },
      ];
    },
  );

  const addTodo = async (task: string) => {
    addOptimisticTodo(task);
    await todoStore.addTodo(task);
  };

  return (
    <TodoStoreContext.Provider
      value={{
        todos: optimisticTodos,
        addTodo: addTodo,
        toggleTodo: todoStore.toggleTodo,
        deleteTodo: todoStore.deleteTodo,
      }}
    >
      {children}
    </TodoStoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoStore = () => {
  const context = useContext(TodoStoreContext);
  if (!context) {
    throw new Error("useTodosStore must be used within an TodoStoreProvider");
  }
  return context;
};
