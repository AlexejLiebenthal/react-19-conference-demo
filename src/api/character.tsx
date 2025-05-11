import { useEffect, useState } from "react";

import { fetchCharacter, type Character } from "./fetch-character";

export function Character({ id, next }: { id: number; next: () => void }) {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(undefined);
    setCharacter(undefined);

    const fetch = () => {
      fetchCharacter(id)
        .then((character) => {
          if (isMounted) {
            setCharacter(character);
            setIsLoading(false);
          }
        })
        .catch((error: unknown) => {
          if (isMounted) {
            setError(
              error instanceof Error ? error : new Error("Unknown error"),
            );
            setIsLoading(false);
          }
        });
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        Loading Character
        <span className="loading loading-bars" />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="text-error">Error: {error?.message ?? "No data"}</div>
    );
  }

  return (
    <div className="card card-side bg-base-200 mx-auto h-64 w-xl shadow-lg">
      <figure>
        <img src={character.image} alt={character.name} />
      </figure>
      <div className="card-body h-full">
        <h3 className="card-title">{character.name}</h3>
        <div className="grow">
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
        </div>

        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              next();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
