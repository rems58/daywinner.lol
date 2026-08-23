"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { Manche, Entree } from "@/lib/types";
import { CompteARebours } from "@/components/compte-a-rebours";
import { FormulaireMise } from "@/components/formulaire-mise";
import { Classement } from "@/components/classement";
import { BandeauStats } from "@/components/bandeau-stats";
import { Reveal, WordsReveal } from "@/components/fx";
import { Navigation, PastilleFleche, TitreSection, ROUGE } from "@/components/habillage";
import {
  MISE_MIN_CENTS,
  formaterMontant,
} from "@/lib/constantes";

const liensHero = (basePath: string) => [
  { oeil: "Le classement", label: "Qui tient le titre", href: "#classement" },
  { oeil: "Ta mise", label: "Prendre la place", href: "#miser" },
  { oeil: "Le palmarès", label: "Les champions", href: `${basePath}/palmares` },
];

function trier(entries: Entree[]) {
  return [...entries].sort((a, b) => {
    if (b.amount_cents !== a.amount_cents) return b.amount_cents - a.amount_cents;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
}

export function TableauDeBord({
  rondeInitiale,
  misesInitiales,
  basePath = "",
}: {
  rondeInitiale: Manche;
  misesInitiales: Entree[];
  /** Prefixe des liens internes : vide en production, "/apercu" en demo. */
  basePath?: string;
}) {
  const [manche, setManche] = useState(rondeInitiale);
  const [entries, setEntries] = useState(() => trier(misesInitiales));
  const mancheIdRef = useRef(rondeInitiale.id);

  useEffect(() => {
    mancheIdRef.current = manche.id;
  }, [manche.id]);

  useEffect(() => {
    const supabase = creerClientNavigateur();

    const channel = supabase
      .channel("tableau-de-bord")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "manches" },
        (payload) => {
          const ligne = (payload.new ?? payload.old) as Manche | undefined;
          if (!ligne) return;

          if (payload.eventType === "INSERT" && ligne.closed_at === null) {
            // Nouvelle manche ouverte par le cron : classement vierge.
            setManche(ligne);
            setEntries([]);
            return;
          }
          if (ligne.id === mancheIdRef.current) {
            setManche((actuelle) => ({ ...actuelle, ...ligne }));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "entries" },
        (payload) => {
          const ligne = (payload.new ?? payload.old) as Entree | undefined;
          if (!ligne || ligne.manche_id !== mancheIdRef.current) return;

          setEntries((actuelles) => {
            if (payload.eventType === "DELETE") {
              return actuelles.filter((e) => e.id !== ligne.id);
            }
            const sansCelleCi = actuelles.filter((e) => e.id !== ligne.id);
            return trier([...sansCelleCi, ligne]);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const tenant = entries[0];

  return (
    <>
      {/* Barre de navigation et compteurs live, poses sur le ciel cosmos. */}
      <div className="relative overflow-hidden bg-encre">
        <div className="cosmos-nebula absolute inset-0" aria-hidden />
        <div className="cosmos-stars absolute inset-0" aria-hidden />
        <div className="relative">
          <Navigation />
          <BandeauStats />
        </div>
      </div>

      {/* CLASSEMENT : chrono et appel a miser integres a l'intertitre */}
      <section id="classement" className="scroll-mt-10 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <TitreSection
            oeilDeBoeuf={`Jour #${manche.numero} · en direct`}
            titre="Le classement du jour"
          />

          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-12 gap-y-5 border-t-2 border-zinc-950 pt-5 sm:mt-10 sm:gap-y-8 sm:pt-7">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
                Clôture dans
              </p>
              <div className="mt-3 sm:mt-4">
                <CompteARebours finISO={manche.ends_at} ton="clair" taille="moyen" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:gap-3">
              <a
                href="#miser"
                style={{ backgroundColor: ROUGE }}
                className="rounded-sm px-7 py-3 text-center text-[15px] font-bold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98] sm:py-3.5"
              >
                {tenant ? "Prendre la première place" : "Ouvrir la journée"}
              </a>
              <span className="text-[13px] text-zinc-500 sm:text-sm">
                {tenant
                  ? `${tenant.project_name} tient le titre à ${formaterMontant(tenant.amount_cents)}`
                  : `Tableau vierge · première mise dès ${formaterMontant(MISE_MIN_CENTS)}`}
              </span>
            </div>
          </div>

          <div className="mt-8 sm:mt-14">
            <Classement
              entries={entries}
              numeroManche={manche.numero}
              basePath={basePath}
            />
          </div>
        </div>
      </section>

      {/* MANIFESTE : le grand titre editorial, en second */}
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="cosmos-nebula absolute inset-0" aria-hidden />
        <div className="cosmos-stars cosmos-stars--far absolute inset-0" aria-hidden />
        <div className="cosmos-stars absolute inset-0" aria-hidden />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:py-28">
          <h1 className="max-w-4xl text-5xl leading-[1.02] font-bold tracking-tight text-balance sm:text-7xl lg:text-[5.25rem]">
            <WordsReveal text="La première place, pour la journée." />
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-white/80 sm:text-xl">
              Paie pour prendre le #1. Tout le monde peut te surenchérir
              jusqu&apos;à la clôture, et si quelqu&apos;un mise dans les deux
              dernières minutes, le chrono repart. Demain, tout revient à zéro.
            </p>
          </Reveal>

          {/* Rangee de liens editoriaux facon une de magazine */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {liensHero(basePath).map((lien, i) => (
              <Reveal key={lien.href} delay={0.3 + i * 0.1}>
                <Link href={lien.href} className="group block border-t border-white/30 pt-4">
                  <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-white/60 uppercase">
                    {lien.oeil}
                  </p>
                  <p className="mt-2 flex items-center gap-2.5 text-lg font-bold tracking-tight">
                    {lien.label}
                    <PastilleFleche />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISER */}
      <section id="miser" className="scroll-mt-10 bg-zinc-100">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-28">
          <TitreSection oeilDeBoeuf="Prendre la place" titre="Ta mise, maintenant" />
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div className="flex flex-col gap-6">
                <p className="max-w-[52ch] text-[15px] leading-relaxed text-zinc-600">
                  Le montant que tu paies est ton rang. La mise la plus haute
                  tient la première place jusqu&apos;à ce que quelqu&apos;un
                  paie plus, ou jusqu&apos;à la clôture de la manche.
                </p>
                <dl className="flex flex-col gap-5">
                  <div className="border-t-2 border-zinc-950 pt-4">
                    <dt className="font-mono text-sm font-semibold" style={{ color: ROUGE }}>
                      01
                    </dt>
                    <dd className="mt-1.5 text-lg font-bold tracking-tight">
                      Tu paies, tu apparais
                    </dd>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">
                      Paiement Stripe, aucun compte à créer. Ta ligne est
                      publiée à la seconde où la carte passe.
                    </dd>
                  </div>
                  <div className="border-t-2 border-zinc-950 pt-4">
                    <dt className="font-mono text-sm font-semibold" style={{ color: ROUGE }}>
                      02
                    </dt>
                    <dd className="mt-1.5 text-lg font-bold tracking-tight">
                      Tu peux te surenchérir
                    </dd>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">
                      Remets la même URL avec un montant supérieur : ta mise
                      monte, tu ne crées pas de doublon.
                    </dd>
                  </div>
                  <div className="border-t-2 border-zinc-950 pt-4">
                    <dt className="font-mono text-sm font-semibold" style={{ color: ROUGE }}>
                      03
                    </dt>
                    <dd className="mt-1.5 text-lg font-bold tracking-tight">
                      Personne ne te vole la fin
                    </dd>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">
                      Une mise dans les deux dernières minutes prolonge la
                      manche de deux minutes. La bataille se termine seulement
                      quand plus personne ne surenchérit.
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <FormulaireMise
                mancheClose={manche.closed_at !== null}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
