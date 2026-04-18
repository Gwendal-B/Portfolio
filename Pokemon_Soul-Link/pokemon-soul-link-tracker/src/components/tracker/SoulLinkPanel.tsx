"use client";

import { useEffect, useState } from "react";
import type { Run } from "../../types/run";
import type { CapturedPokemon } from "../../types/tracker";
import type { SoulLink } from "../../types/soul-link";
import type { Pokemon } from "../../types/pokemon";

interface SoulLinkPanelProps {
  run: Run;
  captures: CapturedPokemon[];
  soulLinks: SoulLink[];
  pokemonById: Map<number, Pokemon>;
  onCreateSoulLink: (captureAId: string, captureBId: string) => string | null;
  onDeleteSoulLink: (soulLinkId: string) => void;
}

export default function SoulLinkPanel({
  run,
  captures,
  soulLinks,
  pokemonById,
  onCreateSoulLink,
  onDeleteSoulLink,
}: SoulLinkPanelProps) {
  const [showManualForm, setShowManualForm] = useState(false);
  const [captureAId, setCaptureAId] = useState("");
  const [captureBId, setCaptureBId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setCaptureBId("");
    setErrorMessage("");
  }, [captureAId]);

  const unlinkedCaptures = captures.filter((c) => c.soulLinkId === null);

  const availableCapturesA = unlinkedCaptures;

  const availableCapturesB = unlinkedCaptures.filter((c) => {
    if (!captureAId) return true;

    const captureA = unlinkedCaptures.find((c) => c.id === captureAId);
    if (!captureA) return true;

    return c.playerId !== captureA.playerId && c.id !== captureAId;
  });

  function handleCreateSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!captureAId || !captureBId) {
      setErrorMessage("Tu dois sélectionner deux captures.");
      return;
    }

    if (captureAId === captureBId) {
      setErrorMessage("Tu ne peux pas lier une capture avec elle-même.");
      return;
    }

    const captureA = captures.find((c) => c.id === captureAId);
    const captureB = captures.find((c) => c.id === captureBId);

    if (!captureA || !captureB) {
      setErrorMessage("Impossible de retrouver les captures sélectionnées.");
      return;
    }

    if (captureA.playerId === captureB.playerId) {
      setErrorMessage("Les deux captures doivent appartenir à deux joueurs différents.");
      return;
    }

    const error = onCreateSoulLink(captureAId, captureBId);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setCaptureAId("");
    setCaptureBId("");
    setShowManualForm(false);
  }

  function captureLabel(capture: CapturedPokemon): string {
    const pokemon = pokemonById.get(capture.pokemonId);
    const player = run.players.find((p) => p.id === capture.playerId);
    const name = capture.nickname
      ? `${capture.nickname} (${pokemon?.name ?? "?"})`
      : (pokemon?.name ?? `Pokémon #${capture.pokemonId}`);
    return `${name} — ${player?.name ?? capture.playerId} — ${capture.routeName}`;
  }

  const isValidLink =
    captureAId !== "" &&
    captureBId !== "" &&
    captureAId !== captureBId;

  return (
    <>
      {/* Créer un lien manuellement */}
      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold">Liens Soul Link</h2>

        <p className="mt-2 text-sm text-zinc-400">
          Les liens sont créés automatiquement quand les deux joueurs capturent un Pokémon dans la même zone.
          Tu peux aussi en créer manuellement si nécessaire.
        </p>

        <button
          type="button"
          onClick={() => {
            setShowManualForm((prev) => !prev);
            setErrorMessage("");
            setCaptureAId("");
            setCaptureBId("");
          }}
          className="mt-4 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20"
        >
          {showManualForm ? "Masquer" : "Créer un lien manuellement"}
        </button>

        {showManualForm && (
          <form onSubmit={handleCreateSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="captureA" className="mb-2 block text-sm font-medium">
                Capture du joueur A
              </label>
              <select
                id="captureA"
                value={captureAId}
                onChange={(e) => setCaptureAId(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              >
                <option value="">Sélectionner une capture</option>
                {availableCapturesA.map((capture) => (
                  <option key={capture.id} value={capture.id}>
                    {captureLabel(capture)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="captureB" className="mb-2 block text-sm font-medium">
                Capture du joueur B
              </label>
              <select
                id="captureB"
                value={captureBId}
                onChange={(e) => setCaptureBId(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              >
                <option value="">Sélectionner une capture</option>
                {availableCapturesB.map((capture) => (
                  <option key={capture.id} value={capture.id}>
                    {captureLabel(capture)}
                  </option>
                ))}
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
                disabled={!isValidLink}
                className={`rounded-lg px-6 py-3 font-medium text-white transition ${
                  isValidLink
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-zinc-700 cursor-not-allowed text-zinc-300"
                }`}
              >
                Créer le lien
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Liste des liens existants */}
      {soulLinks.length > 0 && (
        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Liens actifs</h2>
            <span className="text-sm text-zinc-400">
              <span className="font-medium text-white">{soulLinks.length}</span> lien{soulLinks.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {soulLinks.map((soulLink) => {
              const captureA = captures.find((c) => c.id === soulLink.pokemonAId);
              const captureB = captures.find((c) => c.id === soulLink.pokemonBId);
              const pokemonA = captureA ? pokemonById.get(captureA.pokemonId) : null;
              const pokemonB = captureB ? pokemonById.get(captureB.pokemonId) : null;
              const playerA = captureA ? run.players.find((p) => p.id === captureA.playerId) : null;
              const playerB = captureB ? run.players.find((p) => p.id === captureB.playerId) : null;
              const isDeleting = deleteConfirmId === soulLink.id;

              const isBroken =
                (captureA?.lifeStatus === "dead" || captureA?.lifeStatus === "unusable") ||
                (captureB?.lifeStatus === "dead" || captureB?.lifeStatus === "unusable");

              return (
                <article
                  key={soulLink.id}
                  className={`rounded-xl border p-4 ${
                    isBroken
                      ? "border-red-500/20 bg-red-500/5"
                      : "border-purple-500/20 bg-purple-500/5"
                  }`}
                >
                  {isBroken && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-red-400">
                      Lien brisé
                    </p>
                  )}

                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      { capture: captureA, pokemon: pokemonA, player: playerA },
                      { capture: captureB, pokemon: pokemonB, player: playerB },
                    ].map(({ capture, pokemon, player }, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3"
                      >
                        {pokemon && (
                          <img
                            src={pokemon.spriteUrl}
                            alt={pokemon.name}
                            className="h-12 w-12 shrink-0 object-contain [image-rendering:pixelated]"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white text-sm">
                            {capture?.nickname
                              ? `${capture.nickname} (${pokemon?.name ?? "?"})`
                              : (pokemon?.name ?? "Capture inconnue")}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {player?.name ?? "Joueur inconnu"} · {capture?.routeName ?? "Zone inconnue"}
                          </p>
                          {capture && (
                            <span
                              className={`mt-1 inline-block text-xs ${
                                capture.lifeStatus === "alive"
                                  ? "text-green-400"
                                  : capture.lifeStatus === "dead"
                                  ? "text-red-400"
                                  : "text-zinc-400"
                              }`}
                            >
                              {capture.lifeStatus === "alive"
                                ? "Vivant"
                                : capture.lifeStatus === "dead"
                                ? "Mort"
                                : "Inutilisable"}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    {isDeleting ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-zinc-400">Supprimer ce lien ?</span>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteSoulLink(soulLink.id);
                            setDeleteConfirmId(null);
                          }}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                        >
                          Confirmer
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(soulLink.id)}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                      >
                        Supprimer le lien
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
