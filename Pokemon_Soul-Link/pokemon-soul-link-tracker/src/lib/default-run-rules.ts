import type { ChallengeMode, GameGroup, RunRules } from "../types/run";
import { getGameMechanics } from "./game-mechanics";

export function getDefaultRunRules(
  game: GameGroup,
  mode: ChallengeMode
): RunRules {
  const mechanics = getGameMechanics(game);
  const isSoulLink = mode === "soul-link";

  return {
    oneEncounterPerRoute: true,
    faintEqualsDeath: true,
    nicknameRequired: true,
    soulLinkEnabled: isSoulLink,
    sharedDeathEnabled: isSoulLink,
    duplicateSpeciesClause: false,
    showAbilities: mechanics.abilities,
    showNatures: mechanics.natures,
  };
}