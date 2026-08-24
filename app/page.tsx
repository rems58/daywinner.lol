import { creerClientPublic } from "@/lib/supabase/server";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { MISE_MIN_CENTS, formaterMontant, remplir } from "@/lib/constantes";
import { TableauDeBord } from "@/components/tableau-de-bord";
import { Navigation, PiedPage, TitreSection, ROUGE } from "@/components/habillage";
import { Reveal } from "@/components/fx";
import { BandeauPaiement } from "@/components/bandeau-paiement";
import { COLONNES_ENTREE, type Manche, type Entree } from "@/lib/types";
import { construireMeta } from "@/lib/seo";
import { DonneesStructurees } from "@/components/donnees-structurees";
import { SITE_NOM, urlAbsolue } from "@/lib/site";

export async function generateMetadata() {
  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);
  return construireMeta({
    titre: d.meta.titre,
    description: d.meta.description,
    chemin: "/",
    locale,
  });
}

export default async function Accueil({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const [d, dl, locale] = await Promise.all([
    getDictionnaire(),
    getDictionnaireLegal(),
    getLocale(),
  ]);
  const supabase = creerClientPublic();

  const { data: manche } = await supabase
    .from("manches")
    .select("*")
    .is("closed_at", null)
    .maybeSingle<Manche>();

  const { data: entries } = manche
    ? await supabase
        .from("entries")
        .select(COLONNES_ENTREE)
        .eq("manche_id", manche.id)
        .returns<Entree[]>()
    : { data: [] as Entree[] };

  return (
    <div className="flex flex-1 flex-col">
      <DonneesStructurees
        donnees={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": urlAbsolue("/#site"),
              name: SITE_NOM,
              url: urlAbsolue("/"),
              inLanguage: locale,
              description: d.meta.description,
              publisher: { "@id": urlAbsolue("/#editeur") },
            },
            {
              "@type": "Organization",
              "@id": urlAbsolue("/#editeur"),
              name: SITE_NOM,
              url: urlAbsolue("/"),
              logo: urlAbsolue("/icon.svg"),
            },
          ],
        }}
      />

      {(params.merci || params.annule) && (
        <BandeauPaiement
          message={params.merci ? d.accueil.merci : d.accueil.annule}
          succes={Boolean(params.merci)}
        />
      )}

      {manche ? (
        <TableauDeBord
        dl={dl}
          d={d}
          locale={locale}
          rondeInitiale={manche}
          misesInitiales={entries ?? []}
        />
      ) : (
        <section className="relative flex min-h-[60dvh] flex-col bg-encre text-white">
          <div className="cosmos-nebula absolute inset-0" aria-hidden />
          <div className="cosmos-stars absolute inset-0" aria-hidden />
          <Navigation d={d} locale={locale} />
          <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-24">
            <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-white/60 uppercase">
              {d.accueil.entracteOeil}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              {d.accueil.entracteTitre}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              {d.accueil.entracteTexte}
            </p>
          </div>
        </section>
      )}

      {/* COMMENT CA MARCHE */}
      <section id="comment" className="scroll-mt-10 border-t border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-28">
          <TitreSection
            oeilDeBoeuf={d.accueil.commentOeil}
            titre={d.accueil.commentTitre}
            lienLabel={d.accueil.commentLien}
            lienHref="/regles"
          />
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {d.accueil.etapes.map((etape, i) => (
              <Reveal key={etape.titre} delay={0.1 + i * 0.1}>
                <li className="border-t-2 border-zinc-950 pt-5">
                  <span className="font-mono text-sm font-semibold" style={{ color: ROUGE }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">
                    {remplir(etape.titre, {
                      montant: formaterMontant(MISE_MIN_CENTS, locale),
                    })}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                    {etape.corps}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <PiedPage d={d} dl={dl} />
    </div>
  );
}
