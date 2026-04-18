import type { GameRoute } from "../../types/route";
import type { GameGroup } from "../../types/run";

const kantoGames: GameGroup[] = [
  "Pokemon Rouge / Bleu / Jaune",
  "Pokemon Or / Argent / Cristal",
  "Pokemon Rouge Feu / Vert Feuille"
];

const numberedKantoRoutes: GameRoute[] = Array.from(
  { length: 25 },
  (_, index): GameRoute => ({
    id: `kanto-route-${index + 1}`,
    name: `Route ${index + 1}`,
    region: "Kanto",
    category: "route",
    availableIn: kantoGames,
  })
);

export const kantoRoutes: GameRoute[] = [
  // 🌆 Villes et bourgs
  // On les garde si une obtention y est possible
  {
    id: "bourg-palette",
    name: "Bourg Palette",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "jadielle",
    name: "Jadielle",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "argenta",
    name: "Argenta",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "azuria",
    name: "Azuria",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "carmin-sur-mer",
    name: "Carmin-sur-Mer",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "celadopole",
    name: "Céladopole",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "lavanville",
    name: "Lavanville",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "safrania",
    name: "Safrania",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "parmanie",
    name: "Parmanie",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },
  {
    id: "cramoisile",
    name: "Cramois'Île",
    region: "Kanto",
    category: "city",
    availableIn: kantoGames,
  },

  // 🛣️ Routes principales
  ...numberedKantoRoutes,

  // 🌲 Forêts
  {
    id: "foret-de-jade",
    name: "Forêt de Jade",
    region: "Kanto",
    category: "forest",
    availableIn: kantoGames,
  },

  // 🕳️ Grottes et zones souterraines
  {
    id: "mont-selenite",
    name: "Mont Sélénite",
    region: "Kanto",
    category: "cave",
    availableIn: kantoGames,
  },
  {
    id: "tunnel-roche",
    name: "Tunnel Roche",
    region: "Kanto",
    category: "cave",
    availableIn: kantoGames,
  },
  {
    id: "cave-taupiqueur",
    name: "Cave Taupiqueur",
    region: "Kanto",
    category: "cave",
    availableIn: kantoGames,
  },
  {
    id: "caverne-azuree",
    name: "Caverne Azurée",
    region: "Kanto",
    category: "cave",
    availableIn: kantoGames,
  },
  {
    id: "route-victoire",
    name: "Route Victoire",
    region: "Kanto",
    category: "cave",
    availableIn: kantoGames,
  },

  // 🌊 Zones maritimes
  {
    id: "iles-ecume",
    name: "Îles Écume",
    region: "Kanto",
    category: "sea",
    availableIn: kantoGames,
  },

  // 🏢 Bâtiments et lieux spéciaux avec obtention possible
  {
    id: "centrale",
    name: "Centrale",
    region: "Kanto",
    category: "building",
    availableIn: kantoGames,
  },
  {
    id: "manoir-pokemon",
    name: "Manoir Pokémon",
    region: "Kanto",
    category: "building",
    availableIn: kantoGames,
  },
  {
    id: "tour-pokemon",
    name: "Tour Pokémon",
    region: "Kanto",
    category: "building",
    availableIn: kantoGames,
  },
  {
    id: "zone-safari",
    name: "Zone Safari",
    region: "Kanto",
    category: "special",
    availableIn: kantoGames,
  },
];