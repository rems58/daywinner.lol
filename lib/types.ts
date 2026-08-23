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
  amount_cents: number;
  created_at: string;
};

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
