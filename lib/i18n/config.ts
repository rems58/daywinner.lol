// Langues gerees et negociation de la langue d'affichage.
// Logique pure : la lecture du cookie et des en-tetes se fait cote serveur.

export const LOCALES = ["en", "fr", "de", "it", "es"] as const;
export type Locale = (typeof LOCALES)[number];

// Anglais par defaut : c'est la langue de repli quand on ne sait rien du visiteur.
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "daywinner_langue";

const LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  es: "Español",
};

// Codes courts pour le selecteur de la barre de navigation, ou la place manque.
const CODES: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  it: "IT",
  es: "ES",
};

export function isLocale(valeur: string | null | undefined): valeur is Locale {
  return typeof valeur === "string" && (LOCALES as readonly string[]).includes(valeur);
}

export function libelleLocale(locale: Locale): string {
  return LABELS[locale];
}

export function codeLocale(locale: Locale): string {
  return CODES[locale];
}

/**
 * Un choix explicite du visiteur prime toujours sur ce que declare son
 * navigateur. Sinon on lit Accept-Language en respectant les facteurs de
 * qualite (q=...), pour qu'un visiteur qui prefere l'espagnol a l'anglais
 * obtienne bien l'espagnol. En dernier recours, anglais.
 */
export function negocierLocale(
  valeurCookie: string | null | undefined,
  acceptLanguage: string | null | undefined
): Locale {
  if (isLocale(valeurCookie)) return valeurCookie;
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const candidats = acceptLanguage
    .split(",")
    .map((partie) => {
      const [etiquette, ...params] = partie.trim().split(";");
      const paramQ = params.find((p) => p.trim().startsWith("q="));
      const analyse = paramQ ? Number.parseFloat(paramQ.trim().slice(2)) : 1;
      // Un q illisible ne doit pas ecarter la langue : on le traite comme
      // une preference pleine plutot que de la faire disparaitre.
      const q = Number.isFinite(analyse) ? analyse : 1;
      // "fr-CA" et "fr-FR" mènent tous deux au francais.
      return { base: etiquette.trim().toLowerCase().split("-")[0], q };
    })
    .filter((c) => c.base.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const candidat of candidats) {
    if (isLocale(candidat.base)) return candidat.base;
  }
  return DEFAULT_LOCALE;
}
