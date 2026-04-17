import gen1Pokemon from "../data/gen1-pokemon.json";
import gen2Pokemon from "../data/gen2-pokemon.json";
import gen3Pokemon from "../data/gen3-pokemon.json";
import type { Pokemon } from "../types/pokemon";

export const generationOnePokemon = gen1Pokemon as Pokemon[];
export const generationTwoPokemon = gen2Pokemon as Pokemon[];
export const generationThreePokemon = gen3Pokemon as Pokemon[];

export const ALL_POKEMON: Pokemon[] = [
  ...generationOnePokemon,
  ...generationTwoPokemon,
  ...generationThreePokemon,
];