import type {
  LifeStatus,
  StorageStatus,
  TrackerState,
} from "../../types";

type UpdatableCaptureField = "lifeStatus" | "storageStatus";

export function updateCaptureStatus(
  state: TrackerState,
  captureId: string,
  field: UpdatableCaptureField,
  value: LifeStatus | StorageStatus,
  sharedDeathEnabled: boolean
): TrackerState {
  const captureToUpdate = state.captures.find((c) => c.id === captureId);
  if (!captureToUpdate) return state;

  const now = new Date().toISOString();

  const updatedCaptures = state.captures.map((capture) => {
    if (capture.id === captureId) {
      return {
        ...capture,
        [field]: value,
        updatedAt: now,
      };
    }

    return capture;
  });

  if (
    sharedDeathEnabled &&
    field === "lifeStatus" &&
    value === "dead" &&
    captureToUpdate.soulLinkId !== null
  ) {
    const soulLink = state.soulLinks.find(
      (link) => link.id === captureToUpdate.soulLinkId
    );

    if (!soulLink) {
      return {
        ...state,
        captures: updatedCaptures,
      };
    }

    const linkedCaptureId =
      soulLink.pokemonAId === captureId ? soulLink.pokemonBId : soulLink.pokemonAId;

    const capturesWithLinkedUpdate = updatedCaptures.map((capture) => {
      if (capture.id === linkedCaptureId && capture.lifeStatus !== "dead") {
        return {
          ...capture,
          lifeStatus: "unusable" as const,
          updatedAt: now,
        };
      }

      return capture;
    });

    return {
      ...state,
      captures: capturesWithLinkedUpdate,
    };
  }

  return {
    ...state,
    captures: updatedCaptures,
  };
}