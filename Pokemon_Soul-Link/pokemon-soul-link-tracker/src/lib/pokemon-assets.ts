export function getPokemonGifUrl(dexNumber: number): string {
  const padded = dexNumber.toString().padStart(3, "0");
  return `/sprites/gifs/normal/${padded}.gif`;
}