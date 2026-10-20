# Manutenzione del sito

## Dove intervenire

- **Testi principali e sezioni:** `index.html`.
- **Colori e font:** variabili in `base.css`, applicazione finale in `brand.css`.
- **Spazi, griglie e dispositivi:** `layout.css` e le regole responsive dei componenti.
- **Progetti del Museo:** `projects.js`.
- **Schede, fotografie e carosello:** `exhibition.js`.
- **Filtri del Museo:** `collection.js`.
- **Animazioni:** `animations.js`; cursore separato in `cursor.js`.
- **Menu e accessibilità:** `navigation.js` e `dialogs.js`.

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

## CSS

`main.css` conserva l'ordine della cascata. `components.css` e `refinements.css`
contengono anche regole storiche del sito ricevuto; non sono nuove sezioni da
riattivare. Questa riorganizzazione conserva la resa precedente: l'eventuale
rimozione di regole obsolete va fatta in un intervento separato con prova visiva.

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
