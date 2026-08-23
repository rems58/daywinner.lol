import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { creerClientPublic } from "@/lib/supabase/server";
import { getDictionnaire, getLocale } from "@/lib/i18n/server";
import {
  CATEGORIES,
  MISE_MIN_CENTS,
  formaterMontant,
  logoUrlValide,
  normaliserUrl,
  remplir,
} from "@/lib/constantes";
import type { CategorieCle } from "@/lib/i18n/dictionnaires/types";

/**
 * `managed_payments` est plus recent que les types du SDK (22.5.0), d'ou
 * cette extension. On le desactive a chaque session : Managed Payments est
 * actif par defaut sur le compte, sans interrupteur dans le Dashboard, mais
 * il exclut les services publicitaires, notre categorie. Il autorise en
 * outre Stripe a rembourser sous 60 jours, ce qui contredirait la regle
 * "mise non remboursable" annoncee aux acheteurs.
 */
type ParamsSession = Stripe.Checkout.SessionCreateParams & {
  managed_payments?: { enabled: boolean };
};

export async function POST(request: Request) {
  // Les erreurs remontent telles quelles dans le formulaire : elles doivent
  // parler la langue du visiteur, pas celle du serveur.
  const [d, locale] = await Promise.all([getDictionnaire(), getLocale()]);
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ erreur: d.api.requeteInvalide }, { status: 400 });
  }

  const project_name = String(body.project_name ?? "").trim().slice(0, 80);
  const project_url = String(body.project_url ?? "").trim().slice(0, 200);
  const category = String(body.category ?? "");
  const tagline = String(body.tagline ?? "").trim().slice(0, 140) || null;
  const logo_url = String(body.logo_url ?? "").trim() || null;
  const amount_cents = Math.round(Number(body.amount_cents));

  if (!project_name || !project_url) {
    return NextResponse.json({ erreur: d.api.champsRequis }, { status: 400 });
  }
  if (!CATEGORIES.includes(category as CategorieCle)) {
    return NextResponse.json({ erreur: d.api.categorieInvalide }, { status: 400 });
  }
  if (!Number.isFinite(amount_cents) || amount_cents < MISE_MIN_CENTS) {
    return NextResponse.json(
      { erreur: remplir(d.api.miseMinimale, { montant: formaterMontant(MISE_MIN_CENTS, locale) }) },
      { status: 400 }
    );
  }
  if (logo_url && !logoUrlValide(logo_url)) {
    return NextResponse.json(
      { erreur: d.api.logoHttps },
      { status: 400 }
    );
  }

  const url_normalized = normaliserUrl(project_url);
  const supabase = creerClientPublic();

  const { data: manche } = await supabase
    .from("manches")
    .select("id, numero, ends_at, closed_at")
    .is("closed_at", null)
    .maybeSingle();

  if (!manche) {
    return NextResponse.json(
      { erreur: d.api.aucuneManche },
      { status: 409 }
    );
  }

  // Le plancher ne depend plus du remplissage du tableau : une entree coute
  // toujours MISE_MIN_CENTS, deja verifie plus haut. Seule contrainte
  // restante : rejouer sur le meme projet doit faire monter sa mise.
  const { data: miseExistante } = await supabase
    .from("entries")
    .select("amount_cents")
    .eq("manche_id", manche.id)
    .eq("url_normalized", url_normalized)
    .maybeSingle();

  if (miseExistante && amount_cents <= miseExistante.amount_cents) {
    return NextResponse.json(
      {
        erreur: remplir(d.api.dejaMise, {
          montant: formaterMontant(miseExistante.amount_cents, locale),
        }),
      },
      { status: 400 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  // Une erreur Stripe non rattrapee renverrait une page HTML, que le client
  // n'arrive pas a lire : il afficherait "impossible de contacter le serveur"
  // et la cause reelle resterait invisible. On repond toujours en JSON.
  // Pas de payment_method_types : sans ce parametre, Stripe propose les
  // moyens de paiement actives dans le Dashboard (carte, Apple Pay, Link),
  // ce qui vaut mieux que de figer "carte" ici.
  const params: ParamsSession = {
    mode: "payment",
    managed_payments: { enabled: false },
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: amount_cents,
          product_data: {
            name: `Mise daywinner.lol · Jour #${manche.numero} · ${project_name}`,
            // "Website Advertising" : decrit exactement le produit vendu.
            // Sans effet tant que Stripe Tax n'est pas active, mais c'est le
            // code qui donnera le bon traitement de TVA le jour ou il le sera.
            tax_code: "txcd_10701000",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      project_name,
      project_url,
      url_normalized,
      category,
      tagline: tagline ?? "",
      logo_url: logo_url ?? "",
    },
    success_url: `${origin}/?merci=1`,
    cancel_url: `${origin}/?annule=1`,
  };

  try {
    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (erreur) {
    console.error("Échec création session Stripe", erreur);
    return NextResponse.json(
      { erreur: d.api.paiementImpossible },
      { status: 502 }
    );
  }
}
