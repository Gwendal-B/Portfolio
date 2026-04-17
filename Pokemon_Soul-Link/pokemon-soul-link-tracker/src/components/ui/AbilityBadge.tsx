type AbilityBadgeProps = {
  ability: string | null;
};

export default function AbilityBadge({ ability }: AbilityBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
      {ability ?? "Talent inconnu"}
    </span>
  );
}