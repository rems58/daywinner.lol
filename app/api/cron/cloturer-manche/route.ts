import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { creerClientService } from "@/lib/supabase/server";
import { prochaineCloture } from "@/lib/constantes";
import { posterTweetChampion } from "@/lib/twitter";
import { formaterMontant } from "@/lib/constantes";

/**
 * L'endpoint de televersement est ouvert : une image envoyee sans que la
 * mise soit ensuite payee resterait dans le depot pour rien. On supprime
 * celles de plus de 24h qu'aucune entree ne reference.
 */
async function purgerLogosOrphelins(
  supabase: ReturnType<typeof creerClientService>
) {
  const limite = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: candidats } = await supabase
    .from("logo_uploads")
    .select("id, chemin")
    .lt("created_at", limite)
    .limit(200);

  if (!candidats?.length) return;

  const { data: utilises } = await supabase
    .from("entries")
    .select("logo_url")
    .not("logo_url", "is", null);

  const referencies = new Set(
    (utilises ?? [])
      .map((e) => e.logo_url?.split("/").pop())
      .filter((nom): nom is string => Boolean(nom))
  );

  const orphelins = candidats.filter((c) => !referencies.has(c.chemin));
  if (!orphelins.length) return;

  const { error } = await supabase.storage
    .from("logos")
    .remove(orphelins.map((o) => o.chemin));

  if (error) {
    console.error("Échec purge des logos orphelins", error);
    return;
  }

  await supabase
    .from("logo_uploads")
    .delete()
    .in(
      "id",
      orphelins.map((o) => o.id)
    );
}

// Appelée chaque minute par Vercel Cron (voir vercel.json). Idempotente :
// si aucune manche n'a atteint sa fin, ne fait rien.
async function gerer(request: Request) {
  // Echec ferme : tant que le secret n'est pas configure, l'endpoint refuse
  // de servir. La verification vivait auparavant dans un `if (secretAttendu)`,
  // si bien qu'une variable oubliee au deploiement ouvrait a tout le monde une
  // route qui ecrit avec la cle de service.
  const secretAttendu = process.env.CRON_SECRET;
  if (!secretAttendu) {
    console.error("CRON_SECRET absent : clôture refusée.");
    return NextResponse.json({ erreur: "Non configuré." }, { status: 503 });
  }

  const fourni = request.headers.get("authorization") ?? "";
  const attendu = `Bearer ${secretAttendu}`;
  const a = Buffer.from(fourni);
  const b = Buffer.from(attendu);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  const supabase = creerClientService();

  await purgerLogosOrphelins(supabase);

  const { data: manche } = await supabase
    .from("manches")
    .select("id, numero, ends_at")
    .is("closed_at", null)
    .maybeSingle();

  if (!manche) {
    // Etat inattendu (jamais amorcée) : on ouvre la manche #1.
    await supabase
      .from("manches")
      .insert({ numero: 1, ends_at: prochaineCloture().toISOString() });
    return NextResponse.json({ cloturee: false, amorcee: true });
  }

  if (Date.now() < new Date(manche.ends_at).getTime()) {
    return NextResponse.json({ cloturee: false });
  }

  const maintenant = new Date().toISOString();
  await supabase.from("manches").update({ closed_at: maintenant }).eq("id", manche.id);

  const { data: champion } = await supabase
    .from("entries")
    .select("project_name, project_url, amount_cents")
    .eq("manche_id", manche.id)
    .order("amount_cents", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  await supabase.from("manches").insert({
    numero: manche.numero + 1,
    // Ancree sur 21 h de Paris : la derive accumulee par les prolongations
    // anti-snipe de la manche qui vient de se refermer s'arrete ici.
    ends_at: prochaineCloture().toISOString(),
  });

  if (champion) {
    const handle = champion.project_url.replace(/^https?:\/\//, "").split("/")[0];
    const texte = `🏆 Félicitations à ${handle} qui remporte le Jour #${manche.numero} avec une mise de ${formaterMontant(
      champion.amount_cents
    )} !\n\ndaywinner.lol/jour/${manche.numero}`;
    const resultat = await posterTweetChampion(texte);
    if (resultat.poste) {
      await supabase.from("manches").update({ tweet_poste: true }).eq("id", manche.id);
    }
  }

  return NextResponse.json({ cloturee: true, numero: manche.numero, champion: champion?.project_name ?? null });
}

export async function GET(request: Request) {
  return gerer(request);
}

export async function POST(request: Request) {
  return gerer(request);
}
