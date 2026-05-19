# Portfolio

Bienvenue sur mon portfolio de projets. Ce dépôt regroupe mes réalisations personnelles, avec pour objectif de documenter les idées, les choix techniques et l'état d'avancement de chaque projet.

## Projet principal

### PokéChallenge Tracker

**PokéChallenge Tracker** est une application web dédiée au suivi de challenges Pokémon comme le Nuzlocke et le Soul Link.

L'application permet de :

- créer et gérer des runs Pokémon ;
- suivre les captures, les équipes, les morts et les Pokémon en boîte ;
- gérer des liens Soul Link entre deux joueurs ;
- consulter un Pokédex multi-générations ;
- personnaliser les règles d'une run ;
- importer et exporter ses données au format JSON.

Le projet est pensé comme une expérience offline-first : les données sont stockées localement dans le navigateur via `LocalStorage`.

## Technologies

Le projet principal utilise :

- **Next.js** avec l'App Router ;
- **React** ;
- **TypeScript** ;
- **Tailwind CSS** ;
- **LocalStorage** pour la persistance locale ;
- données Pokémon locales inspirées de PokéAPI.

## Structure du dépôt

```bash
Portfolio/
├── README.md
└── Pokemon_Soul-Link/
    ├── README.md
    └── pokemon-soul-link-tracker/
        ├── Docs/
        ├── public/
        ├── src/
        ├── package.json
        └── README.md
```

## Lancer le projet

Depuis la racine du dépôt :

```bash
cd Pokemon_Soul-Link/pokemon-soul-link-tracker
npm install
npm run dev
```

L'application sera ensuite disponible sur l'adresse indiquée par Next.js, généralement :

```bash
http://localhost:3000
```

## Scripts disponibles

Dans `Pokemon_Soul-Link/pokemon-soul-link-tracker` :

```bash
npm run dev      # lance le serveur de développement
npm run build    # génère la version de production
npm run start    # lance la version de production
npm run lint     # analyse le code avec ESLint
```

## Documentation

La documentation du projet PokéChallenge Tracker est disponible dans :

- `Pokemon_Soul-Link/pokemon-soul-link-tracker/Docs/Cahier des charges.md`
- `Pokemon_Soul-Link/pokemon-soul-link-tracker/Docs/V1 du projet.md`
- `Pokemon_Soul-Link/pokemon-soul-link-tracker/Docs/Lexique.md`

## Statut

Le dépôt contient actuellement le projet **PokéChallenge Tracker**, en développement actif.

Les évolutions envisagées incluent notamment :

- sauvegarde en ligne ;
- comptes utilisateurs ;
- synchronisation multi-appareils ;
- partage de runs ;
- fonctionnalités multijoueur avancées.

## Auteur

Développé par **Gwendal Boisard**.

GitHub : [Gwendal-B](https://github.com/Gwendal-B)

## Mention légale

PokéChallenge Tracker est un fan project non officiel.

Pokémon, les noms associés, les sprites et les licences liées appartiennent à Nintendo, Game Freak et The Pokémon Company.
