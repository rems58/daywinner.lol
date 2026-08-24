import type { Dictionnaire } from "./types";

export const de: Dictionnaire = {
  meta: {
    titre: "daywinner.lol: Platz eins, für einen ganzen Tag",
    description:
      "Zahle für den ersten Platz des Tages. Die Rangliste wird jeden Abend um 21 Uhr Pariser Zeit zurückgesetzt, mit Anti-Snipe-Regel: In den letzten zwei Minuten kann niemand den Sieg stehlen.",
  },

  nav: { palmares: "Bestenliste", regles: "Regeln", miser: "Bieten", langue: "Sprache" },

  stats: {
    enLigne: "{n} online",
    visiteurs: "Besucher seit dem Start",
    voirStats: "Statistiken ansehen →",
  },

  chrono: {
    clotureDans: "Schluss in",
    heures: "Stunden",
    minutes: "Minuten",
    secondes: "Sekunden",
    clotureEnCours: "Runde wird geschlossen…",
  },

  accueil: {
    jourEnDirect: "Tag #{n} · live",
    classementDuJour: "Die Rangliste des Tages",
    prendrePremierePlace: "Platz eins holen",
    ouvrirLaJournee: "Den Tag eröffnen",
    tientLeTitre: "{projet} hält den Titel mit {montant}",
    tableauVierge: "Noch alles leer · erstes Gebot ab {montant}",
    liens: {
      classement: { oeil: "Die Rangliste", label: "Wer den Titel hält" },
      mise: { oeil: "Dein Gebot", label: "Platz eins holen" },
      palmares: { oeil: "Die Bestenliste", label: "Die Champions" },
    },
    manifesteTitre: "Platz eins, für einen ganzen Tag.",
    manifesteTexte:
      "Zahl und nimm dir die #1. Bis zum Schluss kann dich jeder überbieten, und wer in den letzten zwei Minuten bietet, startet die Uhr neu. Morgen steht alles wieder bei null.",
    miseOeil: "Platz eins holen",
    miseTitre: "Dein Gebot, jetzt",
    miseIntro:
      "Was du zahlst, ist dein Rang. Das höchste Gebot hält Platz eins, bis jemand mehr zahlt oder die Runde zu Ende geht.",
    etapesMise: [
      {
        titre: "Du zahlst, du stehst drin",
        corps:
          "Zahlung über Stripe, kein Konto nötig. Deine Zeile geht in der Sekunde online, in der die Karte durchgeht.",
      },
      {
        titre: "Du kannst dich selbst überbieten",
        corps:
          "Gib dieselbe URL mit einem höheren Betrag ein: Dein Gebot steigt, ein Duplikat entsteht nicht.",
      },
      {
        titre: "Niemand klaut dir den Schluss",
        corps:
          "Ein Gebot in den letzten zwei Minuten verlängert die Runde um zwei Minuten. Vorbei ist es erst, wenn niemand mehr überbietet.",
      },
    ],
    commentOeil: "So läuft es",
    commentTitre: "Ein Tag, ein Champion",
    commentLien: "Die Regeln",
    etapes: [
      {
        titre: "Das Board öffnet bei {montant}",
        corps:
          "Jede Runde startet leer. Das Eintrittsticket wird nie teurer: Frühaufsteher führen für fast nichts.",
      },
      {
        titre: "Gebote werden überboten",
        corps:
          "Die Rangliste ist nach Betrag sortiert. Wer mehr zahlt als die aktuelle #1, nimmt ihren Platz, live, vor aller Augen.",
      },
      {
        titre: "Die letzten zwei Minuten zählen doppelt",
        corps:
          "Ein Gebot im Schlussfenster verlängert die Runde um zwei Minuten. Den Titel in der letzten Sekunde abzugreifen, geht nicht.",
      },
      {
        titre: "Zum Schluss startet alles wieder bei null",
        corps:
          "Der Champion kommt mit seiner teilbaren Trophäe in die Bestenliste. Die Rangliste leert sich, und ein neuer Tag beginnt.",
      },
    ],
    merci: "Zahlung erhalten, dein Gebot ist online.",
    annule: "Zahlung abgebrochen, es wurde kein Gebot gespeichert.",
    entracteOeil: "Pause",
    entracteTitre: "Gerade läuft keine Runde.",
    entracteTexte:
      "Der nächste Tag startet gleich. Lade die Seite neu und hol dir Platz eins.",
  },

  classement: {
    videOeil: "Leeres Board",
    videTitre: "Auf Tag #{n} hat noch niemand geboten.",
    videTexte:
      "Das erste Gebot übernimmt die Führung, zum Preis eines Kaffees. Jeden Abend um 21 Uhr Pariser Zeit beginnt alles von vorn.",
    videCta: "Den Tag eröffnen für {montant}",
    premierePlace: "Platz eins · Tag #{n}",
    voirComplet: "Komplette Rangliste ansehen",
    clics: "{n} Klicks",
    page: "Seite {page} / {total}",
    precedente: "Vorherige Seite",
    suivante: "Nächste Seite",
  },

  formulaire: {
    taMise: "Dein Gebot",
    des: "Ab {montant}",
    apercuNom: "Dein Projekt",
    apercuUrl: "erscheint hier mit seinem Logo",
    nomProjet: "Name des Projekts",
    nomPlaceholder: "MonSaaS",
    url: "URL oder @handle",
    urlPlaceholder: "monsaas.com",
    logo: "Logo",
    choisirFichier: "Datei auswählen",
    envoiEnCours: "Wird hochgeladen…",
    retirer: "Entfernen",
    logoPlaceholder: "…oder füge einen https-Link zu deinem Logo ein",
    logoAide:
      "Optional. PNG, JPEG, WebP, SVG oder GIF, maximal 2 MB. Ohne Logo holen wir automatisch das Favicon deiner Domain.",
    description: "Kurzbeschreibung",
    descriptionPlaceholder: "Was dein Projekt macht, in einem Satz",
    categorie: "Kategorie",
    categoriePlaceholder: "Kategorie auswählen",
    montant: "Betrag in Euro",
    montantAide:
      "Mindestens {montant} pro Zahlung. Jede Zahlung wird zu deinem Tagesbetrag addiert. Bei gleichem Betrag bleibt vorn, wer zuerst gezahlt hat.",
    dejaSurCeProjet: "Bereits auf diesem Projekt",
    apresCePaiement: "Nach dieser Zahlung",
    miserEtPayer: "Bieten und bezahlen",
    redirection: "Weiterleitung zur Zahlung…",
    paiementNote:
      "Kartenzahlung über Stripe. Gebot nicht erstattungsfähig, der Platz gilt bis zum Ende der Runde.",
    erreurFormat: "Zulässige Formate: PNG, JPEG, WebP oder GIF.",
    erreurPoids: "Bild zu groß (maximal 2 MB).",
    erreurEnvoiLogo: "Der Upload ist fehlgeschlagen, versuch es nochmal.",
    erreurServeur: "Der Server hat einen Fehler gemeldet ({statut}).",
    erreurReseau: "Der Server ist nicht erreichbar, versuch es nochmal.",
  },

  palmares: {
    oeil: "Die Bestenliste",
    titre: "Ein Champion pro Tag, für immer",
    meta: "Die Rangliste startet jede Runde wieder bei null, der Sieg aber bleibt.",
    encaisse: "Eingenommen seit dem Start",
    manchesJouees: "Gespielte Runden",
    misesRecues: "Erhaltene Gebote",
    videOeil: "Leere Bestenliste",
    videTitre: "Bisher wurde keine Runde abgeschlossen.",
    videTexte:
      "Der erste Champion landet hier am Ende des laufenden Tages. Das kannst du sein.",
    videCta: "Platz eins holen",
    remportePour: "Geholt für",
  },

  jour: {
    jourNumero: "Tag #{n}",
    enCoursOeil: "Laufende Runde",
    clotureeOeil: "Abgeschlossene Runde",
    enCoursMeta: "Bis zum Schluss kann sich die Rangliste noch ändern.",
    clotureeMeta: "Abgeschlossen am {date} · {mises} · {total} insgesamt",
    mise: "Gebot",
    mises: "Gebote",
    videOeil: "Leeres Board",
    videTitre: "Kein Gebot in dieser Runde.",
    championDuJour: "Champion des Tages",
    premierePlaceDirect: "Platz eins · live",
    place: "Platz {n}",
    retourPalmares: "Zurück zur Bestenliste",
  },

  regles: {
    oeil: "Die Regeln",
    titre: "Einfach, ehrlich, ohne Überraschungen",
    meta: "Hier steht genau, wie die Rangliste funktioniert und was du kaufst.",
    article: "Artikel",
    articles: [
      {
        n: "01",
        titre: "Das Prinzip",
        corps: [
          "Jede Runde dauert etwa 24 Stunden. In dieser Zeit kann jeder zahlen, um einen Platz in der Rangliste zu belegen: Der höchste Gesamtbetrag steht auf Platz eins.",
          "Jederzeit kann dich jemand mit einem höheren Gebot überholen. Zum Schluss wird die Rangliste eingefroren, der Champion kommt in die Bestenliste, und eine neue Runde startet bei null.",
        ],
      },
      {
        n: "02",
        titre: "Anti-Snipe-Regel",
        corps: [
          "Wird ein Gebot in den letzten zwei Minuten vor Schluss bestätigt, verlängert sich die Uhr automatisch um zwei Minuten, wie in einem echten Auktionshaus.",
          "Die Runde endet erst, wenn zwei Minuten lang niemand mehr überboten hat. Platz eins in der letzten Sekunde zu klauen, ist also unmöglich.",
        ],
      },
      {
        n: "03",
        titre: "Mindestgebot",
        corps: [
          "{montant} pro Zahlung, vom Anfang bis zum Ende der Runde. Der Einstiegspreis steigt nie: Jeder kann für den Preis eines Kaffees in die Rangliste einsteigen, auch wenn die Spitze teuer ist.",
          "Bei gleichem Gesamtbetrag entscheidet die Reihenfolge: Wer zuerst gezahlt hat, bleibt vorn. Einen Gesamtbetrag nur zu erreichen genügt also nicht, du musst ihn übertreffen.",
          "Deine Zahlungen addieren sich: Reiche dieselbe URL erneut ein, und der Betrag wird zu deinem Tagesbetrag addiert, ohne Dublette. Um jemanden wieder zu überholen, zahlst du nur die Differenz.",
        ],
      },
      {
        n: "04",
        titre: "Zahlung und Erstattung",
        corps: [
          "Bezahlt wird per Karte über Stripe. Eine Erstattung gibt es nicht.",
          "Dein Platz in der Rangliste ist befristet: Er verschwindet am Ende der Runde, auch wenn du beim Reset ganz oben stehst. Die Bestenliste bewahrt den Champion jedes Tages dauerhaft auf, die übrigen Plätze nicht.",
        ],
      },
      {
        n: "05",
        titre: "Erlaubte Inhalte",
        corps: [
          "Ein Link zu einem echten Projekt, Produkt, Profil oder Konto. Keine illegalen, irreführenden oder beleidigenden Inhalte.",
          "Wir behalten uns das Recht vor, einen Eintrag zu entfernen, der gegen diese Regel verstößt, ohne Erstattung.",
        ],
      },
    ],
    encart: "Noch eine Frage vor deinem Gebot?",
    encartLien: "Die vier Schritte noch mal ansehen",
  },

  api: {
    requeteInvalide: "Ungültige Anfrage.",
    champsRequis: "Projektname und URL sind erforderlich.",
    categorieInvalide: "Ungültige Kategorie.",
    miseMinimale: "Mindestgebot: {montant}.",
    logoHttps: "Der Logo-Link muss eine https-URL sein.",
    urlInvalide: "Diese Adresse ist ungültig. Gib eine Domain (meinsaas.com) oder ein @handle an.",
    aucuneManche: "Gerade läuft keine Runde, versuch es gleich nochmal.",
    paiementImpossible: "Die Zahlung konnte nicht gestartet werden. Versuch es gleich nochmal.",
    aucunFichier: "Keine Datei empfangen.",
    tropEnvois: "Zu viele Bild-Uploads. Versuch es in einer Stunde nochmal.",
  },
  categories: {
    ia: "KI & Agenten",
    seo: "SEO & Sichtbarkeit",
    dev: "Dev-Tools",
    productivite: "Produktivität",
    marketing: "Marketing & Growth",
    design: "Design & Kreatives",
    crypto: "Krypto & Web3",
    jeux: "Spiele & Unterhaltung",
    ecommerce: "E-Commerce",
    autre: "Sonstiges",
  },

  pied: {
    accroche:
      "Platz eins kauft man, man verdient ihn sich nicht. Und morgen startet alles wieder bei null.",
  },
};
