import type { CapturedPokemon } from "../../types/tracker";
import type { Pokemon } from "../../types/pokemon";
import type { Run } from "../../types/run";
import PokemonTypeBadge from "../ui/PokemonTypeBadge";
import PokemonSprite from "../ui/PokemonSprite";

interface TeamPanelProps {
  title: string;
  teamCaptures: CapturedPokemon[];
  pokemonById: Map<number, Pokemon>;
  run: Run;
}

export default function TeamPanel({ title, teamCaptures, pokemonById, run }: TeamPanelProps) {
  return (
    <div className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-xs text-zinc-500">
        {teamCaptures.length} / 6 Pokémon
      </p>

      {teamCaptures.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-400">Aucun Pokémon en équipe.</p>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-1">
          {teamCaptures.map((capture) => {
            const pokemon = pokemonById.get(capture.pokemonId);

            return (
              <div
                key={capture.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 min-h-[185px] grid grid-rows-[72px_32px_40px] items-start justify-items-center"
              >
                {pokemon ? (
                  <div className="flex h-[72px] w-full items-center justify-center">
                    <PokemonSprite
                      dexNumber={pokemon.dexNumber}
                      name={pokemon.name}
                      spriteUrl={pokemon.spriteUrl}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-[72px] w-full items-center justify-center text-xs text-zinc-500">
                    Inconnu
                  </div>
                )}

                <p className="w-full truncate text-center text-sm font-medium text-zinc-200 leading-8">
                  {capture.nickname || pokemon?.name || "Pokémon"}
                </p>

                {pokemon?.types && pokemon.types.length > 0 ? (
                  <div className="flex min-h-[40px] w-full flex-wrap content-start justify-center gap-1">
                    {pokemon.types.map((type) => (
                      <PokemonTypeBadge key={type} type={type} />
                    ))}
                  </div>
                ) : (
                  <div className="min-h-[40px] w-full" />
                )}

                {/* Talent / nature masqués pour alléger les cartes d’équipe.
                    On pourra les réactiver plus tard si besoin. */}
              </div>
            );
          })}

          {Array.from({ length: Math.max(0, 6 - teamCaptures.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="rounded-xl border border-dashed border-zinc-800 min-h-[195px] flex items-center justify-center"
            >
              <span className="text-xs text-zinc-700">Vide</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}