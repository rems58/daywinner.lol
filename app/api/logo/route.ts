import { NextResponse } from "next/server";
import { createHash, randomUUID } from "crypto";
import { creerClientService } from "@/lib/supabase/server";
import { getDictionnaire } from "@/lib/i18n/server";
import { LOGO_POIDS_MAX, LOGO_TYPES } from "@/lib/constantes";

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/gif": "gif",
};

const ENVOIS_MAX_PAR_HEURE = 10;

/**
 * L'IP n'est jamais stockee en clair : on n'a besoin que de reconnaitre un
 * meme envoyeur sur une heure glissante, pas de savoir qui c'est.
 */
function hacherIp(request: Request) {
  const entete =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "inconnue";
  return createHash("sha256")
    .update(`${entete}:${process.env.CRON_SECRET ?? "sel-par-defaut"}`)
    .digest("hex");
}

// Televersement du logo depuis le poste du miseur. Endpoint ouvert (le site
// n'a pas de comptes), donc tout est verrouille par le contenu : type d'image
// autorise, poids plafonne, nom de fichier genere ici (jamais celui fourni,
// qui pourrait viser un autre chemin du depot).
export async function POST(request: Request) {
  const d = await getDictionnaire();
  const donnees = await request.formData().catch(() => null);
  const fichier = donnees?.get("fichier");

  if (!(fichier instanceof File)) {
    return NextResponse.json({ erreur: d.api.aucunFichier }, { status: 400 });
  }
  if (!LOGO_TYPES.includes(fichier.type as (typeof LOGO_TYPES)[number])) {
    return NextResponse.json(
      { erreur: d.formulaire.erreurFormat },
      { status: 400 }
    );
  }
  if (fichier.size > LOGO_POIDS_MAX) {
    return NextResponse.json({ erreur: d.formulaire.erreurPoids }, { status: 400 });
  }

  const supabase = creerClientService();
  const ipHash = hacherIp(request);

  const ilYaUneHeure = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("logo_uploads")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", ilYaUneHeure);

  if ((count ?? 0) >= ENVOIS_MAX_PAR_HEURE) {
    return NextResponse.json(
      { erreur: d.api.tropEnvois },
      { status: 429 }
    );
  }

  const chemin = `${randomUUID()}.${EXTENSIONS[fichier.type]}`;

  const { error } = await supabase.storage
    .from("logos")
    .upload(chemin, fichier, { contentType: fichier.type, upsert: false });

  if (error) {
    console.error("Échec téléversement logo", error);
    return NextResponse.json({ erreur: d.formulaire.erreurEnvoiLogo }, { status: 500 });
  }

  await supabase.from("logo_uploads").insert({ ip_hash: ipHash, chemin });

  const {
    data: { publicUrl },
  } = supabase.storage.from("logos").getPublicUrl(chemin);

  return NextResponse.json({ url: publicUrl });
}
