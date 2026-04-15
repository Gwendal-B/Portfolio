import type { GameRoute } from "../../types/route";
import type { GameGroup } from "../../types/run";

const johtoGames: GameGroup[] = [
  "Pokemon Or / Argent / Cristal",
];

const numberedJohtoRoutes: GameRoute[] = Array.from(
  { length: 46 },
  (_, index): GameRoute => ({
    id: `johto-route-${index + 1}`,
    name: `Route ${index + 1}`,
    region: "Johto",
    category: "route",
    availableIn: johtoGames,
  })
);

export const johtoRoutes: GameRoute[] = [
  {
    id: "bourg-geon",
    name: "Bourg Geon",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "ville-griotte",
    name: "Ville Griotte",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "mauville-johto",
    name: "Mauville",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "ecorcea",
    name: "Écorcia",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "doublonville",
    name: "Doublonville",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "rosalia",
    name: "Rosalia",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "oliville",
    name: "Oliville",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "irisia",
    name: "Irisia",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "acajou",
    name: "Acajou",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },
  {
    id: "ebenelle",
    name: "Ébenelle",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },

  ...numberedJohtoRoutes,

  {
    id: "bois-aux-chenes",
    name: "Bois aux Chênes",
    region: "Johto",
    category: "forest",
    availableIn: johtoGames,
  },
  {
    id: "tour-chétiflor",
    name: "Tour Chétiflor",
    region: "Johto",
    category: "building",
    availableIn: johtoGames,
  },
  {
    id: "puits-ramoloss",
    name: "Puits Ramoloss",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
  {
    id: "ruines-alpha",
    name: "Ruines d'Alpha",
    region: "Johto",
    category: "special",
    availableIn: johtoGames,
  },
  {
    id: "parc-national",
    name: "Parc National",
    region: "Johto",
    category: "special",
    availableIn: johtoGames,
  },
  {
    id: "tour-cendree",
    name: "Tour Cendrée",
    region: "Johto",
    category: "building",
    availableIn: johtoGames,
  },
  {
    id: "tour-carillon",
    name: "Tour Carillon",
    region: "Johto",
    category: "building",
    availableIn: johtoGames,
  },
  {
    id: "phare-oliville",
    name: "Phare d'Oliville",
    region: "Johto",
    category: "building",
    availableIn: johtoGames,
  },
  {
    id: "ilebulle",
    name: "Tourb'Îles",
    region: "Johto",
    category: "sea",
    availableIn: johtoGames,
  },
  {
    id: "antre-noire",
    name: "Antre Noire",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
  {
    id: "route-victoire-johto",
    name: "Route Victoire",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
];