import "server-only";
// Dictionnaire juridique de la langue courante.
import { getLocale } from "./server";
import type { Locale } from "./config";
import type { DictionnaireLegal } from "./dictionnaires/legal-types";
import { legalFr } from "./dictionnaires/legal-fr";
import { legalEn } from "./dictionnaires/legal-en";
import { legalDe } from "./dictionnaires/legal-de";
import { legalIt } from "./dictionnaires/legal-it";
import { legalEs } from "./dictionnaires/legal-es";

const LEGAUX: Record<Locale, DictionnaireLegal> = {
  fr: legalFr,
  en: legalEn,
  de: legalDe,
  it: legalIt,
  es: legalEs,
};

export async function getDictionnaireLegal(): Promise<DictionnaireLegal> {
  return LEGAUX[await getLocale()];
}

export function legalPour(locale: Locale): DictionnaireLegal {
  return LEGAUX[locale];
}
