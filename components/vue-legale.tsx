// Coque commune aux pages juridiques : bandeau sombre, corps editorial
// etroit, avertissement de primaute affiche hors francais.
import type { ReactNode } from "react";
import { EnteteInterieure, PiedPage, ROUGE } from "@/components/habillage";
import { Reveal } from "@/components/fx";
import type { Dictionnaire } from "@/lib/i18n/dictionnaires/types";
import type { SectionLegale, DictionnaireLegal } from "@/lib/i18n/dictionnaires/legal-types";
import type { Locale } from "@/lib/i18n/config";

export function CoqueLegale({
  d,
  dl,
  locale,
  oeil,
  titre,
  meta,
  primaute,
  children,
}: {
  d: Dictionnaire;
  dl: DictionnaireLegal;
  locale: Locale;
  oeil: string;
  titre: string;
  meta?: string;
  primaute: string | null;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <EnteteInterieure d={d} locale={locale} oeilDeBoeuf={oeil} titre={titre} meta={meta} />
      <main className="flex-1 bg-white">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-6 py-16 sm:gap-16 sm:py-24">
          {primaute && (
            <p
              className="border-l-4 px-4 py-3 text-[14px] leading-relaxed"
              style={{ borderColor: ROUGE, backgroundColor: "#fdf1ef", color: "#7a1d10" }}
            >
              {primaute}
            </p>
          )}
          {children}
        </div>
      </main>
      <PiedPage d={d} dl={dl} />
    </div>
  );
}

/** Section numerotee ou non, selon que le document est un contrat. */
export function SectionsLegales({
  sections,
  prefixe,
  numerote = false,
}: {
  sections: SectionLegale[];
  prefixe?: string;
  numerote?: boolean;
}) {
  return (
    <>
      {sections.map((section, i) => (
        <Reveal key={section.titre} delay={Math.min(i * 0.04, 0.3)}>
          <section>
            {numerote && (
              <p
                className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase"
                style={{ color: ROUGE }}
              >
                {prefixe} {String(i + 1).padStart(2, "0")}
              </p>
            )}
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              {section.titre}
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-zinc-700">
              {section.corps.map((paragraphe) => (
                <p key={paragraphe}>{paragraphe}</p>
              ))}
            </div>
          </section>
        </Reveal>
      ))}
    </>
  );
}
