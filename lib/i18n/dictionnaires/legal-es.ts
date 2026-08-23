import type { DictionnaireLegal } from "./legal-types";

// Version espagnole : traduction informative, le francais fait foi.
export const legalEs: DictionnaireLegal = {
  primaute:
    "Esta es una traducción facilitada a título informativo. daywinner.lol está gestionado por una empresa francesa y se rige por el derecho francés: únicamente la versión francesa da fe.",

  mentions: {
    oeil: "Información legal",
    titre: "Aviso legal",
    meta: "Editor, proveedor de alojamiento e información legal de daywinner.lol.",
    editeurTitre: "Editor del sitio",
    editeurIntro: "El sitio daywinner.lol está editado por:",
    nom: "Nombre",
    statut: "Forma jurídica",
    adresse: "Domicilio social",
    siret: "SIRET",
    email: "Correo electrónico",
    telephone: "Teléfono",
    tva: "IVA intracomunitario",
    tvaFranchise:
      "IVA no aplicable, artículo 293 B del código general de impuestos francés (régimen de franquicia de base).",
    directeurTitre: "Director de la publicación",
    directeurCorps:
      "El director de la publicación es el empresario individual mencionado anteriormente.",
    hebergeurTitre: "Proveedor de alojamiento",
    hebergeurCorps: "El sitio está alojado por:",
    sections: [
      {
        titre: "Naturaleza del servicio",
        corps: [
          "daywinner.lol vende espacios publicitarios en una clasificación en línea. El anunciante paga para mostrar su producto, su aplicación o su perfil en una posición visible del sitio durante un tiempo limitado.",
          "El puesto depende únicamente del importe abonado. No existe ningún elemento de azar, ningún sorteo ni ninguna redistribución de ganancias: el servicio no constituye un juego de azar, ni una lotería, ni una apuesta en el sentido de los artículos L320-1 y siguientes del código de seguridad interior francés.",
        ],
      },
      {
        titre: "Propiedad intelectual",
        corps: [
          "La estructura del sitio, sus textos, su identidad gráfica y su código fuente están protegidos por los derechos de autor. Queda prohibida toda reproducción o representación, total o parcial, sin autorización previa y por escrito.",
          "Los nombres, logotipos y marcas mostrados en la clasificación pertenecen a sus respectivos titulares. Se publican a instancia y bajo la responsabilidad de los anunciantes que los remiten, quienes declaran ostentar los derechos necesarios.",
        ],
      },
      {
        titre: "Enlaces salientes",
        corps: [
          "La clasificación contiene enlaces a sitios de terceros. El editor no ejerce ningún control sobre su contenido y declina toda responsabilidad respecto de la información que publiquen o de los servicios que ofrezcan.",
        ],
      },
      {
        titre: "Notificación de un contenido ilícito",
        corps: [
          "De conformidad con el artículo 6 de la ley francesa para la confianza en la economía digital, todo contenido manifiestamente ilícito puede notificarse a la dirección de contacto indicada anteriormente. La notificación debe precisar la entrada afectada y el motivo de la misma.",
          "El editor retira sin demora toda entrada manifiestamente ilícita puesta en su conocimiento.",
        ],
      },
    ],
  },

  cgv: {
    oeil: "Condiciones generales",
    titre: "Condiciones generales de venta",
    meta: "Condiciones generales de venta aplicables a los espacios publicitarios vendidos en daywinner.lol.",
    versionLe: "Versión en vigor a {version}",
    article: "Artículo",
    articles: [
      {
        titre: "Objeto y aceptación",
        corps: [
          "Las presentes condiciones generales de venta rigen la venta de espacios publicitarios en el sitio daywinner.lol, sin restricción ni reserva, entre el editor del sitio y toda persona que efectúe una compra, en lo sucesivo «el anunciante».",
          "Todo pedido implica la aceptación plena y entera de las presentes condiciones, que el anunciante reconoce haber leído antes de validar su pago. Prevalecen sobre cualquier otro documento.",
          "El editor se reserva el derecho de modificar las presentes condiciones en cualquier momento. Las condiciones aplicables son las vigentes en la fecha del pedido, cuya versión queda registrada junto con este.",
        ],
      },
      {
        titre: "Descripción del servicio",
        corps: [
          "El servicio consiste en mostrar, en una página pública del sitio, un enlace al producto, la aplicación, el sitio o el perfil designado por el anunciante, acompañado de su nombre, su categoría, una descripción facultativa y un logotipo facultativo.",
          "Las entradas se clasifican por orden decreciente del importe abonado. A igualdad de importe, la anterioridad del pedido dirime entre los anunciantes: el pedido más antiguo ocupa el puesto más alto.",
          "Cada ronda dura aproximadamente veinticuatro horas. Todo pedido confirmado en los dos últimos minutos antes del cierre aplaza este dos minutos, de modo que la ronda solo finaliza cuando no se ha producido ningún pedido durante dos minutos.",
          "El puesto obtenido depende exclusivamente del importe abonado y de la anterioridad. No comporta ningún elemento aleatorio, ningún sorteo y no da derecho a ninguna ganancia, premio ni reparto.",
        ],
      },
      {
        titre: "Duración y carácter temporal de la prestación",
        corps: [
          "La publicación surte efecto desde la confirmación del pago y finaliza al cierre de la ronda en curso, sin renovación.",
          "El anunciante reconoce expresamente que el puesto obtenido es temporal y que desaparece de la clasificación al cierre de la ronda, incluso si ocupa el primer puesto en ese momento.",
          "Al cierre, el anunciante que haya abonado el importe más elevado queda archivado en la sección «salón de la fama». Los puestos siguientes no son objeto de ningún archivo público permanente.",
          "La prestación no comporta ninguna suscripción, ninguna renovación tácita ni ningún cargo recurrente.",
        ],
      },
      {
        titre: "Precio y pago",
        corps: [
          "Los precios se indican en euros. El importe del pedido lo fija libremente el anunciante, respetando el importe mínimo indicado en el sitio en el momento del pedido.",
          "El pago se efectúa en un solo abono, mediante tarjeta bancaria, a través del proveedor Stripe. El editor no tiene acceso en ningún momento a los datos de la tarjeta, que son tratados directamente por el proveedor de pago.",
          "El pedido no se registra y la publicación no se produce hasta la confirmación del pago por parte del proveedor. Un pago rechazado o no confirmado no da derecho a publicación alguna.",
          "El régimen de IVA aplicable es el indicado en el aviso legal.",
        ],
      },
      {
        titre: "Ejecución inmediata y derecho de desistimiento",
        corps: [
          "Al prestarse el servicio a distancia y ejecutarse de forma inmediata, se informa al anunciante consumidor de las siguientes consecuencias antes de que valide su pago.",
          "Al marcar la casilla prevista al efecto, el anunciante solicita expresamente que la ejecución del servicio comience de inmediato, antes de la expiración del plazo de desistimiento de catorce días, y reconoce expresamente que perderá su derecho de desistimiento una vez que el servicio haya sido plenamente ejecutado, de conformidad con el artículo L221-28 1° del código de consumo francés.",
          "El servicio se considera plenamente ejecutado al cierre de la ronda durante la cual tuvo lugar la publicación. A partir de dicho cierre, el derecho de desistimiento ya no puede ejercerse y no puede solicitarse ningún reembolso por este concepto.",
          "Antes del cierre de la ronda, el anunciante consumidor que ejerza su derecho de desistimiento deberá abonar, en aplicación del artículo L221-25 del código de consumo francés, un importe proporcional al servicio ya prestado, calculado a prorrata del tiempo de publicación transcurrido respecto de la duración total de la ronda.",
          "La solicitud de desistimiento se dirige a la dirección de correo electrónico que figura en el aviso legal, mediante cualquier declaración inequívoca.",
          "El derecho de desistimiento no se aplica a los anunciantes profesionales que actúen en el marco de su actividad.",
        ],
      },
      {
        titre: "Obligaciones del anunciante",
        corps: [
          "El anunciante garantiza que el enlace remitido dirige a un proyecto, producto, servicio, perfil o cuenta real sobre el que ostenta los derechos o para el que dispone de autorización.",
          "El anunciante se abstiene de remitir cualquier contenido ilícito, engañoso, difamatorio, lesivo de los derechos de terceros, de carácter pornográfico, violento u odioso, o contrario a la normativa aplicable, en particular en materia de publicidad, juegos de dinero, productos sanitarios o servicios financieros.",
          "El anunciante mantiene indemne al editor frente a cualquier reclamación de terceros relativa al contenido que haya remitido, incluidos los gastos de defensa que de ello se deriven.",
        ],
      },
      {
        titre: "Moderación y retirada",
        corps: [
          "El editor puede retirar, sin preaviso, toda entrada que contravenga el artículo anterior o que haya sido notificada como manifiestamente ilícita.",
          "En caso de retirada por incumplimiento del anunciante, no procede reembolso alguno.",
          "Si el editor retira una entrada sin que exista incumplimiento imputable al anunciante, reembolsa el importe abonado a prorrata del tiempo de publicación restante.",
        ],
      },
      {
        titre: "Disponibilidad y responsabilidad",
        corps: [
          "El editor se compromete a emplear los medios razonables para garantizar la accesibilidad del sitio, sin garantizar una disponibilidad ininterrumpida.",
          "En caso de indisponibilidad imputable al editor que prive al anunciante de toda publicación durante una parte significativa de la ronda, el anunciante puede solicitar un reembolso a prorrata del tiempo de indisponibilidad.",
          "El editor no podrá ser considerado responsable de los daños indirectos, en particular de la pérdida de volumen de negocio, de clientela o de notoriedad. Su responsabilidad queda en todo caso limitada al importe efectivamente abonado por el anunciante por el pedido de que se trate.",
          "El editor no garantiza ningún volumen de visitas, de clics ni ningún resultado comercial vinculado a la publicación.",
        ],
      },
      {
        titre: "Datos personales",
        corps: [
          "Los tratamientos de datos de carácter personal realizados con ocasión de un pedido se describen en la política de privacidad, accesible desde el pie de página del sitio.",
        ],
      },
      {
        titre: "Reclamación y mediación de consumo",
        corps: [
          "Toda reclamación se dirige en primer lugar a la dirección de correo electrónico que figura en el aviso legal.",
          "De conformidad con el artículo L612-1 del código de consumo francés, el anunciante consumidor puede recurrir gratuitamente al mediador de consumo cuyos datos figuran a continuación, siempre que haya dirigido previamente una reclamación por escrito al editor.",
          "La Comisión Europea pone además a disposición una plataforma de resolución de litigios en línea, accesible en la dirección indicada a continuación.",
        ],
      },
      {
        titre: "Derecho aplicable y jurisdicción",
        corps: [
          "Las presentes condiciones se someten al derecho francés.",
          "En caso de litigio con un anunciante consumidor, los órganos jurisdiccionales competentes se determinan conforme a las normas de derecho común aplicables al consumidor.",
          "En caso de litigio con un anunciante profesional, y a falta de resolución amistosa, se atribuye competencia a los tribunales de la circunscripción del domicilio social del editor.",
          "La versión francesa de las presentes condiciones es la única que da fe.",
        ],
      },
    ],
  },

  confidentialite: {
    oeil: "Privacidad",
    titre: "Política de privacidad",
    meta: "Datos recabados por daywinner.lol, finalidades, plazos de conservación y derechos de las personas.",
    sections: [
      {
        titre: "Responsable del tratamiento",
        corps: [
          "El responsable del tratamiento es el editor del sitio, cuya identidad y datos de contacto figuran en el aviso legal.",
        ],
      },
      {
        titre: "Datos recabados y finalidades",
        corps: [
          "Datos del pedido: nombre del proyecto, dirección del sitio o identificador de cuenta, categoría, descripción facultativa y logotipo facultativo. Estos datos son publicados voluntariamente por el anunciante y son, por su propia naturaleza, públicos. Finalidad: ejecución del contrato. Base jurídica: ejecución del contrato.",
          "Dirección de correo electrónico comunicada por el proveedor de pago en el momento de la compra. Finalidad: prueba del pedido, respuesta a una reclamación, ejercicio del derecho de desistimiento. Base jurídica: ejecución del contrato y obligación legal.",
          "Prueba de la renuncia al derecho de desistimiento: sello de tiempo del consentimiento y versión de las condiciones aceptadas. Finalidad: prueba exigida por la normativa. Base jurídica: obligación legal.",
          "Dirección IP comunicada al enviar una imagen, conservada en forma cifrada mediante función hash y no reversible. Finalidad: limitación del número de envíos con el fin de prevenir abusos. Base jurídica: interés legítimo.",
          "Contador de visitas, en forma de un total agregado que no permite identificación alguna. Finalidad: presentación de una estadística pública. Base jurídica: interés legítimo.",
        ],
      },
      {
        titre: "Ausencia de cookies de medición de audiencia",
        corps: [
          "El sitio no instala ninguna cookie publicitaria ni ningún rastreador de medición de audiencia.",
          "Una única cookie funcional registra el idioma elegido por el visitante, con el fin de restituirlo en las visitas siguientes. No permite identificación alguna y no requiere consentimiento previo.",
        ],
      },
      {
        titre: "Destinatarios y encargados del tratamiento",
        corps: [
          "Stripe, proveedor de pago, trata los datos de pago. El editor no tiene acceso en ningún momento a los datos de la tarjeta bancaria.",
          "Supabase aloja la base de datos del sitio.",
          "Vercel aloja el sitio y registra técnicamente las solicitudes.",
          "Algunos de estos proveedores pueden tratar datos fuera de la Unión Europea. Estas transferencias están amparadas por las cláusulas contractuales tipo adoptadas por la Comisión Europea.",
        ],
      },
      {
        titre: "Plazos de conservación",
        corps: [
          "Datos del pedido publicados: conservados durante la ronda en curso. El nombre y el enlace del anunciante que haya obtenido el primer puesto se conservan de forma duradera en el salón de la fama, que constituye un archivo público del servicio.",
          "Dirección de correo electrónico y prueba del consentimiento: diez años, plazo de conservación de los documentos contables y contractuales.",
          "Dirección IP cifrada mediante función hash: suprimida al cabo de una hora, único plazo útil para la limitación de los envíos.",
          "Imágenes enviadas sin pedido finalizado: suprimidas al cabo de veinticuatro horas.",
        ],
      },
      {
        titre: "Sus derechos",
        corps: [
          "Usted dispone de un derecho de acceso, rectificación, supresión, limitación, oposición y portabilidad, que se ejercen escribiendo a la dirección de correo electrónico que figura en el aviso legal.",
          "La supresión de los datos publicados es posible en cualquier momento. La entrada se retira entonces de la clasificación, sin reembolso cuando la solicitud procede del propio anunciante.",
          "Usted puede presentar una reclamación ante la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 París, o en su sitio www.cnil.fr.",
        ],
      },
    ],
  },

  retractation: {
    caseACocher:
      "Solicito que la publicación comience de inmediato y reconozco que pierdo mi derecho de desistimiento una vez cerrada la ronda.",
    precision:
      "Obligatorio. Al ejecutarse el servicio de forma inmediata, este consentimiento es exigido por el artículo L221-28 del código de consumo francés. Queda registrado con sello de tiempo y se conserva como prueba.",
    erreurNonCochee:
      "Debes aceptar la ejecución inmediata para poder pagar.",
    lireCgv: "Leer las condiciones generales de venta",
  },

  pied: {
    mentions: "Aviso legal",
    cgv: "Condiciones",
    confidentialite: "Privacidad",
  },
};
