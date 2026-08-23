import { creerClientPublic } from "@/lib/supabase/server";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import { VuePalmares } from "@/components/vue-palmares";
import type { Champion } from "@/lib/types";

export async function generateMetadata() {
  const d = await getDictionnaire();
  return { title: `${d.palmares.oeil} · daywinner.lol`, description: d.palmares.meta };
}

export default async function Palmares() {
  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);
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
      locale={locale}
      champions={champions ?? []}
      cumulCents={cumulCents}
      nbMises={mises?.length ?? 0}
    />
  );
}
