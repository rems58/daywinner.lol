"use server";
// Enregistre la langue choisie par le visiteur.
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

export async function definirLocale(valeur: string) {
  // Une valeur inconnue est ignoree plutot que posee en cookie : sinon un
  // cookie bidon ferait retomber tout le site sur l'anglais sans explication.
  if (!isLocale(valeur)) return;

  const store = await cookies();
  store.set(LOCALE_COOKIE, valeur, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: false,
  });
  // La langue change tout le rendu serveur : on invalide l'ensemble des pages.
  revalidatePath("/", "layout");
}
