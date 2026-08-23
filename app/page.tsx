import { creerClientPublic } from "@/lib/supabase/server";
import { TableauDeBord } from "@/components/tableau-de-bord";
import { Navigation, PiedPage, TitreSection, ROUGE } from "@/components/habillage";
import { Reveal } from "@/components/fx";
import type { Manche, Entree } from "@/lib/types";

const ETAPES = [
  {
    titre: "Le tableau s'ouvre à 1 €",
    corps:
      "Chaque manche démarre vierge. La toute première mise du jour coûte 1 € : les lève-tôt tiennent la tête pour presque rien.",
  },
  {
    titre: "Les mises se surenchérissent",
    corps:
      "Le classement est trié par montant. Payer plus que le #1 actuel, c'est prendre sa place, en direct, sous les yeux de tout le monde.",
  },
  {
    titre: "Les deux dernières minutes comptent double",
    corps:
      "Une mise dans la fenêtre finale prolonge la manche de deux minutes. Impossible de rafler le titre à la dernière seconde.",
  },
  {
    titre: "À la clôture, tout repart de zéro",
    corps:
      "Le champion entre au palmarès avec son trophée partageable. Le classement se vide, et une nouvelle journée s'ouvre à 1 €.",
  },
];

export default async function Accueil({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const supabase = creerClientPublic();

  const { data: manche } = await supabase
    .from("manches")
    .select("*")
    .is("closed_at", null)
    .maybeSingle<Manche>();

  const { data: entries } = manche
    ? await supabase.from("entries").select("*").eq("manche_id", manche.id).returns<Entree[]>()
    : { data: [] as Entree[] };

  return (
    <div className="flex flex-1 flex-col">
      {(params.merci || params.annule) && (
        <div className="bg-encre px-6 pt-6 text-center">
          <p
            className="mx-auto max-w-7xl border-l-4 px-4 py-3 text-left text-[14px] leading-relaxed"
            style={
              params.merci
                ? { borderColor: ROUGE, backgroundColor: "#fdf1ef", color: "#7a1d10" }
                : { borderColor: "#3f3f46", backgroundColor: "#fafafa", color: "#3f3f46" }
            }
          >
            {params.merci
              ? "Paiement reçu — ta mise est en ligne. 🎉"
              : "Paiement annulé, aucune mise enregistrée."}
          </p>
        </div>
      )}

      {manche ? (
        <TableauDeBord rondeInitiale={manche} misesInitiales={entries ?? []} />
      ) : (
        <section className="relative flex min-h-[60dvh] flex-col bg-encre text-white">
          <div className="cosmos-nebula absolute inset-0" aria-hidden />
          <div className="cosmos-stars absolute inset-0" aria-hidden />
          <Navigation />
          <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-24">
            <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-white/60 uppercase">
              Entracte
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Aucune manche en cours.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              La prochaine journée s&apos;ouvre dans un instant — recharge la
              page pour prendre la première place à 1 €.
            </p>
          </div>
        </section>
      )}

      {/* COMMENT CA MARCHE */}
      <section id="comment" className="scroll-mt-10 border-t border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-28">
          <TitreSection
            oeilDeBoeuf="Le fonctionnement"
            titre="Une journée, un champion"
            lienLabel="Les règles"
            lienHref="/regles"
          />
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((etape, i) => (
              <Reveal key={etape.titre} delay={0.1 + i * 0.1}>
                <li className="border-t-2 border-zinc-950 pt-5">
                  <span className="font-mono text-sm font-semibold" style={{ color: ROUGE }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">{etape.titre}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                    {etape.corps}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <PiedPage />
    </div>
  );
}
