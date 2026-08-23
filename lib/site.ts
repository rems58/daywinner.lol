/**
 * Origine canonique du site. Sert aux URL absolues exigees par les moteurs
 * et les apercus de partage : une URL relative dans une balise og:image ou
 * un sitemap n'est pas exploitable par un robot.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://daywinner.lol"
).replace(/\/+$/, "");

export const SITE_NOM = "daywinner.lol";

/** URL absolue a partir d'un chemin interne ("/palmares"). */
export function urlAbsolue(chemin: string) {
  if (chemin === "/" || chemin === "") return SITE_URL;
  return `${SITE_URL}${chemin.startsWith("/") ? chemin : `/${chemin}`}`;
}
