-- Cloisonnement des donnees personnelles et fiabilisation du compteur de clics.
--
-- Deux defauts corriges ici.
--
-- 1. L'adresse electronique de l'acheteur vivait dans `entries`, dont la
--    politique de lecture est `using (true)`. La cle anon etant publique par
--    conception, n'importe qui pouvait lire la liste des clients payants et
--    leur budget en une requete. La table est de surcroit publiee en Realtime,
--    donc chaque nouvelle mise diffusait l'adresse a tous les navigateurs
--    connectes. On sort la donnee de la table publique plutot que de compter
--    sur un filtrage de colonnes.
--
-- 2. `incrementer_clics` etait executable par anon sans borne : le compteur
--    affiche a l'annonceur, qui est l'argument de vente du produit, pouvait
--    etre gonfle a volonte. Le comptage passe desormais par le serveur, avec
--    un clic retenu par entree et par adresse IP.
--
-- Rejouable sans risque : chaque etape est conditionnelle.

-- ---------------------------------------------------------------- 1. donnees personnelles

create table if not exists entries_privees (
  entry_id uuid primary key references entries(id) on delete cascade,
  submitter_email text,
  created_at timestamptz not null default now()
);

comment on table entries_privees is
  'Donnees nominatives de l''acheteur. Hors de `entries`, qui est en lecture publique et publiee en Realtime. Accessible au seul role de service.';

-- RLS active sans aucune politique : personne d'autre que le role de service.
alter table entries_privees enable row level security;

-- Reprise de l'existant avant suppression de la colonne. Le bloc conditionnel
-- permet de rejouer la migration une fois la colonne disparue.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'entries'
      and column_name = 'submitter_email'
  ) then
    insert into entries_privees (entry_id, submitter_email)
    select id, submitter_email
    from entries
    where submitter_email is not null
    on conflict (entry_id) do nothing;
  end if;
end $$;

-- La vue palmares doit etre recreee AVANT la suppression de la colonne.
--
-- Son sous-select interne etait un `select *`, et PostgreSQL fige la liste des
-- colonnes au moment de la creation : la vue depend donc de `submitter_email`,
-- meme si elle ne l'expose pas. Sans cette etape, la suppression echoue avec
-- "cannot drop column submitter_email because other objects depend on it".
--
-- Les colonnes de sortie restent identiques, `create or replace` suffit donc.
-- Elle s'execute par ailleurs avec les droits de l'appelant (security_invoker),
-- si bien que le `select *` heurterait de toute facon la restriction de
-- colonnes posee plus bas.
create or replace view champions
  with (security_invoker = true) as
select
  m.numero,
  m.started_at,
  m.closed_at,
  e.project_name,
  e.project_url,
  e.category,
  e.tagline,
  e.logo_url,
  e.amount_cents
from manches m
join lateral (
  select project_name, project_url, category, tagline, logo_url, amount_cents
  from entries
  where entries.manche_id = m.id
  order by amount_cents desc, created_at asc
  limit 1
) e on true
where m.closed_at is not null
order by m.numero desc;

grant select on champions to anon, authenticated;

-- Plus aucune dependance : la colonne peut partir.
alter table entries drop column if exists submitter_email;

-- Meme apres le deplacement de l'e-mail, `entries` conserve des colonnes qui
-- n'ont rien a faire en lecture publique : l'identifiant de session Stripe et
-- la preuve de consentement. On passe d'un droit de lecture sur toute la
-- table a une liste explicite de colonnes.
--
-- Note : un `revoke select (colonne)` seul serait sans effet tant qu'un droit
-- sur la table entiere subsiste. Il faut retirer puis re-accorder.
revoke select on entries from anon, authenticated;

grant select (
  id, manche_id, project_name, project_url, url_normalized,
  category, tagline, logo_url, amount_cents, clics, created_at
) on entries to anon, authenticated;

-- ---------------------------------------------------------------- 2. compteur de clics

create table if not exists clics_journal (
  entry_id uuid not null references entries(id) on delete cascade,
  ip_hash text not null,
  created_at timestamptz not null default now(),
  primary key (entry_id, ip_hash)
);

comment on table clics_journal is
  'Un clic retenu par entree et par adresse IP hachee. L''IP n''est jamais stockee en clair.';

alter table clics_journal enable row level security;

-- Le navigateur ne peut plus incrementer directement : le comptage passe par
-- /api/clic, qui deduplique avant d'appeler cette fonction avec le role de
-- service.
--
-- Attention : `create function` accorde l'execution a PUBLIC par defaut. Ne
-- revoquer que pour anon et authenticated laisserait le droit intact par
-- heritage. C'est PUBLIC qu'il faut retirer d'abord, puis reaccorder au seul
-- role de service.
revoke execute on function incrementer_clics(uuid) from public;
revoke execute on function incrementer_clics(uuid) from anon, authenticated;
grant execute on function incrementer_clics(uuid) to service_role;

-- ---------------------------------------------------------------- 3. depot de logos

-- Le depot acceptait le SVG. Un SVG est un document capable de porter du
-- script : servi depuis le domaine du projet, il devient une page hebergee
-- utilisable en hameconnage. Les formats matriciels suffisent pour un logo.
update storage.buckets
set allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
where id = 'logos';
