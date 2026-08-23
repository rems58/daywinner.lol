// Apercu visuel de la maquette avec des donnees factices, pour juger le
// rendu sans brancher Supabase. Volontairement injoignable en production :
// ces classements sont inventes et n'ont rien a faire en ligne.
import { notFound } from "next/navigation";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { TableauDeBord } from "@/components/tableau-de-bord";
import { PiedPage } from "@/components/habillage";
import { BandeauApercu } from "./bandeau";
import { MANCHE_EN_COURS, MISES } from "./donnees";

export default async function Apercu() {
  if (process.env.NODE_ENV === "production") notFound();

  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);

  return (
    <div className="flex flex-1 flex-col">
      <BandeauApercu />
      <TableauDeBord
        d={d}
        locale={locale}
        rondeInitiale={MANCHE_EN_COURS}
        misesInitiales={MISES[MANCHE_EN_COURS.id]}
        basePath="/apercu"
      />
      <PiedPage d={d} />
    </div>
  );
}
