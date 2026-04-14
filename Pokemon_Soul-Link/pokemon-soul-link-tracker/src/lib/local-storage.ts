import type { Run } from "../types/run";
import type { CapturedPokemon } from "../types/tracker";

const RUNS_STORAGE_KEY = "pokemon-soul-link-runs";
const CAPTURES_STORAGE_KEY = "pokemon-soul-link-captures";

/*
  ========================
  RUNS
  ========================
*/

export function getRuns(): Run[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedRuns = localStorage.getItem(RUNS_STORAGE_KEY);

  if (!storedRuns) {
    return [];
  }

  try {
    const parsedRuns = JSON.parse(storedRuns) as Run[];
    return Array.isArray(parsedRuns) ? parsedRuns : [];
  } catch (error) {
    console.error("Erreur lors de la lecture des runs :", error);
    return [];
  }
}

export function saveRuns(runs: Run[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(RUNS_STORAGE_KEY, JSON.stringify(runs));
}

export function addRun(run: Run): void {
  const existingRuns = getRuns();
  const updatedRuns = [...existingRuns, run];
  saveRuns(updatedRuns);
}

export function getRunById(runId: string): Run | undefined {
  const runs = getRuns();
  return runs.find((run) => run.id === runId);
}

/*
  ========================
  CAPTURES
  ========================
*/

export function getCapturedPokemons(): CapturedPokemon[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCaptures = localStorage.getItem(CAPTURES_STORAGE_KEY);

  if (!storedCaptures) {
    return [];
  }

  try {
    const parsedCaptures = JSON.parse(storedCaptures) as CapturedPokemon[];
    return Array.isArray(parsedCaptures) ? parsedCaptures : [];
  } catch (error) {
    console.error("Erreur lors de la lecture des captures :", error);
    return [];
  }
}

export function saveCapturedPokemons(captures: CapturedPokemon[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CAPTURES_STORAGE_KEY, JSON.stringify(captures));
}

export function addCapturedPokemon(capture: CapturedPokemon): void {
  const existingCaptures = getCapturedPokemons();
  const updatedCaptures = [...existingCaptures, capture];
  saveCapturedPokemons(updatedCaptures);
}

export function updateCapturedPokemon(updatedCapture: CapturedPokemon): void {
  const existingCaptures = getCapturedPokemons();

  const updatedCaptures = existingCaptures.map((capture) =>
    capture.id === updatedCapture.id ? updatedCapture : capture
  );

  saveCapturedPokemons(updatedCaptures);
}

export function getCapturedPokemonsByRunId(runId: string): CapturedPokemon[] {
  const captures = getCapturedPokemons();
  return captures.filter((capture) => capture.runId === runId);
}