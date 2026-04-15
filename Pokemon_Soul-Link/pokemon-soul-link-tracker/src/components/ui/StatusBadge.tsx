interface StatusBadgeProps {
  status: "alive" | "dead" | "unusable";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    alive: "border-green-500/30 bg-green-500/10 text-green-300",
    dead: "border-red-500/30 bg-red-500/10 text-red-300",
    unusable: "border-zinc-500/30 bg-zinc-500/10 text-zinc-300",
  };

  const labels = {
    alive: "Vivant",
    dead: "Mort",
    unusable: "Inutilisable",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}