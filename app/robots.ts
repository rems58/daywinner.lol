import type { MetadataRoute } from "next";
import { urlAbsolue } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // `/apercu` est une demonstration a donnees fictives : indexee, elle
        // ferait concurrence aux vraies pages sur les memes termes.
        disallow: ["/api/", "/apercu"],
      },
    ],
    sitemap: urlAbsolue("/sitemap.xml"),
    host: urlAbsolue("/"),
  };
}
