"use client";

import { useEffect, useMemo, useState } from "react";
import type { Run } from "../../types/run";
import type { CapturedPokemon, LifeStatus, StorageStatus } from "../../types/tracker";
import type { Pokemon } from "../../types/pokemon";
import type { GameRoute } from "../../types/route";
import { NATURES } from "../../lib/natures";
import { getGameMechanics } from "../../lib/game-mechanics";
import { getStandardAbilities } from "../../lib/pokedex-helpers";

interface AddCaptureFormProps {
  run: Run;
  availablePokemon: Pokemon[];
  availableRoutes: GameRoute[];
  captures: CapturedPokemon[];
  onAddCapture: (capture: Omit<CapturedPokemon, "id" | "createdAt" | "updatedAt">) => string | null;
}

export default function AddCaptureForm({
  run,
  availablePokemon,
  availableRoutes,
  captures,
  onAddCapture,
}: AddCaptureFormProps) {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>(
    availablePokemon[0]?.id ?? 0
  );
  const [nickname, setNickname] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(run.players[0]?.id ?? "");
  const [selectedRouteId, setSelectedRouteId] = useState(availableRoutes[0]?.id ?? "");
  const [lifeStatus, setLifeStatus] = useState<LifeStatus>("alive");
  const [storageStatus, setStorageStatus] = useState<StorageStatus>("team");
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedNature, setSelectedNature] = useState("");
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const pokemonById = useMemo(
    () => new Map(availablePokemon.map((p) => [p.id, p])),
    [availablePokemon]
  );

  const selectedPokemon = pokemonById.get(selectedPokemonId) ?? null;
  const availableAbilities = selectedPokemon
    ? getStandardAbilities(selectedPokemon)
    : [];

  const mechanics = getGameMechanics(run.game);

  const canUseAbilities = mechanics.abilities && run.rules.showAbilities;
  const canUseNatures = mechanics.natures && run.rules.showNatures;

  const filteredPokemons = useMemo(() => {
    const q = pokemonSearch.trim().toLowerCase();
    if (!q) return [];
    return availablePokemon
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [availablePokemon, pokemonSearch]);

  // Sync ability quand le pokémon change
  useEffect(() => {
    if (!canUseAbilities) {
      setSelectedAbility("");
      return;
    }

    if (availableAbilities.length === 0) {
      setSelectedAbility("");
      return;
    }

    if (availableAbilities.length === 1) {
      setSelectedAbility(availableAbilities[0]);
      return;
    }

    // Si plusieurs talents, on garde si valide, sinon reset
    if (!availableAbilities.includes(selectedAbility)) {
      setSelectedAbility("");
    }
  }, [selectedPokemonId, canUseAbilities]);

  // Reset nature quand pokémon change
  useEffect(() => {
    if (!canUseNatures) {
      setSelectedNature("");
      return;
    }

    // reset uniquement si invalide
    if (!selectedNature) return;
  }, [selectedPokemonId, canUseNatures]);

  function resetForm() {
    setNickname("");
    setLifeStatus("alive");
    setStorageStatus("team");
    setPokemonSearch("");
    setSelectedAbility("");
    setSelectedNature("");
    setSelectedPokemonId(availablePokemon[0]?.id ?? 0);
    setSelectedRouteId(availableRoutes[0]?.id ?? "");
    setErrorMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const trimmedNickname = nickname.trim();

    if (!selectedPokemonId) {
      setErrorMessage("Le Pokémon à capturer est obligatoire.");
      return;
    }

    if (canUseAbilities && availableAbilities.length > 0 && !selectedAbility) {
      setErrorMessage("Le talent est obligatoire pour cette capture.");
      return;
    }

    if (canUseNatures && !selectedNature) {
      setErrorMessage("La nature est obligatoire pour cette capture.");
      return;
    }

    if (run.rules.nicknameRequired && !trimmedNickname) {
      setErrorMessage("Le surnom est obligatoire pour cette run.");
      return;
    }

    if (!selectedRouteId) {
      setErrorMessage("La zone de capture est obligatoire.");
      return;
    }

    const selectedRoute = availableRoutes.find((r) => r.id === selectedRouteId);
    if (!selectedRoute) {
      setErrorMessage("La zone sélectionnée est invalide.");
      return;
    }

    if (run.rules.oneEncounterPerRoute) {
      const existingCapture =
        run.mode === "soul-link"
          ? captures.find(
              (c) => c.routeId === selectedRoute.id && c.playerId === selectedPlayerId
            )
          : captures.find((c) => c.routeId === selectedRoute.id);

      if (existingCapture) {
        const playerName =
          run.mode === "soul-link"
            ? run.players.find((p) => p.id === selectedPlayerId)?.name
            : null;

        setErrorMessage(
          run.mode === "soul-link"
            ? `${playerName ?? "Ce joueur"} a déjà une capture sur ${selectedRoute.name}.`
            : `Une capture existe déjà sur ${selectedRoute.name}.`
        );
        return;
      }
    }

    if (run.rules.duplicateSpeciesClause) {
      const duplicate = captures.find((c) => c.pokemonId === selectedPokemonId);
      if (duplicate) {
        const pokemon = pokemonById.get(selectedPokemonId);
        setErrorMessage(
          `${pokemon?.name ?? "Ce Pokémon"} a déjà été capturé dans cette run.`
        );
        return;
      }
    }

    const error = onAddCapture({
      runId: run.id,
      pokemonId: selectedPokemonId,
      nickname: trimmedNickname,
      playerId: selectedPlayerId,
      routeId: selectedRoute.id,
      routeName: selectedRoute.name,
      lifeStatus,
      storageStatus,
      soulLinkId: null,
      ability: canUseAbilities ? selectedAbility || null : null,
      nature: canUseNatures ? selectedNature || null : null,
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    resetForm();
  }

  const isFormValid =
    selectedPokemonId !== 0 &&
    selectedRouteId !== "" &&
    (!run.rules.nicknameRequired || nickname.trim() !== "") &&
    (!canUseAbilities || availableAbilities.length === 0 || selectedAbility !== "") &&
    (!canUseNatures || selectedNature !== "");

  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold">Ajouter une capture</h2>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        {errorMessage && (
          <p className="md:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 animate-fade-in">
            {errorMessage}
          </p>
        )}
        {/* Recherche Pokémon */}
        <div className="md:col-span-2">
          <label htmlFor="pokemonSearch" className="mb-2 block text-sm font-medium">
            Pokémon capturé
          </label>

          <div className="flex gap-3 items-center">
            <input
              id="pokemonSearch"
              type="text"
              value={pokemonSearch}
              onChange={(e) => setPokemonSearch(e.target.value)}
              placeholder="Rechercher par nom…"
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />

            <div className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm shrink-0">
              {selectedPokemon ? (
                <>
                  <img
                    src={selectedPokemon.spriteUrl}
                    alt={selectedPokemon.name}
                    className="h-8 w-8 object-contain [image-rendering:pixelated]"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-white">{selectedPokemon.name}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedPokemon.types.map((type) => (
                        <span
                          key={type}
                          className="rounded bg-zinc-700 px-2 py-0.5 text-xs text-white"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-zinc-400">Aucun</span>
              )}
            </div>
          </div>

          {pokemonSearch.trim() !== "" && (
            <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950">
              {filteredPokemons.length === 0 ? (
                <p className="px-4 py-3 text-sm text-zinc-400">Aucun Pokémon trouvé.</p>
              ) : (
                filteredPokemons.map((pokemon) => (
                  <button
                    key={pokemon.id}
                    type="button"
                    onClick={() => {
                      setSelectedPokemonId(pokemon.id);
                      setPokemonSearch("");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-zinc-900"
                  >
                    <img
                      src={pokemon.spriteUrl}
                      alt={pokemon.name}
                      className="h-8 w-8 object-contain [image-rendering:pixelated]"
                    />
                    <span className="text-zinc-300">
                      #{String(pokemon.dexNumber).padStart(3, "0")} — {pokemon.name}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Surnom */}
        <div>
          <label htmlFor="nickname" className="mb-2 block text-sm font-medium">
            Surnom{run.rules.nicknameRequired ? " *" : ""}
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Ex : Sparky"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
          />
        </div>

        {/* Joueur */}
        <div>
          <label htmlFor="playerId" className="mb-2 block text-sm font-medium">
            Joueur
          </label>
          <select
            id="playerId"
            value={selectedPlayerId}
            onChange={(e) => setSelectedPlayerId(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
          >
            {run.players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        {/* Zone */}
        <div>
          <label htmlFor="routeId" className="mb-2 block text-sm font-medium">
            Zone de capture
          </label>
          <select
            id="routeId"
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
          >
            {availableRoutes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>

        {/* Talent */}
        {canUseAbilities && (
          <div>
            <label htmlFor="ability" className="mb-2 block text-sm font-medium">
              Talent
            </label>
            <select
              id="ability"
              value={selectedAbility}
              onChange={(e) => setSelectedAbility(e.target.value)}
              disabled={availableAbilities.length === 0}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {availableAbilities.length === 0 ? (
                <option value="">Aucun talent renseigné</option>
              ) : (
                <>
                  {availableAbilities.length > 1 && (
                    <option value="">Sélectionner un talent</option>
                  )}
                  {availableAbilities.map((ability) => (
                    <option key={ability} value={ability}>
                      {ability}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        )}

        {/* Nature */}
        {canUseNatures && (
          <div>
            <label htmlFor="nature" className="mb-2 block text-sm font-medium">
              Nature
            </label>
            <select
              id="nature"
              value={selectedNature}
              onChange={(e) => setSelectedNature(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="">Sélectionner une nature</option>
              {NATURES.map((nature) => (
                <option key={nature.name} value={nature.name}>
                  {nature.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Statut */}
        <div>
          <label htmlFor="lifeStatus" className="mb-2 block text-sm font-medium">
            Statut initial
          </label>
          <select
            id="lifeStatus"
            value={lifeStatus}
            onChange={(e) => setLifeStatus(e.target.value as LifeStatus)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
          >
            <option value="alive">Vivant</option>
            <option value="dead">Mort</option>
            <option value="unusable">Inutilisable</option>
          </select>
        </div>

        {/* Emplacement */}
        <div>
          <label htmlFor="storageStatus" className="mb-2 block text-sm font-medium">
            Emplacement
          </label>
          <select
            id="storageStatus"
            value={storageStatus}
            onChange={(e) => setStorageStatus(e.target.value as StorageStatus)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
          >
            <option value="team">Équipe</option>
            <option value="box">Boîte</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`rounded-lg px-6 py-3 font-medium text-white transition ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-zinc-700 text-zinc-300"
            }`}
          >
            Ajouter la capture
          </button>
        </div>
      </form>
    </section>
  );
}
