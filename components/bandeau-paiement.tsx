"use client";

import { useEffect, useState } from "react";
import { ROUGE } from "@/components/habillage";

/** Le bandeau disparait de lui-meme au bout de deux minutes. */
const DUREE_MS = 2 * 60 * 1000;

export function BandeauPaiement({
  message,
  succes,
}: {
  message: string;
  succes: boolean;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minuteur = setTimeout(() => setVisible(false), DUREE_MS);
    return () => clearTimeout(minuteur);
  }, []);

  // Retire du flux, pas seulement masque : l'espace qu'il occupait doit
  // se refermer, sinon il reste un blanc inexplique en haut de page.
  if (!visible) return null;

  return (
    <div className="bg-encre px-6 pt-6 text-center">
      <p
        className="mx-auto max-w-7xl border-l-4 px-4 py-3 text-left text-[14px] leading-relaxed"
        style={
          succes
            ? { borderColor: ROUGE, backgroundColor: "#fdf1ef", color: "#7a1d10" }
            : { borderColor: "#3f3f46", backgroundColor: "#fafafa", color: "#3f3f46" }
        }
      >
        {message}
      </p>
    </div>
  );
}
