import gen1Pokemon from "../../../data/gen1-pokemon.json";
import type { Pokemon } from "../../../types/pokemon";
import Link from "next/link";

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
};

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  /*
    Dans Next.js 16, params est asynchrone.
    On doit donc attendre sa valeur avec await.
  */
  const { id } = await params;

  /*
    L'id venant de l'URL est du texte.
    Exemple : "1"
    On le convertit en nombre pour comparer avec pokemon.id
  */
  const pokemonId = Number(id);

  /*
    On récupère la liste des Pokémon depuis le JSON
  */
  const pokemons = gen1Pokemon as Pokemon[];

  /*
    On cherche le Pokémon qui correspond à l'id
  */
  const pokemon = pokemons.find((p) => p.id === pokemonId);

  /*
    Si aucun Pokémon n'est trouvé, on affiche un message simple
  */
  if (!pokemon) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
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

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/pokedex"
          className="mb-6 inline-block text-sm text-zinc-400 hover:text-white"
        >
          ← Retour au Pokédex
        </Link>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm text-zinc-400">
                #{String(pokemon.dexNumber).padStart(3, "0")}
              </p>

              <h1 className="mt-2 text-4xl font-bold">{pokemon.name}</h1>

              <div className="mt-4 flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <img
              src={pokemon.spriteUrl}
              alt={pokemon.name}
              className="h-32 w-32 object-contain"
            />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-zinc-800/50 p-4">
              <h2 className="mb-3 text-lg font-semibold">
                Statistiques de base
              </h2>
              <p className="mb-3 text-sm text-zinc-400">
                Valeurs fixes propres à chaque espèce de Pokémon.
              </p>

              <div className="space-y-2 text-zinc-300">
                <p>PV : {pokemon.stats.hp}</p>
                <p>Attaque : {pokemon.stats.attack}</p>
                <p>Défense : {pokemon.stats.defense}</p>
                <p>Vitesse : {pokemon.stats.speed}</p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-800/50 p-4">
              <h2 className="mb-3 text-lg font-semibold">Informations</h2>

              <div className="space-y-2 text-zinc-300">
                <p>Génération : {pokemon.generation}</p>
                <p>Taux de capture : {pokemon.captureRate}</p>
                <p>
                  Évolutions :{" "}
                  {pokemon.evolutions.length > 0
                    ? pokemon.evolutions.join(", ")
                    : "Aucune"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}