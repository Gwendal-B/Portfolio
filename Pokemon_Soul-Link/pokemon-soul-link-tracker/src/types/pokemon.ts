export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  dexNumber: number;
  name: string;
  generation: number;
  types: string[];
  stats: PokemonStats;
  captureRate: number;
  spriteUrl: string;
  evolutions: number[];
  abilities?: string[];
}
