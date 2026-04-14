"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import gen1Pokemon from "../../../../data/gen1-pokemon.json";
import {
  addCapturedPokemon,
  addSoulLink,
  deleteCapturedPokemon,
  getCapturedPokemonsByRunId,
  getRunById,
  getSoulLinksByRunId,
  updateCapturedPokemon,
  deleteSoulLink,
} from "../../../../lib/local-storage";
import type { Run } from "../../../../types/run";
import type { CapturedPokemon, LifeStatus, StorageStatus } from "../../../../types/tracker";
import type { Pokemon } from "../../../../types/pokemon";
import type { SoulLink } from "../../../../types/soul-link";


type RunDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function RunDetailPage({ params }: RunDetailPageProps) {
  const [runId, setRunId] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [captures, setCaptures] = useState<CapturedPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPokemonId, setSelectedPokemonId] = useState<number>(1);
  const [nickname, setNickname] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState("player-1");
  const [routeName, setRouteName] = useState("");
  const [lifeStatus, setLifeStatus] = useState<LifeStatus>("alive");
  const [storageStatus, setStorageStatus] = useState<StorageStatus>("team");
  const [errorMessage, setErrorMessage] = useState("");
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [soulLinks, setSoulLinks] = useState<SoulLink[]>([]);
  const [selectedCaptureAId, setSelectedCaptureAId] = useState("");
  const [selectedCaptureBId, setSelectedCaptureBId] = useState("");
  const [soulLinkErrorMessage, setSoulLinkErrorMessage] = useState("");

  const pokedex = gen1Pokemon as Pokemon[];

  const pokemonById = useMemo(() => {
    return new Map(pokedex.map((pokemon) => [pokemon.id, pokemon]));
  }, [pokedex]);

  const filteredPokemons = useMemo(() => {
    const search = pokemonSearch.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return pokedex
      .filter((pokemon) => pokemon.name.toLowerCase().includes(search))
      .slice(0, 10);
  }, [pokedex, pokemonSearch]);

  const availableSoulLinkCaptures = useMemo(() => {
    return captures.filter((capture) => capture.soulLinkId === null);
  }, [captures]);

  const playerOne = run?.players[0] ?? null;
  const playerTwo = run?.players[1] ?? null;

  const playerOneCaptures = playerOne
    ? captures.filter((capture) => capture.playerId === playerOne.id)
    : [];

  const playerTwoCaptures = playerTwo
    ? captures.filter((capture) => capture.playerId === playerTwo.id)
    : [];

  useEffect(() => {
    async function loadRun() {
      const resolvedParams = await params;
      const currentRunId = resolvedParams.id;

      setRunId(currentRunId);

      const foundRun = getRunById(currentRunId) ?? null;
      setRun(foundRun);

      if (foundRun) {
        setCaptures(getCapturedPokemonsByRunId(currentRunId));
        setSoulLinks(getSoulLinksByRunId(currentRunId));

        if (foundRun.players.length > 0) {
          setSelectedPlayerId(foundRun.players[0].id);
        }
      }

      setIsLoading(false);
    }

    loadRun();
  }, [params]);

  function handleAddCapture(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!run) {
      return;
    }

    setErrorMessage("");

    const trimmedRouteName = routeName.trim();

    if (!trimmedRouteName) {
      setErrorMessage("La zone de capture est obligatoire.");
      return;
    }

    const now = new Date().toISOString();

    const newCapture: CapturedPokemon = {
      id: `capture-${Date.now()}`,
      runId: run.id,
      pokemonId: selectedPokemonId,
      nickname: nickname.trim(),
      playerId: selectedPlayerId,
      routeName: trimmedRouteName,
      lifeStatus,
      storageStatus,
      soulLinkId: null,
      createdAt: now,
      updatedAt: now,
    };

    addCapturedPokemon(newCapture);

    const updatedCaptures = getCapturedPokemonsByRunId(run.id);
    setCaptures(updatedCaptures);

    setNickname("");
    setRouteName("");
    setLifeStatus("alive");
    setStorageStatus("team");
    setPokemonSearch("");
  }

  function handleUpdateCapture(
    captureId: string,
    field: "lifeStatus" | "storageStatus",
    value: LifeStatus | StorageStatus
  ) {
    const captureToUpdate = captures.find((capture) => capture.id === captureId);

    if (!captureToUpdate) {
      return;
    }

    const now = new Date().toISOString();

    const updatedCapture: CapturedPokemon = {
      ...captureToUpdate,
      [field]: value,
      updatedAt: now,
    };

    updateCapturedPokemon(updatedCapture);

    /*
      Automatisation Soul Link :
      si une capture liée passe à "dead",
      alors son partenaire devient "unusable".
    */
    if (
      field === "lifeStatus" &&
      value === "dead" &&
      captureToUpdate.soulLinkId !== null
    ) {
      const soulLink = soulLinks.find(
        (link) => link.id === captureToUpdate.soulLinkId
      );

      if (soulLink) {
        const linkedCaptureId =
          soulLink.pokemonAId === captureToUpdate.id
            ? soulLink.pokemonBId
            : soulLink.pokemonAId;

        const linkedCapture = captures.find(
          (capture) => capture.id === linkedCaptureId
        );

        if (linkedCapture && linkedCapture.lifeStatus !== "dead") {
          const updatedLinkedCapture: CapturedPokemon = {
            ...linkedCapture,
            lifeStatus: "unusable",
            updatedAt: now,
          };

          updateCapturedPokemon(updatedLinkedCapture);
        }
      }
    }

    const updatedCaptures = getCapturedPokemonsByRunId(runId);
    setCaptures(updatedCaptures);
  }

  function handleDeleteCapture(captureId: string) {
    const confirmed = window.confirm(
      "Es-tu sûr de vouloir supprimer cette capture ?"
    );

    if (!confirmed) {
      return;
    }

    deleteCapturedPokemon(captureId);

    const updatedCaptures = getCapturedPokemonsByRunId(runId);
    setCaptures(updatedCaptures);
  }

  function handleCreateSoulLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!run) {
      return;
    }

    setSoulLinkErrorMessage("");

    if (run.mode !== "soul-link") {
      setSoulLinkErrorMessage("Cette run n'est pas en mode Soul Link.");
      return;
    }

    if (!selectedCaptureAId || !selectedCaptureBId) {
      setSoulLinkErrorMessage("Tu dois sélectionner deux captures.");
      return;
    }

    if (selectedCaptureAId === selectedCaptureBId) {
      setSoulLinkErrorMessage("Tu ne peux pas lier une capture avec elle-même.");
      return;
    }

    const captureA = captures.find((capture) => capture.id === selectedCaptureAId);
    const captureB = captures.find((capture) => capture.id === selectedCaptureBId);

    if (!captureA || !captureB) {
      setSoulLinkErrorMessage("Impossible de retrouver les captures sélectionnées.");
      return;
    }

    if (captureA.playerId === captureB.playerId) {
      setSoulLinkErrorMessage("Les deux captures doivent appartenir à deux joueurs différents.");
      return;
    }

    const now = new Date().toISOString();
    const soulLinkId = `soul-link-${Date.now()}`;

    const newSoulLink: SoulLink = {
      id: soulLinkId,
      runId: run.id,
      pokemonAId: captureA.id,
      pokemonBId: captureB.id,
      active: true,
      createdAt: now,
    };

    addSoulLink(newSoulLink);

    const updatedCaptureA: CapturedPokemon = {
      ...captureA,
      soulLinkId,
      updatedAt: now,
    };

    const updatedCaptureB: CapturedPokemon = {
      ...captureB,
      soulLinkId,
      updatedAt: now,
    };

    updateCapturedPokemon(updatedCaptureA);
    updateCapturedPokemon(updatedCaptureB);

    setSoulLinks(getSoulLinksByRunId(run.id));
    setCaptures(getCapturedPokemonsByRunId(run.id));
    setSelectedCaptureAId("");
    setSelectedCaptureBId("");
  }

  function handleDeleteSoulLink(soulLinkId: string) {
    const confirmed = window.confirm(
      "Es-tu sûr de vouloir supprimer ce Soul Link ?"
    );

    if (!confirmed || !run) {
      return;
    }

    const soulLinkToDelete = soulLinks.find(
      (link) => link.id === soulLinkId
    );

    if (!soulLinkToDelete) {
      return;
    }

    const now = new Date().toISOString();

    // Mettre à jour les captures associées
    const captureA = captures.find(
      (capture) => capture.id === soulLinkToDelete.pokemonAId
    );

    const captureB = captures.find(
      (capture) => capture.id === soulLinkToDelete.pokemonBId
    );

    if (captureA) {
      updateCapturedPokemon({
        ...captureA,
        soulLinkId: null,
        updatedAt: now,
      });
    }

    if (captureB) {
      updateCapturedPokemon({
        ...captureB,
        soulLinkId: null,
        updatedAt: now,
      });
    }

    // Supprimer le Soul Link
    deleteSoulLink(soulLinkId);

    // Rafraîchir l'état
    setSoulLinks(getSoulLinksByRunId(run.id));
    setCaptures(getCapturedPokemonsByRunId(run.id));
  }

  function getLinkedCapture(capture: CapturedPokemon): CapturedPokemon | null {
    if (!capture.soulLinkId) {
      return null;
    }

    const soulLink = soulLinks.find((link) => link.id === capture.soulLinkId);

    if (!soulLink) {
      return null;
    }

    const linkedCaptureId =
      soulLink.pokemonAId === capture.id
        ? soulLink.pokemonBId
        : soulLink.pokemonAId;

    return captures.find((currentCapture) => currentCapture.id === linkedCaptureId) ?? null;
  }

  function renderCaptureCard(capture: CapturedPokemon) {
    const pokemon = pokemonById.get(capture.pokemonId);
    const player = run?.players.find(
      (currentPlayer) => currentPlayer.id === capture.playerId
    );
    const linkedCapture = getLinkedCapture(capture);
    const linkedPokemon = linkedCapture
      ? pokemonById.get(linkedCapture.pokemonId)
      : null;
    const linkedPlayer = linkedCapture
      ? run?.players.find(
          (currentPlayer) => currentPlayer.id === linkedCapture.playerId
        )
      : null;

    return (
      <article
        key={capture.id}
        className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {pokemon ? pokemon.name : `Pokémon #${capture.pokemonId}`}
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              {capture.nickname ? `Surnom : ${capture.nickname}` : "Aucun surnom"}
            </p>
          </div>

          {pokemon && (
            <img
              src={pokemon.spriteUrl}
              alt={pokemon.name}
              className="h-24 w-24 shrink-0 object-contain [image-rendering:pixelated]"
            />
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-zinc-300">
          <p>
            <span className="font-medium text-white">Joueur :</span>{" "}
            {player ? player.name : capture.playerId}
          </p>

          <p>
            <span className="font-medium text-white">Zone :</span>{" "}
            {capture.routeName}
          </p>
        </div>

        {linkedCapture && (
          <div className="mt-4 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-300">
                  Soul Link
                </p>

                <div className="mt-2 space-y-1 text-sm text-zinc-200">
                  <p>
                    <span className="font-medium text-white">Partenaire :</span>{" "}
                    {linkedPokemon ? linkedPokemon.name : "Inconnu"}
                  </p>
                  <p>
                    <span className="font-medium text-white">Joueur :</span>{" "}
                    {linkedPlayer ? linkedPlayer.name : "Inconnu"}
                  </p>
                </div>
              </div>

              {linkedPokemon && (
                <img
                  src={linkedPokemon.spriteUrl}
                  alt={linkedPokemon.name}
                  className="h-20 w-20 shrink-0 object-contain [image-rendering:pixelated]"
                />
              )}
            </div>
          </div>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Statut
            </label>
            <select
              value={capture.lifeStatus}
              onChange={(event) =>
                handleUpdateCapture(
                  capture.id,
                  "lifeStatus",
                  event.target.value as LifeStatus
                )
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-zinc-500"
            >
              <option value="alive">Vivant</option>
              <option value="dead">Mort</option>
              <option value="unusable">Inutilisable</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Emplacement
            </label>
            <select
              value={capture.storageStatus}
              onChange={(event) =>
                handleUpdateCapture(
                  capture.id,
                  "storageStatus",
                  event.target.value as StorageStatus
                )
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-zinc-500"
            >
              <option value="team">Équipe</option>
              <option value="box">Boîte</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => handleDeleteCapture(capture.id)}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
          >
            Supprimer la capture
          </button>
        </div>
      </article>
    );
  }
  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-zinc-400">Chargement de la run...</p>
        </div>
      </main>
    );
  }

  if (!run) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-zinc-400">Run introuvable.</p>

          <Link
            href="/tracker/new"
            className="mt-4 inline-block rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            Créer une nouvelle run
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <Link
            href="/tracker/new"
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Retour à la création de run
          </Link>

          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
            Tracker
          </p>

          <h1 className="mt-2 text-4xl font-bold">{run.name}</h1>

          <p className="mt-3 text-zinc-400">
            Tu peux maintenant ajouter et suivre les Pokémon capturés dans cette run.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Informations générales</h2>

            <div className="mt-4 space-y-3 text-zinc-300">
              <p>
                <span className="font-medium text-white">Nom :</span> {run.name}
              </p>
              <p>
                <span className="font-medium text-white">Mode :</span> {run.mode}
              </p>
              <p>
                <span className="font-medium text-white">Jeu :</span> {run.game}
              </p>
              <p>
                <span className="font-medium text-white">Génération :</span> {run.generation}
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Joueurs</h2>

            <div className="mt-4 space-y-3 text-zinc-300">
              {run.players.map((player) => (
                <p key={player.id}>
                  <span className="font-medium text-white">{player.id} :</span>{" "}
                  {player.name}
                </p>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Ajouter une capture</h2>

          <form onSubmit={handleAddCapture} className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="pokemonSearch" className="mb-2 block text-sm font-medium">
                Rechercher un Pokémon
              </label>

              <input
                id="pokemonSearch"
                type="text"
                value={pokemonSearch}
                onChange={(event) => setPokemonSearch(event.target.value)}
                placeholder="Ex : Bulbizarre"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />

              <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
                Pokémon sélectionné :{" "}
                <span className="font-medium text-white">
                  {pokemonById.get(selectedPokemonId)?.name ?? "Aucun"}
                </span>
              </div>

              {pokemonSearch.trim() !== "" && (
                <div className="mt-3 max-h-48 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950">
                  {filteredPokemons.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-zinc-400">
                      Aucun Pokémon trouvé.
                    </p>
                  ) : (
                    filteredPokemons.map((pokemon) => (
                      <button
                        key={pokemon.id}
                        type="button"
                        onClick={() => {
                          setSelectedPokemonId(pokemon.id);
                          setPokemonSearch("");
                        }}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-zinc-900 ${
                          selectedPokemonId === pokemon.id
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-300"
                        }`}
                      >
                        <span>
                          #{String(pokemon.dexNumber).padStart(3, "0")} - {pokemon.name}
                        </span>

                        {selectedPokemonId === pokemon.id && (
                          <span className="text-xs text-blue-400">Sélectionné</span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="nickname" className="mb-2 block text-sm font-medium">
                Surnom
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="Ex : Sparky"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>

            <div>
              <label htmlFor="playerId" className="mb-2 block text-sm font-medium">
                Joueur
              </label>
              <select
                id="playerId"
                value={selectedPlayerId}
                onChange={(event) => setSelectedPlayerId(event.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              >
                {run.players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="routeName" className="mb-2 block text-sm font-medium">
                Zone de capture
              </label>
              <input
                id="routeName"
                type="text"
                value={routeName}
                onChange={(event) => setRouteName(event.target.value)}
                placeholder="Ex : Route 2"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />
            </div>

            <div>
              <label htmlFor="lifeStatus" className="mb-2 block text-sm font-medium">
                Statut
              </label>
              <select
                id="lifeStatus"
                value={lifeStatus}
                onChange={(event) => setLifeStatus(event.target.value as LifeStatus)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              >
                <option value="alive">Vivant</option>
                <option value="dead">Mort</option>
                <option value="unusable">Inutilisable</option>
              </select>
            </div>

            <div>
              <label htmlFor="storageStatus" className="mb-2 block text-sm font-medium">
                Emplacement
              </label>
              <select
                id="storageStatus"
                value={storageStatus}
                onChange={(event) => setStorageStatus(event.target.value as StorageStatus)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              >
                <option value="team">Équipe</option>
                <option value="box">Boîte</option>
              </select>
            </div>

            {errorMessage && (
              <p className="md:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Ajouter la capture
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Captures</h2>
            <p className="text-sm text-zinc-400">
              Total : <span className="font-medium text-white">{captures.length}</span>
            </p>
          </div>

          {captures.length === 0 ? (
            <p className="mt-4 text-zinc-400">
              Aucune capture enregistrée pour le moment.
            </p>
          ) : run.mode === "soul-link" ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {playerOne ? playerOne.name : "Joueur 1"}
                </h3>

                <div className="space-y-4">
                  {playerOneCaptures.length === 0 ? (
                    <p className="text-sm text-zinc-400">Aucune capture.</p>
                  ) : (
                    playerOneCaptures.map((capture) => renderCaptureCard(capture))
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {playerTwo ? playerTwo.name : "Joueur 2"}
                </h3>

                <div className="space-y-4">
                  {playerTwoCaptures.length === 0 ? (
                    <p className="text-sm text-zinc-400">Aucune capture.</p>
                  ) : (
                    playerTwoCaptures.map((capture) => renderCaptureCard(capture))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {captures.map((capture) => renderCaptureCard(capture))}
            </div>
          )}
        </section>
        {run.mode === "soul-link" && (
          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Créer un lien Soul Link</h2>

            <p className="mt-3 text-zinc-400">
              Lie manuellement deux captures appartenant à deux joueurs différents.
            </p>

            <form
              onSubmit={handleCreateSoulLink}
              className="mt-6 grid gap-4 md:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="selectedCaptureAId"
                  className="mb-2 block text-sm font-medium"
                >
                  Capture du joueur A
                </label>

                <select
                  id="selectedCaptureAId"
                  value={selectedCaptureAId}
                  onChange={(event) => setSelectedCaptureAId(event.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                >
                  <option value="">Sélectionner une capture</option>
                  {availableSoulLinkCaptures.map((capture) => {
                    const pokemon = pokemonById.get(capture.pokemonId);
                    const player = run.players.find(
                      (currentPlayer) => currentPlayer.id === capture.playerId
                    );

                    return (
                      <option key={capture.id} value={capture.id}>
                        {pokemon ? pokemon.name : `Pokémon #${capture.pokemonId}`} —{" "}
                        {player ? player.name : capture.playerId} — {capture.routeName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label
                  htmlFor="selectedCaptureBId"
                  className="mb-2 block text-sm font-medium"
                >
                  Capture du joueur B
                </label>

                <select
                  id="selectedCaptureBId"
                  value={selectedCaptureBId}
                  onChange={(event) => setSelectedCaptureBId(event.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                >
                  <option value="">Sélectionner une capture</option>
                  {availableSoulLinkCaptures.map((capture) => {
                    const pokemon = pokemonById.get(capture.pokemonId);
                    const player = run.players.find(
                      (currentPlayer) => currentPlayer.id === capture.playerId
                    );

                    return (
                      <option key={capture.id} value={capture.id}>
                        {pokemon ? pokemon.name : `Pokémon #${capture.pokemonId}`} —{" "}
                        {player ? player.name : capture.playerId} — {capture.routeName}
                      </option>
                    );
                  })}
                </select>
              </div>

              {soulLinkErrorMessage && (
                <p className="md:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {soulLinkErrorMessage}
                </p>
              )}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
                >
                  Créer le lien
                </button>
              </div>
            </form>
          </section>
        )}
        {run.mode === "soul-link" && (
          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Liens Soul Link</h2>
              <p className="text-sm text-zinc-400">
                Total : <span className="font-medium text-white">{soulLinks.length}</span>
              </p>
            </div>

            {soulLinks.length === 0 ? (
              <p className="mt-4 text-zinc-400">
                Aucun lien Soul Link enregistré pour le moment.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {soulLinks.map((soulLink) => {
                  const captureA = captures.find((capture) => capture.id === soulLink.pokemonAId);
                  const captureB = captures.find((capture) => capture.id === soulLink.pokemonBId);

                  const pokemonA = captureA ? pokemonById.get(captureA.pokemonId) : null;
                  const pokemonB = captureB ? pokemonById.get(captureB.pokemonId) : null;

                  const playerA = captureA
                    ? run.players.find((player) => player.id === captureA.playerId)
                    : null;

                  const playerB = captureB
                    ? run.players.find((player) => player.id === captureB.playerId)
                    : null;

                  return (
                    <article
                      key={soulLink.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                    >
                      <p className="text-sm text-zinc-400">
                        Lien actif : {soulLink.active ? "Oui" : "Non"}
                      </p>

                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                          <p className="font-semibold text-white">
                            {pokemonA ? pokemonA.name : "Capture inconnue"}
                          </p>
                          <p className="mt-2 text-sm text-zinc-300">
                            Joueur : {playerA ? playerA.name : "Inconnu"}
                          </p>
                          <p className="text-sm text-zinc-300">
                            Zone : {captureA ? captureA.routeName : "Inconnue"}
                          </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                          <p className="font-semibold text-white">
                            {pokemonB ? pokemonB.name : "Capture inconnue"}
                          </p>
                          <p className="mt-2 text-sm text-zinc-300">
                            Joueur : {playerB ? playerB.name : "Inconnu"}
                          </p>
                          <p className="text-sm text-zinc-300">
                            Zone : {captureB ? captureB.routeName : "Inconnue"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteSoulLink(soulLink.id)}
                        className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                      >
                        Supprimer le Soul Link
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}