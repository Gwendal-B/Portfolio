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