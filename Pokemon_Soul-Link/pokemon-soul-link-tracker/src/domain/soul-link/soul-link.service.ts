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

export function createManualSoulLink(
  state: TrackerState,
  runId: string,
  captureAId: string,
  captureBId: string
): { state: TrackerState; error: string | null } {
  if (captureAId === captureBId) {
    return {
      state,
      error: "Impossible de lier un Pokémon avec lui-même.",
    };
  }

  const captureA = state.captures.find((c) => c.id === captureAId);
  const captureB = state.captures.find((c) => c.id === captureBId);

  if (!captureA || !captureB) {
    return {
      state,
      error: "Captures introuvables.",
    };
  }

  if (captureA.runId !== runId || captureB.runId !== runId) {
    return {
      state,
      error: "Les captures ne correspondent pas à cette run.",
    };
  }

  if (captureA.soulLinkId || captureB.soulLinkId) {
    return {
      state,
      error: "Une des captures est déjà liée.",
    };
  }

  if (captureA.playerId === captureB.playerId) {
    return {
      state,
      error: "Un Soul Link doit relier deux joueurs différents.",
    };
  }

  const now = new Date().toISOString();
  const soulLinkId = `soul-link-${Date.now()}`;

  const newSoulLink: SoulLink = {
    id: soulLinkId,
    runId,
    pokemonAId: captureA.id,
    pokemonBId: captureB.id,
    active: true,
    createdAt: now,
  };

  const updatedCaptures = state.captures.map((capture) => {
    if (capture.id === captureA.id || capture.id === captureB.id) {
      return {
        ...capture,
        soulLinkId,
        updatedAt: now,
      };
    }

    return capture;
  });

  return {
    state: {
      ...state,
      captures: updatedCaptures,
      soulLinks: [...state.soulLinks, newSoulLink],
    },
    error: null,
  };
}

export function deleteSoulLinkById(
  state: TrackerState,
  soulLinkId: string
): TrackerState {
  const soulLink = state.soulLinks.find((link) => link.id === soulLinkId);
  if (!soulLink) return state;

  const now = new Date().toISOString();

  const updatedCaptures = state.captures.map((capture) => {
    if (
      capture.id === soulLink.pokemonAId ||
      capture.id === soulLink.pokemonBId
    ) {
      return {
        ...capture,
        soulLinkId: null,
        updatedAt: now,
      };
    }

    return capture;
  });

  const updatedSoulLinks = state.soulLinks.filter(
    (link) => link.id !== soulLinkId
  );

  return {
    ...state,
    captures: updatedCaptures,
    soulLinks: updatedSoulLinks,
  };
}