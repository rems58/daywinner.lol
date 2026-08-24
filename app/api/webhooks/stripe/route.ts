import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { creerClientService } from "@/lib/supabase/server";
import { FENETRE_ANTI_SNIPE_MS, PROLONGATION_ANTI_SNIPE_MS } from "@/lib/constantes";

/**
 * Evenements traites. `completed` couvre les moyens de paiement immediats
 * (carte, Apple Pay, Link) ; `async_payment_succeeded` couvre ceux a
 * notification differee, ou la session se termine avant que les fonds soient
 * confirmes. Sans ce second evenement, un prelevement SEPA active un jour
 * dans le Dashboard offrirait la premiere place sans qu'aucun argent
 * n'arrive jamais.
 */
const EVENEMENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

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

  if (!EVENEMENTS.has(event.type)) {
    return NextResponse.json({ recu: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata ?? {};
  const amount_cents = session.amount_total;

  // La fin du parcours de paiement ne vaut pas encaissement. Tant que Stripe
  // n'a pas confirme les fonds, la place n'est pas attribuee : on attend
  // l'evenement `async_payment_succeeded`, et si le paiement echoue il
  // n'arrivera jamais.
  if (session.payment_status !== "paid") {
    console.warn(
      "Session terminée sans paiement confirmé, place non attribuée",
      session.id,
      session.payment_status
    );
    return NextResponse.json({ recu: true });
  }

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

  const emailPayeur = session.customer_details?.email?.trim().toLowerCase() ?? null;

  const { data: miseExistante } = await supabase
    .from("entries")
    .select("id, amount_cents")
    .eq("manche_id", manche.id)
    .eq("url_normalized", metadata.url_normalized)
    .maybeSingle();

  if (miseExistante) {
    if (amount_cents > miseExistante.amount_cents) {
      // Une entree est identifiee par son URL, et rien ne prouve que celui
      // qui paie possede le site vise. Laisser la surenchere reecrire le nom,
      // l'accroche et le logo permettrait a un tiers d'effacer pour 1 EUR la
      // fiche qu'un annonceur vient d'acheter, tout en gardant le lien
      // pointant vers son site. On ne reecrit le contenu affiche que pour
      // l'acheteur d'origine.
      const { data: privee } = await supabase
        .from("entries_privees")
        .select("submitter_email")
        .eq("entry_id", miseExistante.id)
        .maybeSingle();

      const proprietaire = privee?.submitter_email?.trim().toLowerCase() ?? null;
      const memeAcheteur = emailPayeur !== null && proprietaire === emailPayeur;

      const maj: Record<string, unknown> = {
        amount_cents,
        stripe_session_id: session.id,
      };
      if (memeAcheteur) {
        maj.project_name = metadata.project_name;
        maj.tagline = metadata.tagline || null;
        maj.logo_url = metadata.logo_url || null;
        maj.consentement_retractation_at = metadata.consentement_at || null;
        maj.cgv_version = metadata.cgv_version || null;
      } else {
        console.warn(
          "Surenchère par un autre acheteur : montant relevé, contenu conservé",
          miseExistante.id
        );
      }

      await supabase.from("entries").update(maj).eq("id", miseExistante.id);
    }
    // Sinon : paiement confirmé mais montant <= mise déjà enregistrée (double
    // soumission depuis deux onglets). L'argent est capté par Stripe, le rang
    // n'est pas modifié, cas rare laissé au suivi manuel.
  } else {
    const { data: creee, error } = await supabase
      .from("entries")
      .insert({
        manche_id: manche.id,
        project_name: metadata.project_name,
        project_url: metadata.project_url,
        url_normalized: metadata.url_normalized,
        category: metadata.category,
        tagline: metadata.tagline || null,
        logo_url: metadata.logo_url || null,
        // Preuve horodatee du renoncement au droit de retractation.
        consentement_retractation_at: metadata.consentement_at || null,
        cgv_version: metadata.cgv_version || null,
        amount_cents,
        stripe_session_id: session.id,
      })
      .select("id")
      .single();

    // Code 23505 = violation unique sur stripe_session_id : Stripe a rejoué
    // le même événement, on l'ignore silencieusement (déjà traité).
    if (error && error.code !== "23505") {
      console.error("Échec insertion mise", error);
      return NextResponse.json({ erreur: "Échec insertion." }, { status: 500 });
    }

    // L'adresse de l'acheteur vit dans une table cloisonnée, hors de
    // `entries` qui est en lecture publique et diffusée en Realtime.
    if (creee && emailPayeur) {
      const { error: erreurPrivee } = await supabase
        .from("entries_privees")
        .insert({ entry_id: creee.id, submitter_email: emailPayeur });
      if (erreurPrivee && erreurPrivee.code !== "23505") {
        console.error("Échec enregistrement des données acheteur", erreurPrivee);
      }
    }
  }

  return NextResponse.json({ recu: true });
}
