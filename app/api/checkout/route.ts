import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { creerClientPublic } from "@/lib/supabase/server";
import {
  CATEGORIES,
  MISE_MIN_CENTS,
  MISE_MIN_PREMIERE_CENTS,
  logoUrlValide,
  normaliserUrl,
} from "@/lib/constantes";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ erreur: "Corps de requête invalide." }, { status: 400 });
  }

  const project_name = String(body.project_name ?? "").trim().slice(0, 80);
  const project_url = String(body.project_url ?? "").trim().slice(0, 200);
  const category = String(body.category ?? "");
  const tagline = String(body.tagline ?? "").trim().slice(0, 140) || null;
  const logo_url = String(body.logo_url ?? "").trim() || null;
  const amount_cents = Math.round(Number(body.amount_cents));

  if (!project_name || !project_url) {
    return NextResponse.json({ erreur: "Nom et URL du projet requis." }, { status: 400 });
  }
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return NextResponse.json({ erreur: "Catégorie invalide." }, { status: 400 });
  }
  if (!Number.isFinite(amount_cents) || amount_cents < MISE_MIN_PREMIERE_CENTS) {
    return NextResponse.json({ erreur: "Montant invalide." }, { status: 400 });
  }
  if (logo_url && !logoUrlValide(logo_url)) {
    return NextResponse.json(
      { erreur: "Le lien du logo doit être une URL https." },
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
      { erreur: "Aucune manche active pour le moment, réessaie dans un instant." },
      { status: 409 }
    );
  }

  const { count: nbMisesManche } = await supabase
    .from("entries")
    .select("id", { count: "exact", head: true })
    .eq("manche_id", manche.id);

  const { data: miseExistante } = await supabase
    .from("entries")
    .select("amount_cents")
    .eq("manche_id", manche.id)
    .eq("url_normalized", url_normalized)
    .maybeSingle();

  const plancher = (nbMisesManche ?? 0) === 0 ? MISE_MIN_PREMIERE_CENTS : MISE_MIN_CENTS;

  if (miseExistante) {
    if (amount_cents <= miseExistante.amount_cents) {
      return NextResponse.json(
        {
          erreur: `Ta mise actuelle sur ce projet est déjà de ${(
            miseExistante.amount_cents / 100
          ).toFixed(2)} €. Propose plus pour surenchérir.`,
        },
        { status: 400 }
      );
    }
  } else if (amount_cents < plancher) {
    return NextResponse.json(
      { erreur: `Mise minimale : ${(plancher / 100).toFixed(2)} €.` },
      { status: 400 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: amount_cents,
          product_data: {
            name: `Mise daywinner.lol — Jour #${manche.numero} — ${project_name}`,
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
  });

  return NextResponse.json({ url: session.url });
}
