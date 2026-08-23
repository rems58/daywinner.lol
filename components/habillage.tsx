// Habillage repris de riveska.com : nav en trois colonnes avec la marque au
// centre, pastille flechee rouge, intertitres a oeil-de-boeuf monospace,
// bandeau sombre "cosmos" en tete des pages interieures.
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/fx";
import { SelecteurLangue } from "@/components/selecteur-langue";
import type { Dictionnaire } from "@/lib/i18n/dictionnaires/types";
import type { DictionnaireLegal } from "@/lib/i18n/dictionnaires/legal-types";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export const ROUGE = "#e8442e";

// `ton` ne joue que sur les couleurs : la nav reste dans le flux, les
// bandeaux qui l'accueillent gerent eux-memes leur hauteur.
export function Navigation({
  d,
  locale,
  ton = "sombre",
}: {
  d: Dictionnaire;
  locale: Locale;
  ton?: "sombre" | "clair";
}) {
  const sombre = ton === "sombre";
  return (
    <header className="relative z-40">
      <div
        className={cn(
          "mx-auto grid w-full max-w-7xl grid-cols-2 items-center px-6 py-6 sm:grid-cols-3",
          sombre ? "text-white" : "text-zinc-950"
        )}
      >
        <nav
          className={cn(
            "hidden items-center gap-7 text-sm font-medium sm:flex",
            sombre ? "text-white/80" : "text-zinc-600"
          )}
        >
          <Link
            href="/palmares"
            className={cn(
              "transition-colors duration-300",
              sombre ? "hover:text-white" : "hover:text-zinc-950"
            )}
          >
            {d.nav.palmares}
          </Link>
          <Link
            href="/regles"
            className={cn(
              "transition-colors duration-300",
              sombre ? "hover:text-white" : "hover:text-zinc-950"
            )}
          >
            {d.nav.regles}
          </Link>
        </nav>
        <div className="sm:text-center">
          <Link href="/" className="text-lg font-bold tracking-tight">
            daywinner<span style={{ color: ROUGE }}>.lol</span>
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/#miser"
            className={cn(
              "rounded-sm border px-4 py-2 text-sm font-semibold transition-colors duration-300 active:scale-[0.98]",
              sombre
                ? "border-white/40 text-white hover:border-white hover:bg-white/10"
                : "border-zinc-300 text-zinc-950 hover:border-zinc-950 hover:bg-zinc-100"
            )}
          >
            {d.nav.miser}
          </Link>
          <SelecteurLangue courante={locale} libelle={d.nav.langue} ton={ton} />
        </div>
      </div>
    </header>
  );
}

export function PastilleFleche({ sombre = false }: { sombre?: boolean }) {
  return (
    <span
      style={{ backgroundColor: ROUGE }}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1",
        sombre && "shadow-sm"
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden>
        <path
          d="M3.5 8h9m0 0L8.75 4.25M12.5 8l-3.75 3.75"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function TitreSection({
  oeilDeBoeuf,
  titre,
  lienLabel,
  lienHref,
}: {
  oeilDeBoeuf: string;
  titre: string;
  lienLabel?: string;
  lienHref?: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
            {oeilDeBoeuf}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:mt-3 sm:text-4xl md:text-5xl">
            {titre}
          </h2>
        </div>
        {lienLabel && lienHref && (
          <Link
            href={lienHref}
            className="group flex items-center gap-2.5 text-lg font-bold tracking-tight"
          >
            {lienLabel}
            <PastilleFleche sombre />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

/** Bandeau sombre en tete des pages interieures (palmares, regles, jour). */
export function EnteteInterieure({
  d,
  locale,
  oeilDeBoeuf,
  titre,
  meta,
}: {
  d: Dictionnaire;
  locale: Locale;
  oeilDeBoeuf: string;
  titre: string;
  meta?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-encre text-white">
      <div className="cosmos-nebula absolute inset-0" aria-hidden />
      <div className="cosmos-stars absolute inset-0" aria-hidden />
      <div className="relative">
        <Navigation d={d} locale={locale} />
        <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16">
          <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-white/60 uppercase">
            {oeilDeBoeuf}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {titre}
          </h1>
          {meta && <div className="mt-4 text-[15px] text-white/70">{meta}</div>}
        </div>
      </div>
    </header>
  );
}

export function PiedPage({
  d,
  dl,
}: {
  d: Dictionnaire;
  dl?: DictionnaireLegal;
}) {
  return (
    <footer className="bg-encre text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 px-6 py-14 sm:flex-row sm:items-end">
        <div>
          <span className="text-2xl font-bold tracking-tight">
            daywinner<span style={{ color: ROUGE }}>.lol</span>
          </span>
          <p className="mt-2 max-w-[40ch] text-sm text-white/60">{d.pied.accroche}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
          <Link href="/palmares" className="transition-colors hover:text-white">
            {d.nav.palmares}
          </Link>
          <Link href="/regles" className="transition-colors hover:text-white">
            {d.nav.regles}
          </Link>
          {dl && (
            <>
              <Link href="/mentions-legales" className="transition-colors hover:text-white">
                {dl.pied.mentions}
              </Link>
              <Link href="/cgv" className="transition-colors hover:text-white">
                {dl.pied.cgv}
              </Link>
              <Link href="/confidentialite" className="transition-colors hover:text-white">
                {dl.pied.confidentialite}
              </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
