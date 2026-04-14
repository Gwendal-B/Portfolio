import type { Run } from "../types/run";

/*
  Nom de la clé utilisée dans le localStorage.
  Toutes les runs seront stockées sous cette clé.
*/
const RUNS_STORAGE_KEY = "pokemon-soul-link-runs";

/*
  Récupère toutes les runs enregistrées.
*/
export function getRuns(): Run[] {
  /*
    Sécurité :
    si jamais ce code s'exécute côté serveur, on retourne un tableau vide.
    localStorage n'existe que dans le navigateur.
  */
  if (typeof window === "undefined") {
    return [];
  }

  const storedRuns = localStorage.getItem(RUNS_STORAGE_KEY);

  /*
    Si rien n'est encore enregistré, on retourne un tableau vide.
  */
  if (!storedRuns) {
    return [];
  }

  try {
    const parsedRuns = JSON.parse(storedRuns) as Run[];

    /*
      On vérifie que le résultat est bien un tableau.
      Si ce n'est pas le cas, on retourne un tableau vide.
    */
    return Array.isArray(parsedRuns) ? parsedRuns : [];
  } catch (error) {
    console.error("Erreur lors de la lecture des runs :", error);
    return [];
  }
}

/*
  Enregistre tout le tableau de runs dans le localStorage.
*/
export function saveRuns(runs: Run[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(RUNS_STORAGE_KEY, JSON.stringify(runs));
}

/*
  Ajoute une nouvelle run au localStorage.
*/
export function addRun(run: Run): void {
  const existingRuns = getRuns();
  const updatedRuns = [...existingRuns, run];
  saveRuns(updatedRuns);
}

/*
  Récupère une run spécifique grâce à son id.
*/
export function getRunById(runId: string): Run | undefined {
  const runs = getRuns();
  return runs.find((run) => run.id === runId);
}