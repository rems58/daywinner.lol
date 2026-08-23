import type { Metadata } from "next";
import { SITE_NOM, urlAbsolue } from "@/lib/site";
import { LOCALES, type Locale } from "@/lib/i18n/config";

// Open Graph attend une etiquette de territoire (fr_FR), pas le code court
// du selecteur de langue. Deux tables distinctes pour deux usages distincts.
const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  es: "es_ES",
};

type Options = {
  titre: string;
  description: string;
  /** Chemin interne de la page, "/" pour l'accueil. */
  chemin: string;
  locale: Locale;
  /** Carte de partage. Par defaut la carte generique de la marque. */
  image?: string;
  /** Une page utilitaire (apercu de demonstration) ne doit pas etre indexee. */
  indexable?: boolean;
};

/**
 * Fabrique le jeu complet de metadonnees d'une page.
 *
 * Centralise parce que Next remplace `openGraph` en bloc des qu'une page en
 * declare un : une page qui ne fournirait que `images` perdrait le titre et
 * la description heritee du layout, et son apercu de partage sortirait vide.
 */
export function construireMeta({
  titre,
  description,
  chemin,
  locale,
  image,
  indexable = true,
}: Options): Metadata {
  const url = urlAbsolue(chemin);
  const carte = image ?? urlAbsolue(`/api/og-site?l=${locale}`);

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    ...(indexable ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      type: "website",
      siteName: SITE_NOM,
      url,
      title: titre,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      images: [{ url: carte, width: 1200, height: 630, alt: titre }],
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
      images: [carte],
    },
  };
}
