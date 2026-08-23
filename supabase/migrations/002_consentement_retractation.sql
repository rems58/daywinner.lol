-- Preuve du renoncement au droit de retractation.
--
-- Le code de la consommation (art. L221-28 1) n'ecarte le droit de
-- retractation de 14 jours que si le consommateur a donne son accord expres
-- pour une execution immediate ET reconnu expressement perdre ce droit. La
-- charge de la preuve pese sur le professionnel : on horodate donc le
-- consentement au moment du paiement, avec la version des CGV acceptee.
--
-- Sans cette trace, la mention "non remboursable" n'est pas opposable a un
-- consommateur, qui peut exiger le remboursement sous 14 jours.

alter table entries
  add column if not exists consentement_retractation_at timestamptz,
  add column if not exists cgv_version text;

comment on column entries.consentement_retractation_at is
  'Horodatage du renoncement expres au droit de retractation (art. L221-28 1).';
comment on column entries.cgv_version is
  'Version des CGV acceptee, pour prouver quel texte etait en vigueur.';
