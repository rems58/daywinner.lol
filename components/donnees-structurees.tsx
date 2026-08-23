/**
 * Donnees structurees JSON-LD. Les moteurs et les assistants de recherche
 * s'en servent pour comprendre la nature de la page sans avoir a interpreter
 * la mise en page.
 */
export function DonneesStructurees({ donnees }: { donnees: object }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu vient de la base : on neutralise `<` pour qu'une valeur
      // ne puisse pas refermer la balise et injecter du script.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(donnees).replace(/</g, "\\u003c"),
      }}
    />
  );
}
