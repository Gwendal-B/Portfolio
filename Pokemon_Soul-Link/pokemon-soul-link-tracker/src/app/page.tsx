import Link from "next/link";

const gameCards = [
  {
    title: "Pokémon Rouge / Bleu / Jaune",
    generation: "Génération 1",
    description: "Kanto classique, parfait pour commencer une run Nuzlocke.",
    image: "/images/games/rby.webp",
  },
  {
    title: "Pokémon Or / Argent / Cristal",
    generation: "Génération 2",
    description: "Johto, Kanto et une progression plus longue pour les runs exigeantes.",
    image: "/images/games/gsc.webp",
  },
  {
    title: "Pokémon Rubis / Saphir / Émeraude",
    generation: "Génération 3",
    description: "Hoenn, talents et natures pour des runs plus riches à suivre.",
    image: "/images/games/rse.webp",
  },
  {
    title: "Pokémon Rouge Feu / Vert Feuille",
    generation: "Génération 3",
    description: "Retour à Kanto avec les mécaniques modernes de la 3G.",
    image: "/images/games/frlg.webp",
  },
];
const featureCards = [
  {
    title: "Suivi de captures",
    description:
      "Ajoute tes Pokémon, mets à jour leur statut, leur emplacement et garde une vue claire sur ton équipe.",
  },
  {
    title: "Soul Link intelligent",
    description:
      "Crée des liens automatiques ou manuels entre joueurs et suis facilement les paires actives ou brisées.",
  },
  {
    title: "Pokédex multi-jeux",
    description:
      "Explore les Pokémon disponibles selon le groupe de jeu choisi, avec types, stats, évolutions et plus encore.",
  },
];

const steps = [
  {
    title: "1. Crée une run",
    description: "Choisis ton mode, ton jeu et configure rapidement tes règles.",
  },
  {
    title: "2. Ajoute tes captures",
    description: "Renseigne zone, joueur, statut, nature et talent selon le jeu.",
  },
  {
    title: "3. Suis ta progression",
    description: "Gère ton équipe, tes morts, tes liens Soul Link et exporte la run.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/95 px-8 py-12 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:px-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                PokéChallenge Tracker
              </p>

              <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Suis tes challenges Pokémon simplement
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
                Centralise tes runs Nuzlocke et Soul Link, gère tes captures,
                consulte un Pokédex multi-jeux et garde toute ta progression au
                même endroit.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/tracker/new"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700"
                >
                  Créer une run
                </Link>

                <Link
                  href="/tracker"
                  className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 text-center font-medium text-white transition hover:bg-zinc-800"
                >
                  Mes runs
                </Link>

                <Link
                  href="/pokedex"
                  className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 text-center font-medium text-white transition hover:bg-zinc-800"
                >
                  Explorer le Pokédex
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-lg font-semibold">Ce que tu peux faire</h2>

              <div className="mt-5 space-y-4 text-sm text-zinc-300">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                  Créer des runs Nuzlocke et Soul Link
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                  Suivre ton équipe, ta boîte et tes Pokémon morts
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                  Consulter les Pokémon par groupe de jeu
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                  Exporter tes runs en JSON
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jeux disponibles */}
        <section className="mt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Jeux disponibles</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Les groupes de jeux actuellement pris en charge par le tracker.
              </p>
            </div>

            <Link
              href="/pokedex"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Voir le Pokédex →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {gameCards.map((game) => (
              <article
                key={game.title}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700 hover:bg-zinc-800/90"
              >
                <div className="mb-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  {game.generation}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {game.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {game.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Modes */}
        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Mode
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Nuzlocke</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Suis tes captures, applique une seule rencontre par zone et garde
              un historique clair de tes morts et de ta progression.
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Mode
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Soul Link</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Gère deux joueurs, crée les liens entre captures et suis facilement
              les paires encore actives ou déjà brisées.
            </p>
          </article>
        </section>

        {/* Fonctionnalités */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Fonctionnalités</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 px-8 py-10">
          <h2 className="text-2xl font-semibold">Commencer en 3 étapes</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/tracker/new"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700"
            >
              Créer ma première run
            </Link>

            <Link
              href="/rules"
              className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 text-center font-medium text-white transition hover:bg-zinc-800"
            >
              Lire les règles
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}