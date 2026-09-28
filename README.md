# daywinner.lol

**Classement public payant, remis à zéro chaque jour.** On paie pour prendre la première
place du jour, n'importe qui peut surenchérir jusqu'à la clôture de 21 h (heure de Paris).
Une mise dans les 2 dernières minutes prolonge la manche de 2 minutes (anti-snipe).
Le champion de chaque manche est archivé à vie dans le palmarès.

> **Statut : projet terminé.** Conçu, développé et mis en production seul en deux jours
> (23 et 24 août 2026), paiements réels validés de bout en bout, puis arrêté volontairement
> le 29 août 2026. Le site n'est plus en ligne ; les routes `/apercu` rejouent l'interface
> avec des données fictives en local (voir plus bas).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion ·
Supabase (Postgres, RLS, Realtime) · Stripe Checkout · Vercel

## Points techniques

- **Paiement Stripe de bout en bout** : Checkout, webhook à signature vérifiée,
  **idempotent** (verrou posé avant toute écriture), journal des paiements, cumul des mises
  d'un même joueur sur la manche.
- **Logique temps réel** : clôture par cron à la minute (endpoint idempotent protégé par
  secret), prolongation anti-snipe, présence en direct via Supabase Realtime.
- **Sécurité** : RLS et cloisonnement des données, upload d'images borné (types, 2 Mo,
  10 envois par heure et par IP hachée, nettoyage automatique des fichiers orphelins),
  corrections issues d'une revue de sécurité dédiée.
- **Conformité** : mentions légales, CGV versionnées, consentement horodaté et renoncement
  au droit de rétractation conformes au droit français de la consommation.
- **International et SEO** : 5 langues avec détection automatique, images Open Graph
  générées dynamiquement, sitemap, données structurées.

## Design

Design porté à l'identique de riveska.com (tokens shadcn/ui neutral en oklch, police Geist,
accent `#e8442e`).

## Mise en route

1. **Dépendances**
   ```bash
   npm install
   ```

2. **Supabase**, crée un projet, puis dans l'éditeur SQL exécute
   `supabase/migrations/001_manches_entries.sql` (crée `manches`, `entries`,
   la vue `champions`, active RLS + Realtime, amorce la manche #1).

3. **Stripe**, mode test pour commencer. En local, pour recevoir les
   webhooks :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Colle le `whsec_...` affiché dans `STRIPE_WEBHOOK_SECRET`.

4. **Variables d'environnement**, copie `.env.local.example` vers
   `.env.local` et remplis les clés Supabase/Stripe. `TWITTER_*` est
   optionnel (boucle virale de fin de manche, no-op si absent).

5. **Lancer**
   ```bash
   npm run dev
   ```

## Logos des projets

Un miseur peut téléverser une image depuis son poste ou coller un lien https ;
sans rien, on retombe sur le favicon de son domaine, puis sur un monogramme.

L'endpoint `/api/logo` est ouvert (le site n'a pas de comptes), donc il est
borné par le contenu plutôt que par une identité : types d'image autorisés,
2 Mo maximum, nom de fichier généré côté serveur, et **10 envois par heure et
par IP** (l'IP est stockée hachée dans `logo_uploads`, jamais en clair). Le
cron supprime en plus les images de plus de 24 h qu'aucune mise ne référence,
pour qu'un envoi jamais payé ne reste pas dans le dépôt.

## Compteurs en direct

La pastille sous la barre de navigation affiche le nombre de personnes
connectées (présence Supabase Realtime) et le total de visites depuis le
lancement (table `stats`, incrémentée une fois par session d'onglet via la
fonction `incrementer_visiteurs()`).

## Aperçu du design sans Supabase

Trois routes rejouent le site complet avec des données fictives, trois
manches, dont deux clôturées, pour juger la maquette avant d'avoir branché
la base :

- `/apercu`, le jour en cours (classement live, chrono, formulaire)
- `/apercu/palmares`, le palmarès avec les champions des jours 1 et 2
- `/apercu/jour/[numero]`, l'archive d'une manche

Un bandeau jaune permanent rappelle que rien n'est réel et permet de passer
d'une page à l'autre. Ces routes renvoient un 404 en production : elles
n'existent qu'en développement. Les données vivent dans `app/apercu/donnees.ts`.

Les pages réelles et les pages d'aperçu partagent la même présentation
(`components/vue-palmares.tsx`, `components/vue-jour.tsx`) : ce que tu vois en
aperçu est exactement ce que verront les visiteurs.

## Clôture des manches (cron)

`app/api/cron/cloturer-manche` doit être appelée **chaque minute** pour clore
la manche dès que `ends_at` est dépassé, et pour tenir compte des
prolongations anti-snipe créées par des mises tardives. Sans cet appel,
aucune manche ne se clôture et la règle anti-snipe ne s'applique jamais.

L'appel est confié à un **planificateur externe** (cron-job.org), avec
l'en-tête `Authorization: Bearer $CRON_SECRET`. L'endpoint est idempotent :
il vérifie l'heure et ne fait rien tant que la manche court.

Il n'y a volontairement **pas de `vercel.json`** : le plan Vercel Hobby
refuse tout cron plus fréquent que quotidien, et bloque même le déploiement
si le fichier en déclare un. Passer sur Vercel Pro permettrait de rapatrier
le cron ici et de supprimer la dépendance au service tiers.

Une granularité d'une minute est nécessaire : la fenêtre anti-snipe dure
deux minutes, un planificateur à cinq minutes rendrait les clôtures
imprécises.

## Commandes

```bash
npm run dev     # serveur de dev
npm run build   # build de prod
npm run lint    # ESLint
```
