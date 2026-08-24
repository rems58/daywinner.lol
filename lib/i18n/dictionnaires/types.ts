// Forme d'un dictionnaire. TypeScript garantit qu'aucune langue n'oublie une
// cle : ajouter un texte ici casse la compilation tant que les cinq langues
// ne l'ont pas traduit, ce qui evite les trous silencieux a l'ecran.

/**
 * Les categories sont stockees en base sous ces cles stables. Seul l'affichage
 * est traduit : renommer un libelle ne rend pas les anciennes lignes illisibles.
 */
export const CATEGORIES = [
  "ia",
  "seo",
  "dev",
  "productivite",
  "marketing",
  "design",
  "crypto",
  "jeux",
  "ecommerce",
  "autre",
] as const;

export type CategorieCle = (typeof CATEGORIES)[number];

export type Article = { n: string; titre: string; corps: string[] };
export type Etape = { titre: string; corps: string };
export type LienEditorial = { oeil: string; label: string };

export type Dictionnaire = {
  meta: { titre: string; description: string };

  nav: { palmares: string; regles: string; miser: string; langue: string };

  stats: { enLigne: string; visiteurs: string; voirStats: string };

  chrono: {
    clotureDans: string;
    heures: string;
    minutes: string;
    secondes: string;
    clotureEnCours: string;
  };

  accueil: {
    jourEnDirect: string; // {n}
    classementDuJour: string;
    prendrePremierePlace: string;
    ouvrirLaJournee: string;
    tientLeTitre: string; // {projet} {montant}
    tableauVierge: string; // {montant}
    liens: { classement: LienEditorial; mise: LienEditorial; palmares: LienEditorial };
    manifesteTitre: string;
    manifesteTexte: string;
    miseOeil: string;
    miseTitre: string;
    miseIntro: string;
    etapesMise: [Etape, Etape, Etape];
    commentOeil: string;
    commentTitre: string;
    commentLien: string;
    etapes: [Etape, Etape, Etape, Etape];
    merci: string;
    annule: string;
    entracteOeil: string;
    entracteTitre: string;
    entracteTexte: string;
  };

  classement: {
    videOeil: string;
    videTitre: string; // {n}
    videTexte: string;
    videCta: string; // {montant}
    premierePlace: string; // {n}
    voirComplet: string;
    clics: string; // {n}
    page: string; // {page} {total}
    precedente: string;
    suivante: string;
  };

  formulaire: {
    taMise: string;
    des: string; // {montant}
    apercuNom: string;
    apercuUrl: string;
    nomProjet: string;
    nomPlaceholder: string;
    url: string;
    urlPlaceholder: string;
    logo: string;
    choisirFichier: string;
    envoiEnCours: string;
    retirer: string;
    logoPlaceholder: string;
    logoAide: string;
    description: string;
    descriptionPlaceholder: string;
    categorie: string;
    categoriePlaceholder: string;
    montant: string;
    montantAide: string; // {montant}
    miserEtPayer: string;
    redirection: string;
    paiementNote: string;
    erreurFormat: string;
    erreurPoids: string;
    erreurEnvoiLogo: string;
    erreurServeur: string; // {statut}
    erreurReseau: string;
  };

  palmares: {
    oeil: string;
    titre: string;
    meta: string;
    encaisse: string;
    manchesJouees: string;
    misesRecues: string;
    videOeil: string;
    videTitre: string;
    videTexte: string;
    videCta: string;
    remportePour: string;
  };

  jour: {
    jourNumero: string; // {n}
    enCoursOeil: string;
    clotureeOeil: string;
    enCoursMeta: string;
    clotureeMeta: string; // {date} {mises} {total}
    mise: string;
    mises: string;
    videOeil: string;
    videTitre: string;
    championDuJour: string;
    premierePlaceDirect: string;
    place: string; // {n}
    retourPalmares: string;
  };

  regles: {
    oeil: string;
    titre: string;
    meta: string;
    article: string;
    articles: Article[];
    encart: string;
    encartLien: string;
  };

  /** Messages renvoyes par les routes API, affiches tels quels au visiteur. */
  api: {
    requeteInvalide: string;
    champsRequis: string;
    categorieInvalide: string;
    miseMinimale: string; // {montant}
    logoHttps: string;
    urlInvalide: string;
    aucuneManche: string;
    paiementImpossible: string;
    aucunFichier: string;
    tropEnvois: string;
  };

  categories: Record<CategorieCle, string>;

  pied: { accroche: string };
};
