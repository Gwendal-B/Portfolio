"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getPokemonForGameGroup } from "../../../../lib/pokedex-helpers";
import { getRoutesForGameGroup } from "../../../../lib/routes";
import {
  addCapturedPokemon,
  addSoulLink,
  deleteCapturedPokemon,
  getCapturedPokemonsByRunId,
  getRunById,
  getSoulLinksByRunId,
  updateCapturedPokemon,
  deleteSoulLink,
  exportRunAsJson,
} from "../../../../lib/local-storage";
import type { Run } from "../../../../types/run";
import type { CapturedPokemon, LifeStatus, StorageStatus } from "../../../../types/tracker";
import type { SoulLink } from "../../../../types/soul-link";
import CaptureCard from "../../../../components/tracker/CaptureCard";
import AddCaptureForm from "../../../../components/tracker/AddCaptureForm";
import SoulLinkPanel from "../../../../components/tracker/SoulLinkPanel";
import TeamPanel from "../../../../components/tracker/TeamPanel";
import RunStatsBar from "../../../../components/tracker/RunStatsBar";
import { loadTrackerState, saveTrackerState } from "../../../../lib/local-storage";
import { deleteCapture } from "../../../../domain/capture/capture.service";

type RunDetailPageProps = {
  params: Promise<{ id: string }>;
};

const MODE_LABELS: Record<string, string> = {
  nuzlocke: "Nuzlocke",
  "soul-link": "Soul Link",
};

