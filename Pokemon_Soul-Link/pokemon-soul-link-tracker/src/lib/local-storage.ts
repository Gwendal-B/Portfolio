import type { Run } from "../types/run";
import type { CapturedPokemon } from "../types/tracker";
import type { SoulLink } from "../types/soul-link";
import type { TrackerState } from "../types/tracker";

const RUNS_STORAGE_KEY = "pokemon-soul-link-runs";
const CAPTURES_STORAGE_KEY = "pokemon-soul-link-captures";
const SOUL_LINKS_STORAGE_KEY = "pokemon-soul-link-soul-links";

/*
  ========================
  RUNS
  ========================
*/

export function getRuns(): Run[] {
  if (typeof window === "undefined") return [];
  const storedRuns = localStorage.getItem(RUNS_STORAGE_KEY);
  if (!storedRuns) return [];
  try {
    const parsedRuns = JSON.parse(storedRuns) as Run[];
    return Array.isArray(parsedRuns) ? parsedRuns : [];
  } catch (error) {
    console.error("Erreur lors de la lecture des runs :", error);
    return [];
  }
}

export function saveRuns(runs: Run[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(RUNS_STORAGE_KEY, JSON.stringify(runs));
}

/**
 * ⚠️ LEGACY - À ne plus utiliser
 * Utiliser les services du domaine à la place
 */
export function addRun(run: Run): void {
  const existingRuns = getRuns();
  saveRuns([...existingRuns, run]);
}

export function getRunById(runId: string): Run | undefined {
  return getRuns().find((run) => run.id === runId);
}

/**
 * ⚠️ LEGACY - À ne plus utiliser
 * Utiliser les services du domaine à la place
 */
export function updateRun(updatedRun: Run): void {
  const existingRuns = getRuns();
  saveRuns(existingRuns.map((run) => (run.id === updatedRun.id ? updatedRun : run)));
}

/**
 * ⚠️ LEGACY - À ne plus utiliser
 * Utiliser les services du domaine à la place
 */
/** Supprime une run et toutes ses données associées (captures + soul links). */
export function deleteRunWithCascade(runId: string): void {
  saveSoulLinks(getSoulLinks().filter((link) => link.runId !== runId));
  saveCapturedPokemons(getCapturedPokemons().filter((c) => c.runId !== runId));
  saveRuns(getRuns().filter((run) => run.id !== runId));
}

/*
  ========================
  CAPTURES
  ========================
*/

export function getCapturedPokemons(): CapturedPokemon[] {
  if (typeof window === "undefined") return [];
  const storedCaptures = localStorage.getItem(CAPTURES_STORAGE_KEY);
  if (!storedCaptures) return [];
  try {
    const parsedCaptures = JSON.parse(storedCaptures) as CapturedPokemon[];
    return Array.isArray(parsedCaptures) ? parsedCaptures : [];
  } catch (error) {
    console.error("Erreur lors de la lecture des captures :", error);
    return [];
  }
}

export function saveCapturedPokemons(captures: CapturedPokemon[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CAPTURES_STORAGE_KEY, JSON.stringify(captures));
}

export function getCapturedPokemonsByRunId(runId: string): CapturedPokemon[] {
  return getCapturedPokemons().filter((capture) => capture.runId === runId);
}

/*
  ========================
  SOUL LINKS
  ========================
*/

export function getSoulLinks(): SoulLink[] {
  if (typeof window === "undefined") return [];
  const storedSoulLinks = localStorage.getItem(SOUL_LINKS_STORAGE_KEY);
  if (!storedSoulLinks) return [];
  try {
    const parsedSoulLinks = JSON.parse(storedSoulLinks) as SoulLink[];
    return Array.isArray(parsedSoulLinks) ? parsedSoulLinks : [];
  } catch (error) {
    console.error("Erreur lors de la lecture des Soul Links :", error);
    return [];
  }
}

export function saveSoulLinks(soulLinks: SoulLink[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SOUL_LINKS_STORAGE_KEY, JSON.stringify(soulLinks));
}

export function getSoulLinksByRunId(runId: string): SoulLink[] {
  return getSoulLinks().filter((soulLink) => soulLink.runId === runId);
}

/*
  ========================
  EXPORT / IMPORT
  ========================
*/

export interface RunExportData {
  version: 1;
  exportedAt: string;
  run: Run;
  captures: CapturedPokemon[];
  soulLinks: SoulLink[];
}

/** Exporte une run complète (run + captures + soul links) en objet JSON. */
export function exportRunAsJson(runId: string): RunExportData | null {
  const run = getRunById(runId);
  if (!run) return null;

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    run,
    captures: getCapturedPokemonsByRunId(runId),
    soulLinks: getSoulLinksByRunId(runId),
  };
}

/**
 * Importe une run depuis un objet RunExportData.
 * Génère de nouveaux IDs pour éviter tout conflit avec les runs existantes.
 */
export function importRunFromJson(data: RunExportData): string {
  const now = new Date().toISOString();
  const newRunId = `run-${Date.now()}`;
  const uid = () => Math.random().toString(36).slice(2, 7);

  const captureIdMap = new Map<string, string>();
  const newCaptures: CapturedPokemon[] = data.captures.map((capture) => {
    const newId = `capture-${Date.now()}-${uid()}`;
    captureIdMap.set(capture.id, newId);
    return { ...capture, id: newId, runId: newRunId, soulLinkId: null };
  });

  const soulLinkIdMap = new Map<string, string>();
  const newSoulLinks: SoulLink[] = data.soulLinks.map((link) => {
    const newId = `soul-link-${Date.now()}-${uid()}`;
    soulLinkIdMap.set(link.id, newId);
    return {
      ...link,
      id: newId,
      runId: newRunId,
      pokemonAId: captureIdMap.get(link.pokemonAId) ?? link.pokemonAId,
      pokemonBId: captureIdMap.get(link.pokemonBId) ?? link.pokemonBId,
    };
  });

  const finalCaptures = newCaptures.map((capture) => {
    const original = data.captures.find((c) => captureIdMap.get(c.id) === capture.id);
    if (original?.soulLinkId) {
      return { ...capture, soulLinkId: soulLinkIdMap.get(original.soulLinkId) ?? null };
    }
    return capture;
  });

  addRun({
    ...data.run,
    id: newRunId,
    name: `${data.run.name} (importée)`,
    createdAt: now,
    updatedAt: now,
  });

  saveCapturedPokemons([...getCapturedPokemons(), ...finalCaptures]);
  saveSoulLinks([...getSoulLinks(), ...newSoulLinks]);

  return newRunId;
}

export function loadTrackerState(): TrackerState {
  return {
    runs: getRuns(),
    captures: getCapturedPokemons(),
    soulLinks: getSoulLinks(),
  };
}

export function saveTrackerState(state: TrackerState): void {
  saveRuns(state.runs);
  saveCapturedPokemons(state.captures);
  saveSoulLinks(state.soulLinks);
}