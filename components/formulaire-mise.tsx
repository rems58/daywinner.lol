"use client";

import { useState } from "react";
import { ROUGE } from "@/components/habillage";
import { LogoProjet } from "@/components/logo-projet";
import {
  CATEGORIES,
  LOGO_POIDS_MAX,
  LOGO_TYPES,
  LOGO_URL_MAX,
  MISE_MIN_CENTS,
  formaterMontant,
  remplir,
} from "@/lib/constantes";
import type { Dictionnaire } from "@/lib/i18n/dictionnaires/types";
import type { Locale } from "@/lib/i18n/config";

const CHAMP =
  "w-full rounded-sm border border-zinc-300 bg-white px-4 py-3 text-[15px] text-zinc-950 outline-none transition-colors duration-300 placeholder:text-zinc-400 focus:border-zinc-950";

const LIBELLE =
  "font-mono text-[11px] font-medium tracking-[0.2em] text-zinc-500 uppercase";

export function FormulaireMise({
  d,
  locale,
  mancheClose,
}: {
  d: Dictionnaire;
  locale: Locale;
  mancheClose: boolean;
}) {
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  // Suivis pour l'apercu du logo : le miseur voit sa ligne avant de payer.
  const [nom, setNom] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [envoiLogo, setEnvoiLogo] = useState(false);

  async function televerserLogo(evenement: React.ChangeEvent<HTMLInputElement>) {
    const fichier = evenement.target.files?.[0];
    // Le champ est remis a zero : re-choisir le meme fichier doit redeclencher
    // l'envoi (sinon React ne voit aucun changement de valeur).
    evenement.target.value = "";
    if (!fichier) return;

    if (!LOGO_TYPES.includes(fichier.type as (typeof LOGO_TYPES)[number])) {
      setErreur(d.formulaire.erreurFormat);
      return;
    }
    if (fichier.size > LOGO_POIDS_MAX) {
      setErreur(d.formulaire.erreurPoids);
      return;
    }

    setErreur(null);
    setEnvoiLogo(true);
    try {
      const corps = new FormData();
      corps.append("fichier", fichier);
      const reponse = await fetch("/api/logo", { method: "POST", body: corps });
      const resultat = await reponse.json();
      if (!reponse.ok) {
        setErreur(resultat.erreur ?? d.formulaire.erreurEnvoiLogo);
        return;
      }
      setLogo(resultat.url);
    } catch {
      setErreur(d.formulaire.erreurEnvoiLogo);
    } finally {
      setEnvoiLogo(false);
    }
  }

  async function soumettre(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    setErreur(null);
    setEnCours(true);

    const donnees = new FormData(evenement.currentTarget);
    const montantEuros = Number(donnees.get("montant"));

    try {
      const reponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: donnees.get("project_name"),
          project_url: donnees.get("project_url"),
          category: donnees.get("category"),
          tagline: donnees.get("tagline"),
          logo_url: donnees.get("logo_url"),
          amount_cents: Math.round(montantEuros * 100),
        }),
      });
      // Reponse illisible (page d'erreur HTML) : on ne la confond pas avec
      // une panne reseau, sinon la vraie cause reste introuvable.
      const resultat = await reponse.json().catch(() => null);
      if (!reponse.ok || !resultat?.url) {
        setErreur(
          resultat?.erreur ??
            remplir(d.formulaire.erreurServeur, { statut: reponse.status })
        );
        setEnCours(false);
        return;
      }
      window.location.href = resultat.url;
    } catch {
      setErreur(d.formulaire.erreurReseau);
      setEnCours(false);
    }
  }

  return (
    <form
      onSubmit={soumettre}
      className="flex flex-col gap-5 rounded-md bg-white p-8 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase">
          {d.formulaire.taMise}
        </h3>
        <span
          style={{ backgroundColor: ROUGE }}
          className="px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase"
        >
          {remplir(d.formulaire.des, { montant: formaterMontant(MISE_MIN_CENTS, locale) })}
        </span>
      </div>

      {/* Apercu de la ligne telle qu'elle apparaitra au classement. */}
      <div className="flex items-center gap-3 rounded-md bg-zinc-50 p-3 ring-1 ring-zinc-950/5">
        <LogoProjet nom={nom || "?"} projectUrl={url} logoUrl={logo || null} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-bold tracking-tight">
            {nom || d.formulaire.apercuNom}
          </span>
          <span className="block truncate font-mono text-[11px] text-zinc-500">
            {url || d.formulaire.apercuUrl}
          </span>
        </span>
      </div>

      <div className="grid gap-2">
        <label htmlFor="project_name" className={LIBELLE}>
          {d.formulaire.nomProjet}
        </label>
        <input
          id="project_name"
          name="project_name"
          required
          maxLength={80}
          placeholder={d.formulaire.nomPlaceholder}
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className={CHAMP}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="project_url" className={LIBELLE}>
          {d.formulaire.url}
        </label>
        <input
          id="project_url"
          name="project_url"
          required
          maxLength={200}
          placeholder={d.formulaire.urlPlaceholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={CHAMP}
        />
      </div>

      <div className="grid gap-2">
        <span className={LIBELLE}>{d.formulaire.logo}</span>

        <div className="flex flex-wrap items-center gap-3">
          <label
            className={
              "cursor-pointer rounded-sm border border-zinc-300 px-4 py-2.5 text-sm font-semibold transition-colors duration-300 hover:border-zinc-950 hover:bg-zinc-100 " +
              (envoiLogo ? "pointer-events-none opacity-50" : "")
            }
          >
            {envoiLogo ? d.formulaire.envoiEnCours : d.formulaire.choisirFichier}
            <input
              type="file"
              accept={LOGO_TYPES.join(",")}
              onChange={televerserLogo}
              disabled={envoiLogo}
              className="sr-only"
            />
          </label>
          {logo && !envoiLogo && (
            <button
              type="button"
              onClick={() => setLogo("")}
              className="text-sm font-semibold text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-950"
            >
              {d.formulaire.retirer}
            </button>
          )}
        </div>

        <input
          id="logo_url"
          name="logo_url"
          type="url"
          inputMode="url"
          maxLength={LOGO_URL_MAX}
          placeholder={d.formulaire.logoPlaceholder}
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className={CHAMP}
        />
        <p className="text-[13px] leading-relaxed text-zinc-500">
          {d.formulaire.logoAide}
        </p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="tagline" className={LIBELLE}>
          {d.formulaire.description}
        </label>
        <input
          id="tagline"
          name="tagline"
          maxLength={140}
          placeholder={d.formulaire.descriptionPlaceholder}
          className={CHAMP}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="category" className={LIBELLE}>
          {d.formulaire.categorie}
        </label>
        <select id="category" name="category" required defaultValue="" className={CHAMP}>
          <option value="" disabled>
            {d.formulaire.categoriePlaceholder}
          </option>
          {CATEGORIES.map((cle) => (
            <option key={cle} value={cle}>
              {d.categories[cle]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="montant" className={LIBELLE}>
          {d.formulaire.montant}
        </label>
        <input
          id="montant"
          name="montant"
          type="number"
          min={MISE_MIN_CENTS / 100}
          step={0.5}
          required
          placeholder={String(MISE_MIN_CENTS / 100)}
          className={`${CHAMP} text-2xl font-bold tabular-nums`}
        />
        {/* Le navigateur se contente de "valeur superieure ou egale a 1" :
            on rappelle la regle pour que le chiffre ne paraisse pas arbitraire. */}
        <p className="text-[13px] leading-relaxed text-zinc-500">
          {remplir(d.formulaire.montantAide, { montant: formaterMontant(MISE_MIN_CENTS, locale) })}
        </p>
      </div>

      {erreur && (
        <p
          className="border-l-4 px-4 py-3 text-[14px] leading-relaxed"
          style={{ borderColor: ROUGE, backgroundColor: "#fdf1ef", color: ROUGE }}
        >
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours || mancheClose}
        style={{ backgroundColor: ROUGE }}
        className="w-full rounded-sm px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        {enCours ? d.formulaire.redirection : d.formulaire.miserEtPayer}
      </button>

      <p className="text-[13px] leading-relaxed text-zinc-500">
        {d.formulaire.paiementNote}
      </p>
    </form>
  );
}
