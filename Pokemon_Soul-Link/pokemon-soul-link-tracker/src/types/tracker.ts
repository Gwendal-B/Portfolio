import type { Run } from "./run";
import type { SoulLink } from "./soul-link";

export type LifeStatus = "alive" | "dead" | "unusable";

export type StorageStatus = "team" | "box";

export interface CapturedPokemon {
  id: string;
  runId: string;
  pokemonId: number;
  nickname: string;
  playerId: string;
  routeId: string;
  routeName: string;
  lifeStatus: LifeStatus;
  storageStatus: StorageStatus;
  soulLinkId: string | null;
  createdAt: string;
  updatedAt: string;
  ability: string | null;
  nature: string | null;
}

export interface TrackerState {
  runs: Run[];
  captures: CapturedPokemon[];
  soulLinks: SoulLink[];
}