import { creerClientPublic } from "@/lib/supabase/server";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { construireMeta } from "@/lib/seo";
import { getDictionnaireLegal } from "@/lib/i18n/serveur-legal";
import { VuePalmares } from "@/components/vue-palmares";
import type { Champion } from "@/lib/types";

export async function generateMetadata() {
  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);
  return construireMeta({
    titre: `${d.palmares.oeil} · daywinner.lol`,
    description: d.palmares.meta,
    chemin: "/palmares",
    locale,
  });
}

export default async function Palmares() {
  const [d, dl, locale] = await Promise.all([
    getDictionnaire(),
    getDictionnaireLegal(),
    getLocale(),
  ]);
  const supabase = creerClientPublic();

  const { data: champions } = await supabase
    .from("champions")
    .select("*")
    .returns<Champion[]>();

  const { data: mises } = await supabase.from("entries").select("amount_cents");
  const cumulCents = (mises ?? []).reduce((total, m) => total + m.amount_cents, 0);

  return (
    <VuePalmares
      d={d}
      dl={dl}
      locale={locale}
      champions={champions ?? []}
      cumulCents={cumulCents}
      nbMises={mises?.length ?? 0}
    />
  );
}
