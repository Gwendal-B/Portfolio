import { nationalPokedex, getPokemonById } from "../../../lib/pokedex";
import Link from "next/link";
import PokemonTypeBadge from "../../../components/ui/PokemonTypeBadge";
import {
  getPokemonBaseStatTotal,
  getPokemonWeaknesses,
} from "../../../lib/pokemon-type-chart";
import { enrichPokemonWithGameData } from "../../../lib/pokedex-helpers";
import { getPokemonGifUrl } from "../../../lib/pokemon-assets";
import PokemonSprite from "../../../components/ui/PokemonSprite";
/*
  Cette page est une route dynamique.
  Le [id] dans le nom du dossier veut dire :
  "je veux récupérer une valeur depuis l'URL"

  Exemple :
  /pokedex/1  -> id = "1"
  /pokedex/4  -> id = "4"
*/

type PokemonDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    game?: string;
  }>;
};

export default async function PokemonDetailPage({
  params,
  searchParams,
}: PokemonDetailPageProps) {
  /*
    Dans Next.js 16, params est asynchrone.
    On doit donc attendre sa valeur avec await.
  */
  const { id } = await params;
  const { game } = await searchParams;

  /*
    L'id venant de l'URL est du texte.
    Exemple : "1"
    On le convertit en nombre pour comparer avec pokemon.id
  */
  const pokemonId = Number(id);

  const basePokemon = getPokemonById(pokemonId);

  const pokemon = basePokemon && game
    ? enrichPokemonWithGameData(basePokemon, game as any)
    : basePokemon;

  /*
    Si aucun Pokémon n'est trouvé, on affiche un message simple
  */
  if (!pokemon) {
    return (
      <main className="min-h-screen px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
          <p className="text-zinc-400">Pokémon introuvable.</p>

          <Link
            href="/pokedex"
            className="mt-4 inline-block rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            Retour au Pokédex
          </Link>
        </div>
      </main>
    );
  }

  const weaknesses = getPokemonWeaknesses(pokemon.types);
  const baseStatTotal = getPokemonBaseStatTotal(pokemon.stats);

  const evolutionNames = pokemon.evolutions.map(
    (evolutionId) => getPokemonById(evolutionId)?.name ?? `#${evolutionId}`
  );

  const abilities =
    pokemon.abilities && Array.isArray(pokemon.abilities)
      ? pokemon.abilities
      : pokemon.abilities?.standard ?? [];

  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/pokedex"
          className="mb-6 inline-block text-sm text-zinc-400 hover:text-white"
        >
          ← Retour au Pokédex
        </Link>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            {/* Colonne gauche */}
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">
                Pokédex national
              </p>

              <div className="mt-2 flex flex-wrap items-end gap-3">
                <h1 className="text-4xl font-bold">{pokemon.name}</h1>
                <span className="text-xl text-zinc-500">
                  N° {String(pokemon.dexNumber).padStart(4, "0")}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <PokemonTypeBadge key={type} type={type} />
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-zinc-300">Faiblesses</p>
                {weaknesses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {weaknesses.map((type) => (
                      <PokemonTypeBadge key={type} type={type} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">Aucune faiblesse renseignée.</p>
                )}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <h2 className="text-lg font-semibold text-white">Profil</h2>

                  <div className="mt-4 space-y-3 text-sm text-zinc-300">
                    <p>
                      <span className="font-medium text-white">Génération :</span>{" "}
                      {pokemon.generation}
                    </p>

                    <p>
                      <span className="font-medium text-white">Taux de capture :</span>{" "}
                      {pokemon.captureRate}
                    </p>

                    <p>
                      <span className="font-medium text-white">Talents :</span>{" "}
                      {abilities.length > 0 ? abilities.join(", ") : "Aucun renseigné"}
                    </p>

                    <p>
                      <span className="font-medium text-white">Évolutions :</span>{" "}
                      {evolutionNames.length > 0 ? evolutionNames.join(" → ") : "Aucune"}
                    </p>

                    <p>
                      <span className="font-medium text-white">Groupes de jeu :</span>{" "}
                      {pokemon.gameGroups.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <h2 className="text-lg font-semibold text-white">Statistiques de base</h2>

                  <div className="mt-4 space-y-3 text-sm text-zinc-300">
                    <div className="flex items-center justify-between">
                      <span>PV</span>
                      <span className="font-medium text-white">{pokemon.stats.hp}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Attaque</span>
                      <span className="font-medium text-white">{pokemon.stats.attack}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Défense</span>
                      <span className="font-medium text-white">{pokemon.stats.defense}</span>
                    </div>

                    {pokemon.stats.specialAttack !== undefined && (
                      <div className="flex items-center justify-between">
                        <span>Att. Spé.</span>
                        <span className="font-medium text-white">
                          {pokemon.stats.specialAttack}
                        </span>
                      </div>
                    )}

                    {pokemon.stats.specialDefense !== undefined && (
                      <div className="flex items-center justify-between">
                        <span>Déf. Spé.</span>
                        <span className="font-medium text-white">
                          {pokemon.stats.specialDefense}
                        </span>
                      </div>
                    )}

                    {pokemon.stats.special !== undefined && (
                      <div className="flex items-center justify-between">
                        <span>Spécial</span>
                        <span className="font-medium text-white">
                          {pokemon.stats.special}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span>Vitesse</span>
                      <span className="font-medium text-white">{pokemon.stats.speed}</span>
                    </div>

                    <div className="mt-2 border-t border-zinc-800 pt-3 flex items-center justify-between">
                      <span className="font-medium text-white">Total</span>
                      <span className="font-semibold text-white">{baseStatTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="rounded-3xl border border-zinc-900 p-6">
              <div className="flex h-40 w-full items-center justify-center">
                <PokemonSprite
                  dexNumber={pokemon.dexNumber}
                  name={pokemon.name}
                  spriteUrl={pokemon.spriteUrl}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}