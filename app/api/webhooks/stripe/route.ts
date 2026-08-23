import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { creerClientService } from "@/lib/supabase/server";
import { FENETRE_ANTI_SNIPE_MS, PROLONGATION_ANTI_SNIPE_MS } from "@/lib/constantes";

// Le webhook doit rester la source de verite : on ne fait jamais confiance a
// un manche_id capture au moment du checkout (la manche a pu se cloturer
// pendant que l'acheteur remplissait sa carte). On resout toujours la manche
// active au moment ou le paiement est confirme.
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const corpsBrut = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      corpsBrut,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (erreur) {
    console.error("Signature webhook Stripe invalide", erreur);
    return NextResponse.json({ erreur: "Signature invalide." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ recu: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata ?? {};
  const amount_cents = session.amount_total;

  if (!amount_cents || !metadata.url_normalized) {
    console.error("Session Stripe sans metadata exploitable", session.id);
    return NextResponse.json({ recu: true });
  }

  const supabase = creerClientService();

  const { data: manche } = await supabase
    .from("manches")
    .select("id, ends_at")
    .is("closed_at", null)
    .maybeSingle();

  if (!manche) {
    console.error("Paiement confirmé sans manche active", session.id);
    return NextResponse.json({ recu: true });
  }

  // Regle anti-snipe : une mise confirmee dans les 2 dernieres minutes
  // prolonge la manche de 2 minutes, comme dans une vraie salle des ventes.
  const finActuelle = new Date(manche.ends_at).getTime();
  if (finActuelle - Date.now() < FENETRE_ANTI_SNIPE_MS) {
    const nouvelleFin = new Date(Date.now() + PROLONGATION_ANTI_SNIPE_MS);
    await supabase
      .from("manches")
      .update({ ends_at: nouvelleFin.toISOString() })
      .eq("id", manche.id);
  }

  const { data: miseExistante } = await supabase
    .from("entries")
    .select("id, amount_cents")
    .eq("manche_id", manche.id)
    .eq("url_normalized", metadata.url_normalized)
    .maybeSingle();

  if (miseExistante) {
    if (amount_cents > miseExistante.amount_cents) {
      await supabase
        .from("entries")
        .update({
          amount_cents,
          project_name: metadata.project_name,
          tagline: metadata.tagline || null,
          logo_url: metadata.logo_url || null,
          stripe_session_id: session.id,
        })
        .eq("id", miseExistante.id);
    }
    // Sinon : paiement confirmé mais montant <= mise déjà enregistrée (double
    // soumission depuis deux onglets). L'argent est capté par Stripe, le rang
    // n'est pas modifié, cas rare laissé au suivi manuel.
  } else {
    const { error } = await supabase.from("entries").insert({
      manche_id: manche.id,
      project_name: metadata.project_name,
      project_url: metadata.project_url,
      url_normalized: metadata.url_normalized,
      category: metadata.category,
      tagline: metadata.tagline || null,
      logo_url: metadata.logo_url || null,
      amount_cents,
      stripe_session_id: session.id,
      submitter_email: session.customer_details?.email ?? null,
    });
    // Code 23505 = violation unique sur stripe_session_id : Stripe a rejoué
    // le même événement, on l'ignore silencieusement (déjà traité).
    if (error && error.code !== "23505") {
      console.error("Échec insertion mise", error);
      return NextResponse.json({ erreur: "Échec insertion." }, { status: 500 });
    }
  }

  return NextResponse.json({ recu: true });
}
