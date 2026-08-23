import "server-only";
// Langue de la requete courante et dictionnaire associe.
// Priorite : choix enregistre du visiteur, sinon langue du navigateur,
// sinon anglais.
import { cookies, headers } from "next/headers";
import { negocierLocale, LOCALE_COOKIE, type Locale } from "./config";
import type { Dictionnaire } from "./dictionnaires/types";
import { en } from "./dictionnaires/en";
import { fr } from "./dictionnaires/fr";
import { de } from "./dictionnaires/de";
import { it } from "./dictionnaires/it";
import { es } from "./dictionnaires/es";

const DICTIONNAIRES: Record<Locale, Dictionnaire> = { en, fr, de, it, es };

export async function getLocale(): Promise<Locale> {
  const [cookieStore, enTetes] = await Promise.all([cookies(), headers()]);
  return negocierLocale(
    cookieStore.get(LOCALE_COOKIE)?.value,
    enTetes.get("accept-language")
  );
}

export async function getDictionnaire(): Promise<Dictionnaire> {
  return DICTIONNAIRES[await getLocale()];
}

export function dictionnairePour(locale: Locale): Dictionnaire {
  return DICTIONNAIRES[locale];
}
