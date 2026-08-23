"use client";

import { useState } from "react";
import { faviconDepuisUrl } from "@/lib/constantes";
import { cn } from "@/lib/utils";

/**
 * Logo d'une entree du classement. Trois niveaux de repli :
 * logo fourni par le miseur -> favicon du domaine -> monogramme.
 *
 * Image brute volontaire (pas next/image) : les URL viennent de domaines
 * arbitraires saisis par les miseurs, impossible de les declarer a l'avance
 * dans remotePatterns. referrerPolicy pour ne pas fuiter la page d'origine
 * aux serveurs tiers.
 */
export function LogoProjet({
  nom,
  projectUrl,
  logoUrl,
  taille = "normal",
}: {
  nom: string;
  projectUrl: string;
  logoUrl?: string | null;
  taille?: "normal" | "grand";
}) {
  const sources = [logoUrl, faviconDepuisUrl(projectUrl)].filter(
    (source): source is string => Boolean(source)
  );
  const [indice, setIndice] = useState(0);
  const source = sources[indice];

  const cadre = cn(
    "flex shrink-0 items-center justify-center overflow-hidden rounded-md",
    taille === "grand" ? "size-12 sm:size-20" : "size-9 sm:size-10"
  );

  if (!source) {
    return (
      <span className={cn(cadre, "bg-zinc-100")} aria-hidden>
        <span
          className={cn(
            "font-bold tracking-tight text-zinc-400",
            taille === "grand" ? "text-2xl sm:text-3xl" : "text-base"
          )}
        >
          {nom.trim().charAt(0).toUpperCase()}
        </span>
      </span>
    );
  }

  return (
    <span className={cadre}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={source}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setIndice((actuel) => actuel + 1)}
        className="size-full object-cover"
      />
    </span>
  );
}
