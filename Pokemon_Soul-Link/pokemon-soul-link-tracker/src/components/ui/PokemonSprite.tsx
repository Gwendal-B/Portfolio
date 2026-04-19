"use client";

import { useState } from "react";
import { getPokemonGifUrl } from "../../lib/pokemon-assets";

type PokemonSpriteProps = {
  dexNumber: number;
  name: string;
  spriteUrl: string;
  className?: string;
  alt?: string;
};

export default function PokemonSprite({
  dexNumber,
  name,
  spriteUrl,
  className = "",
  alt,
}: PokemonSpriteProps) {
  const [src, setSrc] = useState(getPokemonGifUrl(dexNumber));

  return (
    <img
      src={src}
      alt={alt ?? name}
      onError={() => {
        if (src !== spriteUrl) {
          setSrc(spriteUrl);
        }
      }}
      className={className}
    />
  );
}