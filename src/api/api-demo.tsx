import { useState } from "react";

import { Character } from "./character";

export function ApiDemo() {
  const [id, setId] = useState(1);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">API Demo</h2>
      <Character
        id={id}
        next={() => {
          setId((current) => (current % 5) + 1);
        }}
      />
    </div>
  );
}
