"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRunById } from "../../../../lib/local-storage";
import type { Run } from "../../../../types/run";

/*
  Type des props reçues par la page dynamique.
  Dans ton cas, l'URL ressemble à :
  /tracker/run/run-123456

  Donc params.id contiendra "run-123456"
*/
type RunDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function RunDetailPage({ params }: RunDetailPageProps) {
  const [runId, setRunId] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /*
    On récupère d'abord l'id depuis l'URL,
    puis on charge la run correspondante dans le localStorage.
  */
  useEffect(() => {
    async function loadRun() {
      const resolvedParams = await params;
      const currentRunId = resolvedParams.id;

      setRunId(currentRunId);

      const foundRun = getRunById(currentRunId) ?? null;
      setRun(foundRun);
      setIsLoading(false);
    }

    loadRun();
  }, [params]);

  /*
    État de chargement
  */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-zinc-400">Chargement de la run...</p>
        </div>
      </main>
    );
  }

  /*
    Si aucune run n'est trouvée
  */
  if (!run) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-zinc-400">Run introuvable.</p>

          <Link
            href="/tracker/new"
            className="mt-4 inline-block rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            Créer une nouvelle run
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <Link
            href="/tracker/new"
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Retour à la création de run
          </Link>

          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400">
            Tracker
          </p>

          <h1 className="mt-2 text-4xl font-bold">{run.name}</h1>

          <p className="mt-3 text-zinc-400">
            Voici le tableau de bord de ta run. Cette page servira ensuite à
            gérer les captures, les statuts et les liens Soul Link.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Informations générales</h2>

            <div className="mt-4 space-y-3 text-zinc-300">
              <p>
                <span className="font-medium text-white">ID :</span> {runId}
              </p>
              <p>
                <span className="font-medium text-white">Nom :</span> {run.name}
              </p>
              <p>
                <span className="font-medium text-white">Mode :</span>{" "}
                {run.mode}
              </p>
              <p>
                <span className="font-medium text-white">Jeu :</span> {run.game}
              </p>
              <p>
                <span className="font-medium text-white">Génération :</span>{" "}
                {run.generation}
              </p>
              <p>
                <span className="font-medium text-white">Créée le :</span>{" "}
                {new Date(run.createdAt).toLocaleString("fr-FR")}
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Joueurs</h2>

            <div className="mt-4 space-y-3 text-zinc-300">
              {run.players.map((player) => (
                <p key={player.id}>
                  <span className="font-medium text-white">{player.id} :</span>{" "}
                  {player.name}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:col-span-2">
            <h2 className="text-xl font-semibold">Règles actives</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-zinc-300">
              <p>
                <span className="font-medium text-white">
                  Une rencontre par zone :
                </span>{" "}
                {run.rules.oneEncounterPerRoute ? "Oui" : "Non"}
              </p>

              <p>
                <span className="font-medium text-white">
                  K.O. = mort permanente :
                </span>{" "}
                {run.rules.faintEqualsDeath ? "Oui" : "Non"}
              </p>

              <p>
                <span className="font-medium text-white">
                  Surnom obligatoire :
                </span>{" "}
                {run.rules.nicknameRequired ? "Oui" : "Non"}
              </p>

              <p>
                <span className="font-medium text-white">
                  Soul Link activé :
                </span>{" "}
                {run.rules.soulLinkEnabled ? "Oui" : "Non"}
              </p>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 p-6">
          <h2 className="text-xl font-semibold">Prochaine étape</h2>

          <p className="mt-3 text-zinc-400">
            La prochaine amélioration de cette page sera l’ajout des Pokémon
            capturés, de leur statut et des liens Soul Link.
          </p>
        </section>
      </div>
    </main>
  );
}