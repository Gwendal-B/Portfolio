import type { Pokemon } from "../types/pokemon";
import type { GameGroup } from "../types/run";
import { getGenerationsForGameGroup } from "./game-groups";
import { ALL_POKEMON } from "./pokemon-data";
import { gen3KantoAbilitiesByDexNumber } from "../data/gen3-kanto-abilities";

export function getPokemonForGameGroup(gameGroup: GameGroup): Pokemon[] {
  return ALL_POKEMON
    .filter((pokemon) => pokemon.gameGroups.includes(gameGroup))
    .map((pokemon) => enrichPokemonWithGameData(pokemon, gameGroup));
}

export function getAvailableTypesForPokemon(pokemonList: Pokemon[]): string[] {
  return [
    "Tous",
    ...Array.from(
      new Set(pokemonList.flatMap((pokemon) => pokemon.types))
    ).sort(),
  ];
}

export function filterPokemonList(
  pokemonList: Pokemon[],
  options: {
    search: string;
    selectedType: string;
    selectedGeneration: string;
    availableGenerations: number[];
  }
): Pokemon[] {
  const {
    search,
    selectedType,
    selectedGeneration,
    availableGenerations,
  } = options;

  return pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      selectedType === "Tous" ||
      pokemon.types.includes(selectedType);

    const matchesGeneration =
      availableGenerations.length <= 1 ||
      selectedGeneration === "Toutes" ||
      pokemon.generation === Number(selectedGeneration);

    return matchesSearch && matchesType && matchesGeneration;
  });
}

export function getStandardAbilities(pokemon: Pokemon): string[] {
  if (!pokemon.abilities) {
    return [];
  }

  if (Array.isArray(pokemon.abilities)) {
    return pokemon.abilities;
  }

  return pokemon.abilities.standard;
}

export function enrichPokemonWithGameData(
  pokemon: Pokemon,
  game: GameGroup
): Pokemon {
  // RFVF → injecter talents Kanto
  if (game === "Pokemon Rouge Feu / Vert Feuille") {
    const abilities = gen3KantoAbilitiesByDexNumber[pokemon.dexNumber];

    if (abilities) {
      return {
        ...pokemon,
        abilities,
      };
    }
  }

  return pokemon;
}