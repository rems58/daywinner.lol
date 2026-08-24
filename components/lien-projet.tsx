"use client";

import type { ReactNode } from "react";

/**
 * Lien sortant vers le site d'un annonceur, avec comptage du clic.
 *
 * Le href reste l'URL reelle plutot qu'une redirection interne : le
 * visiteur voit la vraie destination dans sa barre d'etat, ce qui compte
 * pour la confiance sur un site qui manipule de l'argent. Le comptage part
 * en parallele et n'a pas besoin d'aboutir pour que la navigation se fasse.
 */
export function LienProjet({
  entreeId,
  href,
  className,
  children,
}: {
  entreeId: string;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener nofollow"
      className={className}
      onClick={() => {
        // Volontairement sans await : l'ouverture de l'onglet ne doit pas
        // attendre le reseau. Un clic perdu vaut mieux qu'un lien lent.
        // `keepalive` laisse la requete aboutir meme si l'onglet change.
        void fetch("/api/clic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entree: entreeId }),
          keepalive: true,
        }).catch(() => undefined);
      }}
    >
      {children}
    </a>
  );
}
