import type { MetadataRoute } from "next";
import { creerClientPublic } from "@/lib/supabase/server";
import { urlAbsolue } from "@/lib/site";

// Une manche s'ouvre et se referme chaque jour : au-dela d'une heure, la
// liste des archives n'est plus a jour.
export const revalidate = 3600;

const PAGES_FIXES: { chemin: string; frequence: MetadataRoute.Sitemap[number]["changeFrequency"]; priorite: number }[] = [
  { chemin: "/", frequence: "hourly", priorite: 1 },
  { chemin: "/palmares", frequence: "daily", priorite: 0.8 },
  { chemin: "/regles", frequence: "monthly", priorite: 0.5 },
  { chemin: "/mentions-legales", frequence: "yearly", priorite: 0.2 },
  { chemin: "/cgv", frequence: "yearly", priorite: 0.2 },
  { chemin: "/confidentialite", frequence: "yearly", priorite: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const maintenant = new Date();

  const fixes: MetadataRoute.Sitemap = PAGES_FIXES.map((p) => ({
    url: urlAbsolue(p.chemin),
    lastModified: maintenant,
    changeFrequency: p.frequence,
    priority: p.priorite,
  }));

  // Le sitemap est aussi genere pendant la construction : une base
  // injoignable ne doit pas faire echouer le deploiement, on sert alors les
  // seules pages fixes.
  let archives: MetadataRoute.Sitemap = [];
  try {
    const supabase = creerClientPublic();
    const { data } = await supabase
      .from("manches")
      .select("numero, closed_at, started_at")
      .order("numero", { ascending: false })
      .limit(5000);

    archives = (data ?? []).map((m) => ({
      url: urlAbsolue(`/jour/${m.numero}`),
      lastModified: new Date(m.closed_at ?? m.started_at ?? maintenant),
      // Une journee close ne bougera plus ; celle en cours change en direct.
      changeFrequency: m.closed_at ? ("yearly" as const) : ("hourly" as const),
      priority: m.closed_at ? 0.4 : 0.9,
    }));
  } catch (erreur) {
    console.error("Sitemap : archives indisponibles", erreur);
  }

  return [...fixes, ...archives];
}
