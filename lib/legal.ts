/**
 * Identite legale de l'editeur, publiee dans les mentions legales.
 *
 * L'absence de ces mentions est penalement sanctionnee (LCEN art. 6 III,
 * jusqu'a 1 an d'emprisonnement et 75 000 EUR d'amende), donc chaque valeur
 * doit etre reelle avant l'ouverture au public.
 *
 * Les valeurs marquees A_COMPLETER font echouer la verification lancee par
 * `npm run verifier-legal`, pour qu'aucune ne parte en production par oubli.
 */
export const A_COMPLETER = "A_COMPLETER";

export const EDITEUR = {
  /** Nom et prenom de l'entrepreneur individuel. */
  nom: "Rémy Magne",
  /** Forme juridique affichee telle quelle. */
  statut: "Entrepreneur individuel (micro-entreprise)",
  /** Code d'activite principale declare. */
  ape: "6201Z",
  /** Adresse complete du siege : numero, rue, code postal, ville, pays. */
  adresse: "A_COMPLETER",
  /** 14 chiffres, sans espaces. */
  siret: "A_COMPLETER",
  /** Adresse de contact, doit etre relevee reellement. */
  email: "contact@daywinner.lol",
  /** La LCEN exige un moyen de contact direct : telephone ou formulaire. */
  telephone: "A_COMPLETER",
  /**
   * Micro-entreprise en franchise en base : pas de numero de TVA a publier,
   * mais la mention d'exoneration est obligatoire sur les factures.
   * Passer a false et renseigner tvaIntracom si tu depasses les seuils.
   */
  franchiseTva: true,
  tvaIntracom: null as string | null,
} as const;

export const HEBERGEUR = {
  nom: "Vercel Inc.",
  adresse: "440 N Barranca Ave #4133, Covina, CA 91723, Etats-Unis",
  site: "https://vercel.com",
} as const;

/**
 * Mediateur de la consommation : l'adhesion est obligatoire pour tout
 * professionnel vendant a des consommateurs (code de la consommation
 * art. L612-1), et ses coordonnees doivent figurer dans les CGV.
 */
export const MEDIATEUR = {
  nom: A_COMPLETER,
  site: A_COMPLETER,
  adresse: A_COMPLETER,
} as const;

/** Plateforme europeenne de reglement en ligne des litiges (reglement UE 524/2013). */
export const PLATEFORME_RLL = "https://ec.europa.eu/consumers/odr";

/** Vrai si une valeur obligatoire n'a pas encore ete renseignee. */
export function legalIncomplet(): string[] {
  const manquants: string[] = [];
  for (const [cle, valeur] of Object.entries(EDITEUR)) {
    if (valeur === A_COMPLETER) manquants.push(`EDITEUR.${cle}`);
  }
  for (const [cle, valeur] of Object.entries(MEDIATEUR)) {
    if (valeur === A_COMPLETER) manquants.push(`MEDIATEUR.${cle}`);
  }
  return manquants;
}
