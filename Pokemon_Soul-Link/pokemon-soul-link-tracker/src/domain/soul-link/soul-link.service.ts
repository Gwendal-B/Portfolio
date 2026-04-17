import type { CapturedPokemon, SoulLink, TrackerState } from "../../types";

export function createAutomaticSoulLinkForNewCapture(
  state: TrackerState,
  runId: string,
  newCapture: CapturedPokemon
): TrackerState {
  const captures = [...state.captures];
  const soulLinks = [...state.soulLinks];

  const matchingCapture = captures.find(
    (c) =>
      c.runId === runId &&
      c.routeId === newCapture.routeId &&
      c.playerId !== newCapture.playerId &&
      c.soulLinkId === null &&
      c.id !== newCapture.id
  );

  if (!matchingCapture) {
    return state;
  }

  const now = new Date().toISOString();
  const soulLinkId = `soul-link-${Date.now()}`;

  const newSoulLink: SoulLink = {
    id: soulLinkId,
    runId,
    pokemonAId: matchingCapture.id,
    pokemonBId: newCapture.id,
    active: true,
    createdAt: now,
  };

  const updatedCaptures = captures.map((capture) => {
    if (capture.id === matchingCapture.id || capture.id === newCapture.id) {
      return {
        ...capture,
        soulLinkId,
        updatedAt: now,
      };
    }

    return capture;
  });

  return {
    ...state,
    captures: updatedCaptures,
    soulLinks: [...soulLinks, newSoulLink],
  };
}