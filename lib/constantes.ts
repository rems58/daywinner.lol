// 1 € du debut a la fin de la manche : n'importe qui peut entrer au
// classement pour le prix d'un cafe, meme quand le haut du tableau est cher.
// A montant egal, c'est l'anteriorite qui departage (le premier arrive reste
// devant), donc un plancher bas ne permet pas de doubler quelqu'un.
export const MISE_MIN_CENTS = 100;

export const FENETRE_ANTI_SNIPE_MS = 2 * 60 * 1000;
export const PROLONGATION_ANTI_SNIPE_MS = 2 * 60 * 1000;

// La cloture est ancree sur une heure murale, et non sur "24 h apres la
// precedente". Sinon chaque prolongation anti-snipe, et jusqu'au simple
// retard du cron, decalerait definitivement toutes les manches suivantes :
// le rendez-vous quotidien deviendrait mobile et personne ne pourrait en
// prendre l'habitude.
export const HEURE_CLOTURE = 21;
export const FUSEAU_CLOTURE = "Europe/Paris";

// Duree plancher d'une manche fraichement ouverte : evite d'en creer une qui
// se refermerait dans la foulee si l'ancre du jour vient juste d'etre passee.
const MANCHE_MIN_MS = 60 * 60 * 1000;
const JOUR_MS = 24 * 60 * 60 * 1000;

type PartiesDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

/** Lecture d'un instant sur l'horloge murale du fuseau de cloture. */
function partiesDansFuseau(instant: Date): PartiesDate {
  const parties = new Intl.DateTimeFormat("en-US", {
    timeZone: FUSEAU_CLOTURE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);

  const lu: Record<string, number> = {};
  for (const p of parties) {
    if (p.type !== "literal") lu[p.type] = Number(p.value);
  }
  return lu as unknown as PartiesDate;
}

/** Decalage du fuseau par rapport a UTC, en minutes, a cet instant precis. */
function decalageMinutes(instant: Date) {
  const p = partiesDansFuseau(instant);
  const luCommeUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  // On tronque les millisecondes des deux cotes : le format n'en rend pas.
  return (luCommeUTC - Math.floor(instant.getTime() / 1000) * 1000) / 60000;
}

/** Instant UTC ou l'horloge de Paris affiche ce jour a HEURE_CLOTURE pile. */
function ancrage(annee: number, mois: number, jour: number) {
  const naif = Date.UTC(annee, mois - 1, jour, HEURE_CLOTURE, 0, 0);
  // Deux passes : la premiere estime le decalage, la seconde le corrige si
  // cette estimation tombait de l'autre cote d'un changement d'heure.
  let ts = naif;
  for (let i = 0; i < 2; i++) {
    ts = naif - decalageMinutes(new Date(ts)) * 60000;
  }
  return ts;
}

/**
 * Prochaine cloture : le prochain HEURE_CLOTURE h de Paris, ete comme hiver.
 * Absorbe la derive, une manche prolongee jusqu'a 21 h 14 par une bataille
 * anti-snipe est suivie d'une manche qui se referme quand meme a 21 h pile
 * le lendemain.
 */
export function prochaineCloture(depuis: Date = new Date()) {
  const p = partiesDansFuseau(depuis);
  let candidat = ancrage(p.year, p.month, p.day);
  if (candidat - depuis.getTime() < MANCHE_MIN_MS) {
    const lendemain = partiesDansFuseau(new Date(depuis.getTime() + JOUR_MS));
    candidat = ancrage(lendemain.year, lendemain.month, lendemain.day);
  }
  return new Date(candidat);
}

// Les categories vivent desormais dans le dictionnaire : la base stocke une
// cle stable, l'affichage la traduit. Reexporte ici pour que les modules qui
// validaient deja CATEGORIES n'aient pas a changer d'import.
export { CATEGORIES, type CategorieCle } from "@/lib/i18n/dictionnaires/types";

/**
 * Montant formate dans la langue du visiteur. La devise reste l'euro quelle
 * que soit la langue : c'est ce qui est reellement debite, pas une
 * conversion. Seule la mise en forme change (1 234,50 € contre €1,234.50).
 */
export function formaterMontant(cents: number, locale = "fr") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** Remplace les {jetons} d'un texte du dictionnaire par leurs valeurs. */
export function remplir(
  gabarit: string,
  valeurs: Record<string, string | number>
) {
  return gabarit.replace(/\{(\w+)\}/g, (entier, cle) =>
    cle in valeurs ? String(valeurs[cle]) : entier
  );
}

export function normaliserUrl(url: string) {
  return url
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

export const PROJECT_URL_MAX = 200;

/**
 * URL de projet acceptable. Le champ accepte aussi bien un domaine qu'un
 * @handle de reseau social, donc on ne peut pas exiger un `new URL()`
 * complet. On verrouille en revanche le schema : un lien sortant n'a aucune
 * raison de porter "javascript:", "data:" ou "vbscript:".
 */
export function projectUrlValide(url: string) {
  const brut = url.trim();
  if (!brut || brut.length > PROJECT_URL_MAX) return false;

  const schema = brut.match(/^([a-z][a-z0-9+.-]*):/i);
  if (schema && !/^https?$/i.test(schema[1])) return false;

  // Un @handle n'a pas de domaine exploitable : accepte tel quel, l'affichage
  // retombe sur le monogramme.
  if (/^@[a-z0-9_.]{1,50}$/i.test(brut)) return true;

  const hote = normaliserUrl(brut).split("/")[0];
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(hote);
}

export const LOGO_URL_MAX = 300;
export const LOGO_POIDS_MAX = 2 * 1024 * 1024; // 2 Mio
// Le SVG est volontairement absent : c'est un document, pas une image inerte.
// Depose tel quel dans un depot public, il devient une page hebergee sous le
// domaine du projet, exploitable en hameconnage. Les formats matriciels
// couvrent le besoin d'un logo.
export const LOGO_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
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
