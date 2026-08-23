"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/fx";
import { PastilleFleche, ROUGE } from "@/components/habillage";
import { LogoProjet } from "@/components/logo-projet";
import { formaterMontant } from "@/lib/constantes";
import type { Entree } from "@/lib/types";

const PAR_PAGE = 10;

function hote(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export function Classement({
  entries,
  numeroManche,
  basePath = "",
}: {
  entries: Entree[];
  numeroManche: number;
  /** Prefixe des liens internes : vide en production, "/apercu" en demo. */
  basePath?: string;
}) {
  const [pageDemandee, setPage] = useState(0);

  // Le classement bouge en direct : si la liste raccourcit, on borne au rendu
  // plutot que de corriger l'etat apres coup — pas de page vide affichee.
  const suivants = Math.max(entries.length - 1, 0);
  const nbPages = Math.max(Math.ceil(suivants / PAR_PAGE), 1);
  const page = Math.min(pageDemandee, nbPages - 1);

  if (entries.length === 0) {
    return (
      <Reveal>
        <div className="border-t-2 border-zinc-950 bg-zinc-50 px-6 py-14 text-center">
          <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
            Tableau vierge
          </p>
          <p className="mx-auto mt-4 max-w-[46ch] text-xl font-bold tracking-tight text-balance sm:text-2xl">
            Personne n&apos;a encore misé sur le Jour #{numeroManche}.
          </p>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-relaxed text-zinc-600">
            La première mise de la journée démarre à 1 €. Celui qui se lève tôt
            peut tenir la première place pendant des heures pour le prix d&apos;un
            café.
          </p>
          <a
            href="#miser"
            style={{ backgroundColor: ROUGE }}
            className="mt-7 inline-block rounded-sm px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            Ouvrir la journée pour 1 €
          </a>
        </div>
      </Reveal>
    );
  }

  const [premier, ...suite] = entries;
  const debut = page * PAR_PAGE;
  const visibles = suite.slice(debut, debut + PAR_PAGE);

  return (
    <div>
      {/* Le #1 occupe une plaque editoriale pleine largeur : c'est le
          "monopole" de la journee, il ne se lit pas comme une ligne de liste. */}
      <Reveal>
        <a
          href={`https://${hote(premier.project_url)}`}
          target="_blank"
          rel="noreferrer noopener nofollow"
          className="group block border-t-4 bg-zinc-50 px-4 py-5 transition-colors duration-500 hover:bg-zinc-100 sm:px-10 sm:py-10"
          style={{ borderTopColor: ROUGE }}
        >
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div className="flex min-w-0 gap-4 sm:gap-5">
              <LogoProjet
                nom={premier.project_name}
                projectUrl={premier.project_url}
                logoUrl={premier.logo_url}
                taille="grand"
              />
              <div className="min-w-0">
                <p
                  className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase"
                  style={{ color: ROUGE }}
                >
                  Première place · Jour #{numeroManche}
                </p>
                <p className="mt-2 flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:mt-3 sm:gap-3 sm:text-4xl">
                  <span className="truncate">{premier.project_name}</span>
                  <PastilleFleche sombre />
                </p>
                {premier.tagline && (
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-zinc-600 sm:mt-3 sm:text-[15px]">
                    {premier.tagline}
                  </p>
                )}
                <p className="mt-2 truncate font-mono text-[11px] text-zinc-500 sm:mt-3 sm:text-[12px]">
                  {hote(premier.project_url)} · {premier.category}
                </p>
              </div>
            </div>
            <p className="text-3xl leading-none font-bold tracking-tight tabular-nums sm:text-5xl lg:text-6xl">
              {formaterMontant(premier.amount_cents)}
            </p>
          </div>
        </a>
      </Reveal>

      {visibles.length > 0 && (
        <ol className="mt-6 grid gap-x-12 gap-y-5 sm:mt-10 sm:grid-cols-2 sm:gap-y-7">
          {visibles.map((entree, index) => (
            <Reveal key={entree.id} delay={0.05 + (index % 2) * 0.08}>
              <li>
                <a
                  href={`https://${hote(entree.project_url)}`}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="group flex items-center gap-4 border-t border-zinc-300 pt-4"
                >
                  <span className="font-mono text-sm font-semibold text-zinc-400 tabular-nums">
                    {String(debut + index + 2).padStart(2, "0")}
                  </span>
                  <LogoProjet
                    nom={entree.project_name}
                    projectUrl={entree.project_url}
                    logoUrl={entree.logo_url}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-[#e8442e]">
                      {entree.project_name}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[12px] text-zinc-500">
                      {entree.category}
                    </span>
                  </span>
                  <span className="shrink-0 text-lg font-bold tracking-tight tabular-nums">
                    {formaterMontant(entree.amount_cents)}
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ol>
      )}

      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <Link
            href={`${basePath}/jour/${numeroManche}`}
            className="group inline-flex items-center gap-2.5 text-lg font-bold tracking-tight"
          >
            Voir le classement complet
            <PastilleFleche sombre />
          </Link>

          {suivants > PAR_PAGE && (
            <div className="flex items-center gap-6">
              <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Page {page + 1} / {nbPages}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(page - 1, 0))}
                  disabled={page === 0}
                  className="rounded-sm border border-zinc-300 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-zinc-950 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40"
                >
                  Page précédente
                </button>
                <button
                  type="button"
                  onClick={() => setPage(Math.min(page + 1, nbPages - 1))}
                  disabled={page >= nbPages - 1}
                  className="rounded-sm border border-zinc-300 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-zinc-950 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40"
                >
                  Page suivante
                </button>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
