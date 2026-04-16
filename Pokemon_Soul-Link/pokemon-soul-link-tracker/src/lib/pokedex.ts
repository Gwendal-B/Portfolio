import gen1Pokemon from "../data/gen1-pokemon.json";
import gen2Pokemon from "../data/gen2-pokemon.json";
import gen3Pokemon from "../data/gen3-pokemon.json";
import type { Pokemon } from "../types/pokemon";

const POKEDEX_DATASETS = [
  gen1Pokemon,
  gen2Pokemon,
  gen3Pokemon,
] as Pokemon[][];

export const nationalPokedex: Pokemon[] = POKEDEX_DATASETS.flat();

export function getPokemonById(id: number): Pokemon | undefined {
  return nationalPokedex.find((pokemon) => pokemon.id === id);
}