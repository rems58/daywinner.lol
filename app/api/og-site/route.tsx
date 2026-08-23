import { ImageResponse } from "next/og";
import { dictionnairePour } from "@/lib/i18n/server";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { HEURE_CLOTURE } from "@/lib/constantes";

const ENCRE = "#040609";
const ROUGE = "#e8442e";

/**
 * Carte de partage generique de la marque, dans la langue de la page qui la
 * reference. Route dediee plutot que la convention `opengraph-image` : les
 * pages declarent deja leur `openGraph` en entier, une URL explicite evite
 * toute ambiguite sur l'image finalement retenue.
 */
export function GET(request: Request) {
  const demandee = new URL(request.url).searchParams.get("l");
  const locale = isLocale(demandee) ? demandee : DEFAULT_LOCALE;
  const d = dictionnairePour(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ENCRE,
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 8,
              background: "#fafafa",
              color: ENCRE,
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            1
          </div>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: ROUGE }} />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#8b8f96",
              letterSpacing: 6,
              textTransform: "uppercase",
              marginLeft: 8,
            }}
          >
            daywinner.lol
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#fafafa",
              maxWidth: 1000,
            }}
          >
            {d.accueil.classementDuJour}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#b6bac1",
              marginTop: 26,
              maxWidth: 940,
            }}
          >
            {d.accueil.miseIntro}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 90, height: 6, background: ROUGE }} />
          <div style={{ display: "flex", fontSize: 28, color: "#8b8f96" }}>
            {HEURE_CLOTURE}:00 Europe/Paris
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
