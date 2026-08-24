import { NextResponse } from "next/server";
import { creerClientService } from "@/lib/supabase/server";
import { hacherIp } from "@/lib/ip";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Comptage d'un clic sortant.
 *
 * Le navigateur appelait auparavant la fonction SQL directement avec la cle
 * anon, qui est publique : n'importe qui pouvait gonfler le compteur d'une
 * entree quelconque avec une boucle de requetes. Or ce chiffre est l'argument
 * de vente vendu a l'annonceur, il doit valoir quelque chose.
 *
 * Le comptage passe donc par le serveur, qui retient un clic par entree et par
 * adresse IP. Les entrees etant recreees a chaque manche, le compteur repart
 * naturellement de zero tous les jours.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const entree = typeof body?.entree === "string" ? body.entree : "";

  if (!UUID.test(entree)) {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const supabase = creerClientService();

  const { error } = await supabase
    .from("clics_journal")
    .insert({ entry_id: entree, ip_hash: hacherIp(request) });

  if (error) {
    // 23505 : ce visiteur a deja ete compte pour cette entree.
    if (error.code === "23505") return NextResponse.json({ compte: false });
    // 23503 : l'entree n'existe pas. Rien a compter, rien a signaler.
    if (error.code === "23503") return NextResponse.json({ compte: false });
    console.error("Échec journalisation du clic", error);
    return NextResponse.json({ compte: false }, { status: 500 });
  }

  const { error: erreurIncrement } = await supabase.rpc("incrementer_clics", {
    entree,
  });
  if (erreurIncrement) {
    console.error("Échec incrément du compteur de clics", erreurIncrement);
  }

  return NextResponse.json({ compte: true });
}
