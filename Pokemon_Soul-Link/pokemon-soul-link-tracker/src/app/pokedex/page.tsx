import gen1Pokemon from "@/data/gen1-pokemon.json";
import type { Pokemon } from "@/types/pokemon";
import Link from "next/link";

/*
  Cette page affiche la liste des Pokémon de la 1G.

  Important :
  - TSX = TypeScript + JSX
  - JSX = syntaxe proche du HTML qu'on écrit dans React
  - TypeScript = permet de typer les données
*/

export default function PokedexPage() {
  /*
    Ici, on indique à TypeScript :
    "gen1Pokemon doit être considéré comme une liste de Pokemon"
    
    Le "as Pokemon[]" sert de conversion de type.
  */
  const pokemons = gen1Pokemon as Pokemon[];

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Pokédex
          </p>

          <h1 className="mt-2 text-4xl font-bold">Pokédex 1G</h1>

          <p className="mt-3 max-w-2xl text-zinc-300">
            Voici la liste des Pokémon disponibles pour la première génération.
            Cette page est volontairement simple pour constituer une base propre
            de ton projet.
          </p>
        </header>

        <section className="mb-6">
          <p className="text-sm text-zinc-400">
            Nombre de Pokémon affichés :{" "}
            <span className="font-semibold text-white">{pokemons.length}</span>
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.id}
              href={`/pokedex/${pokemon.id}`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600 hover:bg-zinc-800"
            >
              <article>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">
                      #{String(pokemon.dexNumber).padStart(3, "0")}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      {pokemon.name}
                    </h2>
                  </div>

                  <img
                    src={pokemon.spriteUrl}
                    alt={pokemon.name}
                    className="h-20 w-20 object-contain"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-200"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-300">
                  <p>HP : {pokemon.stats.hp}</p>
                  <p>ATK : {pokemon.stats.attack}</p>
                  <p>DEF : {pokemon.stats.defense}</p>
                  <p>VIT : {pokemon.stats.speed}</p>
                </div>

                <p className="mt-4 text-sm text-zinc-400">
                  Taux de capture : {pokemon.captureRate}
                </p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
