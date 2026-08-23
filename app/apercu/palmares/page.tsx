// Apercu du palmares avec deux manches cloturees. Injoignable en production.
import { notFound } from "next/navigation";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { VuePalmares } from "@/components/vue-palmares";
import { BandeauApercu } from "../bandeau";
import { CHAMPIONS, TOUTES_LES_MISES } from "../donnees";

export default async function ApercuPalmares() {
  if (process.env.NODE_ENV === "production") notFound();

  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);

  const cumulCents = TOUTES_LES_MISES.reduce((total, m) => total + m.amount_cents, 0);

  return (
    <div className="flex flex-1 flex-col">
      <BandeauApercu />
      <VuePalmares
        d={d}
        locale={locale}
        champions={CHAMPIONS}
        cumulCents={cumulCents}
        nbMises={TOUTES_LES_MISES.length}
        basePath="/apercu"
      />
    </div>
  );
}
