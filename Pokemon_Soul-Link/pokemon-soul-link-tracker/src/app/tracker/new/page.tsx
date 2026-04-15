"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ChallengeMode, Gen1Game, Player, Run, RunRules } from "../../../types/run";
import { addRun } from "../../../lib/local-storage";

export default function NewRunPage() {
  const router = useRouter();

  const [runName, setRunName] = useState("");
  const [mode, setMode] = useState<ChallengeMode>("nuzlocke");
  const [game, setGame] = useState<Gen1Game>("Pokemon Rouge");
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [rules, setRules] = useState<RunRules>({
    oneEncounterPerRoute: true,
    faintEqualsDeath: true,
    nicknameRequired: true,
    soulLinkEnabled: false,
    sharedDeathEnabled: false,
    duplicateSpeciesClause: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (mode === "soul-link") {
      setRules((previousRules) => ({
        ...previousRules,
        soulLinkEnabled: true,
        sharedDeathEnabled: true,
      }));
    } else {
      setRules((previousRules) => ({
        ...previousRules,
        soulLinkEnabled: false,
        sharedDeathEnabled: false,
      }));
    }
  }, [mode]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    /*
      On enlève les espaces inutiles au début et à la fin.
    */
    const trimmedRunName = runName.trim();
    const trimmedPlayerOne = playerOne.trim();
    const trimmedPlayerTwo = playerTwo.trim();

    /*
      Validation simple du formulaire
    */
    if (!trimmedRunName) {
      setErrorMessage("Le nom de la run est obligatoire.");
      return;
    }

    if (!trimmedPlayerOne) {
      setErrorMessage("Le nom du joueur 1 est obligatoire.");
      return;
    }

    if (mode === "soul-link" && !trimmedPlayerTwo) {
      setErrorMessage("Le nom du joueur 2 est obligatoire en mode Soul Link.");
      return;
    }

    /*
      On crée une date unique au format ISO.
      Exemple : 2026-04-14T12:34:56.789Z
    */
    const now = new Date().toISOString();

    /*
      Identifiant simple pour la run.
      Pour une V1 locale, c'est largement suffisant.
    */
    const runId = `run-${Date.now()}`;

    /*
      Création des joueurs
    */
    const players: Player[] =
      mode === "soul-link"
        ? [
            { id: "player-1", name: trimmedPlayerOne },
            { id: "player-2", name: trimmedPlayerTwo },
          ]
        : [{ id: "player-1", name: trimmedPlayerOne }];

    /*
      Objet final de la run
    */
    const newRun: Run = {
      id: runId,
      name: trimmedRunName,
      mode,
      generation: 1,
      game,
      players,
      rules,
      createdAt: now,
      updatedAt: now,
    };

    /*
      Sauvegarde dans le localStorage
    */
    addRun(newRun);

    /*
      Redirection vers la page de la run
    */
    router.push(`/tracker/run/${runId}`);
  }

  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Tracker
          </p>

          <h1 className="mt-2 text-4xl font-bold">Créer une nouvelle run</h1>

          <p className="mt-3 text-zinc-400">
            Configure une run locale pour ton challenge Pokémon.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <div>
            <label htmlFor="runName" className="mb-2 block text-sm font-medium">
              Nom de la run
            </label>

            <input
              id="runName"
              type="text"
              value={runName}
              onChange={(event) => setRunName(event.target.value)}
              placeholder="Ex : Soul Link Kanto"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          <div>
            <label htmlFor="mode" className="mb-2 block text-sm font-medium">
              Mode de jeu
            </label>

            <select
              id="mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as ChallengeMode)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="nuzlocke">Nuzlocke</option>
              <option value="soul-link">Soul Link</option>
            </select>
          </div>

          <div>
            <label htmlFor="game" className="mb-2 block text-sm font-medium">
              Jeu
            </label>

            <select
              id="game"
              value={game}
              onChange={(event) => setGame(event.target.value as Gen1Game)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="Pokemon Rouge">Pokémon Rouge</option>
              <option value="Pokemon Bleu">Pokémon Bleu</option>
              <option value="Pokemon Jaune">Pokémon Jaune</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="playerOne"
              className="mb-2 block text-sm font-medium"
            >
              Joueur 1
            </label>

            <input
              id="playerOne"
              type="text"
              value={playerOne}
              onChange={(event) => setPlayerOne(event.target.value)}
              placeholder="Nom du joueur 1"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          {mode === "soul-link" && (
            <div>
              <label
                htmlFor="playerTwo"
                className="mb-2 block text-sm font-medium"
              >
                Joueur 2
              </label>

              <input
                id="playerTwo"
                type="text"
                value={playerTwo}
                onChange={(event) => setPlayerTwo(event.target.value)}
                placeholder="Nom du joueur 2"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>
          )}

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">Règles personnalisées</h2>

            <div className="mt-4 space-y-4 text-sm text-zinc-300">
              <label className="flex items-center justify-between gap-4">
                <span>Une seule rencontre par zone</span>
                <input
                  type="checkbox"
                  checked={rules.oneEncounterPerRoute}
                  onChange={(event) =>
                    setRules((previousRules) => ({
                      ...previousRules,
                      oneEncounterPerRoute: event.target.checked,
                    }))
                  }
                />
              </label>

              <label className="flex items-center justify-between gap-4">
                <span>Un Pokémon K.O. est considéré comme mort</span>
                <input
                  type="checkbox"
                  checked={rules.faintEqualsDeath}
                  onChange={(event) =>
                    setRules((previousRules) => ({
                      ...previousRules,
                      faintEqualsDeath: event.target.checked,
                    }))
                  }
                />
              </label>

              <label className="flex items-center justify-between gap-4">
                <span>Surnom obligatoire</span>
                <input
                  type="checkbox"
                  checked={rules.nicknameRequired}
                  onChange={(event) =>
                    setRules((previousRules) => ({
                      ...previousRules,
                      nicknameRequired: event.target.checked,
                    }))
                  }
                />
              </label>

              <label className="flex items-center justify-between gap-4">
                <span>Clause anti-doublons</span>
                <input
                  type="checkbox"
                  checked={rules.duplicateSpeciesClause}
                  onChange={(event) =>
                    setRules((previousRules) => ({
                      ...previousRules,
                      duplicateSpeciesClause: event.target.checked,
                    }))
                  }
                />
              </label>

              {mode === "soul-link" && (
                <>
                  <label className="flex items-center justify-between gap-4">
                    <span>Soul Link activé</span>
                    <input type="checkbox" checked readOnly />
                  </label>

                  <label className="flex items-center justify-between gap-4">
                    <span>Mort partagée automatique</span>
                    <input type="checkbox" checked readOnly />
                  </label>
                </>
              )}
            </div>
          </section>

          {errorMessage && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Créer la run
          </button>
        </form>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Aperçu actuel</h2>

          <div className="mt-4 space-y-2 text-zinc-300">
            <p>
              <span className="font-medium text-white">Nom :</span>{" "}
              {runName || "Non renseigné"}
            </p>

            <p>
              <span className="font-medium text-white">Mode :</span> {mode}
            </p>

            <p>
              <span className="font-medium text-white">Jeu :</span> {game}
            </p>

            <p>
              <span className="font-medium text-white">Joueur 1 :</span>{" "}
              {playerOne || "Non renseigné"}
            </p>

            <div className="pt-2">
              <p className="font-medium text-white">Règles :</p>

              <div className="mt-2 space-y-1 text-sm text-zinc-300">
                <p>
                  Une rencontre par zone :{" "}
                  {rules.oneEncounterPerRoute ? "Oui" : "Non"}
                </p>
                <p>
                  K.O. = mort : {rules.faintEqualsDeath ? "Oui" : "Non"}
                </p>
                <p>
                  Surnom obligatoire : {rules.nicknameRequired ? "Oui" : "Non"}
                </p>
                <p>
                  Clause anti-doublons :{" "}
                  {rules.duplicateSpeciesClause ? "Oui" : "Non"}
                </p>

                {mode === "soul-link" && (
                  <>
                    <p>Soul Link activé : Oui</p>
                    <p>Mort partagée automatique : Oui</p>
                  </>
                )}
              </div>
            </div>

            {mode === "soul-link" && (
              <p>
                <span className="font-medium text-white">Joueur 2 :</span>{" "}
                {playerTwo || "Non renseigné"}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}