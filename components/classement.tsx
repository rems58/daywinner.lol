"use client";

import { useState } from "react";
import Link from "next/link";
import { PastilleFleche, ROUGE } from "@/components/habillage";
import { LogoProjet } from "@/components/logo-projet";
import { LienProjet } from "@/components/lien-projet";
import { MISE_MIN_CENTS, formaterMontant, remplir } from "@/lib/constantes";
import type { Dictionnaire, CategorieCle } from "@/lib/i18n/dictionnaires/types";
import type { Locale } from "@/lib/i18n/config";
import type { Entree } from "@/lib/types";

const PAR_PAGE = 10;

/**
 * La base stocke une cle de categorie. Les lignes anterieures a l'i18n
 * stockent un libelle francais : on l'affiche tel quel plutot que de laisser
 * un trou.
 */
function libelleCategorie(d: Dictionnaire, valeur: string) {
  return d.categories[valeur as CategorieCle] ?? valeur;
}

function hote(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export function Classement({
  d,
  locale,
  entries,
  numeroManche,
  basePath = "",
}: {
  d: Dictionnaire;
  locale: Locale;
  entries: Entree[];
  numeroManche: number;
  /** Prefixe des liens internes : vide en production, "/apercu" en demo. */
  basePath?: string;
}) {
  const [pageDemandee, setPage] = useState(0);

  // Le classement bouge en direct : si la liste raccourcit, on borne au rendu
  // plutot que de corriger l'etat apres coup, pas de page vide affichee.
  const suivants = Math.max(entries.length - 1, 0);
  const nbPages = Math.max(Math.ceil(suivants / PAR_PAGE), 1);
  const page = Math.min(pageDemandee, nbPages - 1);

  if (entries.length === 0) {
    return (
      <div>
        <div className="border-t-2 border-zinc-950 bg-zinc-50 px-6 py-14 text-center">
          <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
            {d.classement.videOeil}
          </p>
          <p className="mx-auto mt-4 max-w-[46ch] text-xl font-bold tracking-tight text-balance sm:text-2xl">
            {remplir(d.classement.videTitre, { n: numeroManche })}
          </p>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-relaxed text-zinc-600">
            {d.classement.videTexte}
          </p>
          <a
            href="#miser"
            style={{ backgroundColor: ROUGE }}
            className="mt-7 inline-block rounded-sm px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            {remplir(d.classement.videCta, { montant: formaterMontant(MISE_MIN_CENTS, locale) })}
          </a>
        </div>
      </div>
    );
  }

  const [premier, ...suite] = entries;
  const debut = page * PAR_PAGE;
  const visibles = suite.slice(debut, debut + PAR_PAGE);

  return (
    <div>
      {/* Le #1 occupe une plaque editoriale pleine largeur : c'est le
          "monopole" de la journee, il ne se lit pas comme une ligne de liste. */}
      {/* Aucune animation d'apparition ici : le classement est le contenu
          principal, il doit etre lisible des le premier rendu, sans scroll. */}
      <div style={{ borderTopColor: ROUGE }}>
        <LienProjet
          entreeId={premier.id}
          href={`https://${hote(premier.project_url)}`}
          className="group block border-t-4 bg-zinc-50 px-4 py-5 transition-colors duration-500 hover:bg-zinc-100 sm:px-10 sm:py-10"
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
                  {remplir(d.classement.premierePlace, { n: numeroManche })}
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
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-500 sm:mt-3 sm:text-[12px]">
                  {hote(premier.project_url)} · {libelleCategorie(d, premier.category)} ·{" "}
                  {remplir(d.classement.clics, { n: premier.clics })}
                </p>
              </div>
            </div>
            <p className="text-3xl leading-none font-bold tracking-tight tabular-nums sm:text-5xl lg:text-6xl">
              {formaterMontant(premier.amount_cents, locale)}
            </p>
          </div>
        </LienProjet>
      </div>

      {visibles.length > 0 && (
        <ol className="mt-6 grid gap-x-12 gap-y-5 sm:mt-10 sm:grid-cols-2 sm:gap-y-7">
          {visibles.map((entree, index) => (
            <li key={entree.id}>
              <div>
                <LienProjet
                  entreeId={entree.id}
                  href={`https://${hote(entree.project_url)}`}
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
                    <span className="mt-0.5 block font-mono text-[12px] text-zinc-500">
                      {libelleCategorie(d, entree.category)} ·{" "}
                      {remplir(d.classement.clics, { n: entree.clics })}
                    </span>
                  </span>
                  <span className="shrink-0 text-lg font-bold tracking-tight tabular-nums">
                    {formaterMontant(entree.amount_cents, locale)}
                  </span>
                </LienProjet>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <Link
            href={`${basePath}/jour/${numeroManche}`}
            className="group inline-flex items-center gap-2.5 text-lg font-bold tracking-tight"
          >
            {d.classement.voirComplet}
            <PastilleFleche sombre />
          </Link>

          {suivants > PAR_PAGE && (
            <div className="flex items-center gap-6">
              <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                {remplir(d.classement.page, { page: page + 1, total: nbPages })}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(page - 1, 0))}
                  disabled={page === 0}
                  className="rounded-sm border border-zinc-300 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-zinc-950 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40"
                >
                  {d.classement.precedente}
                </button>
                <button
                  type="button"
                  onClick={() => setPage(Math.min(page + 1, nbPages - 1))}
                  disabled={page >= nbPages - 1}
                  className="rounded-sm border border-zinc-300 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-zinc-950 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40"
                >
                  {d.classement.suivante}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
