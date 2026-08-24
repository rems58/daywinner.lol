-- Journal des paiements traites, pour rendre le webhook idempotent.
--
-- Depuis que les paiements s'additionnent, rejouer un evenement Stripe ajoute
-- une seconde fois le meme montant. Le comportement precedent (ne mettre a
-- jour que si le montant depassait la mise en cours) protegeait par accident
-- de ce rejeu ; en cumulant, cette protection a disparu.
--
-- Or Stripe rejoue un webhook des que la reponse tarde ou echoue, et le
-- tableau de bord offre un bouton "Renvoyer". Sans garde-fou, un total peut
-- donc grimper sans qu'aucun argent supplementaire n'ait ete verse.
--
-- La cle primaire sur l'identifiant de session fait office de verrou : la
-- deuxieme insertion echoue, le webhook s'arrete avant d'appliquer quoi que
-- ce soit. La table sert accessoirement de trace comptable des encaissements.

create table if not exists paiements (
  stripe_session_id text primary key,
  manche_id uuid references manches(id),
  url_normalized text not null,
  amount_cents integer not null,
  created_at timestamptz not null default now()
);

create index if not exists paiements_manche_idx on paiements (manche_id, created_at desc);

comment on table paiements is
  'Un enregistrement par paiement Stripe traite. La cle primaire garantit qu''un evenement rejoue n''est jamais applique deux fois.';

-- Reservee au role de service : le webhook est le seul a y ecrire, et rien
-- n'a besoin de la lire depuis un navigateur.
alter table paiements enable row level security;
