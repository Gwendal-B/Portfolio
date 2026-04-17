type NatureBadgeProps = {
  nature: string | null;
};

const neutralNatures = new Set([
  "Hardi",
  "Docile",
  "Pudique",
  "Bizarre",
  "Sérieux",
]);

export default function NatureBadge({ nature }: NatureBadgeProps) {
  if (!nature) {
    return (
      <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
        Nature inconnue
      </span>
    );
  }

  const isNeutralNature = neutralNatures.has(nature);

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        isNeutralNature
          ? "border-zinc-700 bg-zinc-800 text-zinc-300"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      }`}
    >
      {nature}
    </span>
  );
}