import gen1Pokemon from "../data/gen1-pokemon.json";
import gen2Pokemon from "../data/gen2-pokemon.json";
import type { Pokemon } from "../types/pokemon";

export const nationalPokedex: Pokemon[] = [
  ...(gen1Pokemon as Pokemon[]),
  ...(gen2Pokemon as Pokemon[]),
];

export function getPokemonById(id: number): Pokemon | undefined {
  return nationalPokedex.find((pokemon) => pokemon.id === id);
}