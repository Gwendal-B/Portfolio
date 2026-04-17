import type { GameGroup } from "../types/run";

/**
 * Détermine quelles générations sont disponibles
 * pour chaque groupe de jeux.
 */
export const GAME_GROUP_GENERATIONS: Record<GameGroup, number[]> = {
  "Pokemon Rouge / Bleu / Jaune": [1],
  "Pokemon Or / Argent / Cristal": [1, 2],
  "Pokemon Rubis / Saphir / Émeraude": [1, 2, 3],
};

export const GAME_GROUP_PRIMARY_GENERATION: Record<GameGroup, 1 | 2 | 3> = {
  "Pokemon Rouge / Bleu / Jaune": 1,
  "Pokemon Or / Argent / Cristal": 2,
  "Pokemon Rubis / Saphir / Émeraude": 3,
};

/**
 * Helper : retourne les générations autorisées pour un groupe de jeux
 */
export function getGenerationsForGameGroup(gameGroup: GameGroup): number[] {
  return GAME_GROUP_GENERATIONS[gameGroup] ?? [];
}

export function getPrimaryGenerationForGameGroup(
  gameGroup: GameGroup
): 1 | 2 | 3 {
  return GAME_GROUP_PRIMARY_GENERATION[gameGroup];
}