export default function RunDetailPage({ params }: RunDetailPageProps) {
  const [runId, setRunId] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [captures, setCaptures] = useState<CapturedPokemon[]>([]);
  const [soulLinks, setSoulLinks] = useState<SoulLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmCaptureId, setDeleteConfirmCaptureId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"captures" | "box" | "dead">("captures");

  const availablePokemon = useMemo(() => {
    if (!run) return [];
    return getPokemonForGameGroup(run.game);
  }, [run]);

  const pokemonById = useMemo(
    () => new Map(availablePokemon.map((p) => [p.id, p])),
    [availablePokemon]
  );

  const availableRoutes = useMemo(() => {
    if (!run) return [];
    return getRoutesForGameGroup(run.game);
  }, [run]);

  function refreshData(currentRunId: string) {
    setCaptures(getCapturedPokemonsByRunId(currentRunId));
    setSoulLinks(getSoulLinksByRunId(currentRunId));
  }

  useEffect(() => {
    async function loadRun() {
      const { id: currentRunId } = await params;
      setRunId(currentRunId);

      const foundRun = getRunById(currentRunId) ?? null;
      setRun(foundRun);

      if (foundRun) {
        refreshData(currentRunId);
      }

      setIsLoading(false);
    }

    loadRun();
  }, [params]);

  // ——— Handlers captures ———

  function handleAddCapture(
    captureData: Omit<CapturedPokemon, "id" | "createdAt" | "updatedAt">
  ): string | null {
    if (!run) return "Run introuvable.";

    const now = new Date().toISOString();
    const newCapture: CapturedPokemon = {
      ...captureData,
      id: `capture-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    addCapturedPokemon(newCapture);

    // Soul Link automatique : cherche un partenaire sur la même zone
    if (run.mode === "soul-link" && run.rules.soulLinkEnabled) {
      const currentCaptures = getCapturedPokemonsByRunId(run.id);
      const matchingCapture = currentCaptures.find(
        (c) =>
          c.routeId === newCapture.routeId &&
          c.playerId !== newCapture.playerId &&
          c.soulLinkId === null &&
          c.id !== newCapture.id
      );

      if (matchingCapture) {
        const soulLinkId = `soul-link-${Date.now()}`;
        const newSoulLink: SoulLink = {
          id: soulLinkId,
          runId: run.id,
          pokemonAId: matchingCapture.id,
          pokemonBId: newCapture.id,
          active: true,
          createdAt: now,
        };

        addSoulLink(newSoulLink);
        updateCapturedPokemon({ ...matchingCapture, soulLinkId, updatedAt: now });
        updateCapturedPokemon({ ...newCapture, soulLinkId, updatedAt: now });
      }
    }

    refreshData(run.id);
    return null;
  }

  function handleUpdateCapture(
    captureId: string,
    field: "lifeStatus" | "storageStatus",
    value: LifeStatus | StorageStatus
  ) {
    const captureToUpdate = captures.find((c) => c.id === captureId);
    if (!captureToUpdate) return;

    const now = new Date().toISOString();
    const updatedCapture: CapturedPokemon = {
      ...captureToUpdate,
      [field]: value,
      updatedAt: now,
    };

    updateCapturedPokemon(updatedCapture);

    // Soul Link : mort partagée automatique
    if (
      run?.rules.sharedDeathEnabled &&
      field === "lifeStatus" &&
      value === "dead" &&
      captureToUpdate.soulLinkId !== null
    ) {
      const soulLink = soulLinks.find((link) => link.id === captureToUpdate.soulLinkId);

      if (soulLink) {
        const linkedCaptureId =
          soulLink.pokemonAId === captureId ? soulLink.pokemonBId : soulLink.pokemonAId;
        const linkedCapture = captures.find((c) => c.id === linkedCaptureId);

        if (linkedCapture && linkedCapture.lifeStatus !== "dead") {
          updateCapturedPokemon({ ...linkedCapture, lifeStatus: "unusable", updatedAt: now });
        }
      }
    }

    refreshData(runId);
  }

  function handleDeleteCapture(captureId: string) {
    const state = loadTrackerState();

    const newState = deleteCapture(state, captureId);

    saveTrackerState(newState);

    setDeleteConfirmCaptureId(null);
    refreshData(runId);
  }

  // ——— Handlers Soul Link ———

  function handleCreateSoulLink(captureAId: string, captureBId: string): string | null {
    if (!run) return "Run introuvable.";

    const now = new Date().toISOString();
    const soulLinkId = `soul-link-${Date.now()}`;
    const captureA = captures.find((c) => c.id === captureAId);
    const captureB = captures.find((c) => c.id === captureBId);

    if (!captureA || !captureB) return "Captures introuvables.";

    const newSoulLink: SoulLink = {
      id: soulLinkId,
      runId: run.id,
      pokemonAId: captureA.id,
      pokemonBId: captureB.id,
      active: true,
      createdAt: now,
    };

    addSoulLink(newSoulLink);
    updateCapturedPokemon({ ...captureA, soulLinkId, updatedAt: now });
    updateCapturedPokemon({ ...captureB, soulLinkId, updatedAt: now });

    refreshData(run.id);
    return null;
  }

  function handleDeleteSoulLink(soulLinkId: string) {
    if (!run) return;

    const soulLinkToDelete = soulLinks.find((link) => link.id === soulLinkId);
    if (!soulLinkToDelete) return;

    const now = new Date().toISOString();
    const captureA = captures.find((c) => c.id === soulLinkToDelete.pokemonAId);
    const captureB = captures.find((c) => c.id === soulLinkToDelete.pokemonBId);

    if (captureA) updateCapturedPokemon({ ...captureA, soulLinkId: null, updatedAt: now });
    if (captureB) updateCapturedPokemon({ ...captureB, soulLinkId: null, updatedAt: now });

    deleteSoulLink(soulLinkId);
    refreshData(run.id);
  }

  function handleExport() {
    if (!run) return;
    const data = exportRunAsJson(run.id);
    if (!data) return;

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${run.name.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ——— Computed ———

  function getLinkedCapture(capture: CapturedPokemon): CapturedPokemon | null {
    if (!capture.soulLinkId) return null;
    const soulLink = soulLinks.find((link) => link.id === capture.soulLinkId);
    if (!soulLink) return null;
    const linkedId = soulLink.pokemonAId === capture.id ? soulLink.pokemonBId : soulLink.pokemonAId;
    return captures.find((c) => c.id === linkedId) ?? null;
  }

  const playerOne = run?.players[0] ?? null;
  const playerTwo = run?.players[1] ?? null;

  const aliveCaptures = captures.filter((c) => c.lifeStatus === "alive");
  const deadCaptures = captures.filter((c) => c.lifeStatus === "dead" || c.lifeStatus === "unusable");
  const boxCaptures = aliveCaptures.filter((c) => c.storageStatus === "box");
  const teamCaptures = aliveCaptures.filter((c) => c.storageStatus === "team");

  const playerOneTeam = playerOne
    ? teamCaptures.filter((c) => c.playerId === playerOne.id)
    : teamCaptures;

  const playerTwoTeam = playerTwo
    ? teamCaptures.filter((c) => c.playerId === playerTwo.id)
    : [];

  // Captures à afficher selon l'onglet actif
  const tabCaptures =
    activeTab === "captures"
      ? aliveCaptures.filter((c) => c.storageStatus === "team")
      : activeTab === "box"
      ? boxCaptures
      : deadCaptures;

  // ——— Render helpers ———

  function renderCaptureCard(capture: CapturedPokemon) {
    const pokemon = pokemonById.get(capture.pokemonId);
    const player = run?.players.find((p) => p.id === capture.playerId);
    const linked = getLinkedCapture(capture);
    const linkedPokemon = linked ? pokemonById.get(linked.pokemonId) : undefined;
    const linkedPlayer = linked
      ? run?.players.find((p) => p.id === linked.playerId)
      : undefined;

    return (
      <CaptureCard
        key={capture.id}
        capture={capture}
        pokemon={pokemon}
        player={player}
        linkedCapture={linked}
        linkedPokemon={linkedPokemon}
        linkedPlayer={linkedPlayer}
        run={run!}
        onUpdateCapture={handleUpdateCapture}
        onDeleteCapture={handleDeleteCapture}
        showDeleteConfirm={deleteConfirmCaptureId === capture.id}
        onRequestDelete={(id) => {
          if (deleteConfirmCaptureId === id) {
            handleDeleteCapture(id);
          } else {
            setDeleteConfirmCaptureId(id);
          }
        }}
        onCancelDelete={() => setDeleteConfirmCaptureId(null)}
      />
    );
  }

  // ——— States ———

  if (isLoading) {
    return (
      <main className="min-h-screen px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-zinc-400">Chargement de la run…</p>
        </div>
      </main>
    );
  }

  if (!run) {
    return (
      <main className="min-h-screen px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-zinc-400">Run introuvable.</p>
          <Link
            href="/tracker"
            className="mt-4 inline-block rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            ← Retour à mes runs
          </Link>
        </div>
      </main>
    );
  }

  // ——— Main render ———

  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_260px]">

          {/* Panneau gauche — équipe joueur 1 */}
          <aside className="hidden xl:block">
            {playerOne && (
              <TeamPanel
                title={playerOne.name}
                teamCaptures={playerOneTeam}
                pokemonById={pokemonById}
                run={run}
              />
            )}
          </aside>

          {/* Contenu principal */}
          <div>
            {/* En-tête */}
            <header className="mb-8">
              <Link href="/tracker" className="text-sm text-zinc-400 hover:text-white">
                ← Mes runs
              </Link>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                    {MODE_LABELS[run.mode] ?? run.mode}
                  </p>
                  <h1 className="mt-1 text-4xl font-bold">{run.name}</h1>
                  <p className="mt-2 text-zinc-400">
                    {run.game} · Gén. {run.generation} · {run.players.map((p) => p.name).join(" & ")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExport}
                  className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                >
                  Exporter la run
                </button>
              </div>
            </header>

            {/* Stats globales */}
            <RunStatsBar captures={captures} />

            {/* Formulaire d'ajout */}
            <AddCaptureForm
              run={run}
              availablePokemon={availablePokemon}
              availableRoutes={availableRoutes}
              captures={captures}
              onAddCapture={handleAddCapture}
            />

            {/* Onglets captures */}
            <section className="mt-8">
              <div className="flex gap-1 rounded-xl border border-zinc-800 bg-zinc-900 p-1">
                {(
                  [
                    { key: "captures", label: `Équipe (${playerOneTeam.length + playerTwoTeam.length})` },
                    { key: "box", label: `Boîte (${boxCaptures.length})` },
                    { key: "dead", label: `Morts (${deadCaptures.length})` },
                  ] as const
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                      activeTab === key
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tabCaptures.length === 0 ? (
                <p className="mt-6 text-zinc-400">
                  {activeTab === "captures"
                    ? "Aucun Pokémon en équipe."
                    : activeTab === "box"
                    ? "Aucun Pokémon en boîte."
                    : "Aucun mort dans cette run pour le moment."}
                </p>
              ) : run.mode === "soul-link" && activeTab === "captures" ? (
                // Vue Soul Link : colonnes par joueur
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  {[playerOne, playerTwo].map((player) =>
                    player ? (
                      <div key={player.id}>
                        <h3 className="mb-4 text-base font-semibold text-zinc-300">
                          {player.name}
                        </h3>
                        <div className="space-y-4">
                          {tabCaptures
                            .filter((c) => c.playerId === player.id)
                            .map(renderCaptureCard)}
                          {tabCaptures.filter((c) => c.playerId === player.id).length === 0 && (
                            <p className="text-sm text-zinc-500">Aucune capture.</p>
                          )}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {tabCaptures.map(renderCaptureCard)}
                </div>
              )}
            </section>

            {/* Soul Link panel */}
            {run.mode === "soul-link" && (
              <SoulLinkPanel
                run={run}
                captures={captures}
                soulLinks={soulLinks}
                pokemonById={pokemonById}
                onCreateSoulLink={handleCreateSoulLink}
                onDeleteSoulLink={handleDeleteSoulLink}
              />
            )}
          </div>

          {/* Panneau droit — équipe joueur 2 (ou rien) */}
          <aside className="hidden xl:block">
            {run.mode === "soul-link" && playerTwo ? (
              <TeamPanel
                title={playerTwo.name}
                teamCaptures={playerTwoTeam}
                pokemonById={pokemonById}
                run={run}
              />
            ) : run.mode === "nuzlocke" && playerOne ? (
              // En nuzlocke, panneau droit = boîte
              <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <h2 className="text-lg font-semibold text-white">Boîte</h2>
                <p className="mt-1 text-xs text-zinc-500">{boxCaptures.length} Pokémon</p>
                {boxCaptures.length === 0 ? (
                  <p className="mt-3 text-sm text-zinc-400">Aucun Pokémon en boîte.</p>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {boxCaptures.map((capture) => {
                      const pokemon = pokemonById.get(capture.pokemonId);
                      return (
                        <div key={capture.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-center">
                          {pokemon && (
                            <img
                              src={pokemon.spriteUrl}
                              alt={pokemon.name}
                              className="mx-auto h-16 w-16 object-contain [image-rendering:pixelated]"
                            />
                          )}
                          <p className="mt-1 truncate text-xs text-zinc-300">
                            {capture.nickname || pokemon?.name || "?"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
