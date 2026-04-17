import type { CapturedPokemon } from "../../types/tracker";

interface RunStatsBarProps {
  captures: CapturedPokemon[];
}

export default function RunStatsBar({ captures }: RunStatsBarProps) {
  const alive = captures.filter((c) => c.lifeStatus === "alive").length;
  const dead = captures.filter((c) => c.lifeStatus === "dead").length;
  const unusable = captures.filter((c) => c.lifeStatus === "unusable").length;
  const total = captures.length;

  return (
    <div className="grid grid-cols-4 gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-white">{total}</p>
        <p className="mt-0.5 text-xs text-zinc-400">Total</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-green-400">{alive}</p>
        <p className="mt-0.5 text-xs text-zinc-400">Vivants</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-red-400">{dead}</p>
        <p className="mt-0.5 text-xs text-zinc-400">Morts</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-zinc-400">{unusable}</p>
        <p className="mt-0.5 text-xs text-zinc-400">Inutilisables</p>
      </div>
    </div>
  );
}
