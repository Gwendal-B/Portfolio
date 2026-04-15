import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 px-8 py-12">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
            PokéChallenge Tracker
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Suis tes challenges Pokémon simplement
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            PokéChallenge Tracker est une plateforme pensée pour centraliser les
            règles des challenges Pokémon et suivre tes runs localement. Tu peux
            consulter les modes comme le Nuzlocke ou le Soul Link, explorer le
            Pokédex 1G et gérer tes captures dans un tracker interactif.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/rules"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700"
            >
              Voir les règles
            </Link>

            <Link
              href="/pokedex"
              className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 text-center font-medium text-white transition hover:bg-zinc-800"
            >
              Ouvrir le Pokédex
            </Link>

            <Link
              href="/tracker/new"
              className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 text-center font-medium text-white transition hover:bg-zinc-800"
            >
              Créer une run
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Guides de règles</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Retrouve les bases du Nuzlocke, du Soul Link et du Randomizer dans
              un espace clair et facile à consulter.
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Pokédex 1G</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Consulte les Pokémon de la première génération avec leurs types,
              statistiques de base, évolutions et taux de capture.
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Tracker local</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Crée une run, ajoute tes captures, modifie leurs statuts et gère
              les liens Soul Link directement dans ton navigateur.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}