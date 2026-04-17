import type { CapturedPokemon, TrackerState } from "../../types";

export function createCapture(
  state: TrackerState,
  newCapture: CapturedPokemon
): TrackerState {
  return {
    ...state,
    captures: [...state.captures, newCapture],
  };
}