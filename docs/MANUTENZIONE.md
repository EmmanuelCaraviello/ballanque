# Manutenzione del sito

## Dove intervenire

- **Testi principali e sezioni:** `index.html`.
- **Colori e font:** variabili in `base.css`, applicazione finale in `brand.css`.
- **Spazi e griglie:** `layout.css`; correzioni per telefono, iPad e touch in `responsive.css`.
- **Progetti del Museo:** `projects.js`.
- **Schede, fotografie e carosello:** `exhibition.js`.
- **Filtri del Museo:** `collection.js`.
- **Animazioni:** ingresso in `animations.js`, sequenze del Museo in `museum-motion.js`,
  maschere in `motion.css`.
- **Menu e accessibilità:** `navigation.js` e `dialogs.js`.
- **Segno animato dello Studio:** `studio.js`, composizione e controlli in `studio.css`.

## Illustrazione dello Studio

Il canvas racconta il metodo in una sequenza finita di diciotto secondi:
Ascoltiamo traccia la sagoma su una tela vuota; Esploriamo dipinge strisce blu
e logo; Disegniamo svela la divisa originale Atletico BMG.
`studio.js` gestisce tempo, visibilità, pausa e preferenze; `studio-scene.js`
disegna tela, personaggio e pennellate. Il pennello segue il punto dipinto.
La sagoma bianca usa esclusivamente il canale alfa della fotografia originale:
nessuna trama fotografica in trasparenza, contorno e dimensioni identici alla divisa finale.
Il braccio mantiene scala costante: ruota dalla manica e il corpo si sposta
per accompagnare la punta del pennello, senza deformazioni.
L'immagine finale è `assets/images/image-06.webp`, il logo `image-03.webp`.
Il personaggio usa `jaguar-artist-atlas-v1.png`: corpo e braccio sono separati
nello stesso atlante, animati con rotazioni e spostamenti nel canvas.
Non sostituire l'atlante senza aggiornare i ritagli in `studio-scene.js`.
La mascotte è una libera interpretazione creativa, non una ricostruzione storica.
Non genera o configura una nuova divisa.
Parte quando il canvas entra in vista, si ferma fuori schermo o quando la scheda
del browser non è visibile, e può essere messo in pausa o rivisto.
`ResizeObserver` ridisegna il punto corrente dopo un cambio di dimensioni.
Con movimento ridotto viene mostrato subito il risultato completo.
I testi delle tre fasi restano sempre leggibili e indipendenti dall'animazione.

## Dati del Museo

`WORKS` contiene le sette divise; un club può avere più varianti.
Ogni oggetto descrive nome del club, titolo, fronte/retro, viste, storia,
colori reali della divisa, stemma e fotografie.

`PH` collega i codici fotografici ai file. Questi codici sono ereditati dal materiale
ricevuto; sono stati conservati per evitare scambi di immagini.
I nomi `image-XX.webp` rimangono stabili: per individuare una foto consultare `PH`
e i campi `photos` dei progetti. Aggiungere una fotografia al progetto corretto,
con una descrizione reale, senza duplicare il file.

I colori delle maglie nei dati sono distinti dalla palette dell'interfaccia.
Cambiare la palette del sito non deve cambiare i colori dei progetti esposti.

## Percorsi delle risorse

Gli `href` e gli `src` nell'HTML e nei dati JavaScript sono relativi a `index.html`.
Gli `url(...)` nel CSS sono invece relativi al file CSS che li contiene:
per esempio `../images/image-03.webp` da `assets/css/base.css`.

## JavaScript

`main.js` importa i moduli. Le dipendenze sono dichiarate con `import` ed `export`:
evitare nuove variabili globali e gestori duplicati.
`core.js` verifica se GSAP e ScrollTrigger sono disponibili e legge la preferenza
di movimento ridotto. Le funzioni di navigazione, galleria e lente devono
funzionare anche senza animazioni.

La scheda progetto e il menu sono dialoghi: bloccare lo sfondo solo mentre sono
aperti, mantenere il focus nel dialogo e restituirlo al controllo di provenienza.
Lo scroll della pagina non deve essere trattenuto dalle animazioni narrative.

`initMuseumMotion(container, scroller)` osserva la pagina o il dialogo del progetto.
Ogni ingresso viene eseguito una volta: parole dei titoli dietro una maschera,
opere con lieve rotazione e fotografie svelate dal basso.
Il testo rimane semanticamente invariato; nessun contenuto dipende da uno stato
CSS nascosto. La funzione restituisce una pulizia da chiamare prima di cambiare
progetto e alla chiusura. La preferenza di movimento ridotto interrompe anche
le sequenze native già in corso.

## CSS

`main.css` conserva l'ordine della cascata. `components.css` e `refinements.css`
contengono anche regole storiche del sito ricevuto; non sono nuove sezioni da
riattivare. Questa riorganizzazione conserva la resa precedente: l'eventuale
rimozione di regole obsolete va fatta in un intervento separato con prova visiva.

