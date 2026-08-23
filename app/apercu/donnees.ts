// Donnees fictives de l'apercu : trois manches, dont deux cloturees, pour
// voir le classement en direct ET le palmares sans brancher Supabase.
// Uniquement consomme par /apercu/*, injoignable en production.
import type { Manche, Entree, Champion } from "@/lib/types";

const JOUR_MS = 24 * 60 * 60 * 1000;

type Brut = [nom: string, url: string, categorie: string, tagline: string | null, cents: number];

function construireEntrees(mancheId: string, brutes: Brut[]): Entree[] {
  return brutes.map(([nom, url, categorie, tagline, cents], i) => ({
    id: `${mancheId}-${i}`,
    manche_id: mancheId,
    project_name: nom,
    project_url: url,
    url_normalized: url,
    category: categorie,
    tagline,
    // Laisse null : l'apercu montre justement le repli favicon automatique.
    logo_url: null,
    // Volumes plausibles : le #1 attire logiquement plus de clics.
    clics: Math.max(3, Math.round(cents / 12) - i * 7),
    amount_cents: cents,
    created_at: new Date(Date.now() - i * 60_000).toISOString(),
  }));
}

export const MANCHE_EN_COURS: Manche = {
  id: "apercu-3",
  numero: 3,
  started_at: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
  ends_at: new Date(Date.now() + 7 * 3600 * 1000 + 42 * 60 * 1000).toISOString(),
  closed_at: null,
  tweet_poste: false,
};

export const MANCHES_CLOTUREES: Manche[] = [
  {
    id: "apercu-2",
    numero: 2,
    started_at: new Date(Date.now() - 2 * JOUR_MS).toISOString(),
    ends_at: new Date(Date.now() - JOUR_MS).toISOString(),
    closed_at: new Date(Date.now() - JOUR_MS).toISOString(),
    tweet_poste: true,
  },
  {
    id: "apercu-1",
    numero: 1,
    started_at: new Date(Date.now() - 3 * JOUR_MS).toISOString(),
    ends_at: new Date(Date.now() - 2 * JOUR_MS).toISOString(),
    closed_at: new Date(Date.now() - 2 * JOUR_MS).toISOString(),
    tweet_poste: true,
  },
];

export const MISES: Record<string, Entree[]> = {
  "apercu-3": construireEntrees("apercu-3", [
    ["Cursor", "cursor.com", "dev", "L'éditeur de code qui écrit avec toi.", 24000],
    ["Linear", "linear.app", "productivite", "Le suivi d'issues que les équipes rapides adoptent.", 18500],
    ["Resend", "resend.com", "dev", "L'API d'emails pensée pour les développeurs.", 12000],
    ["Framer", "framer.com", "design", null, 9500],
    ["Raycast", "raycast.com", "productivite", null, 7300],
    ["Vercel", "vercel.com", "dev", null, 5000],
    ["Perplexity", "perplexity.ai", "ia", null, 3200],
    ["Beehiiv", "beehiiv.com", "marketing", null, 1500],
    ["Supabase", "supabase.com", "dev", null, 1400],
    ["Stripe", "stripe.com", "ecommerce", null, 1200],
    ["Notion", "notion.so", "productivite", null, 900],
    ["Figma", "figma.com", "design", null, 850],
    ["Cal.com", "cal.com", "productivite", null, 700],
    ["Posthog", "posthog.com", "dev", null, 640],
    ["Clerk", "clerk.com", "dev", null, 500],
    ["Railway", "railway.app", "dev", null, 420],
    ["Typefully", "typefully.com", "marketing", null, 300],
    ["Lemon Squeezy", "lemonsqueezy.com", "ecommerce", null, 150],
  ]),
  "apercu-2": construireEntrees("apercu-2", [
    ["Resend", "resend.com", "dev", "L'API d'emails pensée pour les développeurs.", 41000],
    ["Cursor", "cursor.com", "dev", null, 38000],
    ["Raycast", "raycast.com", "productivite", null, 15200],
    ["Figma", "figma.com", "design", null, 8800],
    ["Supabase", "supabase.com", "dev", null, 4300],
    ["Cal.com", "cal.com", "productivite", null, 2100],
    ["Notion", "notion.so", "productivite", null, 900],
    ["Posthog", "posthog.com", "dev", null, 500],
  ]),
  "apercu-1": construireEntrees("apercu-1", [
    ["Linear", "linear.app", "productivite", "Le suivi d'issues que les équipes rapides adoptent.", 32000],
    ["Vercel", "vercel.com", "dev", null, 12500],
    ["Framer", "framer.com", "design", null, 6400],
    ["Stripe", "stripe.com", "ecommerce", null, 3000],
    ["Beehiiv", "beehiiv.com", "marketing", null, 1100],
    ["Clerk", "clerk.com", "dev", null, 500],
  ]),
};

export const TOUTES_LES_MANCHES = [MANCHE_EN_COURS, ...MANCHES_CLOTUREES];

/** Meme regle que la vue SQL `champions` : la plus haute mise de chaque manche cloturee. */
export const CHAMPIONS: Champion[] = MANCHES_CLOTUREES.map((manche) => {
  const gagnante = MISES[manche.id][0];
  return {
    numero: manche.numero,
    started_at: manche.started_at,
    closed_at: manche.closed_at!,
    project_name: gagnante.project_name,
    project_url: gagnante.project_url,
    category: gagnante.category,
    tagline: gagnante.tagline,
    logo_url: gagnante.logo_url,
    amount_cents: gagnante.amount_cents,
  };
});

export const TOUTES_LES_MISES = Object.values(MISES).flat();
