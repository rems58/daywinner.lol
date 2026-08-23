import { notFound } from "next/navigation";
import { creerClientPublic } from "@/lib/supabase/server";
import { VueJour } from "@/components/vue-jour";
import type { Manche, Entree } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/jour/[numero]">) {
  const { numero } = await params;
  return {
    title: `Jour #${numero} · daywinner.lol`,
    openGraph: { images: [`/api/og/${numero}`] },
  };
}

export default async function Jour({ params }: PageProps<"/jour/[numero]">) {
  const { numero } = await params;
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

  return <VueJour manche={manche} entries={entries ?? []} />;
}
