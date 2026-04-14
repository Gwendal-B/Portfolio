V1 du projet

But de la V1

Créer une première version du site qui permet :

    de consulter les règles principales de challenge Pokémon
    de consulter un Pokédex 1G
    de créer une run locale
    de suivre des captures
    de marquer les Pokémon comme vivants ou morts
    de créer des liens Soul Link manuellement
    de sauvegarder la run dans le navigateur

La V1 doit être locale, simple, lisible et facile à faire évoluer.

Ce qui est inclus dans la V1

Partie informative
    page d’accueil
    page de présentation des règles :
        Nuzlocke
        Soul Link
        Randomizer
    Pokédex 1G
    fiche détaillée d’un Pokémon 1G

Partie tracker
    création d’une run
    choix du mode :
        Nuzlocke
        Soul Link
    choix de la génération :
        1G uniquement
    ajout manuel d’un Pokémon capturé
    attribution à un joueur
    attribution à une zone
    changement de statut :
        vivant
        mort
        boîte
        équipe
    liaison manuelle entre deux Pokémon pour le Soul Link
    sauvegarde locale

Ce qui n’est pas inclus dans la V1

Pour éviter de trop grossir le projet dès le départ, on exclut :

    multijoueur en ligne
    comptes utilisateurs
    synchronisation temps réel
    gestion complète de toutes les générations
    règles personnalisables avancées
    randomizer automatique
    routes et rencontres automatiques
    import/export de sauvegarde
    calculateur de capture
    team builder avancé
    historique détaillé des événements

Règles gérées en V1

Modes disponibles
    Nuzlocke
    Soul Link

Règles fixes

Nuzlocke
    une capture par zone
    KO = mort
    surnom optionnel ou obligatoire selon ton choix de design
Soul Link
    deux Pokémon peuvent être liés manuellement
    si l’un meurt, l’autre doit être marqué comme inutilisable ou mort manuellement dans un premier temps

Pour la V1, je te conseille de ne pas automatiser immédiatement le KO partagé.
Tu peux déjà prévoir la structure pour plus tard, mais au début un lien manuel suffit.

Pages de la V1

1. Accueil

Rôle :

    présenter le projet
    expliquer à quoi sert le site
    rediriger vers les guides et le tracker

Contenu :

    titre du projet
    courte présentation
    boutons vers :
    Règles
    Pokédex
    Créer une run

2. Page Règles

Rôle :

    regrouper les bases des challenges

Sections :

    Nuzlocke
    Soul Link
    Randomizer
    différences entre eux
    note sur les variantes futures

3. Pokédex 1G

Rôle :

    afficher la liste des Pokémon de la 1G

Fonctions :

    recherche par nom
    filtre par type
    affichage simple :
    numéro
    nom
    sprite
    type(s)

4. Fiche Pokémon

Rôle :

    afficher les infos d’un Pokémon

Contenu minimum :

    nom
    numéro
    sprite
    types
    stats de base
    taux de capture
    évolutions
    génération

5. Créer une run

Rôle :

lancer une nouvelle run locale

Champs :

    nom de la run
    mode :
    Nuzlocke
    Soul Link
    jeu ou version
    nombre de joueurs
    nom des joueurs

Pour la V1 :

    si Nuzlocke simple, 1 joueur
    si Soul Link, 2 joueurs minimum

6. Page d’une run

Rôle :

    cœur du tracker

Contenu :

    infos générales de la run
    liste des Pokémon capturés
    ajout d’une capture
    filtres simples
    gestion des statuts
    section Soul Link si mode activé

Blocs recommandés :

    résumé de la run
    équipe
    boîte
    morts
    captures par zone
    liens Soul Link

Parcours utilisateur V1

Parcours informatif

    l’utilisateur arrive sur l’accueil
    il consulte les règles
    il explore le Pokédex
    il lit une fiche Pokémon

Parcours tracker

    l’utilisateur clique sur créer une run
    il choisit le mode et les joueurs
    il ouvre sa page de run
    il ajoute ses captures
    il met à jour les statuts
    il lie deux Pokémon si besoin
    les données restent sauvegardées localement

Fonctions utilisateur détaillées

Créer une run

L’utilisateur peut :

    saisir un nom
    choisir un mode
    choisir la 1G
    choisir un jeu
    entrer les noms des joueurs

Ajouter une capture

L’utilisateur peut :

    choisir l’espèce
    saisir un surnom
    sélectionner le joueur
    renseigner la zone
    définir si le Pokémon est dans l’équipe ou dans la boîte

Modifier un Pokémon capturé

L’utilisateur peut :

    changer son surnom
    changer son statut
    le déplacer équipe/boîte
    le lier ou le délier

Créer un Soul Link

L’utilisateur peut :

    sélectionner deux Pokémon
    créer un lien entre eux
    voir visuellement qu’ils sont liés

