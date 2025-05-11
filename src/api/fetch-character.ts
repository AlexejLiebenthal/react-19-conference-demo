import { delay } from "@/utils";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string;
  };
}

export const fetchCharacter = async (id: number) => {
  await delay(500);
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }

  return (await response.json()) as Character;
};
