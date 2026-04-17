import type { GameRoute } from "../types/route";
import type { GameGroup } from "../types/run";
import { kantoRoutes } from "../data/routes/kanto";
import { johtoRoutes } from "../data/routes/johto";
import { hoennRoutes } from "../data/routes/hoenn";

export const ALL_ROUTES: GameRoute[] = [
  ...kantoRoutes,
  ...johtoRoutes,
  ...hoennRoutes,
];

export function getRoutesForGameGroup(gameGroup: GameGroup): GameRoute[] {
  return ALL_ROUTES.filter((route) => route.availableIn.includes(gameGroup));
}