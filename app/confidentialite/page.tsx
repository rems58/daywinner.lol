import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { construireMeta } from "@/lib/seo";
import { CoqueLegale, SectionsLegales } from "@/components/vue-legale";

export async function generateMetadata() {
  const [dl, locale] = await Promise.all([getDictionnaireLegal(), getLocale()]);
  return construireMeta({
    titre: `${dl.confidentialite.titre} · daywinner.lol`,
    description: dl.confidentialite.meta,
    chemin: "/confidentialite",
    locale,
  });
}

export default async function Confidentialite() {
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
      oeil={dl.confidentialite.oeil}
      titre={dl.confidentialite.titre}
      primaute={dl.primaute}
    >
      <SectionsLegales sections={dl.confidentialite.sections} />
    </CoqueLegale>
  );
}
