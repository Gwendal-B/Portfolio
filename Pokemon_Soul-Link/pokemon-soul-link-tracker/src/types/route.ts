import type { Gen1Game } from "./run";

export type Region =
  | "Kanto"
  | "Johto"
  | "Hoenn"
  | "Sinnoh"
  | "Unova"
  | "Kalos"
  | "Alola"
  | "Galar"
  | "Paldea";

export type RouteCategory =
  | "route"
  | "city"
  | "cave"
  | "forest"
  | "sea"
  | "building"
  | "special";

export interface GameRoute {
  id: string;
  name: string;
  region: Region;
  category: RouteCategory;
  availableIn: Gen1Game[];
}