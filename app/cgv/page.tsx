import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { construireMeta } from "@/lib/seo";
import { CoqueLegale, SectionsLegales } from "@/components/vue-legale";
import { MEDIATEUR, PLATEFORME_RLL, A_COMPLETER } from "@/lib/legal";
import { CGV_VERSION } from "@/lib/cgv-version";
import { remplir } from "@/lib/constantes";

export async function generateMetadata() {
  const [dl, locale] = await Promise.all([getDictionnaireLegal(), getLocale()]);
  return construireMeta({
    titre: `${dl.cgv.titre} · daywinner.lol`,
    description: dl.cgv.meta,
    chemin: "/cgv",
    locale,
  });
}

export default async function Cgv() {
  const [d, dl, locale] = await Promise.all([
    getDictionnaire(),
    getDictionnaireLegal(),
    getLocale(),
  ]);

  return (
    <CoqueLegale
      d={d}
      dl={dl}
      locale={locale}
      oeil={dl.cgv.oeil}
      titre={dl.cgv.titre}
      meta={remplir(dl.cgv.versionLe, { version: CGV_VERSION })}
      primaute={dl.primaute}
    >
      <SectionsLegales sections={dl.cgv.articles} prefixe={dl.cgv.article} numerote />

      {/* Coordonnees du mediateur : obligatoires dans les CGV (art. L612-1).
          Tant qu'elles ne sont pas renseignees, on masque le bloc plutot que
          d'afficher une valeur technique sur une page publique. */}
      <section className="border-l-4 border-zinc-950 bg-zinc-50 px-5 py-4">
        {MEDIATEUR.nom !== A_COMPLETER && (
          <p className="text-[15px] leading-relaxed text-zinc-800">
            {MEDIATEUR.nom}
            <br />
            {MEDIATEUR.adresse}
            <br />
            {MEDIATEUR.site}
          </p>
        )}
        <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">
          <a
            href={PLATEFORME_RLL}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {PLATEFORME_RLL}
          </a>
        </p>
      </section>
    </CoqueLegale>
  );
}
