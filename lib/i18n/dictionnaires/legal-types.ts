// Forme des documents juridiques. Le francais fait foi : l'editeur est une
// entreprise francaise soumise au droit francais, les autres langues sont
// fournies a titre informatif (cf. `primaute`).

export type SectionLegale = { titre: string; corps: string[] };

export type DictionnaireLegal = {
  /** Avertissement affiche dans toutes les langues sauf le francais. */
  primaute: string | null;

  mentions: {
    oeil: string;
    titre: string;
    meta: string;
    editeurTitre: string;
    editeurIntro: string;
    nom: string;
    statut: string;
    adresse: string;
    siret: string;
    email: string;
    telephone: string;
    tva: string;
    tvaFranchise: string;
    directeurTitre: string;
    directeurCorps: string;
    hebergeurTitre: string;
    hebergeurCorps: string;
    sections: SectionLegale[];
  };

  cgv: {
    oeil: string;
    titre: string;
    meta: string;
    versionLe: string; // {version}
    article: string;
    articles: SectionLegale[];
  };

  confidentialite: {
    oeil: string;
    titre: string;
    meta: string;
    sections: SectionLegale[];
  };

  /** Textes du formulaire lies au renoncement au droit de retractation. */
  retractation: {
    /** Case a cocher obligatoire, doit rester explicite et non pre-cochee. */
    caseACocher: string;
    /** Precision sous la case. */
    precision: string;
    /** Erreur si la case n'est pas cochee. */
    erreurNonCochee: string;
    /** Lien vers les CGV depuis le formulaire. */
    lireCgv: string;
  };

  pied: { mentions: string; cgv: string; confidentialite: string };
};
