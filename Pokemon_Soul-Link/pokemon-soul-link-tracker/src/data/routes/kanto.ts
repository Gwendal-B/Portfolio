import type { GameRoute } from "../../types/route";
import type { GameGroup } from "../../types/run";

/**
 * Jeux disponibles dans la région de Kanto (Gen 1)
 */
const kantoGames: GameGroup[] = [
  "Pokemon Rouge / Bleu / Jaune",
];

/**
 * Routes numérotées de Kanto (Routes 1 à 25)
 */
const numberedKantoRoutes: GameRoute[] = Array.from(
  { length: 25 },
  (_, index): GameRoute => ({
    id: `route-${index + 1}`,
    name: `Route ${index + 1}`,
    region: "Kanto",
    category: "route",
    availableIn: kantoGames,
  })
);

/**
 * Liste complète des lieux de Kanto
 */
export const kantoRoutes: GameRoute[] = [
  // 🌆 Villes et Bourgs
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
  {
    id: "plateau-indigo",
    name: "Plateau Indigo",
    region: "Kanto",
    category: "special",
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

  // 🕳️ Grottes et Montagnes
  {
    id: "mont-selenite",
    name: "Mont Sélénite",
    region: "Kanto",
    category: "cave",
    availableIn: kantoGames,
  },
  {
    id: "grotte",
    name: "Grotte",
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

  // 🏢 Bâtiments et lieux spéciaux
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
    id: "silph-sarl",
    name: "Sylphe SARL",
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