import type { Dictionnaire } from "./types";

export const es: Dictionnaire = {
  meta: {
    titre: "daywinner.lol: el primer puesto, por un día",
    description:
      "Paga y toma el primer puesto del día. La clasificación vuelve a cero cada 24 h, con regla anti-snipe: nadie puede robarte la victoria en los dos últimos minutos.",
  },

  nav: { palmares: "Palmarés", regles: "Reglas", miser: "Pujar", langue: "Idioma" },

  stats: {
    enLigne: "{n} en línea",
    visiteurs: "visitantes desde el lanzamiento",
    voirStats: "ver las estadísticas →",
  },

  chrono: {
    clotureDans: "Cierra en",
    heures: "horas",
    minutes: "minutos",
    secondes: "segundos",
    clotureEnCours: "Cerrando…",
  },

  accueil: {
    jourEnDirect: "Día #{n} · en directo",
    classementDuJour: "La clasificación del día",
    prendrePremierePlace: "Tomar el primer puesto",
    ouvrirLaJournee: "Abrir la jornada",
    tientLeTitre: "{projet} defiende el título con {montant}",
    tableauVierge: "Tablero en blanco · primera puja desde {montant}",
    liens: {
      classement: { oeil: "La clasificación", label: "Quién tiene el título" },
      mise: { oeil: "Tu puja", label: "Tomar el puesto" },
      palmares: { oeil: "El palmarés", label: "Los campeones" },
    },
    manifesteTitre: "El primer puesto, por un día.",
    manifesteTexte:
      "Paga y toma el #1. Cualquiera puede superarte hasta el cierre, y si alguien puja en los dos últimos minutos, el crono se reinicia. Mañana, todo vuelve a cero.",
    miseOeil: "Tomar el puesto",
    miseTitre: "Tu puja, ahora",
    miseIntro:
      "Lo que pagas es tu posición. La puja más alta ocupa el primer puesto hasta que alguien pague más, o hasta que se cierre la ronda.",
    etapesMise: [
      {
        titre: "Pagas y apareces",
        corps:
          "Pago con Stripe, sin crear ninguna cuenta. Tu línea se publica en el segundo en que pasa la tarjeta.",
      },
      {
        titre: "Puedes subir tu propia puja",
        corps:
          "Vuelve a enviar la misma URL con un importe mayor: tu puja sube y no creas ningún duplicado.",
      },
      {
        titre: "Nadie te roba el final",
        corps:
          "Una puja en los dos últimos minutos alarga la ronda dos minutos más. La batalla solo termina cuando ya nadie puja por encima.",
      },
    ],
    commentOeil: "Cómo funciona",
    commentTitre: "Un día, un campeón",
    commentLien: "Las reglas",
    etapes: [
      {
        titre: "El tablero abre en {montant}",
        corps:
          "Cada ronda empieza en blanco. La entrada nunca sube: quien madruga lidera por casi nada.",
      },
      {
        titre: "Las pujas se superan entre sí",
        corps:
          "La clasificación se ordena por importe. Pagar más que el #1 actual es quitarle el puesto, en directo y a la vista de todos.",
      },
      {
        titre: "Los dos últimos minutos valen doble",
        corps:
          "Una puja en la ventana final alarga la ronda dos minutos. Imposible arrebatar el título en el último segundo.",
      },
      {
        titre: "Al cierre, todo vuelve a cero",
        corps:
          "El campeón entra en el palmarés con su trofeo para compartir. La clasificación se vacía y se abre una nueva jornada.",
      },
    ],
    merci: "Pago recibido, tu puja ya está en línea.",
    annule: "Pago cancelado, no se ha registrado ninguna puja.",
    entracteOeil: "Entreacto",
    entracteTitre: "No hay ninguna ronda en curso.",
    entracteTexte:
      "La próxima jornada abre en un momento. Recarga la página para tomar el primer puesto.",
  },

  classement: {
    videOeil: "Tablero en blanco",
    videTitre: "Todavía nadie ha pujado en el Día #{n}.",
    videTexte:
      "Quien madruga puede aguantar el primer puesto durante horas por el precio de un café.",
    videCta: "Abrir la jornada por {montant}",
    premierePlace: "Primer puesto · Día #{n}",
    voirComplet: "Ver la clasificación completa",
    clics: "{n} clics",
    page: "Página {page} / {total}",
    precedente: "Página anterior",
    suivante: "Página siguiente",
  },

  formulaire: {
    taMise: "Tu puja",
    des: "Desde {montant}",
    apercuNom: "Tu proyecto",
    apercuUrl: "aparecerá aquí con su logo",
    nomProjet: "Nombre del proyecto",
    nomPlaceholder: "MonSaaS",
    url: "URL o @handle",
    urlPlaceholder: "monsaas.com",
    logo: "Logo",
    choisirFichier: "Elegir un archivo",
    envoiEnCours: "Enviando…",
    retirer: "Quitar",
    logoPlaceholder: "…o pega un enlace https a tu logo",
    logoAide:
      "Opcional. PNG, JPEG, WebP, SVG o GIF, 2 MB máximo. Sin logo, cogemos automáticamente el favicon de tu dominio.",
    description: "Descripción corta",
    descriptionPlaceholder: "Lo que hace tu proyecto, en una frase",
    categorie: "Categoría",
    categoriePlaceholder: "Elegir una categoría",
    montant: "Importe en euros",
    montantAide:
      "Mínimo {montant}, de principio a fin de la ronda. A igual importe, quien pujó primero se queda delante.",
    miserEtPayer: "Pujar y pagar",
    redirection: "Redirigiendo al pago…",
    paiementNote:
      "Pago con tarjeta vía Stripe. Puja no reembolsable, puesto válido hasta el cierre de la ronda.",
    erreurFormat: "Formato aceptado: PNG, JPEG, WebP, SVG o GIF.",
    erreurPoids: "Imagen demasiado pesada (2 MB máximo).",
    erreurEnvoiLogo: "La subida ha fallado, inténtalo otra vez.",
    erreurServeur: "El servidor ha respondido con un error ({statut}).",
    erreurReseau: "No se puede contactar con el servidor, inténtalo otra vez.",
  },

  palmares: {
    oeil: "El palmarés",
    titre: "Un campeón al día, para siempre",
    meta: "La clasificación vuelve a cero cada ronda, pero la victoria se queda.",
    encaisse: "Recaudado desde el lanzamiento",
    manchesJouees: "Rondas jugadas",
    misesRecues: "Pujas recibidas",
    videOeil: "Palmarés vacío",
    videTitre: "Ninguna ronda cerrada por ahora.",
    videTexte:
      "El primer campeón entrará aquí al final de la jornada en curso. Puedes ser tú.",
    videCta: "Tomar el primer puesto",
    remportePour: "Ganado por",
  },

  jour: {
    jourNumero: "Día #{n}",
    enCoursOeil: "Ronda en curso",
    clotureeOeil: "Ronda cerrada",
    enCoursMeta: "La clasificación aún puede moverse hasta el cierre.",
    clotureeMeta: "Cerrada el {date} · {mises} · {total} en total",
    mise: "puja",
    mises: "pujas",
    videOeil: "Tablero en blanco",
    videTitre: "Ninguna puja en esta ronda.",
    championDuJour: "Campeón del día",
    premierePlaceDirect: "Primer puesto · en directo",
    place: "Puesto {n}",
    retourPalmares: "Volver al palmarés",
  },

  regles: {
    oeil: "Las reglas",
    titre: "Simple, honesto, sin sorpresas",
    meta: "Esto es exactamente cómo funciona la clasificación, y qué es lo que compras.",
    article: "Artículo",
    articles: [
      {
        n: "01",
        titre: "El principio",
        corps: [
          "Cada ronda dura unas 24 horas. Durante ese tiempo, cualquiera puede pujar para ocupar un puesto en la clasificación: la puja más alta ocupa el primer puesto.",
          "Alguien que pague más puede superarte en cualquier momento. Al cierre, la clasificación se congela, el campeón entra en el palmarés y una nueva ronda empieza desde cero.",
        ],
      },
      {
        n: "02",
        titre: "Regla anti-snipe",
        corps: [
          "Si una puja se confirma en los dos últimos minutos antes del cierre, el crono se prolonga automáticamente dos minutos, como en una sala de subastas de verdad.",
          "La ronda solo termina cuando nadie ha pujado por encima durante dos minutos. Así que nadie puede robar el primer puesto en el último segundo.",
        ],
      },
      {
        n: "03",
        titre: "Puja mínima",
        corps: [
          "{montant}, de principio a fin de la ronda. La entrada nunca sube: cualquiera puede entrar en la clasificación por el precio de un café, incluso cuando la parte alta del tablero está cara.",
          "A igual importe manda la antigüedad: quien pujó primero se queda delante. Igualar una puja no basta para adelantar a nadie, hay que superarla.",
          "Puedes subir la puja de tu propio proyecto cuando quieras: vuelve a enviar la misma URL con un importe superior al anterior y tu línea sube sin crear ningún duplicado.",
        ],
      },
      {
        n: "04",
        titre: "Pago y reembolso",
        corps: [
          "El pago se hace con tarjeta vía Stripe. No es reembolsable.",
          "Tu puesto en la clasificación es temporal: desaparece al cerrarse la ronda, incluso si eres primero en el momento del reinicio. El palmarés conserva un rastro permanente del campeón de cada jornada, pero no de los puestos siguientes.",
        ],
      },
      {
        n: "05",
        titre: "Contenido permitido",
        corps: [
          "Un enlace a un proyecto, producto, perfil o cuenta de verdad. Nada de contenido ilegal, engañoso u ofensivo.",
          "Nos reservamos el derecho de retirar una entrada que no respete esta regla, sin reembolso.",
        ],
      },
    ],
    encart: "¿Alguna duda antes de pujar?",
    encartLien: "Repasar el funcionamiento en cuatro pasos",
  },

  api: {
    requeteInvalide: "Solicitud no válida.",
    champsRequis: "Nombre del proyecto y URL obligatorios.",
    categorieInvalide: "Categoría no válida.",
    miseMinimale: "Puja mínima: {montant}.",
    logoHttps: "El enlace del logo debe ser una URL https.",
    aucuneManche: "No hay ninguna ronda activa ahora mismo, inténtalo en un momento.",
    dejaMise: "Tu puja actual en este proyecto ya es de {montant}. Ofrece más para pujar por encima.",
    paiementImpossible: "No se ha podido iniciar el pago. Inténtalo en un momento.",
    aucunFichier: "No se ha recibido ningún archivo.",
    tropEnvois: "Demasiadas subidas de imágenes. Inténtalo dentro de una hora.",
  },
  categories: {
    ia: "IA y Agentes",
    seo: "SEO y Visibilidad",
    dev: "Herramientas dev",
    productivite: "Productividad",
    marketing: "Marketing y Growth",
    design: "Diseño y Creatividad",
    crypto: "Cripto y Web3",
    jeux: "Juegos y Ocio",
    ecommerce: "E-commerce",
    autre: "Otro",
  },

  pied: {
    accroche:
      "El primer puesto se compra, no se merece. Y mañana, todo vuelve a empezar de cero.",
  },
};
