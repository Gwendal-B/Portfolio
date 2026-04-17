import type { CapturedPokemon } from "../../types/tracker";
import type { Pokemon } from "../../types/pokemon";
import type { Run } from "../../types/run";

interface TeamPanelProps {
  title: string;
  teamCaptures: CapturedPokemon[];
  pokemonById: Map<number, Pokemon>;
  run: Run;
}

export default function TeamPanel({ title, teamCaptures, pokemonById, run }: TeamPanelProps) {
  return (
    <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-xs text-zinc-500">
        {teamCaptures.length} / 6 Pokémon
      </p>

      {teamCaptures.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-400">Aucun Pokémon en équipe.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {teamCaptures.map((capture) => {
            const pokemon = pokemonById.get(capture.pokemonId);

            return (
              <div
                key={capture.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 min-h-[130px] flex flex-col items-center justify-center"
              >
                {pokemon ? (
                  <img
                    src={pokemon.spriteUrl}
                    alt={pokemon.name}
                    className="mx-auto h-20 w-20 object-contain [image-rendering:pixelated]"
                  />
                ) : (
                  <div className="flex h-16 items-center justify-center text-xs text-zinc-500">
                    Inconnu
                  </div>
                )}

                <p className="mt-1 w-full truncate text-center text-xs font-medium text-zinc-200">
                  {capture.nickname || pokemon?.name || "Pokémon"}
                </p>

                {run.rules.showAbilities && capture.ability && (
                  <p className="mt-0.5 w-full truncate text-center text-[10px] text-zinc-500">
                    {capture.ability}
                  </p>
                )}

                {run.rules.showNatures && capture.nature && (
                  <p className="mt-0.5 w-full truncate text-center text-[10px] text-zinc-500">
                    {capture.nature}
                  </p>
                )}
              </div>
            );
          })}

          {/* Slots vides */}
          {Array.from({ length: Math.max(0, 6 - teamCaptures.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="rounded-lg border border-dashed border-zinc-800 min-h-[130px] flex items-center justify-center"
            >
              <span className="text-xs text-zinc-700">Vide</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
