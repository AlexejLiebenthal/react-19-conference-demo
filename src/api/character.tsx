import { use } from "react";

import { type Character } from "./fetch-character";

export function Character({
  fetchCharacterPromise,
  next,
}: {
  fetchCharacterPromise: Promise<Character>;
  next: () => void;
}) {
  const character = use(fetchCharacterPromise);

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
