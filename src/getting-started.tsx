import { useState } from "react";

function Greeting() {
  return <p className="">Hello, World!</p>;
}

function GreetingWithProps({ name }: { name: string }) {
  return <p>Hello, {name}!</p>;
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <span>Count: {count}</span>
      <button
        className="btn btn-primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}

export function GettingStarted() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="font-bold">Getting Started</h1>
      <Greeting />
      <GreetingWithProps name="John" />
      <GreetingWithProps name="Jane" />
      <Counter />
    </div>
  );
}
