import Link from "next/link";
import { CHAMPIONS } from "./donnees";

/** Rappel permanent que rien de ce qui est affiche n'est reel. */
export function BandeauApercu() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-amber-300 px-4 py-2 text-center text-[13px] font-medium text-amber-950">
      <span>Aperçu : données fictives, page absente en production.</span>
      <span className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/apercu" className="underline underline-offset-4">
          Jour en cours
        </Link>
        <Link href="/apercu/palmares" className="underline underline-offset-4">
          Palmarès
        </Link>
        {CHAMPIONS.map((champion) => (
          <Link
            key={champion.numero}
            href={`/apercu/jour/${champion.numero}`}
            className="underline underline-offset-4"
          >
            Jour #{champion.numero}
          </Link>
        ))}
      </span>
    </div>
  );
}
