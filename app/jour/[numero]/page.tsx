import { notFound } from "next/navigation";
import { creerClientPublic } from "@/lib/supabase/server";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { formaterMontant, remplir } from "@/lib/constantes";
import { construireMeta } from "@/lib/seo";
import { urlAbsolue } from "@/lib/site";
import { DonneesStructurees } from "@/components/donnees-structurees";
import { VueJour } from "@/components/vue-jour";
import { COLONNES_ENTREE, type Manche, type Entree } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/jour/[numero]">) {
  const { numero } = await params;
  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);
  const titreJour = remplir(d.jour.jourNumero, { n: numero });

  // Le champion, quand la journee est close, est ce qui distingue cette
  // archive de toutes les autres : sans lui, mille pages partageraient le
  // meme titre et la meme description.
  const { data: champion } = await creerClientPublic()
    .from("champions")
    .select("project_name, amount_cents")
    .eq("numero", Number(numero))
    .maybeSingle();

  return construireMeta({
    titre: champion
      ? `${titreJour} · ${champion.project_name} · daywinner.lol`
      : `${titreJour} · daywinner.lol`,
    description: champion
      ? `${d.jour.championDuJour} : ${champion.project_name}. ${d.palmares.remportePour} ${formaterMontant(champion.amount_cents, locale)}.`
      : d.jour.enCoursMeta,
    chemin: `/jour/${numero}`,
    locale,
    image: urlAbsolue(`/api/og/${numero}`),
  });
}

export default async function Jour({ params }: PageProps<"/jour/[numero]">) {
  const { numero } = await params;
  const [d, dl, locale] = await Promise.all([
    getDictionnaire(),
    getDictionnaireLegal(),
    getLocale(),
  ]);
  const supabase = creerClientPublic();

  const { data: manche } = await supabase
    .from("manches")
    .select("*")
    .eq("numero", Number(numero))
    .maybeSingle<Manche>();

  if (!manche) notFound();

  const { data: entries } = await supabase
    .from("entries")
    .select(COLONNES_ENTREE)
    .eq("manche_id", manche.id)
    .order("amount_cents", { ascending: false })
    .order("created_at", { ascending: true })
    .returns<Entree[]>();

  const classement = entries ?? [];

  return (
    <>
      {classement.length > 0 && (
        <DonneesStructurees
          donnees={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: remplir(d.jour.jourNumero, { n: manche.numero }),
            url: urlAbsolue(`/jour/${manche.numero}`),
            numberOfItems: classement.length,
            itemListOrder: "https://schema.org/ItemListOrderDescending",
            // Volontairement sans l'URL des annonceurs : ce sont des
            // emplacements payants, les faire figurer comme references dans
            // des donnees structurees reviendrait a les recommander.
            itemListElement: classement.slice(0, 50).map((entree, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: entree.project_name,
            })),
          }}
        />
      )}
      <VueJour d={d} dl={dl} locale={locale} manche={manche} entries={classement} />
    </>
  );
}
