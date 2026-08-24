import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { creerClientService } from "@/lib/supabase/server";
import { getDictionnaire } from "@/lib/i18n/server";
import { LOGO_POIDS_MAX } from "@/lib/constantes";
import { hacherIp } from "@/lib/ip";

const ENVOIS_MAX_PAR_HEURE = 10;

/**
 * Signatures reconnues, avec l'extension et le type servis ensuite.
 *
 * Le `Content-Type` annonce dans la requete est choisi par l'appelant : s'y
 * fier reviendrait a le laisser decider sous quel type le depot resservira
 * le fichier. On lit donc les premiers octets et c'est eux qui decident.
 */
const SIGNATURES: {
  type: string;
  extension: string;
  correspond: (o: Uint8Array) => boolean;
}[] = [
  {
    type: "image/png",
    extension: "png",
    correspond: (o) =>
      o[0] === 0x89 && o[1] === 0x50 && o[2] === 0x4e && o[3] === 0x47,
  },
  {
    type: "image/jpeg",
    extension: "jpg",
    correspond: (o) => o[0] === 0xff && o[1] === 0xd8 && o[2] === 0xff,
  },
  {
    type: "image/gif",
    extension: "gif",
    correspond: (o) =>
      o[0] === 0x47 && o[1] === 0x49 && o[2] === 0x46 && o[3] === 0x38,
  },
  {
    type: "image/webp",
    extension: "webp",
    // "RIFF" ... "WEBP"
    correspond: (o) =>
      o[0] === 0x52 && o[1] === 0x49 && o[2] === 0x46 && o[3] === 0x46 &&
      o[8] === 0x57 && o[9] === 0x45 && o[10] === 0x42 && o[11] === 0x50,
  },
];

function reconnaitre(octets: Uint8Array) {
  if (octets.length < 12) return null;
  return SIGNATURES.find((s) => s.correspond(octets)) ?? null;
}

// Televersement du logo depuis le poste du miseur. Endpoint ouvert (le site
// n'a pas de comptes), donc tout est verrouille par le contenu : signature de
// l'image verifiee, poids plafonne, nom de fichier genere ici (jamais celui
// fourni, qui pourrait viser un autre chemin du depot).
export async function POST(request: Request) {
  const d = await getDictionnaire();
  const donnees = await request.formData().catch(() => null);
  const fichier = donnees?.get("fichier");

  if (!(fichier instanceof File)) {
    return NextResponse.json({ erreur: d.api.aucunFichier }, { status: 400 });
  }
  // Poids verifie avant lecture : inutile de charger en memoire un fichier
  // qu'on refusera.
  if (fichier.size > LOGO_POIDS_MAX) {
    return NextResponse.json({ erreur: d.formulaire.erreurPoids }, { status: 400 });
  }

  const contenu = new Uint8Array(await fichier.arrayBuffer());
  const format = reconnaitre(contenu);

  if (!format) {
    return NextResponse.json(
      { erreur: d.formulaire.erreurFormat },
      { status: 400 }
    );
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

  const chemin = `${randomUUID()}.${format.extension}`;

  const { error } = await supabase.storage
    .from("logos")
    // Type issu de la signature, jamais de celui annonce par l'appelant.
    .upload(chemin, contenu, { contentType: format.type, upsert: false });

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
