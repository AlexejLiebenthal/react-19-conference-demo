import { Suspense, useState } from "react";

import { Character } from "./character";
import { fetchCharacter } from "./fetch-character";

export function ApiDemo() {
  const [id, setId] = useState(1);
  const fetchCharacterPromise = fetchCharacter(id);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">API Demo</h2>
      <Suspense
        fallback={
          <div className="flex items-center gap-2">
            Loading Character
            <span className="loading loading-bars" />
          </div>
        }
      >
        <Character
          fetchCharacterPromise={fetchCharacterPromise}
          next={() => {
            setId((current) => (current % 5) + 1);
          }}
        />
      </Suspense>
    </div>
  );
}
