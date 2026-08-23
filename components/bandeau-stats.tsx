"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { creerClientNavigateur } from "@/lib/supabase/client";

const CLE_SESSION = "daywinner-visite-comptee";

export function BandeauStats() {
  const [enLigne, setEnLigne] = useState<number | null>(null);
  const [visiteurs, setVisiteurs] = useState<number | null>(null);

  useEffect(() => {
    const supabase = creerClientNavigateur();

    // Presence Realtime : chaque onglet ouvert se signale, le total des
    // presences donne le nombre de personnes actuellement sur le site.
    const salon = supabase.channel("presence-daywinner", {
      config: { presence: { key: crypto.randomUUID() } },
    });

    salon
      .on("presence", { event: "sync" }, () => {
        setEnLigne(Object.keys(salon.presenceState()).length);
      })
      .subscribe((statut) => {
        if (statut === "SUBSCRIBED") salon.track({ arrive: Date.now() });
      });

    // Une visite comptee par session d'onglet, pas par rechargement.
    const dejaComptee = sessionStorage.getItem(CLE_SESSION);
    const compter = async () => {
      if (dejaComptee) {
        const { data } = await supabase.from("stats").select("visiteurs").maybeSingle();
        setVisiteurs(data?.visiteurs ?? null);
        return;
      }
      const { data, error } = await supabase.rpc("incrementer_visiteurs");
      if (error || typeof data !== "number") {
        // Marqueur non pose : la visite sera comptee au prochain essai
        // plutot que perdue pour toute la session de l'onglet.
        setVisiteurs(null);
        return;
      }
      sessionStorage.setItem(CLE_SESSION, "1");
      setVisiteurs(data);
    };
    void compter();

    return () => {
      supabase.removeChannel(salon);
    };
  }, []);

  const nombre = (valeur: number | null) =>
    valeur === null ? "…" : new Intl.NumberFormat("fr-FR").format(valeur);

  return (
    <div className="flex justify-center px-6 pb-8">
      <Link
        href="/palmares"
        className="group inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-white/[0.06] px-4 py-2 text-center text-[12px] leading-snug text-white/60 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10 sm:px-5 sm:text-[13px]"
      >
        <span className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-semibold text-white tabular-nums">
            {nombre(enLigne)} en ligne
          </span>
        </span>
        <span className="text-white/25">·</span>
        <span>
          <span className="font-semibold text-white tabular-nums">
            {nombre(visiteurs)}
          </span>{" "}
          visiteurs depuis le lancement
        </span>
        <span className="hidden text-white/25 sm:inline">·</span>
        <span className="font-semibold text-white underline-offset-4 group-hover:underline">
          voir les stats →
        </span>
      </Link>
    </div>
  );
}
