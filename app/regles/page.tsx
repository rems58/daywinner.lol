import Link from "next/link";
import { EnteteInterieure, PiedPage, ROUGE } from "@/components/habillage";
import { Reveal } from "@/components/fx";
import { formaterMontant, MISE_MIN_CENTS } from "@/lib/constantes";

export const metadata = {
  title: "Règles · daywinner.lol",
  description:
    "Comment fonctionne daywinner.lol : classement payant, règle anti-snipe, reset quotidien, non-remboursement.",
};

const ARTICLES = [
  {
    n: "01",
    titre: "Le principe",
    corps: [
      "Chaque manche dure environ 24 heures. Pendant ce temps, n'importe qui peut miser pour prendre une place dans le classement : la mise la plus haute occupe la première place.",
      "Tu peux être dépassé à tout moment par quelqu'un qui mise plus. À la clôture, le classement est figé, le champion entre au palmarès, et une nouvelle manche démarre à zéro.",
    ],
  },
  {
    n: "02",
    titre: "Règle anti-snipe",
    corps: [
      "Si une mise est confirmée dans les deux dernières minutes avant la clôture, le chrono est automatiquement prolongé de deux minutes, comme dans une vraie salle des ventes.",
      "La manche ne se termine que lorsque plus personne n'a surenchéri pendant deux minutes. Personne ne peut donc voler la première place à la dernière seconde.",
    ],
  },
  {
    n: "03",
    titre: "Mise minimale",
    corps: [
      `${formaterMontant(MISE_MIN_CENTS)}, du début à la fin de la manche. Le ticket d'entrée ne monte jamais : n'importe qui peut rejoindre le classement pour le prix d'un café, même quand le haut du tableau est cher.`,
      "À montant égal, c'est l'ancienneté qui départage : celui qui a misé le premier reste devant. Égaler une mise ne suffit donc pas pour doubler quelqu'un, il faut faire mieux.",
      "Tu peux surenchérir sur ton propre projet à tout moment : remets la même URL avec un montant supérieur à ta mise précédente, ta ligne monte sans créer de doublon.",
    ],
  },
  {
    n: "04",
    titre: "Paiement et remboursement",
    corps: [
      "Le paiement se fait par carte via Stripe. Il n'est pas remboursable.",
      "Ta place dans le classement est temporaire : elle disparaît à la clôture de la manche, y compris si tu es premier au moment du reset. Le palmarès conserve une trace permanente du champion de chaque journée, mais pas des places suivantes.",
    ],
  },
  {
    n: "05",
    titre: "Contenu autorisé",
    corps: [
      "Un lien vers un vrai projet, produit, profil ou compte. Pas de contenu illégal, trompeur ou offensant.",
      "Nous nous réservons le droit de retirer une entrée qui ne respecte pas cette règle, sans remboursement.",
    ],
  },
];

export default function Regles() {
  return (
    <div className="flex flex-1 flex-col">
      <EnteteInterieure
        oeilDeBoeuf="Les règles"
        titre="Simple, honnête, sans surprise"
        meta="Voici exactement comment le classement fonctionne, et ce que tu achètes."
      />

      <main className="flex-1 bg-white">
        {/* L'espacement vit sur le conteneur : chaque section etant le premier
            enfant de son propre Reveal, une marge en `first:mt-0` s'annulerait
            partout au lieu du seul premier article. */}
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-20 sm:gap-20 sm:py-28">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.n} delay={i * 0.06}>
              <section>
                <p
                  className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase"
                  style={{ color: ROUGE }}
                >
                  Article {article.n}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  {article.titre}
                </h2>
                <div className="mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-zinc-700 sm:text-base">
                  {article.corps.map((paragraphe) => (
                    <p key={paragraphe}>{paragraphe}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="border-l-4 border-zinc-950 bg-zinc-50 px-5 py-4">
              <p className="text-[15px] leading-relaxed text-zinc-700">
                Une question avant de miser ?{" "}
                <Link
                  href="/#comment"
                  className="font-bold text-zinc-950 underline decoration-2 underline-offset-4 transition-colors hover:decoration-[#e8442e]"
                >
                  Revoir le fonctionnement en quatre étapes
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </main>

      <PiedPage />
    </div>
  );
}
