import type { Dictionnaire } from "./types";

export const en: Dictionnaire = {
  meta: {
    titre: "daywinner.lol : first place, for the day",
    description:
      "Pay to take today's first place. The leaderboard resets every 24 hours, with an anti-snipe rule: nobody can steal the win in the last two minutes.",
  },

  nav: { palmares: "Hall of fame", regles: "Rules", miser: "Bid", langue: "Language" },

  stats: {
    enLigne: "{n} online",
    visiteurs: "visitors since launch",
    voirStats: "see the stats →",
  },

  chrono: {
    clotureDans: "Closing in",
    heures: "hours",
    minutes: "minutes",
    secondes: "seconds",
    clotureEnCours: "Closing now…",
  },

  accueil: {
    jourEnDirect: "Day #{n} · live",
    classementDuJour: "Today's leaderboard",
    prendrePremierePlace: "Take first place",
    ouvrirLaJournee: "Open the day",
    tientLeTitre: "{projet} holds the title at {montant}",
    tableauVierge: "Empty board · first bid from {montant}",
    liens: {
      classement: { oeil: "The leaderboard", label: "Who holds the title" },
      mise: { oeil: "Your bid", label: "Take the spot" },
      palmares: { oeil: "The hall of fame", label: "The champions" },
    },
    manifesteTitre: "First place, for the day.",
    manifesteTexte:
      "Pay to take the #1 spot. Anyone can outbid you until closing, and if someone bids in the last two minutes, the clock starts over. Tomorrow, everything resets.",
    miseOeil: "Take the spot",
    miseTitre: "Your bid, right now",
    miseIntro:
      "What you pay is your rank. The highest bid holds first place until someone pays more, or until the round closes.",
    etapesMise: [
      {
        titre: "You pay, you appear",
        corps:
          "Stripe payment, no account to create. Your entry goes live the second the card clears.",
      },
      {
        titre: "You can outbid yourself",
        corps:
          "Submit the same URL with a higher amount: your bid climbs, no duplicate entry.",
      },
      {
        titre: "Nobody steals your ending",
        corps:
          "A bid in the last two minutes extends the round by two minutes. The fight only ends when nobody outbids anymore.",
      },
    ],
    commentOeil: "How it works",
    commentTitre: "One day, one champion",
    commentLien: "The rules",
    etapes: [
      {
        titre: "The board opens at {montant}",
        corps:
          "Every round starts empty. The entry ticket never goes up: early birds hold the lead for almost nothing.",
      },
      {
        titre: "Bids climb over each other",
        corps:
          "The leaderboard is sorted by amount. Paying more than the current #1 takes their spot, live, in front of everyone.",
      },
      {
        titre: "The last two minutes count double",
        corps:
          "A bid in the closing window extends the round by two minutes. No snatching the title at the last second.",
      },
      {
        titre: "At closing, everything resets",
        corps:
          "The champion enters the hall of fame with a shareable trophy. The board empties, and a new day opens.",
      },
    ],
    merci: "Payment received, your bid is live. 🎉",
    annule: "Payment cancelled, no bid recorded.",
    entracteOeil: "Intermission",
    entracteTitre: "No round in progress.",
    entracteTexte:
      "The next day opens in a moment. Reload the page to take first place.",
  },

  classement: {
    videOeil: "Empty board",
    videTitre: "Nobody has bid on Day #{n} yet.",
    videTexte:
      "Whoever gets up early can hold first place for hours for the price of a coffee.",
    videCta: "Open the day for {montant}",
    premierePlace: "First place · Day #{n}",
    voirComplet: "See the full leaderboard",
    page: "Page {page} / {total}",
    precedente: "Previous page",
    suivante: "Next page",
  },

  formulaire: {
    taMise: "Your bid",
    des: "From {montant}",
    apercuNom: "Your project",
    apercuUrl: "will show up here with its logo",
    nomProjet: "Project name",
    nomPlaceholder: "MySaaS",
    url: "URL or @handle",
    urlPlaceholder: "mysaas.com",
    logo: "Logo",
    choisirFichier: "Choose a file",
    envoiEnCours: "Uploading…",
    retirer: "Remove",
    logoPlaceholder: "…or paste an https link to your logo",
    logoAide:
      "Optional. PNG, JPEG, WebP, SVG or GIF, 2 MB max. Without a logo, we pull your domain's favicon automatically.",
    description: "Short description",
    descriptionPlaceholder: "What your project does, in one sentence",
    categorie: "Category",
    categoriePlaceholder: "Pick a category",
    montant: "Amount in euros",
    montantAide:
      "Minimum {montant}, from start to finish of the round. On equal amounts, whoever bid first stays ahead.",
    miserEtPayer: "Bid and pay",
    redirection: "Redirecting to payment…",
    paiementNote:
      "Card payment via Stripe. Bids are non-refundable, your spot lasts until the round closes.",
    erreurFormat: "Accepted formats: PNG, JPEG, WebP, SVG or GIF.",
    erreurPoids: "Image too heavy (2 MB max).",
    erreurEnvoiLogo: "Upload failed, try again.",
    erreurServeur: "The server returned an error ({statut}).",
    erreurReseau: "Could not reach the server, try again.",
  },

  palmares: {
    oeil: "The hall of fame",
    titre: "One champion a day, forever",
    meta: "The leaderboard resets every round, but the win stays.",
    encaisse: "Collected since launch",
    manchesJouees: "Rounds played",
    misesRecues: "Bids received",
    videOeil: "Empty hall of fame",
    videTitre: "No round has closed yet.",
    videTexte:
      "The first champion lands here at the end of today's round. It could be you.",
    videCta: "Take first place",
    remportePour: "Won for",
  },

  jour: {
    jourNumero: "Day #{n}",
    enCoursOeil: "Round in progress",
    clotureeOeil: "Round closed",
    enCoursMeta: "The leaderboard can still move until closing.",
    clotureeMeta: "Closed on {date} · {mises} · {total} total",
    mise: "bid",
    mises: "bids",
    videOeil: "Empty board",
    videTitre: "No bids on this round.",
    championDuJour: "Champion of the day",
    premierePlaceDirect: "First place · live",
    place: "Place {n}",
    retourPalmares: "Back to the hall of fame",
  },

  regles: {
    oeil: "The rules",
    titre: "Simple, honest, no surprises",
    meta: "Here is exactly how the leaderboard works, and what you are buying.",
    article: "Article",
    articles: [
      {
        n: "01",
        titre: "The principle",
        corps: [
          "Each round lasts about 24 hours. During that time, anyone can bid to take a spot on the leaderboard: the highest bid holds first place.",
          "You can be overtaken at any moment by someone who bids more. At closing, the leaderboard is frozen, the champion enters the hall of fame, and a new round starts from zero.",
        ],
      },
      {
        n: "02",
        titre: "Anti-snipe rule",
        corps: [
          "If a bid is confirmed within the last two minutes before closing, the clock is automatically extended by two minutes, just like a real auction room.",
          "The round only ends once nobody has outbid for two minutes. So nobody can steal first place at the last second.",
        ],
      },
      {
        n: "03",
        titre: "Minimum bid",
        corps: [
          "{montant}, from start to finish of the round. The entry ticket never goes up: anyone can join the leaderboard for the price of a coffee, even when the top of the board is expensive.",
          "On equal amounts, seniority decides: whoever bid first stays ahead. Matching a bid is not enough to overtake someone, you have to beat it.",
          "You can outbid your own project at any time: submit the same URL with an amount above your previous bid, your entry climbs without creating a duplicate.",
        ],
      },
      {
        n: "04",
        titre: "Payment and refunds",
        corps: [
          "Payment is by card via Stripe. It is not refundable.",
          "Your spot on the leaderboard is temporary: it disappears when the round closes, even if you are first at reset time. The hall of fame keeps a permanent record of each day's champion, but not of the other places.",
        ],
      },
      {
        n: "05",
        titre: "Allowed content",
        corps: [
          "A link to a real project, product, profile or account. No illegal, misleading or offensive content.",
          "We reserve the right to remove an entry that breaks this rule, without a refund.",
        ],
      },
    ],
    encart: "A question before you bid?",
    encartLien: "See how it works in four steps",
  },

  api: {
    requeteInvalide: "Invalid request.",
    champsRequis: "Project name and URL are required.",
    categorieInvalide: "Invalid category.",
    miseMinimale: "Minimum bid: {montant}.",
    logoHttps: "The logo link must be an https URL.",
    aucuneManche: "No round is active right now, try again in a moment.",
    dejaMise: "Your current bid on this project is already {montant}. Offer more to outbid.",
    paiementImpossible: "Payment could not be started. Try again in a moment.",
    aucunFichier: "No file received.",
    tropEnvois: "Too many image uploads. Try again in an hour.",
  },
  categories: {
    ia: "AI & Agents",
    seo: "SEO & Visibility",
    dev: "Dev tools",
    productivite: "Productivity",
    marketing: "Marketing & Growth",
    design: "Design & Creative",
    crypto: "Crypto & Web3",
    jeux: "Games & Entertainment",
    ecommerce: "E-commerce",
    autre: "Other",
  },

  pied: {
    accroche:
      "First place is bought, not earned. And tomorrow, everything starts over.",
  },
};
