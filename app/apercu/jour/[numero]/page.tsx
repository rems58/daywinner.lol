// Apercu du classement archive d'une manche. Injoignable en production.
import { notFound } from "next/navigation";
import { VueJour } from "@/components/vue-jour";
import { BandeauApercu } from "../../bandeau";
import { MISES, TOUTES_LES_MANCHES } from "../../donnees";

export default async function ApercuJour({ params }: PageProps<"/apercu/jour/[numero]">) {
  if (process.env.NODE_ENV === "production") notFound();

  const { numero } = await params;
  const manche = TOUTES_LES_MANCHES.find((m) => m.numero === Number(numero));
  if (!manche) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <BandeauApercu />
      <VueJour manche={manche} entries={MISES[manche.id] ?? []} basePath="/apercu" />
    </div>
  );
}
