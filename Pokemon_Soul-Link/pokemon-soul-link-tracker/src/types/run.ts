export type ChallengeMode = "nuzlocke" | "soul-link";

export type GameGeneration = 1;

export type Gen1Game = "Pokemon Rouge" | "Pokemon Bleu" | "Pokemon Jaune";

export interface Player {
  id: string;
  name: string;
}

export interface RunRules {
  oneEncounterPerRoute: boolean;
  faintEqualsDeath: boolean;
  nicknameRequired: boolean;
  soulLinkEnabled: boolean;
}

export interface Run {
  id: string;
  name: string;
  mode: ChallengeMode;
  generation: GameGeneration;
  game: Gen1Game;
  players: Player[];
  rules: RunRules;
  createdAt: string;
  updatedAt: string;
}