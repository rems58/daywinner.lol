"use client";

import { useTransition } from "react";
import { LOCALES, codeLocale, libelleLocale, type Locale } from "@/lib/i18n/config";
import { definirLocale } from "@/app/langue-actions";
import { cn } from "@/lib/utils";

/**
 * Selecteur de langue de la barre de navigation. Un `select` natif plutot
 * qu'un menu maison : il reste utilisable au clavier, s'ouvre correctement
 * sur mobile, et ne coute presque rien en JavaScript.
 */
export function SelecteurLangue({
  courante,
  libelle,
  ton = "sombre",
}: {
  courante: Locale;
  libelle: string;
  ton?: "sombre" | "clair";
}) {
  const [enCours, demarrerTransition] = useTransition();
  const sombre = ton === "sombre";

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{libelle}</span>
      <select
        value={courante}
        disabled={enCours}
        onChange={(evenement) => {
          const choix = evenement.target.value;
          demarrerTransition(() => definirLocale(choix));
        }}
        className={cn(
          "cursor-pointer appearance-none rounded-sm border bg-transparent py-2 pr-7 pl-3 text-sm font-semibold transition-colors duration-300 outline-none",
          sombre
            ? "border-white/40 text-white hover:border-white hover:bg-white/10"
            : "border-zinc-300 text-zinc-950 hover:border-zinc-950 hover:bg-zinc-100",
          enCours && "opacity-50"
        )}
      >
        {LOCALES.map((locale) => (
          <option key={locale} value={locale} lang={locale} className="text-zinc-950">
            {codeLocale(locale)}
          </option>
        ))}
      </select>
      {/* Chevron dessine a la main : `appearance-none` retire celui du
          navigateur, qui ne se colorise pas sur fond sombre. */}
      <svg
        viewBox="0 0 12 12"
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-2.5 size-3",
          sombre ? "text-white/70" : "text-zinc-500"
        )}
      >
        <path
          d="M3 4.5 6 7.5 9 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{libelleLocale(courante)}</span>
    </label>
  );
}
