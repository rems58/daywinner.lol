-- daywinner.lol — manches (rounds) + entries (mises) + palmares des champions.
-- Aucune notion de reset planifie : une manche dure ~24h mais sa fin (ends_at)
-- est prolongee par la regle anti-snipe (cf. app/api/webhooks/stripe et
-- app/api/cron/cloturer-manche), donc numerotee plutot que datee.

create table if not exists manches (
  id uuid primary key default gen_random_uuid(),
  numero integer not null unique,
  started_at timestamptz not null default now(),
  ends_at timestamptz not null,
  closed_at timestamptz,
  tweet_poste boolean not null default false
);

-- Une seule manche active (closed_at is null) a la fois.
create unique index if not exists manches_active_idx
  on manches ((closed_at is null))
  where closed_at is null;

create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  manche_id uuid not null references manches(id),
  project_name text not null,
  project_url text not null,
  url_normalized text not null,
  category text not null,
  tagline text,
  -- Logo fourni par le miseur. Null = on retombe sur le favicon du domaine.
  -- Contrainte https : le navigateur bloquerait une image http sur une page
  -- servie en https, autant refuser l'entree des la saisie.
  logo_url text check (logo_url is null or logo_url ~ '^https://'),
  amount_cents integer not null check (amount_cents >= 100),
  stripe_session_id text not null unique,
  submitter_email text,
  created_at timestamptz not null default now(),
  unique (manche_id, url_normalized)
);

create index if not exists entries_manche_amount_idx
  on entries (manche_id, amount_cents desc);

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
  select *
  from entries
  where entries.manche_id = m.id
  order by amount_cents desc, created_at asc
  limit 1
) e on true
where m.closed_at is not null
order by m.numero desc;

-- Compteur de visites depuis le lancement (une seule ligne).
create table if not exists stats (
  id boolean primary key default true check (id),
  visiteurs bigint not null default 0
);

insert into stats (id, visiteurs) values (true, 0) on conflict (id) do nothing;

-- Incrementation par le navigateur : passe par une fonction plutot qu'un
-- update direct, pour que anon n'ait jamais le droit d'ecrire sur la table.
create or replace function incrementer_visiteurs()
returns bigint
language sql
security definer
set search_path = public
as $$
  update stats set visiteurs = visiteurs + 1 where id = true returning visiteurs;
$$;

grant execute on function incrementer_visiteurs() to anon, authenticated;

-- Journal des televersements de logos : sert uniquement a plafonner le
-- nombre d'envois par adresse IP (l'endpoint est ouvert, le site n'ayant
-- pas de comptes). L'IP est stockee hachee, jamais en clair.
create table if not exists logo_uploads (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  chemin text not null,
  created_at timestamptz not null default now()
);

create index if not exists logo_uploads_ip_idx on logo_uploads (ip_hash, created_at desc);
create index if not exists logo_uploads_age_idx on logo_uploads (created_at);

-- RLS : lecture publique, ecriture reservee au service role (webhook Stripe
-- et cron de cloture — jamais depuis le navigateur).
alter table manches enable row level security;
alter table entries enable row level security;
alter table stats enable row level security;
-- Aucune policy sur logo_uploads : seul le service role y accede.
alter table logo_uploads enable row level security;

create policy "lecture publique des manches" on manches
  for select using (true);

create policy "lecture publique des mises" on entries
  for select using (true);

create policy "lecture publique des stats" on stats
  for select using (true);

grant select on champions to anon, authenticated;

-- Realtime : le classement et le compte a rebours reagissent en direct.
alter publication supabase_realtime add table manches;
alter publication supabase_realtime add table entries;

-- Depot des logos televerses depuis le poste des miseurs. Lecture publique
-- (les images s'affichent dans le classement) ; l'ecriture ne passe que par
-- /api/logo, qui utilise la cle service role apres avoir verifie type et
-- poids. Aucune politique d'ecriture pour anon : pas de televersement direct
-- depuis le navigateur.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'logos',
  'logos',
  true,
  2097152, -- 2 Mio
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']
)
on conflict (id) do nothing;

-- Amorce la toute premiere manche si la table est vide.
insert into manches (numero, ends_at)
select 1, now() + interval '24 hours'
where not exists (select 1 from manches);
