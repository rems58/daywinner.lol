import type { DictionnaireLegal } from "./legal-types";

// Version francaise : c'est elle qui fait foi.
export const legalFr: DictionnaireLegal = {
  primaute: null,

  mentions: {
    oeil: "Informations légales",
    titre: "Mentions légales",
    meta: "Éditeur, hébergeur et informations légales de daywinner.lol.",
    editeurTitre: "Éditeur du site",
    editeurIntro:
      "Le site daywinner.lol est édité par :",
    nom: "Nom",
    statut: "Forme juridique",
    adresse: "Adresse du siège",
    siret: "SIRET",
    email: "Courriel",
    telephone: "Téléphone",
    tva: "TVA intracommunautaire",
    tvaFranchise:
      "TVA non applicable, article 293 B du code général des impôts (franchise en base).",
    directeurTitre: "Directeur de la publication",
    directeurCorps:
      "Le directeur de la publication est l'entrepreneur individuel mentionné ci-dessus.",
    hebergeurTitre: "Hébergeur",
    hebergeurCorps: "Le site est hébergé par :",
    sections: [
      {
        titre: "Nature du service",
        corps: [
          "daywinner.lol vend des emplacements publicitaires sur un classement en ligne. L'annonceur paie pour afficher son produit, son application ou son profil à une position visible du site pendant une durée limitée.",
          "Le rang dépend uniquement du montant payé. Il n'existe aucun aléa, aucun tirage au sort et aucune redistribution de gains : le service ne constitue ni un jeu de hasard, ni une loterie, ni un pari au sens des articles L320-1 et suivants du code de la sécurité intérieure.",
        ],
      },
      {
        titre: "Propriété intellectuelle",
        corps: [
          "La structure du site, ses textes, sa charte graphique et son code source sont protégés par le droit d'auteur. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
          "Les noms, logos et marques affichés dans le classement appartiennent à leurs titulaires respectifs. Ils sont publiés à la demande et sous la responsabilité des annonceurs qui les soumettent, lesquels déclarent détenir les droits nécessaires.",
        ],
      },
      {
        titre: "Liens sortants",
        corps: [
          "Le classement contient des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur leur contenu et décline toute responsabilité quant aux informations qu'ils publient ou aux services qu'ils proposent.",
        ],
      },
      {
        titre: "Signalement d'un contenu illicite",
        corps: [
          "Conformément à l'article 6 de la loi pour la confiance dans l'économie numérique, tout contenu manifestement illicite peut être signalé à l'adresse de contact indiquée ci-dessus. Le signalement doit préciser l'entrée concernée et le motif du signalement.",
          "L'éditeur retire sans délai toute entrée manifestement illicite portée à sa connaissance.",
        ],
      },
    ],
  },

  cgv: {
    oeil: "Conditions générales",
    titre: "Conditions générales de vente",
    meta: "Conditions générales de vente applicables aux emplacements publicitaires vendus sur daywinner.lol.",
    versionLe: "Version en vigueur au {version}",
    article: "Article",
    articles: [
      {
        titre: "Objet et acceptation",
        corps: [
          "Les présentes conditions générales de vente régissent la vente d'emplacements publicitaires sur le site daywinner.lol, sans restriction ni réserve, entre l'éditeur du site et toute personne effectuant un achat, ci-après « l'annonceur ».",
          "Toute commande implique l'acceptation pleine et entière des présentes conditions, que l'annonceur reconnaît avoir lues avant de valider son paiement. Elles prévalent sur tout autre document.",
          "L'éditeur se réserve le droit de modifier les présentes conditions à tout moment. Les conditions applicables sont celles en vigueur à la date de la commande, dont la version est enregistrée avec celle-ci.",
        ],
      },
      {
        titre: "Description du service",
        corps: [
          "Le service consiste en l'affichage, sur une page publique du site, d'un lien vers le produit, l'application, le site ou le profil désigné par l'annonceur, accompagné de son nom, de sa catégorie, d'une description facultative et d'un logo facultatif.",
          "Les entrées sont classées par ordre décroissant du montant payé. À montant identique, l'antériorité de la commande départage les annonceurs : la commande la plus ancienne occupe le rang le plus élevé.",
          "Chaque manche dure environ vingt-quatre heures. Toute commande confirmée dans les deux dernières minutes avant la clôture reporte celle-ci de deux minutes, la manche ne prenant fin que lorsque plus aucune commande n'est intervenue pendant deux minutes.",
          "Le rang obtenu dépend exclusivement du montant payé et de l'antériorité. Il ne comporte aucun élément aléatoire, aucun tirage au sort et ne donne droit à aucun gain, prix ou reversement.",
        ],
      },
      {
        titre: "Durée et caractère temporaire de la prestation",
        corps: [
          "L'affichage prend effet dès la confirmation du paiement et prend fin à la clôture de la manche en cours, sans reconduction.",
          "L'annonceur reconnaît expressément que la place obtenue est temporaire et qu'elle disparaît du classement à la clôture de la manche, y compris s'il occupe le premier rang à cet instant.",
          "À la clôture, l'annonceur ayant payé le montant le plus élevé est archivé dans la rubrique « palmarès ». Les rangs suivants ne font l'objet d'aucun archivage public permanent.",
          "La prestation ne comporte aucun abonnement, aucune reconduction tacite et aucun prélèvement récurrent.",
        ],
      },
      {
        titre: "Prix et paiement",
        corps: [
          "Les prix sont indiqués en euros. Le montant de la commande est librement fixé par l'annonceur, dans le respect du montant minimum affiché sur le site au moment de la commande.",
          "Le paiement s'effectue en une fois, par carte bancaire, via le prestataire Stripe. L'éditeur n'a jamais accès aux données de la carte, qui sont traitées directement par le prestataire de paiement.",
          "La commande n'est enregistrée et l'affichage n'intervient qu'après confirmation du paiement par le prestataire. Un paiement refusé ou non confirmé n'ouvre droit à aucun affichage.",
          "Le régime de TVA applicable est celui indiqué dans les mentions légales.",
        ],
      },
      {
        titre: "Exécution immédiate et droit de rétractation",
        corps: [
          "Le service étant fourni à distance et exécuté immédiatement, l'annonceur consommateur est informé des conséquences suivantes avant de valider son paiement.",
          "En cochant la case prévue à cet effet, l'annonceur demande expressément que l'exécution du service commence immédiatement, avant l'expiration du délai de rétractation de quatorze jours, et reconnaît expressément qu'il perdra son droit de rétractation une fois le service pleinement exécuté, conformément à l'article L221-28 1° du code de la consommation.",
          "Le service est réputé pleinement exécuté à la clôture de la manche au cours de laquelle l'affichage a eu lieu. À compter de cette clôture, le droit de rétractation ne peut plus être exercé et aucun remboursement ne peut être demandé à ce titre.",
          "Avant la clôture de la manche, l'annonceur consommateur qui exerce son droit de rétractation est redevable, en application de l'article L221-25 du code de la consommation, d'un montant proportionnel au service déjà fourni, calculé au prorata de la durée d'affichage écoulée par rapport à la durée totale de la manche.",
          "La demande de rétractation est adressée à l'adresse de courriel figurant dans les mentions légales, par toute déclaration dénuée d'ambiguïté.",
          "Le droit de rétractation ne s'applique pas aux annonceurs professionnels agissant dans le cadre de leur activité.",
        ],
      },
      {
        titre: "Obligations de l'annonceur",
        corps: [
          "L'annonceur garantit que le lien soumis renvoie vers un projet, produit, service, profil ou compte réel dont il détient les droits ou pour lequel il dispose d'une autorisation.",
          "L'annonceur s'interdit de soumettre tout contenu illicite, trompeur, diffamatoire, portant atteinte aux droits de tiers, à caractère pornographique, violent, haineux, ou contrevenant à la réglementation applicable, notamment en matière de publicité, de jeux d'argent, de produits de santé ou de services financiers.",
          "L'annonceur garantit l'éditeur contre toute réclamation de tiers relative au contenu qu'il a soumis, y compris les frais de défense qui en résulteraient.",
        ],
      },
      {
        titre: "Modération et retrait",
        corps: [
          "L'éditeur peut retirer, sans préavis, toute entrée contrevenant à l'article précédent ou signalée comme manifestement illicite.",
          "En cas de retrait pour manquement de l'annonceur, aucun remboursement n'est dû.",
          "Si l'éditeur retire une entrée sans manquement imputable à l'annonceur, il rembourse le montant payé au prorata de la durée d'affichage restante.",
        ],
      },
      {
        titre: "Disponibilité et responsabilité",
        corps: [
          "L'éditeur s'engage à mettre en œuvre les moyens raisonnables pour assurer l'accessibilité du site, sans garantir une disponibilité ininterrompue.",
          "En cas d'indisponibilité imputable à l'éditeur et privant l'annonceur de tout affichage pendant une part significative de la manche, l'annonceur peut demander un remboursement au prorata de la durée d'indisponibilité.",
          "L'éditeur ne saurait être tenu responsable des dommages indirects, notamment de la perte de chiffre d'affaires, de clientèle ou de notoriété. Sa responsabilité est en tout état de cause limitée au montant effectivement payé par l'annonceur pour la commande concernée.",
          "L'éditeur ne garantit aucun volume de visites, de clics ni aucun résultat commercial attaché à l'affichage.",
        ],
      },
      {
        titre: "Données personnelles",
        corps: [
          "Les traitements de données à caractère personnel mis en œuvre à l'occasion d'une commande sont décrits dans la politique de confidentialité, accessible depuis le pied de page du site.",
        ],
      },
      {
        titre: "Réclamation et médiation de la consommation",
        corps: [
          "Toute réclamation est adressée en premier lieu à l'adresse de courriel figurant dans les mentions légales.",
          "Conformément à l'article L612-1 du code de la consommation, l'annonceur consommateur peut recourir gratuitement au médiateur de la consommation dont les coordonnées figurent ci-dessous, à condition d'avoir préalablement adressé une réclamation écrite à l'éditeur.",
          "La Commission européenne met par ailleurs à disposition une plateforme de règlement en ligne des litiges, accessible à l'adresse indiquée ci-dessous.",
        ],
      },
      {
        titre: "Droit applicable et juridiction",
        corps: [
          "Les présentes conditions sont soumises au droit français.",
          "En cas de litige avec un annonceur consommateur, les juridictions compétentes sont déterminées par les règles de droit commun applicables au consommateur.",
          "En cas de litige avec un annonceur professionnel, et à défaut de résolution amiable, compétence est attribuée aux tribunaux du ressort du siège de l'éditeur.",
          "La version française des présentes conditions est la seule faisant foi.",
        ],
      },
    ],
  },

  confidentialite: {
    oeil: "Vie privée",
    titre: "Politique de confidentialité",
    meta: "Données collectées par daywinner.lol, finalités, durées de conservation et droits des personnes.",
    sections: [
      {
        titre: "Responsable du traitement",
        corps: [
          "Le responsable du traitement est l'éditeur du site, dont l'identité et les coordonnées figurent dans les mentions légales.",
        ],
      },
      {
        titre: "Données collectées et finalités",
        corps: [
          "Données de commande : nom du projet, adresse du site ou identifiant de compte, catégorie, description facultative et logo facultatif. Ces données sont publiées volontairement par l'annonceur et sont, par nature, publiques. Finalité : exécution du contrat. Base légale : exécution du contrat.",
          "Adresse de courriel transmise par le prestataire de paiement lors de l'achat. Finalité : preuve de la commande, réponse à une réclamation, exercice du droit de rétractation. Base légale : exécution du contrat et obligation légale.",
          "Preuve du renoncement au droit de rétractation : horodatage du consentement et version des conditions acceptées. Finalité : preuve exigée par la réglementation. Base légale : obligation légale.",
          "Adresse IP transmise lors d'un envoi d'image, conservée sous forme hachée et non réversible. Finalité : limitation du nombre d'envois afin de prévenir les abus. Base légale : intérêt légitime.",
          "Compteur de visites, sous forme d'un total agrégé ne permettant aucune identification. Finalité : affichage d'une statistique publique. Base légale : intérêt légitime.",
        ],
      },
      {
        titre: "Absence de cookies de mesure d'audience",
        corps: [
          "Le site ne dépose aucun cookie publicitaire ni aucun traceur de mesure d'audience.",
          "Un unique cookie fonctionnel enregistre la langue choisie par le visiteur, afin de la restituer lors des visites suivantes. Il ne permet aucune identification et ne requiert pas de consentement préalable.",
        ],
      },
      {
        titre: "Destinataires et sous-traitants",
        corps: [
          "Stripe, prestataire de paiement, traite les données de paiement. L'éditeur n'a jamais accès aux données de carte bancaire.",
          "Supabase héberge la base de données du site.",
          "Vercel héberge le site et journalise techniquement les requêtes.",
          "Certains de ces prestataires peuvent traiter des données en dehors de l'Union européenne. Ces transferts sont encadrés par les clauses contractuelles types adoptées par la Commission européenne.",
        ],
      },
      {
        titre: "Durées de conservation",
        corps: [
          "Données de commande publiées : conservées pendant la manche en cours. Le nom et le lien de l'annonceur ayant obtenu le premier rang sont conservés durablement dans le palmarès, qui constitue une archive publique du service.",
          "Adresse de courriel et preuve de consentement : dix ans, durée de conservation des pièces comptables et contractuelles.",
          "Adresse IP hachée : supprimée après une heure, seule durée utile à la limitation des envois.",
          "Images envoyées sans commande aboutie : supprimées après vingt-quatre heures.",
        ],
      },
      {
        titre: "Vos droits",
        corps: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, exercés en écrivant à l'adresse de courriel figurant dans les mentions légales.",
          "L'effacement des données publiées est possible à tout moment. L'entrée est alors retirée du classement, sans remboursement lorsque la demande émane de l'annonceur lui-même.",
          "Vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés, 3 place de Fontenoy, 75007 Paris, ou sur son site www.cnil.fr.",
        ],
      },
    ],
  },

  retractation: {
    caseACocher:
      "Je demande que l'affichage commence immédiatement et je reconnais perdre mon droit de rétractation une fois la manche close.",
    precision:
      "Obligatoire. Le service étant exécuté immédiatement, ce consentement est requis par l'article L221-28 du code de la consommation. Il est horodaté et conservé comme preuve.",
    erreurNonCochee:
      "Tu dois accepter l'exécution immédiate pour pouvoir payer.",
    lireCgv: "Lire les conditions générales de vente",
  },

  pied: {
    mentions: "Mentions légales",
    cgv: "CGV",
    confidentialite: "Confidentialité",
  },
};
