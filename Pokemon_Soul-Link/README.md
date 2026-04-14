
# 🎮 PokéChallenge Tracker

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Statut](https://img.shields.io/badge/statut-en%20développement-orange)
![Licence](https://img.shields.io/badge/licence-MIT-green)

Une plateforme web combinant un site informatif et un tracker interactif dédié aux challenges Pokémon tels que le Nuzlocke, le Soul Link et le Randomizer.

---

## 📖 Description

**PokéChallenge Tracker** est un outil conçu pour les joueurs souhaitant suivre leurs aventures Pokémon tout en accédant à des ressources complètes sur les règles et mécaniques des challenges.

Le site permet :

- d’explorer les règles des différents challenges ;
- d’accéder à un Pokédex détaillé ;
- de suivre une run grâce à un tracker interactif ;
- de gérer des Soul Links entre joueurs.

---

## ✨ Fonctionnalités

### 📚 Partie informative

- Guides sur les challenges :

  - Nuzlocke
  - Soul Link
  - Randomizer
- Explication des règles et variantes
- Support progressif des générations

### 📊 Pokédex

- Statistiques des Pokémon
- Types et talents
- Taux de capture
- Évolutions
- Filtres avancés

### 🧭 Tracker interactif

- Création et gestion de runs
- Suivi des captures par zone
- Gestion des statuts (vivant, mort, boîte, équipe)
- Liaison des Pokémon en Soul Link
- Journal de progression

### ⚙️ Personnalisation

- Règles personnalisables
- Presets de challenges
- Sélection de la génération

---

## 🚀 Roadmap

### 🟢 Version 1.0 – MVP

- [ ] Site informatif
- [ ] Support de la Génération 1
- [ ] Pokédex 1G
- [ ] Tracker local
- [ ] Mode Nuzlocke
- [ ] Mode Soul Link
- [ ] Sauvegarde via LocalStorage

### 🟡 Version 2.0

- [ ] Règles personnalisables
- [ ] Gestion des routes
- [ ] Automatisation du Soul Link
- [ ] Ajout de la Génération 2

### 🔵 Version 3.0

- [ ] Comptes utilisateurs
- [ ] Sauvegarde en ligne
- [ ] Ajout des Générations 3 et 4

### 🟣 Version 4.0

- [ ] Multijoueur en temps réel
- [ ] Partage de runs
- [ ] Intégration Twitch et Discord

---

## 🛠️ Technologies

| Domaine | Technologie |
|---------|-------------|
| Frontend | Next.js (React) |
| Styling | Tailwind CSS |
| Backend | Supabase / Node.js |
| Base de données | PostgreSQL |
| Données Pokémon | PokéAPI |
| Hébergement | Vercel |
| Versioning | GitHub |

---

## 📂 Structure du projet

```bash
pokechallenge-tracker/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── types/
│   └── utils/
├── README.md
└── package.json

⚙️ Installation

# Cloner le dépôt
git clone https://github.com/ton-utilisateur/pokechallenge-tracker.git

# Accéder au projet
cd pokechallenge-tracker

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

📸 Aperçu (à venir)

Des captures d’écran et maquettes seront ajoutées prochainement.

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
