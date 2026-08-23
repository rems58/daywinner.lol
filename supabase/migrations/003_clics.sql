-- Compteur de clics par entree, affiche a cote de chaque annonceur.
--
-- C'est la preuve de valeur du produit : un annonceur voit ce que sa place
-- lui a rapporte en trafic. Sans ce chiffre, il n'a aucune raison de
-- resurencherir le lendemain.

alter table entries add column if not exists clics integer not null default 0;

-- Increment par le navigateur : passe par une fonction plutot qu'un update
-- direct, pour que anon ne recoive jamais le droit d'ecrire sur la table.
create or replace function incrementer_clics(entree uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update entries set clics = clics + 1 where id = entree;
$$;

grant execute on function incrementer_clics(uuid) to anon, authenticated;

comment on column entries.clics is
  'Nombre de clics sortants vers le lien de l''annonceur.';
