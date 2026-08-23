"use client";

import { useEffect, useState } from "react";
import { FENETRE_ANTI_SNIPE_MS } from "@/lib/constantes";
import { cn } from "@/lib/utils";

function decouper(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    heures: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    secondes: total % 60,
  };
}

export function CompteARebours({
  finISO,
  ton = "sombre",
  taille = "grand",
}: {
  finISO: string;
  ton?: "sombre" | "clair";
  taille?: "grand" | "moyen";
}) {
  const [maintenant, setMaintenant] = useState<number | null>(null);

  useEffect(() => {
    // Horloge systeme, pas un etat derive : ce premier setState synchrone
    // remplace le rendu neutre du serveur des l'hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMaintenant(Date.now());
    const intervalle = setInterval(() => setMaintenant(Date.now()), 1000);
    return () => clearInterval(intervalle);
  }, []);

  const clair = ton === "clair";
  const reste = maintenant === null ? null : new Date(finISO).getTime() - maintenant;
  const zoneAntiSnipe = reste !== null && reste > 0 && reste < FENETRE_ANTI_SNIPE_MS;

  const tailleChiffres =
    taille === "grand"
      ? "text-5xl sm:text-7xl lg:text-[5.5rem]"
      : "text-3xl sm:text-4xl md:text-5xl";
  const tailleSeparateur =
    taille === "grand"
      ? "text-4xl sm:text-6xl lg:text-[4rem]"
      : "text-2xl sm:text-3xl md:text-4xl";

  if (reste !== null && reste <= 0) {
    return (
      <p className={cn("font-bold tracking-tight", tailleChiffres)}>Clôture en cours…</p>
    );
  }

  const { heures, minutes, secondes } = decouper(reste ?? 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const vide = reste === null;

  const blocs: Array<[string, string]> = [
    [vide ? "--" : pad(heures), "heures"],
    [vide ? "--" : pad(minutes), "minutes"],
    [vide ? "--" : pad(secondes), "secondes"],
  ];

  return (
    <div
      className={cn("flex items-start gap-3 sm:gap-5 md:gap-7", zoneAntiSnipe && "sta-pulse")}
      style={zoneAntiSnipe ? { color: "#e8442e" } : undefined}
    >
      {blocs.map(([valeur, libelle], i) => (
        <div key={libelle} className="flex items-start gap-3 sm:gap-5 md:gap-7">
          {i > 0 && (
            <span
              className={cn(
                "leading-none font-bold",
                tailleSeparateur,
                clair ? "text-zinc-300" : "text-white/20"
              )}
            >
              :
            </span>
          )}
          <div className="flex flex-col items-center">
            <span className={cn("leading-none font-bold tracking-tight tabular-nums", tailleChiffres)}>
              {valeur}
            </span>
            <span
              className={cn(
                "mt-2.5 font-mono text-[10px] font-medium tracking-[0.25em] uppercase sm:text-[11px]",
                clair ? "text-zinc-500" : "text-white/50"
              )}
            >
              {libelle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
