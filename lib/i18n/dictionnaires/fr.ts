import type { Dictionnaire } from "./types";

export const fr: Dictionnaire = {
  meta: {
    titre: "daywinner.lol : la première place, pour la journée",
    description:
      "Paie pour prendre la première place du jour. Le classement repart de zéro toutes les 24h, avec règle anti-snipe : impossible de voler la victoire dans les deux dernières minutes.",
  },

  nav: { palmares: "Palmarès", regles: "Règles", miser: "Miser", langue: "Langue" },

  stats: {
    enLigne: "{n} en ligne",
    visiteurs: "visiteurs depuis le lancement",
    voirStats: "voir les stats →",
  },

  chrono: {
    clotureDans: "Clôture dans",
    heures: "heures",
    minutes: "minutes",
    secondes: "secondes",
    clotureEnCours: "Clôture en cours…",
  },

  accueil: {
    jourEnDirect: "Jour #{n} · en direct",
    classementDuJour: "Le classement du jour",
    prendrePremierePlace: "Prendre la première place",
    ouvrirLaJournee: "Ouvrir la journée",
    tientLeTitre: "{projet} tient le titre à {montant}",
    tableauVierge: "Tableau vierge · première mise dès {montant}",
    liens: {
      classement: { oeil: "Le classement", label: "Qui tient le titre" },
      mise: { oeil: "Ta mise", label: "Prendre la place" },
      palmares: { oeil: "Le palmarès", label: "Les champions" },
    },
    manifesteTitre: "La première place, pour la journée.",
    manifesteTexte:
      "Paie pour prendre le #1. Tout le monde peut te surenchérir jusqu'à la clôture, et si quelqu'un mise dans les deux dernières minutes, le chrono repart. Demain, tout revient à zéro.",
    miseOeil: "Prendre la place",
    miseTitre: "Ta mise, maintenant",
    miseIntro:
      "Le montant que tu paies est ton rang. La mise la plus haute tient la première place jusqu'à ce que quelqu'un paie plus, ou jusqu'à la clôture de la manche.",
    etapesMise: [
      {
        titre: "Tu paies, tu apparais",
        corps:
          "Paiement Stripe, aucun compte à créer. Ta ligne est publiée à la seconde où la carte passe.",
      },
      {
        titre: "Tu peux te surenchérir",
        corps:
          "Remets la même URL avec un montant supérieur : ta mise monte, tu ne crées pas de doublon.",
      },
      {
        titre: "Personne ne te vole la fin",
        corps:
          "Une mise dans les deux dernières minutes prolonge la manche de deux minutes. La bataille se termine seulement quand plus personne ne surenchérit.",
      },
    ],
    commentOeil: "Le fonctionnement",
    commentTitre: "Une journée, un champion",
    commentLien: "Les règles",
    etapes: [
      {
        titre: "Le tableau s'ouvre à {montant}",
        corps:
          "Chaque manche démarre vierge. Le ticket d'entrée ne monte jamais : les lève-tôt tiennent la tête pour presque rien.",
      },
      {
        titre: "Les mises se surenchérissent",
        corps:
          "Le classement est trié par montant. Payer plus que le #1 actuel, c'est prendre sa place, en direct, sous les yeux de tout le monde.",
      },
      {
        titre: "Les deux dernières minutes comptent double",
        corps:
          "Une mise dans la fenêtre finale prolonge la manche de deux minutes. Impossible de rafler le titre à la dernière seconde.",
      },
      {
        titre: "À la clôture, tout repart de zéro",
        corps:
          "Le champion entre au palmarès avec son trophée partageable. Le classement se vide, et une nouvelle journée s'ouvre.",
      },
    ],
    merci: "Paiement reçu, ta mise est en ligne. 🎉",
    annule: "Paiement annulé, aucune mise enregistrée.",
    entracteOeil: "Entracte",
    entracteTitre: "Aucune manche en cours.",
    entracteTexte:
      "La prochaine journée s'ouvre dans un instant. Recharge la page pour prendre la première place.",
  },

  classement: {
    videOeil: "Tableau vierge",
    videTitre: "Personne n'a encore misé sur le Jour #{n}.",
    videTexte:
      "Celui qui se lève tôt peut tenir la première place pendant des heures pour le prix d'un café.",
    videCta: "Ouvrir la journée pour {montant}",
    premierePlace: "Première place · Jour #{n}",
    voirComplet: "Voir le classement complet",
    page: "Page {page} / {total}",
    precedente: "Page précédente",
    suivante: "Page suivante",
  },

  formulaire: {
    taMise: "Ta mise",
    des: "Dès {montant}",
    apercuNom: "Ton projet",
    apercuUrl: "apparaîtra ici avec son logo",
    nomProjet: "Nom du projet",
    nomPlaceholder: "MonSaaS",
    url: "URL ou @handle",
    urlPlaceholder: "monsaas.com",
    logo: "Logo",
    choisirFichier: "Choisir un fichier",
    envoiEnCours: "Envoi…",
    retirer: "Retirer",
    logoPlaceholder: "…ou colle un lien https vers ton logo",
    logoAide:
      "Facultatif. PNG, JPEG, WebP, SVG ou GIF, 2 Mo maximum. Sans logo, on récupère automatiquement le favicon de ton domaine.",
    description: "Description courte",
    descriptionPlaceholder: "Ce que fait ton projet, en une phrase",
    categorie: "Catégorie",
    categoriePlaceholder: "Choisir une catégorie",
    montant: "Montant en euros",
    montantAide:
      "Minimum {montant}, du début à la fin de la manche. À montant égal, celui qui a misé le premier reste devant.",
    miserEtPayer: "Miser et payer",
    redirection: "Redirection vers le paiement…",
    paiementNote:
      "Paiement par carte via Stripe. Mise non remboursable, place valable jusqu'à la clôture de la manche.",
    erreurFormat: "Format accepté : PNG, JPEG, WebP, SVG ou GIF.",
    erreurPoids: "Image trop lourde (2 Mo maximum).",
    erreurEnvoiLogo: "Le téléversement a échoué, réessaie.",
    erreurServeur: "Le serveur a répondu une erreur ({statut}).",
    erreurReseau: "Impossible de contacter le serveur, réessaie.",
  },

  palmares: {
    oeil: "Le palmarès",
    titre: "Un champion par jour, pour toujours",
    meta: "Le classement repart de zéro chaque manche, mais la victoire, elle, reste.",
    encaisse: "Encaissé depuis le lancement",
    manchesJouees: "Manches jouées",
    misesRecues: "Mises reçues",
    videOeil: "Palmarès vierge",
    videTitre: "Aucune manche clôturée pour l'instant.",
    videTexte:
      "Le premier champion entrera ici à la fin de la journée en cours. Ça peut être toi.",
    videCta: "Prendre la première place",
    remportePour: "Remporté pour",
  },

  jour: {
    jourNumero: "Jour #{n}",
    enCoursOeil: "Manche en cours",
    clotureeOeil: "Manche clôturée",
    enCoursMeta: "Le classement peut encore bouger jusqu'à la clôture.",
    clotureeMeta: "Clôturé le {date} · {mises} · {total} au total",
    mise: "mise",
    mises: "mises",
    videOeil: "Tableau vierge",
    videTitre: "Aucune mise sur cette manche.",
    championDuJour: "Champion du jour",
    premierePlaceDirect: "Première place · en direct",
    place: "Place {n}",
    retourPalmares: "Retour au palmarès",
  },

  regles: {
    oeil: "Les règles",
    titre: "Simple, honnête, sans surprise",
    meta: "Voici exactement comment le classement fonctionne, et ce que tu achètes.",
    article: "Article",
    articles: [
      {
        n: "01",
        titre: "Le principe",
        corps: [
          "Chaque manche dure environ 24 heures. Pendant ce temps, n'importe qui peut miser pour prendre une place dans le classement : la mise la plus haute occupe la première place.",
          "Tu peux être dépassé à tout moment par quelqu'un qui mise plus. À la clôture, le classement est figé, le champion entre au palmarès, et une nouvelle manche démarre à zéro.",
        ],
      },
      {
        n: "02",
        titre: "Règle anti-snipe",
        corps: [
          "Si une mise est confirmée dans les deux dernières minutes avant la clôture, le chrono est automatiquement prolongé de deux minutes, comme dans une vraie salle des ventes.",
          "La manche ne se termine que lorsque plus personne n'a surenchéri pendant deux minutes. Personne ne peut donc voler la première place à la dernière seconde.",
        ],
      },
      {
        n: "03",
        titre: "Mise minimale",
        corps: [
          "{montant}, du début à la fin de la manche. Le ticket d'entrée ne monte jamais : n'importe qui peut rejoindre le classement pour le prix d'un café, même quand le haut du tableau est cher.",
          "À montant égal, c'est l'ancienneté qui départage : celui qui a misé le premier reste devant. Égaler une mise ne suffit donc pas pour doubler quelqu'un, il faut faire mieux.",
          "Tu peux surenchérir sur ton propre projet à tout moment : remets la même URL avec un montant supérieur à ta mise précédente, ta ligne monte sans créer de doublon.",
        ],
      },
      {
        n: "04",
        titre: "Paiement et remboursement",
        corps: [
          "Le paiement se fait par carte via Stripe. Il n'est pas remboursable.",
          "Ta place dans le classement est temporaire : elle disparaît à la clôture de la manche, y compris si tu es premier au moment du reset. Le palmarès conserve une trace permanente du champion de chaque journée, mais pas des places suivantes.",
        ],
      },
      {
        n: "05",
        titre: "Contenu autorisé",
        corps: [
          "Un lien vers un vrai projet, produit, profil ou compte. Pas de contenu illégal, trompeur ou offensant.",
          "Nous nous réservons le droit de retirer une entrée qui ne respecte pas cette règle, sans remboursement.",
        ],
      },
    ],
    encart: "Une question avant de miser ?",
    encartLien: "Revoir le fonctionnement en quatre étapes",
  },

  api: {
    requeteInvalide: "Requête invalide.",
    champsRequis: "Nom et URL du projet requis.",
    categorieInvalide: "Catégorie invalide.",
    miseMinimale: "Mise minimale : {montant}.",
    logoHttps: "Le lien du logo doit être une URL https.",
    aucuneManche: "Aucune manche active pour le moment, réessaie dans un instant.",
    dejaMise: "Ta mise actuelle sur ce projet est déjà de {montant}. Propose plus pour surenchérir.",
    paiementImpossible: "Le paiement n'a pas pu être lancé. Réessaie dans un instant.",
    aucunFichier: "Aucun fichier reçu.",
    tropEnvois: "Trop d'envois d'images. Réessaie dans une heure.",
  },
  categories: {
    ia: "IA & Agents",
    seo: "SEO & Visibilité",
    dev: "Outils dev",
    productivite: "Productivité",
    marketing: "Marketing & Growth",
    design: "Design & Créatif",
    crypto: "Crypto & Web3",
    jeux: "Jeux & Divertissement",
    ecommerce: "E-commerce",
    autre: "Autre",
  },

  pied: {
    accroche:
      "La première place s'achète, elle ne se mérite pas. Et demain, tout repart de zéro.",
  },
};
