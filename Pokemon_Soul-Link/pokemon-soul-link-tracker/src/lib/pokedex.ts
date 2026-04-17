import type { Pokemon } from "../types/pokemon";
import { ALL_POKEMON } from "./pokemon-data";

export const nationalPokedex: Pokemon[] = ALL_POKEMON;

export function getPokemonById(id: number): Pokemon | undefined {
  return nationalPokedex.find((pokemon) => pokemon.id === id);
}