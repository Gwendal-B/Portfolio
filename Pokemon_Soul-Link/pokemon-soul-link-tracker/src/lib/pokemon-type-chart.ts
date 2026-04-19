const TYPE_EFFECTIVENESS: Record<string, Partial<Record<string, number>>> = {
  Normal: { Roche: 0.5, Spectre: 0, Acier: 0.5 },
  Feu: {
    Feu: 0.5,
    Eau: 0.5,
    Plante: 2,
    Glace: 2,
    Insecte: 2,
    Roche: 0.5,
    Dragon: 0.5,
    Acier: 2,
  },
  Eau: {
    Feu: 2,
    Eau: 0.5,
    Plante: 0.5,
    Sol: 2,
    Roche: 2,
    Dragon: 0.5,
  },
  Plante: {
    Feu: 0.5,
    Eau: 2,
    Plante: 0.5,
    Poison: 0.5,
    Sol: 2,
    Vol: 0.5,
    Insecte: 0.5,
    Roche: 2,
    Dragon: 0.5,
    Acier: 0.5,
  },
  Électrik: {
    Eau: 2,
    Plante: 0.5,
    Électrik: 0.5,
    Sol: 0,
    Vol: 2,
    Dragon: 0.5,
  },
  Glace: {
    Feu: 0.5,
    Eau: 0.5,
    Plante: 2,
    Glace: 0.5,
    Sol: 2,
    Vol: 2,
    Dragon: 2,
    Acier: 0.5,
  },
  Combat: {
    Normal: 2,
    Glace: 2,
    Poison: 0.5,
    Vol: 0.5,
    Psy: 0.5,
    Insecte: 0.5,
    Roche: 2,
    Spectre: 0,
    Ténèbres: 2,
    Acier: 2,
  },
  Poison: {
    Plante: 2,
    Poison: 0.5,
    Sol: 0.5,
    Roche: 0.5,
    Spectre: 0.5,
    Acier: 0,
  },
  Sol: {
    Feu: 2,
    Électrik: 2,
    Plante: 0.5,
    Poison: 2,
    Vol: 0,
    Insecte: 0.5,
    Roche: 2,
    Acier: 2,
  },
  Vol: {
    Électrik: 0.5,
    Plante: 2,
    Combat: 2,
    Insecte: 2,
    Roche: 0.5,
    Acier: 0.5,
  },
  Psy: {
    Combat: 2,
    Poison: 2,
    Psy: 0.5,
    Ténèbres: 0,
    Acier: 0.5,
  },
  Insecte: {
    Feu: 0.5,
    Plante: 2,
    Combat: 0.5,
    Poison: 0.5,
    Vol: 0.5,
    Psy: 2,
    Spectre: 0.5,
    Ténèbres: 2,
    Acier: 0.5,
  },
  Roche: {
    Feu: 2,
    Glace: 2,
    Combat: 0.5,
    Sol: 0.5,
    Vol: 2,
    Insecte: 2,
    Acier: 0.5,
  },
  Spectre: {
    Normal: 0,
    Psy: 2,
    Spectre: 2,
    Ténèbres: 0.5,
  },
  Dragon: {
    Dragon: 2,
    Acier: 0.5,
  },
  Ténèbres: {
    Combat: 0.5,
    Psy: 2,
    Spectre: 2,
    Ténèbres: 0.5,
    Acier: 0.5,
  },
  Acier: {
    Feu: 0.5,
    Eau: 0.5,
    Électrik: 0.5,
    Glace: 2,
    Roche: 2,
    Acier: 0.5,
  },
};

const ALL_TYPES = [
  "Normal",
  "Feu",
  "Eau",
  "Plante",
  "Électrik",
  "Glace",
  "Combat",
  "Poison",
  "Sol",
  "Vol",
  "Psy",
  "Insecte",
  "Roche",
  "Spectre",
  "Dragon",
  "Ténèbres",
  "Acier",
] as const;

export function getPokemonWeaknesses(defenderTypes: string[]): string[] {
  return ALL_TYPES.filter((attackingType) => {
    const multiplier = defenderTypes.reduce((total, defenderType) => {
      const effectiveness =
        TYPE_EFFECTIVENESS[attackingType]?.[defenderType] ?? 1;
      return total * effectiveness;
    }, 1);

    return multiplier > 1;
  });
}

export function getPokemonBaseStatTotal(stats: {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  special?: number;
  specialAttack?: number;
  specialDefense?: number;
}): number {
  return (
    stats.hp +
    stats.attack +
    stats.defense +
    stats.speed +
    (stats.special ?? 0) +
    (stats.specialAttack ?? 0) +
    (stats.specialDefense ?? 0)
  );
}