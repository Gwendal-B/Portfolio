type PokemonTypeBadgeProps = {
  type: string;
};

const TYPE_STYLES: Record<string, string> = {
  Normal: "bg-zinc-500/20 text-zinc-200 border-zinc-400/30",
  Feu: "bg-orange-500/20 text-orange-200 border-orange-400/30",
  Eau: "bg-sky-500/20 text-sky-200 border-sky-400/30",
  Plante: "bg-lime-500/20 text-lime-200 border-lime-400/30",
  Électrik: "bg-yellow-400/20 text-yellow-100 border-yellow-300/30",
  Glace: "bg-cyan-400/20 text-cyan-100 border-cyan-300/30",
  Combat: "bg-red-500/20 text-red-200 border-red-400/30",
  Poison: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/30",
  Sol: "bg-amber-600/20 text-amber-200 border-amber-500/30",
  Vol: "bg-indigo-400/20 text-indigo-100 border-indigo-300/30",
  Psy: "bg-pink-500/20 text-pink-200 border-pink-400/30",
  Insecte: "bg-lime-600/20 text-lime-200 border-lime-500/30",
  Roche: "bg-stone-500/20 text-stone-200 border-stone-400/30",
  Spectre: "bg-violet-500/20 text-violet-200 border-violet-400/30",
  Dragon: "bg-indigo-600/20 text-indigo-200 border-indigo-500/30",
  Ténèbres: "bg-neutral-700/30 text-neutral-200 border-neutral-500/30",
  Acier: "bg-slate-400/20 text-slate-100 border-slate-300/30",
  Fée: "bg-rose-400/20 text-rose-100 border-rose-300/30",
};

export default function PokemonTypeBadge({ type }: PokemonTypeBadgeProps) {
  const style =
    TYPE_STYLES[type] ??
    "bg-zinc-700/20 text-zinc-200 border-zinc-500/30";

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${style}`}
    >
      {type}
    </span>
  );
}