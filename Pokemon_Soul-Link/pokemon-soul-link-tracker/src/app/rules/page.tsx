import Link from "next/link";

export default function RulesPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl sm:max-w-5xl lg:max-w-6xl">
        {/* En-tête */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Règles des Challenges Pokémon</h1>
          <p className="mt-3 text-zinc-400">
            Cette page regroupe les principaux modes de jeu utilisés dans les
            challenges Pokémon. Elle sert de référence pour le tracker.
          </p>
        </header>

        {/* Section des modes */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Nuzlocke */}
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold text-white">Nuzlocke</h2>
            <p className="mt-3 text-zinc-400">
              Le challenge Nuzlocke est l’un des modes les plus populaires. Il
              augmente la difficulté du jeu en imposant des règles strictes.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
              <li>Un seul Pokémon peut être capturé par zone.</li>
              <li>Un Pokémon mis K.O. est considéré comme mort.</li>
              <li>Chaque Pokémon capturé doit recevoir un surnom.</li>
            </ul>
          </article>

          {/* Soul Link */}
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold text-white">Soul Link</h2>
            <p className="mt-3 text-zinc-400">
              Variante coopérative du Nuzlocke, le Soul Link relie les Pokémon
              de deux joueurs.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
              <li>Les Pokémon capturés sur une même zone sont liés.</li>
              <li>Si l’un meurt, l’autre devient inutilisable.</li>
              <li>Les types liés ne peuvent pas être dupliqués dans l’équipe.</li>
              <li>La coopération entre joueurs est essentielle.</li>
            </ul>
          </article>

          {/* Randomizer */}
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold text-white">Randomizer</h2>
            <p className="mt-3 text-zinc-400">
              Le Randomizer modifie aléatoirement les éléments du jeu pour une
              expérience imprévisible.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
              <li>Les Pokémon sauvages sont aléatoires.</li>
              <li>Les starters sont modifiés.</li>
              <li>Les talents et capacités peuvent être randomisés.</li>
              <li>Les objets et dresseurs peuvent également changer.</li>
            </ul>
          </article>
        </section>

        {/* Bouton vers le Pokédex */}
        <div className="mt-10 text-center">
          <Link
            href="/pokedex"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Consulter le Pokédex
          </Link>
        </div>
      </div>
    </main>
  );
}