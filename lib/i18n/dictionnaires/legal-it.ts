import type { DictionnaireLegal } from "./legal-types";

// Version italienne : traduction informative, le francais fait foi.
export const legalIt: DictionnaireLegal = {
  primaute:
    "La presente è una traduzione fornita a titolo informativo. daywinner.lol è gestito da un'impresa francese ed è soggetto al diritto francese: fa fede esclusivamente la versione francese.",

  mentions: {
    oeil: "Informazioni legali",
    titre: "Note legali",
    meta: "Editore, fornitore di hosting e informazioni legali di daywinner.lol.",
    editeurTitre: "Editore del sito",
    editeurIntro: "Il sito daywinner.lol è edito da:",
    nom: "Nome",
    statut: "Forma giuridica",
    adresse: "Indirizzo della sede",
    siret: "SIRET",
    email: "Indirizzo email",
    telephone: "Telefono",
    tva: "Partita IVA intracomunitaria",
    tvaFranchise:
      "IVA non applicabile, articolo 293 B del codice generale delle imposte francese (regime di franchigia).",
    directeurTitre: "Direttore della pubblicazione",
    directeurCorps:
      "Il direttore della pubblicazione è l'imprenditore individuale sopra indicato.",
    hebergeurTitre: "Fornitore di hosting",
    hebergeurCorps: "Il sito è ospitato da:",
    sections: [
      {
        titre: "Natura del servizio",
        corps: [
          "daywinner.lol vende spazi pubblicitari all'interno di una classifica online. L'inserzionista paga per esporre il proprio prodotto, la propria applicazione o il proprio profilo in una posizione visibile del sito per una durata limitata.",
          "La posizione dipende esclusivamente dall'importo pagato. Non sussiste alcun elemento aleatorio, alcuna estrazione a sorte e alcuna redistribuzione di vincite: il servizio non costituisce né un gioco d'azzardo, né una lotteria, né una scommessa ai sensi degli articoli L320-1 e seguenti del codice della sicurezza interna francese.",
        ],
      },
      {
        titre: "Proprietà intellettuale",
        corps: [
          "La struttura del sito, i suoi testi, la sua identità grafica e il suo codice sorgente sono protetti dal diritto d'autore. È vietata qualsiasi riproduzione o rappresentazione, totale o parziale, senza previa autorizzazione scritta.",
          "I nomi, i loghi e i marchi visualizzati nella classifica appartengono ai rispettivi titolari. Sono pubblicati su richiesta e sotto la responsabilità degli inserzionisti che li trasmettono, i quali dichiarano di detenere i diritti necessari.",
        ],
      },
      {
        titre: "Collegamenti verso siti terzi",
        corps: [
          "La classifica contiene collegamenti verso siti di terzi. L'editore non esercita alcun controllo sul loro contenuto e declina ogni responsabilità in merito alle informazioni che pubblicano o ai servizi che propongono.",
        ],
      },
      {
        titre: "Segnalazione di un contenuto illecito",
        corps: [
          "Ai sensi dell'articolo 6 della legge francese per la fiducia nell'economia digitale, qualsiasi contenuto manifestamente illecito può essere segnalato all'indirizzo di contatto sopra indicato. La segnalazione deve precisare la voce interessata e il motivo della segnalazione.",
          "L'editore rimuove senza indugio qualsiasi voce manifestamente illecita portata a sua conoscenza.",
        ],
      },
    ],
  },

  cgv: {
    oeil: "Condizioni generali",
    titre: "Condizioni generali di vendita",
    meta: "Condizioni generali di vendita applicabili agli spazi pubblicitari venduti su daywinner.lol.",
    versionLe: "Versione in vigore al {version}",
    article: "Articolo",
    articles: [
      {
        titre: "Oggetto e accettazione",
        corps: [
          "Le presenti condizioni generali di vendita disciplinano la vendita di spazi pubblicitari sul sito daywinner.lol, senza restrizioni né riserve, tra l'editore del sito e chiunque effettui un acquisto, di seguito «l'inserzionista».",
          "Ogni ordine comporta l'accettazione piena e integrale delle presenti condizioni, che l'inserzionista riconosce di avere letto prima di convalidare il proprio pagamento. Esse prevalgono su qualsiasi altro documento.",
          "L'editore si riserva il diritto di modificare le presenti condizioni in qualsiasi momento. Le condizioni applicabili sono quelle in vigore alla data dell'ordine, la cui versione viene registrata unitamente allo stesso.",
        ],
      },
      {
        titre: "Descrizione del servizio",
        corps: [
          "Il servizio consiste nella visualizzazione, su una pagina pubblica del sito, di un collegamento verso il prodotto, l'applicazione, il sito o il profilo indicato dall'inserzionista, corredato dal suo nome, dalla sua categoria, da una descrizione facoltativa e da un logo facoltativo.",
          "Le voci sono ordinate in senso decrescente rispetto all'importo pagato. A parità di importo, prevale l'anteriorità dell'ordine: l'ordine più antico occupa la posizione più elevata.",
          "Ogni round dura circa ventiquattro ore. Ogni ordine confermato nei due minuti precedenti la chiusura posticipa quest'ultima di due minuti, poiché il round si conclude soltanto quando non è più intervenuto alcun ordine per due minuti.",
          "La posizione ottenuta dipende esclusivamente dall'importo pagato e dall'anteriorità. Essa non comporta alcun elemento aleatorio, alcuna estrazione a sorte e non dà diritto ad alcuna vincita, premio o versamento.",
        ],
      },
      {
        titre: "Durata e carattere temporaneo della prestazione",
        corps: [
          "La visualizzazione ha effetto a partire dalla conferma del pagamento e termina alla chiusura del round in corso, senza rinnovo.",
          "L'inserzionista riconosce espressamente che la posizione ottenuta è temporanea e che essa scompare dalla classifica alla chiusura del round, anche qualora in tale momento occupi la prima posizione.",
          "Alla chiusura, l'inserzionista che ha pagato l'importo più elevato viene archiviato nella sezione «albo d'oro». Le posizioni successive non sono oggetto di alcuna archiviazione pubblica permanente.",
          "La prestazione non comporta alcun abbonamento, alcun rinnovo tacito e alcun addebito ricorrente.",
        ],
      },
      {
        titre: "Prezzo e pagamento",
        corps: [
          "I prezzi sono indicati in euro. L'importo dell'ordine è liberamente fissato dall'inserzionista, nel rispetto dell'importo minimo indicato sul sito al momento dell'ordine.",
          "Il pagamento è effettuato in un'unica soluzione, mediante carta di pagamento, tramite il prestatore Stripe. L'editore non ha mai accesso ai dati della carta, che sono trattati direttamente dal prestatore di servizi di pagamento.",
          "L'ordine è registrato e la visualizzazione ha luogo soltanto previa conferma del pagamento da parte del prestatore. Un pagamento rifiutato o non confermato non dà diritto ad alcuna visualizzazione.",
          "Il regime IVA applicabile è quello indicato nelle note legali.",
        ],
      },
      {
        titre: "Esecuzione immediata e diritto di recesso",
        corps: [
          "Poiché il servizio è fornito a distanza ed eseguito immediatamente, l'inserzionista consumatore è informato delle seguenti conseguenze prima di convalidare il proprio pagamento.",
          "Spuntando l'apposita casella, l'inserzionista chiede espressamente che l'esecuzione del servizio abbia inizio immediatamente, prima della scadenza del termine di recesso di quattordici giorni, e riconosce espressamente che perderà il proprio diritto di recesso una volta che il servizio sarà stato pienamente eseguito, conformemente all'articolo L221-28 1° del codice del consumo francese.",
          "Il servizio si considera pienamente eseguito alla chiusura del round nel corso del quale ha avuto luogo la visualizzazione. A decorrere da tale chiusura, il diritto di recesso non può più essere esercitato e non può essere richiesto alcun rimborso a tale titolo.",
          "Prima della chiusura del round, l'inserzionista consumatore che esercita il proprio diritto di recesso è tenuto a corrispondere, in applicazione dell'articolo L221-25 del codice del consumo francese, un importo proporzionale al servizio già fornito, calcolato in proporzione alla durata di visualizzazione trascorsa rispetto alla durata complessiva del round.",
          "La richiesta di recesso è inviata all'indirizzo email indicato nelle note legali, mediante qualsiasi dichiarazione priva di ambiguità.",
          "Il diritto di recesso non si applica agli inserzionisti professionali che agiscono nell'ambito della propria attività.",
        ],
      },
      {
        titre: "Obblighi dell'inserzionista",
        corps: [
          "L'inserzionista garantisce che il collegamento trasmesso rinvia a un progetto, prodotto, servizio, profilo o account reale di cui detiene i diritti o per il quale dispone di un'autorizzazione.",
          "L'inserzionista si astiene dal trasmettere qualsiasi contenuto illecito, ingannevole, diffamatorio, lesivo dei diritti di terzi, di carattere pornografico, violento, di incitamento all'odio, o contrario alla normativa applicabile, in particolare in materia di pubblicità, giochi con vincite in denaro, prodotti sanitari o servizi finanziari.",
          "L'inserzionista tiene indenne l'editore da qualsiasi reclamo di terzi relativo al contenuto da lui trasmesso, comprese le spese di difesa che ne derivassero.",
        ],
      },
      {
        titre: "Moderazione e rimozione",
        corps: [
          "L'editore può rimuovere, senza preavviso, qualsiasi voce contraria all'articolo precedente o segnalata come manifestamente illecita.",
          "In caso di rimozione per inadempimento dell'inserzionista, non è dovuto alcun rimborso.",
          "Qualora l'editore rimuova una voce in assenza di inadempimento imputabile all'inserzionista, esso rimborsa l'importo pagato in proporzione alla durata di visualizzazione residua.",
        ],
      },
      {
        titre: "Disponibilità e responsabilità",
        corps: [
          "L'editore si impegna ad adoperare i mezzi ragionevoli per garantire l'accessibilità del sito, senza garantire una disponibilità ininterrotta.",
          "In caso di indisponibilità imputabile all'editore che privi l'inserzionista di qualsiasi visualizzazione per una parte significativa del round, l'inserzionista può richiedere un rimborso in proporzione alla durata dell'indisponibilità.",
          "L'editore non può essere ritenuto responsabile dei danni indiretti, in particolare della perdita di fatturato, di clientela o di notorietà. La sua responsabilità è in ogni caso limitata all'importo effettivamente pagato dall'inserzionista per l'ordine interessato.",
          "L'editore non garantisce alcun volume di visite, di clic né alcun risultato commerciale connesso alla visualizzazione.",
        ],
      },
      {
        titre: "Dati personali",
        corps: [
          "I trattamenti di dati personali effettuati in occasione di un ordine sono descritti nell'informativa sulla privacy, accessibile dal piè di pagina del sito.",
        ],
      },
      {
        titre: "Reclamo e mediazione del consumo",
        corps: [
          "Ogni reclamo è indirizzato in primo luogo all'indirizzo email indicato nelle note legali.",
          "Conformemente all'articolo L612-1 del codice del consumo francese, l'inserzionista consumatore può ricorrere gratuitamente al mediatore del consumo i cui recapiti figurano di seguito, a condizione di avere previamente inviato un reclamo scritto all'editore.",
          "La Commissione europea mette inoltre a disposizione una piattaforma di risoluzione delle controversie online, accessibile all'indirizzo indicato di seguito.",
        ],
      },
      {
        titre: "Diritto applicabile e foro competente",
        corps: [
          "Le presenti condizioni sono soggette al diritto francese.",
          "In caso di controversia con un inserzionista consumatore, i giudici competenti sono determinati dalle norme di diritto comune applicabili al consumatore.",
          "In caso di controversia con un inserzionista professionale, e in mancanza di composizione amichevole, la competenza è attribuita ai tribunali del luogo in cui ha sede l'editore.",
          "La versione francese delle presenti condizioni è la sola a fare fede.",
        ],
      },
    ],
  },

  confidentialite: {
    oeil: "Vita privata",
    titre: "Informativa sulla privacy",
    meta: "Dati raccolti da daywinner.lol, finalità, periodi di conservazione e diritti degli interessati.",
    sections: [
      {
        titre: "Titolare del trattamento",
        corps: [
          "Il titolare del trattamento è l'editore del sito, la cui identità e i cui recapiti figurano nelle note legali.",
        ],
      },
      {
        titre: "Dati raccolti e finalità",
        corps: [
          "Dati dell'ordine: nome del progetto, indirizzo del sito o identificativo dell'account, categoria, descrizione facoltativa e logo facoltativo. Tali dati sono pubblicati volontariamente dall'inserzionista e sono, per loro natura, pubblici. Finalità: esecuzione del contratto. Base giuridica: esecuzione del contratto.",
          "Indirizzo email trasmesso dal prestatore di servizi di pagamento al momento dell'acquisto. Finalità: prova dell'ordine, risposta a un reclamo, esercizio del diritto di recesso. Base giuridica: esecuzione del contratto e obbligo legale.",
          "Prova della rinuncia al diritto di recesso: marca temporale del consenso e versione delle condizioni accettate. Finalità: prova richiesta dalla normativa. Base giuridica: obbligo legale.",
          "Indirizzo IP trasmesso in occasione dell'invio di un'immagine, conservato in forma sottoposta ad hashing e non reversibile. Finalità: limitazione del numero di invii al fine di prevenire gli abusi. Base giuridica: legittimo interesse.",
          "Contatore delle visite, sotto forma di un totale aggregato che non consente alcuna identificazione. Finalità: visualizzazione di una statistica pubblica. Base giuridica: legittimo interesse.",
        ],
      },
      {
        titre: "Assenza di cookie di misurazione dell'audience",
        corps: [
          "Il sito non deposita alcun cookie pubblicitario né alcun tracciante di misurazione dell'audience.",
          "Un unico cookie funzionale registra la lingua scelta dal visitatore, al fine di ripristinarla in occasione delle visite successive. Esso non consente alcuna identificazione e non richiede un consenso preventivo.",
        ],
      },
      {
        titre: "Destinatari e responsabili del trattamento",
        corps: [
          "Stripe, prestatore di servizi di pagamento, tratta i dati di pagamento. L'editore non ha mai accesso ai dati della carta di pagamento.",
          "Supabase ospita la banca dati del sito.",
          "Vercel ospita il sito e registra tecnicamente le richieste.",
          "Alcuni di questi prestatori possono trattare dati al di fuori dell'Unione europea. Tali trasferimenti sono disciplinati dalle clausole contrattuali tipo adottate dalla Commissione europea.",
        ],
      },
      {
        titre: "Periodi di conservazione",
        corps: [
          "Dati dell'ordine pubblicati: conservati per la durata del round in corso. Il nome e il collegamento dell'inserzionista che ha ottenuto la prima posizione sono conservati in modo duraturo nell'albo d'oro, che costituisce un archivio pubblico del servizio.",
          "Indirizzo email e prova del consenso: dieci anni, periodo di conservazione dei documenti contabili e contrattuali.",
          "Indirizzo IP sottoposto ad hashing: cancellato dopo un'ora, unico periodo utile alla limitazione degli invii.",
          "Immagini inviate senza un ordine andato a buon fine: cancellate dopo ventiquattro ore.",
        ],
      },
      {
        titre: "I Suoi diritti",
        corps: [
          "Lei dispone di un diritto di accesso, di rettifica, di cancellazione, di limitazione, di opposizione e di portabilità, esercitabili scrivendo all'indirizzo email indicato nelle note legali.",
          "La cancellazione dei dati pubblicati è possibile in qualsiasi momento. La voce viene allora rimossa dalla classifica, senza rimborso qualora la richiesta provenga dall'inserzionista stesso.",
          "Lei può proporre reclamo alla Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 Parigi, oppure sul suo sito www.cnil.fr.",
        ],
      },
    ],
  },

  retractation: {
    caseACocher:
      "Chiedo che la visualizzazione abbia inizio immediatamente e riconosco di perdere il mio diritto di recesso una volta chiuso il round.",
    precision:
      "Obbligatorio. Poiché il servizio è eseguito immediatamente, tale consenso è richiesto dall'articolo L221-28 del codice del consumo francese. Esso è registrato con marca temporale e conservato come prova.",
    erreurNonCochee:
      "Deve accettare l'esecuzione immediata per poter procedere al pagamento.",
    lireCgv: "Leggere le condizioni generali di vendita",
  },

  pied: {
    mentions: "Note legali",
    cgv: "CGV",
    confidentialite: "Privacy",
  },
};
