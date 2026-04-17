"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getRuns, deleteRunWithCascade, getCapturedPokemonsByRunId, getSoulLinksByRunId, importRunFromJson } from "../../lib/local-storage";
import type { Run } from "../../types/run";
import type { RunExportData } from "../../lib/local-storage";
import { exportRunAsJson } from "../../lib/local-storage";

const MODE_LABELS: Record<string, string> = {
  nuzlocke: "Nuzlocke",
  "soul-link": "Soul Link",
};

export default function TrackerPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function loadRuns() {
    setRuns(getRuns());
  }

  useEffect(() => {
    loadRuns();
  }, []);

  function handleDeleteClick(runId: string) {
    setDeleteConfirmId(runId);
  }

  function handleDeleteConfirm() {
    if (!deleteConfirmId) return;
    deleteRunWithCascade(deleteConfirmId);
    setDeleteConfirmId(null);
    loadRuns();
  }

  function handleExport(runId: string, runName: string) {
    const data = exportRunAsJson(runId);
    if (!data) return;

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${runName.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    setImportError("");
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as RunExportData;

        if (data.version !== 1 || !data.run || !data.captures || !data.soulLinks) {
          setImportError("Fichier invalide. Assure-toi qu'il s'agit d'un export PokéChallenge Tracker.");
          return;
        }

        importRunFromJson(data);
        loadRuns();
      } catch {
        setImportError("Impossible de lire le fichier. Vérifie qu'il est bien au format JSON.");
      }
    };
    reader.readAsText(file);

    // Reset input pour permettre de réimporter le même fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Tracker
            </p>
            <h1 className="mt-2 text-4xl font-bold">Mes runs</h1>
            <p className="mt-3 text-zinc-400">
              Retrouve toutes tes runs sauvegardées localement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800">
              Importer une run
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="sr-only"
              />
            </label>

            <Link
              href="/tracker/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              + Nouvelle run
            </Link>
          </div>
        </header>

        {importError && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {importError}
          </div>
        )}

        {runs.length === 0 ? (
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <p className="text-zinc-400">Aucune run enregistrée pour le moment.</p>
            <Link
              href="/tracker/new"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Créer ta première run
            </Link>
          </section>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {runs.map((run) => {
              const captures = getCapturedPokemonsByRunId(run.id);
              const soulLinks = getSoulLinksByRunId(run.id);
              const alive = captures.filter((c) => c.lifeStatus === "alive").length;
              const dead = captures.filter((c) => c.lifeStatus === "dead").length;
              const isDeleting = deleteConfirmId === run.id;

              return (
                <article
                  key={run.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold text-white">
                        {run.name}
                      </h2>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300">
                          {MODE_LABELS[run.mode] ?? run.mode}
                        </span>
                        <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300">
                          {run.game}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-2">
                      <p className="text-lg font-semibold text-white">{captures.length}</p>
                      <p className="text-xs text-zinc-400">Captures</p>
                    </div>
                    <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-2 py-2">
                      <p className="text-lg font-semibold text-green-300">{alive}</p>
                      <p className="text-xs text-green-400">Vivants</p>
                    </div>
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-2 py-2">
                      <p className="text-lg font-semibold text-red-300">{dead}</p>
                      <p className="text-xs text-red-400">Morts</p>
                    </div>
                  </div>

                  {run.mode === "soul-link" && (
                    <p className="mt-3 text-xs text-zinc-500">
                      {soulLinks.length} lien{soulLinks.length > 1 ? "s" : ""} Soul Link •{" "}
                      {run.players.map((p) => p.name).join(" & ")}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-zinc-600">
                    Créée le {new Date(run.createdAt).toLocaleDateString("fr-FR")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/tracker/run/${run.id}`}
                      className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                    >
                      Ouvrir la run
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleExport(run.id, run.name)}
                      className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                    >
                      Exporter
                    </button>

                    {isDeleting ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-400">Confirmer ?</span>
                        <button
                          type="button"
                          onClick={handleDeleteConfirm}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                        >
                          Oui, supprimer
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(run.id)}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
