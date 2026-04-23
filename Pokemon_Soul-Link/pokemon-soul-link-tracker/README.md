# 🎮 PokéChallenge Tracker

![Version](https://img.shields.io/badge/version-3.0-blue)
![Statut](https://img.shields.io/badge/statut-stable-green)
![Licence](https://img.shields.io/badge/licence-MIT-green)

Une plateforme web combinant un site informatif et un tracker interactif dédié aux challenges Pokémon tels que le Nuzlocke et le Soul Link.

---

## 📖 Description

**PokéChallenge Tracker** est un outil conçu pour les joueurs souhaitant suivre leurs aventures Pokémon tout en accédant à des ressources complètes sur les mécaniques des challenges.

Le site permet :

- de suivre une run Pokémon complète (captures, équipe, morts) ;
- de gérer des Soul Links entre joueurs ;
- d’explorer un Pokédex multi-générations ;
- de personnaliser les règles de jeu ;
- d’importer et exporter ses runs.

---

## ✨ Fonctionnalités

### 📊 Tracker interactif

- Création et gestion de runs
- Mode **Nuzlocke** et **Soul Link**
- Suivi des captures par zone
- Gestion des statuts :
  - Vivant
  - Mort
  - Inutilisable
  - Boîte / Équipe
- Liaison automatique et manuelle des Pokémon en Soul Link
- Règles personnalisables
- Export / Import des runs en JSON

---

### 📚 Pokédex

- Support des générations :
  - Génération 1
  - Génération 2
  - Génération 3
- Filtres avancés :
  - Type
  - Génération
  - Recherche par nom
- Fiches détaillées :
  - Types
  - Talents (selon le jeu)
  - Statistiques de base
  - Évolutions
  - Taux de capture
- Affichage des faiblesses
- Sprites animés (.gif)

---

### 🎨 Interface

- UI moderne avec Tailwind CSS
- Home page avec sélection des jeux
- Panels d’équipe dynamiques
- Cartes Pokémon optimisées
- Expérience fluide en local (offline-first)

---

## 🚀 Roadmap

### 🟢 Version 1.0 – MVP (terminée)

- [x] Tracker local
- [x] Mode Nuzlocke
- [x] Mode Soul Link
- [x] Pokédex Génération 1
- [x] Sauvegarde LocalStorage

---

### 🟡 Version 2.0 (terminée)

- [x] Règles personnalisables
- [x] Gestion des routes
- [x] Automatisation du Soul Link
- [x] Ajout de la Génération 2

---

### 🔵 Version 3.0 – Expérience complète offline (actuelle)

- [x] Pokédex multi-générations (1 → 3)
- [x] Fiches Pokémon détaillées
- [x] Gestion dynamique des talents selon le jeu
- [x] Sprites animés (.gif)
- [x] Tracker complet et optimisé
- [x] Import / Export JSON
- [x] UI améliorée (Home, panels, cartes)
- [x] Expérience utilisateur fluide et cohérente

---

### 🟣 Version 4.0 – Online & comptes (à venir)

- [ ] Comptes utilisateurs
- [ ] Sauvegarde en ligne (Supabase)
- [ ] Synchronisation multi-appareils
- [ ] Partage de runs

---

### 🔴 Version 5.0 – Expérience avancée (future)

- [ ] Multijoueur en temps réel
- [ ] Intégration Twitch / Discord
- [ ] Mode Randomizer complet
- [ ] Variantes avancées (shiny, formes, etc.)

---

## 🛠️ Technologies

| Domaine | Technologie |
|--------|-------------|
| Frontend | Next.js (App Router, React) |
| Styling | Tailwind CSS |
| Stockage | LocalStorage |
| Backend (prévu) | Supabase |
| Base de données (prévue) | PostgreSQL |
| Données Pokémon | Données locales (inspirées PokéAPI) |
| Hébergement | Vercel |
| Versioning | GitHub |

---

## 📂 Structure du projet

```bash
pokechallenge-tracker/
├── public/
│   └── sprites/
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── domain/
│   ├── types/
│   └── utils/
├── README.md
└── package.json

⚙️ Installation

# Cloner le dépôt
git clone https://github.com/Gwendal-B/Portfolio/pokechallenge-tracker.git

# Accéder au projet
cd pokechallenge-tracker

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

📸 Aperçu (à venir)

Des captures d’écran et maquettes seront ajoutées prochainement.

## 📚 Documentation

- 📘 Cahier des charges : `Docs/Cahier des charges.md`
- 🗺️ V1 du projet : `Docs/V1 du projet.md`
- 📖 Lexique officiel : `Docs/Lexique.md`

🤝 Contribution

Les contributions sont les bienvenues !

    Fork le projet
    Crée une branche (feature/ma-fonctionnalite)
    Commit tes modifications
    Push la branche
    Ouvre une Pull Request

📜 Licence

Ce projet est distribué sous licence MIT.

⚠️ Mentions légales

Ce projet est un fan project non officiel.
Pokémon et tous les noms associés sont la propriété de © Nintendo, Game Freak et The Pokémon Company.

👤 Auteur

Développé par Gwendal Boisard - [https://github.com/Gwendal-B]
