import { ImageResponse } from "next/og";
import { creerClientPublic } from "@/lib/supabase/server";
import { formaterMontant } from "@/lib/constantes";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ numero: string }> }
) {
  const { numero } = await params;
  const supabase = creerClientPublic();
  const { data: champion } = await supabase
    .from("champions")
    .select("numero, project_name, project_url, amount_cents")
    .eq("numero", Number(numero))
    .maybeSingle();

  if (!champion) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#a1a1a1",
            fontSize: 40,
          }}
        >
          Jour #{numero} pas encore clôturé
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 90, display: "flex" }}>🏆</div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1a1",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginTop: 24,
            display: "flex",
          }}
        >
          daywinner.lol · Jour #{champion.numero}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#fafafa",
            marginTop: 16,
            textAlign: "center",
            display: "flex",
          }}
        >
          {champion.project_name}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#e8442e",
            marginTop: 24,
            display: "flex",
          }}
        >
          Remporté pour {formaterMontant(champion.amount_cents)}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
