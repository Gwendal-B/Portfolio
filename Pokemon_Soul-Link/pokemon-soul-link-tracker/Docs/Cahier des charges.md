📘 Cahier des Charges – Plateforme Pokémon Challenge Tracker

1. Présentation du projet
1.1 Nom du projet

PokéChallenge Tracker (nom provisoire)

1.2 Objectif

Créer un site web combinant :

    une plateforme informative sur les règles et mécaniques des challenges Pokémon (Nuzlocke, Soul Link, Randomizer, etc.) ;
    un tracker interactif permettant aux utilisateurs de suivre et gérer leurs runs.

1.3 Public cible

    Joueurs de Pokémon
    Streamers et créateurs de contenu
    Fans de challenges Pokémon
    Communautés compétitives et casual

1.4 Objectifs principaux
    Centraliser les informations sur les challenges Pokémon.
    Fournir un outil intuitif de suivi de progression.
    Offrir une expérience évolutive et personnalisable.
    Permettre une utilisation locale puis multijoueur à terme.

2. Périmètre du projet

2.1 Fonctionnalités principales

    Fonctionnalité          Description
    Site informatif         Règles et explications des challenges
    Pokédex                 Informations détaillées par génération
    Tracker interactif      Suivi des runs en temps réel
    Soul Link               Association de Pokémon entre joueurs
    Personnalisation        Règles modifiables
    Sélection de génération Support progressif des jeux
    Sauvegarde locale       Stockage dans le navigateur

2.2 Générations supportées
    Version initiale (V1) : Génération 1
    Évolutions futures : Générations 2 à 9

3. Fonctionnalités détaillées

3.1 Partie informative

3.1.1 Guides des challenges

    Nuzlocke
    Soul Link
    Randomizer
    Hardcore Nuzlocke
    Variantes populaires

3.1.2 Contenu des guides

    Définitions
    Règles de base
    Variantes
    Conseils stratégiques
    Exemples concrets

3.1.3 Générations

    Présentation des mécaniques propres à chaque génération.

3.2 Pokédex

3.2.1 Informations par Pokémon

    Nom
    Numéro du Pokédex
    Types
    Statistiques de base
    Talents
    Taux de capture
    Évolutions
    Sprites officiels

3.2.2 Filtres

    Type
    Génération
    Statistiques
    Légendaires
    Taux de capture

3.3 Tracker interactif

3.3.1 Création d’une run

    Nom de la run
    Choix du jeu
    Choix de la génération
    Sélection du mode de jeu
    Nombre de joueurs

3.3.2 Modes disponibles

    Nuzlocke
    Soul Link
    Randomizer
    Combinaisons (ex : Soul Link Randomizer)

3.3.3 Gestion des Pokémon

    Ajout d’un Pokémon
    Attribution à un joueur
    Indication de la zone de capture
    Modification du statut :
        Vivant
        Mort
        Dans l’équipe
        Dans la boîte
        Inutilisable

3.3.4 Gestion des routes

    Suivi des captures par zone
    Empêchement des captures multiples (optionnel)

3.3.5 Soul Link

    Liaison de Pokémon entre joueurs
    Synchronisation des statuts
    KO partagé automatique

3.3.6 Journal de la run

    Historique des événements
    Résumé de progression

4. Personnalisation des règles

4.1 Règles disponibles

    Dupes Clause
    Shiny Clause
    Level Cap
    Set Mode
    Interdiction d’objets
    Mort permanente
    KO partagé en Soul Link

4.2 Presets

    Nuzlocke Classique
    Hardcore Nuzlocke
    Soul Link
    Soul Link Randomizer

5. Arborescence du site

Accueil
│
├── Guides
│   ├── Nuzlocke
│   ├── Soul Link
│   ├── Randomizer
│
├── Générations
│   └── Génération 1
│
├── Pokédex
│   ├── Liste des Pokémon
│   └── Fiche Pokémon
│
├── Tracker
│   ├── Nouvelle Run
│   ├── Mes Runs
│   └── Détails d'une Run
│
├── Règles
└── À propos

6. Modélisation des données

6.1 Modèle Pokémon

{
  "id": 25,
  "name": "Pikachu",
  "generation": 1,
  "types": ["Electrik"],
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "special": 50,
    "speed": 90
  },
  "capture_rate": 190,
  "abilities": ["Statik"],
  "sprite": "url_image"
}

6.2 Modèle Run

{
  "id": "run_001",
  "name": "Soul Link Kanto",
  "generation": 1,
  "game": "Pokémon Rouge",
  "mode": ["Nuzlocke", "Soul Link"],
  "players": ["Joueur 1", "Joueur 2"],
  "rules": {
    "dupes_clause": true,
    "shiny_clause": true,
    "level_cap": false
  }
}

6.3 Modèle Pokémon capturé

{
  "id": "pkm_001",
  "species": "Pikachu",
  "nickname": "Sparky",
  "player": "Joueur 1",
  "route": "Route 2",
  "status": "alive",
  "is_in_team": true,
  "soul_link_id": "link_001"
}

6.4 Modèle Soul Link

{
  "id": "link_001",
  "pokemon_1": "pkm_001",
  "pokemon_2": "pkm_002",
  "status": "active"
}

7. Spécifications techniques

7.1 Technologies recommandées

    Domaine         Technologie
    Frontend        Next.js (React)
    Style           Tailwind CSS
    Backend         Supabase ou Node.js
    Base de données PostgreSQL
    Données Pokémon PokéAPI
    Hébergement     Vercel
    Versioning      GitHub

7.2 Stockage

    V1 : LocalStorage
    V2 : Base de données en ligne

8. Design et UX

8.1 Objectifs

    Interface intuitive
    Navigation claire
    Compatible mobile et desktop
    Design inspiré de l’univers Pokémon

8.2 Couleurs suggérées

    Rouge Pokémon : #EF5350
    Bleu Pokémon : #42A5F5
    Jaune Pikachu : #FFCA28
    Gris clair : #F5F5F5

9. Plan de développement

Phase 1 – MVP
    Site informatif
    Pokédex 1G
    Tracker local
    Soul Link manuel

Phase 2 – Améliorations
    Règles personnalisables
    Routes et rencontres
    Automatisation des règles

Phase 3 – Extension
    Générations 2 et 3
    Comptes utilisateurs
    Sauvegarde en ligne

Phase 4 – Multijoueur
    Synchronisation en temps réel
    Partage de runs
    Collaboration en ligne

10. Planning prévisionnel

    Phase	                Durée estimée
    Conception	            1 semaine
    Design	                1 semaine
    Développement MVP	    3 à 5 semaines
    Tests et corrections	1 semaine
    Mise en ligne	        1 semaine

11. Livrables attendus

    Cahier des charges
    Maquettes UI/UX
    Code source
    Base de données
    Documentation technique
    Version déployée du site

12. Évolutions futures

    Support jusqu’à la 9G
    Mode Randomizer avancé
    Calculateur de probabilités de capture
    Import de sauvegardes
    Application mobile
    Mode sombre
    Intégration Twitch et Discord

13. Conclusion

Ce projet vise à devenir la référence francophone des trackers de challenges Pokémon, combinant :

    une base de connaissances complète,
    un outil interactif performant,
    une plateforme évolutive adaptée à la communauté.
