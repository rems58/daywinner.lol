import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { construireMeta } from "@/lib/seo";
import { CoqueLegale, SectionsLegales } from "@/components/vue-legale";
import { EDITEUR, HEBERGEUR } from "@/lib/legal";

export async function generateMetadata() {
  const [dl, locale] = await Promise.all([getDictionnaireLegal(), getLocale()]);
  return construireMeta({
    titre: `${dl.mentions.titre} · daywinner.lol`,
    description: dl.mentions.meta,
    chemin: "/mentions-legales",
    locale,
  });
}

export default async function MentionsLegales() {
  const [d, dl, locale] = await Promise.all([
    getDictionnaire(),
    getDictionnaireLegal(),
    getLocale(),
  ]);

  const lignes: Array<[string, string]> = [
    [dl.mentions.nom, EDITEUR.nom],
    [dl.mentions.statut, EDITEUR.statut],
    [dl.mentions.adresse, EDITEUR.adresse],
    [dl.mentions.siret, EDITEUR.siret],
    [dl.mentions.email, EDITEUR.email],
    [dl.mentions.telephone, EDITEUR.telephone],
  ];

  return (
    <CoqueLegale
      d={d}
      dl={dl}
      locale={locale}
      oeil={dl.mentions.oeil}
      titre={dl.mentions.titre}
      primaute={dl.primaute}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {dl.mentions.editeurTitre}
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-zinc-700">
          {dl.mentions.editeurIntro}
        </p>
        <dl className="mt-5 flex flex-col gap-3 text-[15px]">
          {lignes.map(([libelle, valeur]) => (
            <div key={libelle} className="flex flex-wrap gap-x-3 border-t border-zinc-200 pt-3">
              <dt className="font-mono text-[11px] tracking-[0.15em] text-zinc-500 uppercase sm:w-44 sm:shrink-0">
                {libelle}
              </dt>
              <dd className="text-zinc-800">{valeur}</dd>
            </div>
          ))}
          <div className="flex flex-wrap gap-x-3 border-t border-zinc-200 pt-3">
            <dt className="font-mono text-[11px] tracking-[0.15em] text-zinc-500 uppercase sm:w-44 sm:shrink-0">
              {dl.mentions.tva}
            </dt>
            <dd className="text-zinc-800">
              {EDITEUR.franchiseTva ? dl.mentions.tvaFranchise : EDITEUR.tvaIntracom}
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {dl.mentions.directeurTitre}
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-zinc-700">
          {dl.mentions.directeurCorps}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {dl.mentions.hebergeurTitre}
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-zinc-700">
          {dl.mentions.hebergeurCorps}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-800">
          {HEBERGEUR.nom}, {HEBERGEUR.adresse}
          <br />
          <a
            href={HEBERGEUR.site}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {HEBERGEUR.site}
          </a>
        </p>
      </section>

      <SectionsLegales sections={dl.mentions.sections} />
    </CoqueLegale>
  );
}
