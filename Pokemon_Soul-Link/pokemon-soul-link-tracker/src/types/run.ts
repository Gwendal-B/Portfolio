export type ChallengeMode = "nuzlocke" | "soul-link";

export type GameGeneration = 1 | 2 | 3;

export type GameGroup =
  | "Pokemon Rouge / Bleu / Jaune"
  | "Pokemon Or / Argent / Cristal"
  | "Pokemon Rubis / Saphir / Émeraude";

export interface Player {
  id: string;
  name: string;
}

export interface RunRules {
  oneEncounterPerRoute: boolean;
  faintEqualsDeath: boolean;
  nicknameRequired: boolean;
  soulLinkEnabled: boolean;
  sharedDeathEnabled: boolean;
  duplicateSpeciesClause: boolean;
  showAbilities: boolean;
  showNatures: boolean;
}

export interface Run {
  id: string;
  name: string;
  mode: ChallengeMode;
  generation: GameGeneration;
  game: GameGroup;
  players: Player[];
  rules: RunRules;
  createdAt: string;
  updatedAt: string;
}