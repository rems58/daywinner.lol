// Presentation du palmares, sans acces aux donnees : la page reelle lui
// passe ce que Supabase renvoie, l'apercu lui passe un jeu fictif.
import Link from "next/link";
import { formaterMontant, remplir } from "@/lib/constantes";
import type { Dictionnaire, CategorieCle } from "@/lib/i18n/dictionnaires/types";
import type { Locale } from "@/lib/i18n/config";
import { EnteteInterieure, PastilleFleche, PiedPage, ROUGE } from "@/components/habillage";
import { LogoProjet } from "@/components/logo-projet";
import { Reveal } from "@/components/fx";
import type { Champion } from "@/lib/types";

function formaterDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function VuePalmares({
  d,
  locale,
  champions,
  cumulCents,
  nbMises,
  basePath = "",
}: {
  d: Dictionnaire;
  locale: Locale;
  champions: Champion[];
  cumulCents: number;
  nbMises: number;
  /** Prefixe des liens internes : vide en production, "/apercu" en demo. */
  basePath?: string;
}) {
  const chiffres = [
    { valeur: formaterMontant(cumulCents, locale), libelle: d.palmares.encaisse },
    { valeur: String(champions.length), libelle: d.palmares.manchesJouees },
    { valeur: String(nbMises), libelle: d.palmares.misesRecues },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <EnteteInterieure
        d={d}
        locale={locale}
        oeilDeBoeuf={d.palmares.oeil}
        titre={d.palmares.titre}
        meta={d.palmares.meta}
      />

      <main className="flex-1 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {chiffres.map((chiffre, i) => (
              <Reveal key={chiffre.libelle} delay={i * 0.1}>
                <div className="border-t-2 border-zinc-950 pt-5">
                  <dt className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
                    {chiffre.libelle}
                  </dt>
                  <dd className="mt-3 text-4xl leading-none font-bold tracking-tight tabular-nums sm:text-[2.75rem]">
                    {chiffre.valeur}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <div className="mt-16 sm:mt-20">
            {champions.length === 0 ? (
              <Reveal>
                <div className="border-t-2 border-zinc-950 bg-zinc-50 px-6 py-14 text-center">
                  <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
                    {d.palmares.videOeil}
                  </p>
                  <p className="mx-auto mt-4 max-w-[46ch] text-xl font-bold tracking-tight text-balance sm:text-2xl">
                    {d.palmares.videTitre}
                  </p>
                  <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-relaxed text-zinc-600">
                    {d.palmares.videTexte}
                  </p>
                  <Link
                    href={`${basePath}/#miser`}
                    style={{ backgroundColor: ROUGE }}
                    className="mt-7 inline-block rounded-sm px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  >
                    {d.palmares.videCta}
                  </Link>
                </div>
              </Reveal>
            ) : (
              <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
                {champions.map((champion, i) => (
                  <Reveal key={champion.numero} delay={0.06 + (i % 2) * 0.1}>
                    <li>
                      <Link
                        href={`${basePath}/jour/${champion.numero}`}
                        className="group block border-t-2 border-zinc-950 pt-5"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <p
                            className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase"
                            style={{ color: ROUGE }}
                          >
                            {remplir(d.jour.jourNumero, { n: champion.numero })}
                          </p>
                          <p className="font-mono text-[12px] text-zinc-500">
                            {formaterDate(champion.closed_at, locale)}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <LogoProjet
                            nom={champion.project_name}
                            projectUrl={champion.project_url}
                            logoUrl={champion.logo_url}
                          />
                          <div className="min-w-0">
                            <p className="flex items-center gap-2.5 text-2xl font-bold tracking-tight">
                              <span className="truncate">{champion.project_name}</span>
                              <PastilleFleche sombre />
                            </p>
                            <p className="mt-1 text-[15px] text-zinc-600">
                              {d.palmares.remportePour}{" "}
                              <span className="font-bold text-zinc-950 tabular-nums">
                                {formaterMontant(champion.amount_cents, locale)}
                              </span>{" "}
                              · {d.categories[champion.category as CategorieCle] ?? champion.category}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </Reveal>
                ))}
              </ol>
            )}
          </div>
        </div>
      </main>

      <PiedPage d={d} />
    </div>
  );
}
