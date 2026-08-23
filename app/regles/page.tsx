import Link from "next/link";
import { EnteteInterieure, PiedPage, ROUGE } from "@/components/habillage";
import { Reveal } from "@/components/fx";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { construireMeta } from "@/lib/seo";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { formaterMontant, remplir, MISE_MIN_CENTS } from "@/lib/constantes";

export async function generateMetadata() {
  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);
  return construireMeta({
    titre: `${d.regles.oeil} · daywinner.lol`,
    description: d.regles.meta,
    chemin: "/regles",
    locale,
  });
}

export default async function Regles() {
  const [d, dl, locale] = await Promise.all([
    getDictionnaire(),
    getDictionnaireLegal(),
    getLocale(),
  ]);
  const montant = formaterMontant(MISE_MIN_CENTS, locale);

  return (
    <div className="flex flex-1 flex-col">
      <EnteteInterieure
        d={d}
        locale={locale}
        oeilDeBoeuf={d.regles.oeil}
        titre={d.regles.titre}
        meta={d.regles.meta}
      />

      <main className="flex-1 bg-white">
        {/* L'espacement vit sur le conteneur : chaque section etant le premier
            enfant de son propre Reveal, une marge en `first:mt-0` s'annulerait
            partout au lieu du seul premier article. */}
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-20 sm:gap-20 sm:py-28">
          {d.regles.articles.map((article, i) => (
            <Reveal key={article.n} delay={i * 0.06}>
              <section>
                <p
                  className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase"
                  style={{ color: ROUGE }}
                >
                  {d.regles.article} {article.n}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  {article.titre}
                </h2>
                <div className="mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-zinc-700 sm:text-base">
                  {article.corps.map((paragraphe) => (
                    <p key={paragraphe}>{remplir(paragraphe, { montant })}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="border-l-4 border-zinc-950 bg-zinc-50 px-5 py-4">
              <p className="text-[15px] leading-relaxed text-zinc-700">
                {d.regles.encart}{" "}
                <Link
                  href="/#comment"
                  className="font-bold text-zinc-950 underline decoration-2 underline-offset-4 transition-colors hover:decoration-[#e8442e]"
                >
                  {d.regles.encartLien}
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </main>

      <PiedPage d={d} dl={dl} />
    </div>
  );
}
