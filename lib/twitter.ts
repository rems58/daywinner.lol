import { createHmac, randomBytes } from "crypto";

/**
 * Boucle virale optionnelle : poste le champion du jour sur X. N'importe
 * quelle variable d'env manquante => no-op silencieux (best-effort), ne
 * bloque jamais la clôture de la manche.
 */

function pourcentEncoder(valeur: string) {
  return encodeURIComponent(valeur).replace(
    /[!*'()]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

type CredentiellesTwitter = {
  apiKey: string;
  apiKeySecret: string;
  accessToken: string;
  accessTokenSecret: string;
};

function construireEnTeteOAuth1(
  methode: string,
  url: string,
  creds: CredentiellesTwitter
) {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: creds.apiKey,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: creds.accessToken,
    oauth_version: "1.0",
  };

  // Requête JSON sans query string : seuls les paramètres oauth_* entrent
  // dans la base de signature (spec OAuth1.0a, le corps JSON n'y participe pas).
  const chaineParams = Object.keys(oauthParams)
    .sort()
    .map((k) => `${pourcentEncoder(k)}=${pourcentEncoder(oauthParams[k])}`)
    .join("&");
  const chaineBase = [
    methode.toUpperCase(),
    pourcentEncoder(url),
    pourcentEncoder(chaineParams),
  ].join("&");
  const cleSignature = `${pourcentEncoder(creds.apiKeySecret)}&${pourcentEncoder(
    creds.accessTokenSecret
  )}`;
  const signature = createHmac("sha1", cleSignature)
    .update(chaineBase)
    .digest("base64");

  const enTeteParams: Record<string, string> = { ...oauthParams, oauth_signature: signature };
  return (
    "OAuth " +
    Object.keys(enTeteParams)
      .sort()
      .map((k) => `${pourcentEncoder(k)}="${pourcentEncoder(enTeteParams[k])}"`)
      .join(", ")
  );
}

export async function posterTweetChampion(texte: string) {
  const apiKey = process.env.TWITTER_API_KEY;
  const apiKeySecret = process.env.TWITTER_API_KEY_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  if (!apiKey || !apiKeySecret || !accessToken || !accessTokenSecret) {
    return { poste: false, raison: "clés X absentes" } as const;
  }

  const url = "https://api.twitter.com/2/tweets";
  try {
    const reponse = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: construireEnTeteOAuth1("POST", url, {
          apiKey,
          apiKeySecret,
          accessToken,
          accessTokenSecret,
        }),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: texte }),
    });
    if (!reponse.ok) {
      console.error("Échec post tweet champion", reponse.status, await reponse.text());
      return { poste: false, raison: `http ${reponse.status}` } as const;
    }
    return { poste: true } as const;
  } catch (erreur) {
    console.error("Erreur réseau post tweet champion", erreur);
    return { poste: false, raison: "erreur réseau" } as const;
  }
}
