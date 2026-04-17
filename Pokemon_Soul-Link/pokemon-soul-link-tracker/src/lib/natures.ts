export type Nature = {
  name: string;
};

export const NATURES: Nature[] = [
  { name: "Hardi" },
  { name: "Solo" },
  { name: "Rigide" },
  { name: "Mauvais" },
  { name: "Brave" },
  { name: "Assuré" },
  { name: "Docile" },
  { name: "Malin" },
  { name: "Lâche" },
  { name: "Relax" },
  { name: "Modeste" },
  { name: "Doux" },
  { name: "Pudique" },
  { name: "Foufou" },
  { name: "Discret" },
  { name: "Calme" },
  { name: "Gentil" },
  { name: "Prudent" },
  { name: "Bizarre" },
  { name: "Malpoli" },
  { name: "Timide" },
  { name: "Pressé" },
  { name: "Jovial" },
  { name: "Naïf" },
  { name: "Sérieux" },
];

export function getNatureByName(name: string) {
  return NATURES.find((nature) => nature.name === name) ?? null;
}