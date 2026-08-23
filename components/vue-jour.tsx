// Presentation du classement archive d'une manche, sans acces aux donnees.
import Link from "next/link";
import { formaterMontant, remplir } from "@/lib/constantes";
import type { Dictionnaire, CategorieCle } from "@/lib/i18n/dictionnaires/types";
import type { Locale } from "@/lib/i18n/config";
import { EnteteInterieure, PastilleFleche, PiedPage, ROUGE } from "@/components/habillage";
import { LogoProjet } from "@/components/logo-projet";
import { Reveal } from "@/components/fx";
import type { Manche, Entree } from "@/lib/types";

function hote(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export function VueJour({
  d,
  locale,
  manche,
  entries,
  basePath = "",
}: {
  d: Dictionnaire;
  locale: Locale;
  manche: Manche;
  entries: Entree[];
  /** Prefixe des liens internes : vide en production, "/apercu" en demo. */
  basePath?: string;
}) {
  const enCours = manche.closed_at === null;
  const total = entries.reduce((somme, e) => somme + e.amount_cents, 0);

  return (
    <div className="flex flex-1 flex-col">
      <EnteteInterieure
        d={d}
        locale={locale}
        oeilDeBoeuf={enCours ? d.jour.enCoursOeil : d.jour.clotureeOeil}
        titre={remplir(d.jour.jourNumero, { n: manche.numero })}
        meta={
          enCours
            ? d.jour.enCoursMeta
            : remplir(d.jour.clotureeMeta, {
                date: new Date(manche.closed_at!).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                mises: `${entries.length} ${entries.length > 1 ? d.jour.mises : d.jour.mise}`,
                total: formaterMontant(total, locale),
              })
        }
      />

      <main className="flex-1 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          {entries.length === 0 ? (
            <Reveal>
              <div className="border-t-2 border-zinc-950 bg-zinc-50 px-6 py-14 text-center">
                <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
                  {d.jour.videOeil}
                </p>
                <p className="mx-auto mt-4 max-w-[46ch] text-xl font-bold tracking-tight text-balance sm:text-2xl">
                  {d.jour.videTitre}
                </p>
              </div>
            </Reveal>
          ) : (
            <ol className="grid gap-x-12 gap-y-5 sm:grid-cols-2 sm:gap-y-7">
              {entries.map((entree, index) => {
                const premier = index === 0;
                return (
                  <Reveal
                    key={entree.id}
                    delay={0.05 + (index % 2) * 0.08}
                    className={premier ? "sm:col-span-2" : undefined}
                  >
                    <li>
                      <a
                        href={`https://${hote(entree.project_url)}`}
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                        className="group block border-t-2 pt-5"
                        style={{ borderTopColor: premier ? ROUGE : "#09090b" }}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                          <p
                            className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase"
                            style={{ color: premier ? ROUGE : "#71717a" }}
                          >
                            {premier
                              ? enCours
                                ? d.jour.premierePlaceDirect
                                : d.jour.championDuJour
                              : remplir(d.jour.place, {
                                  n: String(index + 1).padStart(2, "0"),
                                })}
                          </p>
                          <p
                            className={
                              premier
                                ? "text-3xl leading-none font-bold tracking-tight tabular-nums sm:text-[2.5rem]"
                                : "text-lg font-bold tracking-tight tabular-nums"
                            }
                          >
                            {formaterMontant(entree.amount_cents, locale)}
                          </p>
                        </div>
                        <div
                          className={
                            premier ? "mt-4 flex gap-4 sm:gap-5" : "mt-2.5 flex items-center gap-4"
                          }
                        >
                          <LogoProjet
                            nom={entree.project_name}
                            projectUrl={entree.project_url}
                            logoUrl={entree.logo_url}
                            taille={premier ? "grand" : "normal"}
                          />
                          <div className="min-w-0">
                            <p
                              className={
                                premier
                                  ? "flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:gap-3 sm:text-4xl"
                                  : "flex items-center gap-2.5 text-lg font-bold tracking-tight"
                              }
                            >
                              <span className="truncate">{entree.project_name}</span>
                              <PastilleFleche sombre />
                            </p>
                            {premier && entree.tagline && (
                              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-zinc-600 sm:mt-3 sm:text-[15px]">
                                {entree.tagline}
                              </p>
                            )}
                            <p className="mt-2 truncate font-mono text-[11px] text-zinc-500 sm:text-[12px]">
                              {hote(entree.project_url)} · {d.categories[entree.category as CategorieCle] ?? entree.category}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          )}

          <Reveal delay={0.15}>
            <Link
              href={`${basePath}/palmares`}
              className="group mt-14 inline-flex items-center gap-2.5 text-lg font-bold tracking-tight"
            >
              {d.jour.retourPalmares}
              <PastilleFleche sombre />
            </Link>
          </Reveal>
        </div>
      </main>

      <PiedPage d={d} />
    </div>
  );
}
