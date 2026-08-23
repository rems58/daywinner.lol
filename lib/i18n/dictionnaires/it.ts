import type { Dictionnaire } from "./types";

export const it: Dictionnaire = {
  meta: {
    titre: "daywinner.lol: il primo posto, per un giorno intero",
    description:
      "Paga per prenderti il primo posto della giornata. La classifica riparte da zero ogni 24h, con regola anti-snipe: negli ultimi due minuti nessuno può rubarti la vittoria.",
  },

  nav: { palmares: "Albo d'oro", regles: "Regole", miser: "Punta", langue: "Lingua" },

  stats: {
    enLigne: "{n} online",
    visiteurs: "visitatori dal lancio",
    voirStats: "vedi le statistiche →",
  },

  chrono: {
    clotureDans: "Chiusura tra",
    heures: "ore",
    minutes: "minuti",
    secondes: "secondi",
    clotureEnCours: "Chiusura in corso…",
  },

  accueil: {
    jourEnDirect: "Giorno #{n} · in diretta",
    classementDuJour: "La classifica del giorno",
    prendrePremierePlace: "Prendi il primo posto",
    ouvrirLaJournee: "Apri la giornata",
    tientLeTitre: "{projet} tiene il titolo a {montant}",
    tableauVierge: "Tabellone vuoto · prima offerta da {montant}",
    liens: {
      classement: { oeil: "La classifica", label: "Chi tiene il titolo" },
      mise: { oeil: "La tua offerta", label: "Prendi il posto" },
      palmares: { oeil: "L'albo d'oro", label: "I campioni" },
    },
    manifesteTitre: "Il primo posto, per un giorno intero.",
    manifesteTexte:
      "Paga per prenderti il #1. Chiunque può rilanciare fino alla chiusura e, se qualcuno punta negli ultimi due minuti, il cronometro riparte. Domani si azzera tutto.",
    miseOeil: "Prendi il posto",
    miseTitre: "La tua offerta, adesso",
    miseIntro:
      "L'importo che paghi è la tua posizione. L'offerta più alta tiene il primo posto finché qualcuno non paga di più, o fino alla chiusura del round.",
    etapesMise: [
      {
        titre: "Paghi, appari",
        corps:
          "Pagamento Stripe, nessun account da creare. La tua riga viene pubblicata nell'istante in cui la carta passa.",
      },
      {
        titre: "Puoi rilanciare su te stesso",
        corps:
          "Rimetti lo stesso URL con un importo più alto: la tua offerta sale, non crei un doppione.",
      },
      {
        titre: "Nessuno ti ruba il finale",
        corps:
          "Un'offerta negli ultimi due minuti prolunga il round di due minuti. La battaglia finisce solo quando nessuno rilancia più.",
      },
    ],
    commentOeil: "Come funziona",
    commentTitre: "Una giornata, un campione",
    commentLien: "Le regole",
    etapes: [
      {
        titre: "Il tabellone apre a {montant}",
        corps:
          "Ogni round parte da zero. Il biglietto d'ingresso non sale mai: chi arriva presto tiene la testa per quasi niente.",
      },
      {
        titre: "Le offerte si rilanciano",
        corps:
          "La classifica è ordinata per importo. Pagare più del #1 attuale significa prendergli il posto, in diretta, davanti a tutti.",
      },
      {
        titre: "Gli ultimi due minuti valgono doppio",
        corps:
          "Un'offerta nella finestra finale prolunga il round di due minuti. Impossibile arraffare il titolo all'ultimo secondo.",
      },
      {
        titre: "Alla chiusura si riparte da zero",
        corps:
          "Il campione entra nell'albo d'oro con il suo trofeo condivisibile. La classifica si svuota e si apre una nuova giornata.",
      },
    ],
    merci: "Pagamento ricevuto, la tua offerta è online.",
    annule: "Pagamento annullato, nessuna offerta registrata.",
    entracteOeil: "Intervallo",
    entracteTitre: "Nessun round in corso.",
    entracteTexte:
      "La prossima giornata apre tra un istante. Ricarica la pagina per prendere il primo posto.",
  },

  classement: {
    videOeil: "Tabellone vuoto",
    videTitre: "Nessuno ha ancora puntato sul Giorno #{n}.",
    videTexte:
      "Chi si alza presto può tenere il primo posto per ore al prezzo di un caffè.",
    videCta: "Apri la giornata per {montant}",
    premierePlace: "Primo posto · Giorno #{n}",
    voirComplet: "Vedi la classifica completa",
    clics: "{n} clic",
    page: "Pagina {page} / {total}",
    precedente: "Pagina precedente",
    suivante: "Pagina successiva",
  },

  formulaire: {
    taMise: "La tua offerta",
    des: "Da {montant}",
    apercuNom: "Il tuo progetto",
    apercuUrl: "apparirà qui con il suo logo",
    nomProjet: "Nome del progetto",
    nomPlaceholder: "MonSaaS",
    url: "URL o @handle",
    urlPlaceholder: "monsaas.com",
    logo: "Logo",
    choisirFichier: "Scegli un file",
    envoiEnCours: "Invio…",
    retirer: "Rimuovi",
    logoPlaceholder: "…oppure incolla un link https al tuo logo",
    logoAide:
      "Facoltativo. PNG, JPEG, WebP, SVG o GIF, massimo 2 MB. Senza logo, recuperiamo automaticamente la favicon del tuo dominio.",
    description: "Descrizione breve",
    descriptionPlaceholder: "Cosa fa il tuo progetto, in una frase",
    categorie: "Categoria",
    categoriePlaceholder: "Scegli una categoria",
    montant: "Importo in euro",
    montantAide:
      "Minimo {montant}, dall'inizio alla fine del round. A parità di importo, chi ha puntato per primo resta davanti.",
    miserEtPayer: "Punta e paga",
    redirection: "Reindirizzamento al pagamento…",
    paiementNote:
      "Pagamento con carta tramite Stripe. Offerta non rimborsabile, posto valido fino alla chiusura del round.",
    erreurFormat: "Formati accettati: PNG, JPEG, WebP, SVG o GIF.",
    erreurPoids: "Immagine troppo pesante (massimo 2 MB).",
    erreurEnvoiLogo: "Il caricamento non è riuscito, riprova.",
    erreurServeur: "Il server ha risposto con un errore ({statut}).",
    erreurReseau: "Impossibile contattare il server, riprova.",
  },

  palmares: {
    oeil: "L'albo d'oro",
    titre: "Un campione al giorno, per sempre",
    meta: "La classifica riparte da zero a ogni round, ma la vittoria resta.",
    encaisse: "Incassato dal lancio",
    manchesJouees: "Round giocati",
    misesRecues: "Offerte ricevute",
    videOeil: "Albo d'oro vuoto",
    videTitre: "Nessun round chiuso per ora.",
    videTexte:
      "Il primo campione entrerà qui alla fine della giornata in corso. Potresti essere tu.",
    videCta: "Prendi il primo posto",
    remportePour: "Vinto per",
  },

  jour: {
    jourNumero: "Giorno #{n}",
    enCoursOeil: "Round in corso",
    clotureeOeil: "Round chiuso",
    enCoursMeta: "La classifica può ancora cambiare fino alla chiusura.",
    clotureeMeta: "Chiuso il {date} · {mises} · {total} in totale",
    mise: "offerta",
    mises: "offerte",
    videOeil: "Tabellone vuoto",
    videTitre: "Nessuna offerta su questo round.",
    championDuJour: "Campione del giorno",
    premierePlaceDirect: "Primo posto · in diretta",
    place: "Posto {n}",
    retourPalmares: "Torna all'albo d'oro",
  },

  regles: {
    oeil: "Le regole",
    titre: "Semplice, onesto, senza sorprese",
    meta: "Ecco esattamente come funziona la classifica e cosa stai comprando.",
    article: "Articolo",
    articles: [
      {
        n: "01",
        titre: "Il principio",
        corps: [
          "Ogni round dura circa 24 ore. In quel tempo chiunque può puntare per prendersi un posto in classifica: l'offerta più alta occupa il primo posto.",
          "Puoi essere superato in qualsiasi momento da chi punta di più. Alla chiusura la classifica si congela, il campione entra nell'albo d'oro e un nuovo round parte da zero.",
        ],
      },
      {
        n: "02",
        titre: "Regola anti-snipe",
        corps: [
          "Se un'offerta viene confermata negli ultimi due minuti prima della chiusura, il cronometro si prolunga automaticamente di due minuti, come in una vera casa d'aste.",
          "Il round finisce solo quando nessuno rilancia per due minuti di fila. Nessuno può quindi rubare il primo posto all'ultimo secondo.",
        ],
      },
      {
        n: "03",
        titre: "Offerta minima",
        corps: [
          "{montant}, dall'inizio alla fine del round. Il biglietto d'ingresso non sale mai: chiunque può entrare in classifica al prezzo di un caffè, anche quando la vetta è cara.",
          "A parità di importo decide l'anzianità: chi ha puntato per primo resta davanti. Pareggiare un'offerta non basta per superare qualcuno, devi fare meglio.",
          "Puoi rilanciare sul tuo stesso progetto quando vuoi: rimetti lo stesso URL con un importo superiore alla tua offerta precedente, la tua riga sale senza creare un doppione.",
        ],
      },
      {
        n: "04",
        titre: "Pagamento e rimborso",
        corps: [
          "Il pagamento avviene con carta tramite Stripe. Non è rimborsabile.",
          "Il tuo posto in classifica è temporaneo: sparisce alla chiusura del round, anche se sei primo al momento del reset. L'albo d'oro conserva una traccia permanente del campione di ogni giornata, ma non dei posti successivi.",
        ],
      },
      {
        n: "05",
        titre: "Contenuti ammessi",
        corps: [
          "Un link verso un progetto, prodotto, profilo o account reale. Niente contenuti illegali, ingannevoli o offensivi.",
          "Ci riserviamo il diritto di rimuovere una voce che non rispetta questa regola, senza rimborso.",
        ],
      },
    ],
    encart: "Una domanda prima di puntare?",
    encartLien: "Rivedi il funzionamento in quattro passaggi",
  },

  api: {
    requeteInvalide: "Richiesta non valida.",
    champsRequis: "Nome del progetto e URL obbligatori.",
    categorieInvalide: "Categoria non valida.",
    miseMinimale: "Offerta minima: {montant}.",
    logoHttps: "Il link del logo deve essere un URL https.",
    aucuneManche: "Nessun round attivo al momento, riprova tra un istante.",
    dejaMise: "La tua offerta attuale su questo progetto è già di {montant}. Offri di più per rilanciare.",
    paiementImpossible: "Impossibile avviare il pagamento. Riprova tra un istante.",
    aucunFichier: "Nessun file ricevuto.",
    tropEnvois: "Troppi caricamenti di immagini. Riprova tra un'ora.",
  },
  categories: {
    ia: "IA & Agenti",
    seo: "SEO & Visibilità",
    dev: "Strumenti dev",
    productivite: "Produttività",
    marketing: "Marketing & Growth",
    design: "Design & Creatività",
    crypto: "Crypto & Web3",
    jeux: "Giochi & Intrattenimento",
    ecommerce: "E-commerce",
    autre: "Altro",
  },

  pied: {
    accroche:
      "Il primo posto si compra, non si merita. E domani riparte tutto da zero.",
  },
};
