import type { TrackerState } from "../../types";

export function deleteCapture(
  state: TrackerState,
  captureId: string
): TrackerState {
  const captures = [...state.captures];
  const soulLinks = [...state.soulLinks];

  const captureToDelete = captures.find((c) => c.id === captureId);
  if (!captureToDelete) return state;

  // 🔗 Si lié à un Soul Link → on doit nettoyer
  if (captureToDelete.soulLinkId) {
    const linkId = captureToDelete.soulLinkId;

    const linkedCapture = captures.find(
      (c) => c.soulLinkId === linkId && c.id !== captureId
    );

    // 🧹 On détache le partenaire
    if (linkedCapture) {
      linkedCapture.soulLinkId = null;
      linkedCapture.updatedAt = new Date().toISOString();
    }

    // 🗑️ On supprime le Soul Link
    const newSoulLinks = soulLinks.filter((sl) => sl.id !== linkId);

    return {
      ...state,
      captures: captures.filter((c) => c.id !== captureId),
      soulLinks: newSoulLinks,
    };
  }

  // 🧾 Cas simple : pas de Soul Link
  return {
    ...state,
    captures: captures.filter((c) => c.id !== captureId),
  };
}