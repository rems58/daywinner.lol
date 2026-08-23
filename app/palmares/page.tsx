import { creerClientPublic } from "@/lib/supabase/server";
import { VuePalmares } from "@/components/vue-palmares";
import type { Champion } from "@/lib/types";

export const metadata = {
  title: "Palmarès · daywinner.lol",
  description: "Le champion de chaque jour depuis le lancement de daywinner.lol.",
};

// Le palmarès ne bouge qu'à chaque clôture de manche (~1x/jour) : une
// fraîcheur à la minute suffit, pas besoin de rendu dynamique par requête.
export const revalidate = 60;

export default async function Palmares() {
  const supabase = creerClientPublic();

  const { data: champions } = await supabase
    .from("champions")
    .select("*")
    .returns<Champion[]>();

  const { data: mises } = await supabase.from("entries").select("amount_cents");
  const cumulCents = (mises ?? []).reduce((total, m) => total + m.amount_cents, 0);

  return (
    <VuePalmares
      champions={champions ?? []}
      cumulCents={cumulCents}
      nbMises={mises?.length ?? 0}
    />
  );
}
