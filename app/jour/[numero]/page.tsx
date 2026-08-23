import { notFound } from "next/navigation";
import { creerClientPublic } from "@/lib/supabase/server";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { remplir } from "@/lib/constantes";
import { VueJour } from "@/components/vue-jour";
import type { Manche, Entree } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/jour/[numero]">) {
  const { numero } = await params;
  const d = await getDictionnaire();
  return {
    title: `${remplir(d.jour.jourNumero, { n: numero })} · daywinner.lol`,
    openGraph: { images: [`/api/og/${numero}`] },
  };
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
    .select("*")
    .eq("manche_id", manche.id)
    .order("amount_cents", { ascending: false })
    .order("created_at", { ascending: true })
    .returns<Entree[]>();

  return <VueJour d={d} dl={dl} locale={locale} manche={manche} entries={entries ?? []} />;
}
