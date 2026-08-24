export type Manche = {
  id: string;
  numero: number;
  started_at: string;
  ends_at: string;
  closed_at: string | null;
  tweet_poste: boolean;
};

export type Entree = {
  id: string;
  manche_id: string;
  project_name: string;
  project_url: string;
  url_normalized: string;
  category: string;
  tagline: string | null;
  logo_url: string | null;
  clics: number;
  amount_cents: number;
  created_at: string;
};

/**
 * Colonnes de `entries` lisibles publiquement, dans l'ordre du type `Entree`.
 *
 * A tenir synchronisee avec le `grant select (...)` de la migration 004 : un
 * `select("*")` echouerait desormais, la lecture n'etant plus accordee sur la
 * table entiere mais colonne par colonne. Les colonnes absentes ici
 * (identifiant de session Stripe, preuve de consentement) n'ont rien a faire
 * dans un navigateur.
 */
export const COLONNES_ENTREE =
  "id, manche_id, project_name, project_url, url_normalized, category, tagline, logo_url, amount_cents, clics, created_at";

export type Champion = {
  numero: number;
  started_at: string;
  closed_at: string;
  project_name: string;
  project_url: string;
  category: string;
  tagline: string | null;
  logo_url: string | null;
  amount_cents: number;
};
