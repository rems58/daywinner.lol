// Apercu du palmares avec deux manches cloturees. Injoignable en production.
import { notFound } from "next/navigation";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { VuePalmares } from "@/components/vue-palmares";
import { BandeauApercu } from "../bandeau";
import { CHAMPIONS, TOUTES_LES_MISES } from "../donnees";

export default async function ApercuPalmares() {
  if (process.env.NODE_ENV === "production") notFound();

  const [d, dl, locale] = await Promise.all([
    getDictionnaire(),
    getDictionnaireLegal(),
    getLocale(),
  ]);

  const cumulCents = TOUTES_LES_MISES.reduce((total, m) => total + m.amount_cents, 0);

  return (
    <div className="flex flex-1 flex-col">
      <BandeauApercu />
      <VuePalmares
        d={d}
        dl={dl}
        locale={locale}
        champions={CHAMPIONS}
        cumulCents={cumulCents}
        nbMises={TOUTES_LES_MISES.length}
        basePath="/apercu"
      />
    </div>
  );
}
