import type { GameGroup } from "./run";

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;

  // Gen 1
  special?: number;

  // Gen 2+
  specialAttack?: number;
  specialDefense?: number;
}

export interface PokemonAbilities {
  standard: string[];
  hidden?: string[];
}

export interface Pokemon {
  id: number;
  dexNumber: number;
  name: string;
  generation: number;
  gameGroups: GameGroup[];
  types: string[];
  stats: PokemonStats;
  captureRate: number;
  spriteUrl: string;
  evolutions: number[];
  abilities?: string[] | PokemonAbilities;
}