// 1 € du debut a la fin de la manche : n'importe qui peut entrer au
// classement pour le prix d'un cafe, meme quand le haut du tableau est cher.
// A montant egal, c'est l'anteriorite qui departage (le premier arrive reste
// devant), donc un plancher bas ne permet pas de doubler quelqu'un.
export const MISE_MIN_CENTS = 100;

export const FENETRE_ANTI_SNIPE_MS = 2 * 60 * 1000;
export const PROLONGATION_ANTI_SNIPE_MS = 2 * 60 * 1000;
export const DUREE_MANCHE_MS = 24 * 60 * 60 * 1000;

export const CATEGORIES = [
  "IA & Agents",
  "SEO & Visibilite",
  "Outils dev",
  "Productivite",
  "Marketing & Growth",
  "Design & Creatif",
  "Crypto & Web3",
  "Jeux & Divertissement",
  "E-commerce",
  "Autre",
] as const;

export function formaterMontant(cents: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function normaliserUrl(url: string) {
  return url
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

export const LOGO_URL_MAX = 300;
export const LOGO_POIDS_MAX = 2 * 1024 * 1024; // 2 Mio
export const LOGO_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
] as const;

/**
 * Un logo n'est accepte qu'en https : une image http serait de toute facon
 * bloquee par le navigateur sur une page servie en https.
 */
export function logoUrlValide(url: string) {
  if (url.length > LOGO_URL_MAX) return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Repli quand le miseur n'a pas fourni de logo : le favicon du domaine.
 * Un @handle (reseau social) n'a pas de domaine exploitable, on renvoie
 * null et l'affichage bascule sur le monogramme.
 */
export function faviconDepuisUrl(projectUrl: string) {
  const domaine = normaliserUrl(projectUrl).split("/")[0];
  if (!domaine || !domaine.includes(".")) return null;
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domaine)}&sz=128`;
}
