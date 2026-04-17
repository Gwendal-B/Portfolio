import type { CapturedPokemon, LifeStatus, StorageStatus } from "../../types/tracker";
import type { Pokemon } from "../../types/pokemon";
import type { Player, Run } from "../../types/run";
import StatusBadge from "../ui/StatusBadge";

interface CaptureCardProps {
  capture: CapturedPokemon;
  pokemon: Pokemon | undefined;
  player: Player | undefined;
  linkedCapture: CapturedPokemon | null;
  linkedPokemon: Pokemon | undefined;
  linkedPlayer: Player | undefined;
  run: Run;
  onUpdateCapture: (
    captureId: string,
    field: "lifeStatus" | "storageStatus",
    value: LifeStatus | StorageStatus
  ) => void;
  onDeleteCapture: (captureId: string) => void;
  showDeleteConfirm: boolean;
  onRequestDelete: (captureId: string) => void;
  onCancelDelete: () => void;
}

export default function CaptureCard({
  capture,
  pokemon,
  player,
  linkedCapture,
  linkedPokemon,
  linkedPlayer,
  run,
  onUpdateCapture,
  showDeleteConfirm,
  onRequestDelete,
  onCancelDelete,
}: CaptureCardProps) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {capture.nickname
              ? `${capture.nickname}`
              : (pokemon ? pokemon.name : `Pokémon #${capture.pokemonId}`)}
          </h3>

          {capture.nickname && pokemon && (
            <p className="text-sm text-zinc-500">{pokemon.name}</p>
          )}

          <div className="mt-2">
            <StatusBadge status={capture.lifeStatus} />
          </div>
        </div>

        {pokemon && (
          <img
            src={pokemon.spriteUrl}
            alt={pokemon.name}
            className="h-24 w-24 shrink-0 object-contain [image-rendering:pixelated]"
          />
        )}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-zinc-300">
        <p>
          <span className="font-medium text-white">Joueur :</span>{" "}
          {player ? player.name : capture.playerId}
        </p>

        <p>
          <span className="font-medium text-white">Zone :</span>{" "}
          {capture.routeName}
        </p>

        {run.rules.showAbilities && (
          <p>
            <span className="font-medium text-white">Talent :</span>{" "}
            {capture.ability ?? "Non renseigné"}
          </p>
        )}

        {run.rules.showNatures && (
          <p>
            <span className="font-medium text-white">Nature :</span>{" "}
            {capture.nature ?? "Non renseignée"}
          </p>
        )}
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
                  {linkedCapture.nickname
                    ? `${linkedCapture.nickname} (${linkedPokemon?.name ?? "?"})`
                    : (linkedPokemon ? linkedPokemon.name : "Inconnu")}
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
            onChange={(e) =>
              onUpdateCapture(capture.id, "lifeStatus", e.target.value as LifeStatus)
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
            onChange={(e) =>
              onUpdateCapture(capture.id, "storageStatus", e.target.value as StorageStatus)
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-zinc-500"
          >
            <option value="team">Équipe</option>
            <option value="box">Boîte</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        {showDeleteConfirm ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-zinc-400">Supprimer cette capture ?</span>
            <button
              type="button"
              onClick={() => onRequestDelete(capture.id)}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
            >
              Confirmer
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onRequestDelete(capture.id)}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
          >
            Supprimer la capture
          </button>
        )}
      </div>
    </article>
  );
}
