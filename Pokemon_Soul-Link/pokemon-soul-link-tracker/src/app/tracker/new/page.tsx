"use client";

import { useState } from "react";

export default function NewRunPage() {
  /*
    useState permet de stocker une valeur qui peut changer.
    Ici, on stocke les champs du formulaire.
  */
  const [runName, setRunName] = useState("");
  const [mode, setMode] = useState("nuzlocke");
  const [game, setGame] = useState("Pokemon Rouge");
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  /*
    Cette fonction se déclenche quand on soumet le formulaire.
    Pour le moment, on empêche juste le rechargement de la page
    et on affiche les données dans la console.
  */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newRun = {
      runName,
      mode,
      game,
      players:
        mode === "soul-link"
          ? [playerOne, playerTwo].filter((player) => player.trim() !== "")
          : [playerOne].filter((player) => player.trim() !== ""),
    };

    console.log("Nouvelle run :", newRun);

    alert("Run créée en mémoire. On branchera la sauvegarde locale ensuite.");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Tracker
          </p>

          <h1 className="mt-2 text-4xl font-bold">Créer une nouvelle run</h1>

          <p className="mt-3 text-zinc-400">
            Configure une première run locale pour ton challenge Pokémon.
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
              onChange={(event) => setMode(event.target.value)}
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
              onChange={(event) => setGame(event.target.value)}
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
              placeholder="Nom du joueur"
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
                placeholder="Nom du second joueur"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>
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