`responsive.css` viene caricato per ultimo: unifica il comportamento fino a 1024 px
e aggiunge le regole specifiche per telefono fino a 600 px. Conservare le aree
touch di 44 px e il contenimento delle immagini nel visore.
La galleria usa `ResizeObserver` per mantenere la foto corrente quando cambia
la larghezza; l'osservatore viene scollegato alla chiusura o al cambio di progetto.

## Commenti e stile

- Aprire ogni modulo con una descrizione della sua responsabilità.
- Descrivere le funzioni nominate e le scelte non ovvie, soprattutto focus,
  coordinate della lente, animazioni e percorsi.
- Commentare i blocchi HTML e CSS per facilitarne la ricerca.
- Spiegare il motivo delle eccezioni; evitare commenti che ripetono una singola istruzione.
- Usare indentazione coerente e righe formattate, evitando nuovo codice compresso.

## Verifica prima di un commit

Eseguire `npm run check` e `git diff --check`, poi provare menu, filtri,
apertura/chiusura delle schede, carosello, lente e contatti nel browser.
Verificare le larghezze di telefono, iPad verticale/orizzontale e desktop.
Controllare anche la preferenza di movimento ridotto.
Includere nel commit soltanto i file dell'intervento, preservando modifiche
locali non correlate e cancellazioni preesistenti.


## Parete espositiva del Museo

`collection.js` costruisce sette ambienti da WORKS. Ogni ambiente è un bottone
con indice originale `data-i`: `exhibition.js` continua ad aprire la scheda giusta
anche dopo un filtro. Il fronte resta visibile; retro e varianti sono nella scheda.
La fotografia di contesto è la prima foto già associata al progetto in PH.
`museum.css`, caricato per ultimo, definisce la parete crema, l'alternanza desktop
e la lettura verticale su telefono. Non modifica i colori delle divise.
`museum-motion.js` anima separatamente maglia, didascalia e foto con ingressi
finiti di 1,5–1,8 secondi. Nessun blocco dello scroll o cambio automatico di progetto.
Senza animazioni tutti i contenuti restano visibili; il movimento ridotto interrompe
anche gli ingressi in corso. I filtri comunicano il numero di progetti esposti.

Il sito usa esclusivamente il puntatore nativo: il cursore decorativo e il relativo
listener del mouse sono stati rimossi.


## Home e Museo separati

`index.html` contiene l'invito breve; `museo.html` ospita l'accoglienza, tutti i
progetti e la lente. Entrambe le pagine restano nella radice per gli hosting statici.
`main.js` importa schede e lente soltanto dove sono presenti i rispettivi contenitori.
Il giaguaro invita dalla home con la divisa Cremonese; nell'accoglienza del Museo
indossa la BMG. Non compare lungo la parete delle opere e non impone attese.
I collegamenti a Studio e Contatti tornano alle sezioni della home.

La creazione di ogni divisa usa tre copie della stessa foto (sagoma, base tonale,
colore originale), sovrapposte nelle stesse coordinate. Le animazioni native
svelano la maglia in circa 3,75 secondi una sola volta quando entra in vista.
Con movimento ridotto, senza GSAP o senza Web Animations resta disponibile
la visita; con movimento ridotto tutte le maglie appaiono subito complete.
`museum-entrance.css` gestisce invito e accoglienza. `scripts/check.mjs` controlla
ora ogni HTML della radice e i collegamenti con ancore fra le due pagine.
Il prompt e la provenienza del personaggio sono in `docs/GIAGUARO-MUSEO.md`.


## Invito come soglia del Museo

La scenografia della home è HTML/CSS, senza nuove immagini generate: `.portal-building`
crea l'arco e la sala, `.portal-sign` contiene l'insegna Ballanqué, `.portal-work`
mostra le divise BMG Home e Away originali. Il giaguaro Cremonese resta davanti,
di lato. Le posizioni sono adattate alle larghezze di telefono e tablet.
`museum-motion.js` registra l'invito come tipo `portal`: arco e insegna entrano prima,
poi le due opere e infine la guida. La sequenza finisce entro 2,8 secondi, senza
scroll obbligato. Il link è attivo subito. Senza Web Animations o con movimento
ridotto tutti gli elementi restano visibili nel loro stato finale.


## Tela tipografica dell'ingresso

La prima schermata usa `.hero-canvas` con trama fotografica di lino
`artist-linen-v1.png`, bordo e spessore del telaio. Il titolo originale è centrato;
la firma Ballanqué resta in basso a destra e il link al Museo è disponibile subito.
`hero-canvas.js` suddivide le righe in parole senza duplicarne il contenuto:
le parole arrivano con un impatto breve e schizzi SVG coordinati, anziché una tendina.
Le maschere decorative hanno aria-hidden e non intercettano il puntatore.
La sequenza finisce entro 4,35 secondi, senza loop o blocchi dello scroll.
Con movimento ridotto e senza Web Animations il titolo rimane subito completo.
Il cambio di preferenza cancella gli ingressi già avviati. L'effetto non dipende da GSAP.
