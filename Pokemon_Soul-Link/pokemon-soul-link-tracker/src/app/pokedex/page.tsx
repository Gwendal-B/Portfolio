"use client";

import { useState } from "react";
import gen1Pokemon from "../../data/gen1-pokemon.json";
import type { Pokemon } from "../../types/pokemon";
import Link from "next/link";

export default function PokedexPage() {
  const pokemons = gen1Pokemon as Pokemon[];

  // État pour la recherche
  const [search, setSearch] = useState("");

  // État pour le filtre par type
  const [selectedType, setSelectedType] = useState("Tous");

  // Récupération de tous les types uniques
  const types = [
    "Tous",
    ...Array.from(new Set(pokemons.flatMap((p) => p.types))),
  ];

  // Filtrage des Pokémon
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      selectedType === "Tous" ||
      pokemon.types.includes(selectedType);

    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* En-tête */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Pokédex – Génération 1</h1>
          <p className="mt-2 text-zinc-400">
            Explore les Pokémon et filtre-les par nom ou par type.
          </p>
        </header>

        {/* Barre de recherche et filtre */}
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Recherche */}
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Filtre par type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-1/4 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </section>

        {/* Nombre de résultats */}
        <p className="mb-4 text-sm text-zinc-400">
          Pokémon affichés :{" "}
          <span className="font-semibold text-white">
            {filteredPokemons.length}
          </span>
        </p>

        {/* Grille des Pokémon */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPokemons.map((pokemon) => (
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

                {/* Types */}
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

                {/* Statistiques */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-300">
                  <p>PV : {pokemon.stats.hp}</p>
                  <p>ATQ : {pokemon.stats.attack}</p>
                  <p>DEF : {pokemon.stats.defense}</p>
                  <p>VIT : {pokemon.stats.speed}</p>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}