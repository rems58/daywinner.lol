import { createHash } from "crypto";

/**
 * Empreinte d'adresse IP.
 *
 * L'IP n'est jamais stockee en clair : on n'a besoin que de reconnaitre un
 * meme visiteur sur une fenetre courte, jamais de savoir qui il est. Le sel
 * rend l'empreinte inexploitable hors de ce service, un espace d'adresses
 * IPv4 se parcourant sinon en quelques minutes.
 */
export function hacherIp(request: Request) {
  const entete =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "inconnue";
  return createHash("sha256")
    .update(`${entete}:${process.env.CRON_SECRET ?? "sel-par-defaut"}`)
    .digest("hex");
}
