"use client";

import { useMemo, useState } from "react";
import {
  getPokemonForGameGroup,
  getAvailableTypesForPokemon,
  filterPokemonList,
} from "../../lib/pokedex-helpers";
import { getGenerationsForGameGroup } from "../../lib/game-groups";
import type { GameGroup } from "../../types/run";
import Link from "next/link";
import PokemonTypeBadge from "../../components/ui/PokemonTypeBadge";

export default function PokedexPage() {
  const [selectedGameGroup, setSelectedGameGroup] =
    useState<GameGroup>("Pokemon Rouge / Bleu / Jaune");

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedGeneration, setSelectedGeneration] = useState("Toutes");

  const availableGenerations =
    getGenerationsForGameGroup(selectedGameGroup);

  const shouldShowGenerationFilter =
    availableGenerations.length > 1;

  const availablePokemon = useMemo(() => {
    return getPokemonForGameGroup(selectedGameGroup);
  }, [selectedGameGroup]);

  const availableTypes = getAvailableTypesForPokemon(availablePokemon);

  const filteredPokemons = filterPokemonList(availablePokemon, {
    search,
    selectedType,
    selectedGeneration,
    availableGenerations,
  });

  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Pokédex</h1>
          <p className="mt-2 text-zinc-400">
            Explore les Pokémon disponibles selon le groupe de jeu sélectionné.
          </p>
        </header>

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
                setSelectedType("Tous");
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="Pokemon Rouge / Bleu / Jaune">
                Pokémon Rouge / Bleu / Jaune
              </option>
              <option value="Pokemon Or / Argent / Cristal">
                Pokémon Or / Argent / Cristal
              </option>
              <option value="Pokemon Rubis / Saphir / Émeraude">
                Pokémon Rubis / Saphir / Émeraude
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
                {availableGenerations.map((generation) => (
                  <option key={generation} value={String(generation)}>
                    Génération {generation}
                  </option>
                ))}
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

        <p className="mb-4 text-sm text-zinc-400">
          Pokémon affichés :{" "}
          <span className="font-semibold text-white">
            {filteredPokemons.length}
          </span>
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredPokemons.map((pokemon) => (
            <Link
              key={pokemon.id}
              href={`/pokedex/${pokemon.id}`}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600 hover:bg-zinc-800"
            >
              <div className="flex flex-col items-center text-center">
                {/* Sprite */}
                <img
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  className="h-24 w-24 object-contain [image-rendering:pixelated] transition group-hover:scale-110"
                />

                {/* Nom + ID */}
                <h3 className="mt-3 text-sm font-semibold text-white">
                  {pokemon.name}
                </h3>

                <p className="text-xs text-zinc-500">
                  N° {pokemon.id.toString().padStart(4, "0")}
                </p>

                {/* Types */}
                {pokemon.types && (
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {pokemon.types.map((type) => (
                      <PokemonTypeBadge key={type} type={type} />
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}