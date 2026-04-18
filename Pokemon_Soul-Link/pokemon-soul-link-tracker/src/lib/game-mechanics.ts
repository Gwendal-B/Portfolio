import type { GameGroup } from "../types/run";

export type GameMechanics = {
  abilities: boolean;
  natures: boolean;
};

export const GAME_GROUP_MECHANICS: Record<GameGroup, GameMechanics> = {
  "Pokemon Rouge / Bleu / Jaune": {
    abilities: false,
    natures: false,
  },
  "Pokemon Or / Argent / Cristal": {
    abilities: false,
    natures: false,
  },
  "Pokemon Rubis / Saphir / Émeraude": {
    abilities: true,
    natures: true,
  },
  "Pokemon Rouge Feu / Vert Feuille": {
    abilities: true,
    natures: true,
  },
};

export function getGameMechanics(game: GameGroup): GameMechanics {
  return GAME_GROUP_MECHANICS[game];
}