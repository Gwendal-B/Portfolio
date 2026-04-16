"use client";

import { useMemo, useState } from "react";
import gen1Pokemon from "../../data/gen1-pokemon.json";
import type { Pokemon } from "../../types/pokemon";
import gen2Pokemon from "../../data/gen2-pokemon.json";
import type { GameGroup } from "../../types/run";
import Link from "next/link";

export default function PokedexPage() {
  // 🔹 État pour le groupe de jeu
  const [selectedGameGroup, setSelectedGameGroup] =
  useState<GameGroup>("Pokemon Rouge / Bleu / Jaune");

  // État pour la recherche
  const [search, setSearch] = useState("");

  // État pour le filtre par type
  const [selectedType, setSelectedType] = useState("Tous");

  const [selectedGeneration, setSelectedGeneration] = useState("Toutes");

  const shouldShowGenerationFilter =
    selectedGameGroup === "Pokemon Or / Argent / Cristal";

  // 🔹 Pokémon disponibles selon le groupe de jeu
  const availablePokemon = useMemo(() => {
    const generationOnePokemon = gen1Pokemon as Pokemon[];
    const generationTwoPokemon = gen2Pokemon as Pokemon[];

    if (selectedGameGroup === "Pokemon Rouge / Bleu / Jaune") {
      return generationOnePokemon;
    }

    if (selectedGameGroup === "Pokemon Or / Argent / Cristal") {
      return [...generationOnePokemon, ...generationTwoPokemon];
    }

    return generationOnePokemon;
  }, [selectedGameGroup]);

  // Récupération de tous les types uniques
  const availableTypes = [
    "Tous",
    ...Array.from(
      new Set(availablePokemon.flatMap((pokemon) => pokemon.types))
    ).sort(),
  ];

  // Filtrage des Pokémon
  const filteredPokemons = availablePokemon.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      selectedType === "Tous" ||
      pokemon.types.includes(selectedType);

    const matchesGeneration =
      !shouldShowGenerationFilter ||
      selectedGeneration === "Toutes" ||
      pokemon.generation === Number(selectedGeneration);

    return matchesSearch && matchesType && matchesGeneration;
  });

  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
        {/* En-tête */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Pokédex</h1>
          <p className="mt-2 text-zinc-400">
            Explore les Pokémon disponibles selon le groupe de jeu sélectionné.
          </p>
        </header>

        {/* Barre de recherche et filtre */}
        <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="w-full lg:w-80">
            <label
              htmlFor="gameGroup"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Groupe de jeu
            </label>

            <select
              id="gameGroup"
              value={selectedGameGroup}
              onChange={(event) => {
                setSelectedGameGroup(event.target.value as GameGroup);
                setSelectedGeneration("Toutes");
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="Pokemon Rouge / Bleu / Jaune">
                Pokémon Rouge / Bleu / Jaune
              </option>
              <option value="Pokemon Or / Argent / Cristal">
                Pokémon Or / Argent / Cristal
              </option>
            </select>
          </div>

        {shouldShowGenerationFilter && (
          <div className="w-full lg:w-56">
            <label
              htmlFor="generation"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Génération
            </label>

            <select
              id="generation"
              value={selectedGeneration}
              onChange={(event) => setSelectedGeneration(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="Toutes">Toutes</option>
              <option value="1">Génération 1</option>
              <option value="2">Génération 2</option>
            </select>
          </div>
        )}

          <div className="w-full lg:flex-1">
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Rechercher un Pokémon
            </label>

            <input
              id="search"
              type="text"
              placeholder="Rechercher un Pokémon..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          <div className="w-full lg:w-64">
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Filtrer par type
            </label>

            <select
              id="type"
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
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