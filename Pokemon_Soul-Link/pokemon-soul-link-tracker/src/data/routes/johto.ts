import type { GameRoute } from "../../types/route";
import type { GameGroup } from "../../types/run";

const johtoGames: GameGroup[] = [
  "Pokemon Or / Argent / Cristal",
];

const numberedJohtoRoutes: GameRoute[] = Array.from(
  { length: 18 },
  (_, index): GameRoute => ({
    id: `johto-route-${index + 29}`,
    name: `Route ${index + 29}`,
    region: "Johto",
    category: "route",
    availableIn: johtoGames,
  })
);

export const johtoRoutes: GameRoute[] = [
  // 🌆 Villes et bourgs
  // On les garde si une obtention y est possible
  {
    id: "bourg-geon",
    name: "Bourg-Geon",
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
    id: "ecorcekia",
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
    name: "Ébènelle",
    region: "Johto",
    category: "city",
    availableIn: johtoGames,
  },

  // 🛣️ Routes Johto
  ...numberedJohtoRoutes,

  // 🌲 Forêts / parcs
  {
    id: "bois-aux-chenes",
    name: "Bois aux Chênes",
    region: "Johto",
    category: "forest",
    availableIn: johtoGames,
  },
  {
    id: "parc-national",
    name: "Parc National",
    region: "Johto",
    category: "forest",
    availableIn: johtoGames,
  },

  // 🕳️ Grottes et zones souterraines
  {
    id: "antre-noire",
    name: "Antre Noire",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
  {
    id: "ruines-alpha",
    name: "Ruines d'Alpha",
    region: "Johto",
    category: "cave",
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
    id: "grotte-union",
    name: "Grotte Union",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
  {
    id: "tour-cendre",
    name: "Tour Cendrée",
    region: "Johto",
    category: "building",
    availableIn: johtoGames,
  },
  {
    id: "mont-creuset",
    name: "Mont Creuset",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
  {
    id: "tourb-iles",
    name: "Tourb'Îles",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
  {
    id: "chemin-glace",
    name: "Chemin Glace",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },
  {
    id: "taniere-dragon",
    name: "Antre du Dragon",
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
  {
    id: "mont-argent",
    name: "Mont Argent",
    region: "Johto",
    category: "cave",
    availableIn: johtoGames,
  },

  // 🏢 Tours et lieux spéciaux avec obtention possible
  {
    id: "tour-chetiflor",
    name: "Tour Chétiflor",
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
];