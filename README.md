# Ballanqué Football

Sito statico dello studio Ballanqué: presentazione, Museo dei progetti e contatti.
Il progetto usa HTML, CSS e JavaScript senza una fase di compilazione.

## Struttura

```text
index.html                 Pagina principale e struttura semantica
assets/
  css/
    main.css               Punto di ingresso dei fogli di stile
    base.css               Palette, variabili, reset, logo e testi di base
    components.css         Regole dei componenti del sito
    refinements.css        Rifiniture mantenute dal sito ricevuto
    layout.css             Struttura riordinata e regole responsive
    brand.css              Font ufficiali e regole finali del brand
    responsive.css         Telefono, iPad, touch e gallerie adattive
  js/
    main.js                Punto di ingresso dei moduli JavaScript
    core.js                Selettori DOM e disponibilità delle animazioni
    projects.js            Dati, fotografie e viste dei sette progetti
    collection.js          Opere del Museo e filtri
    exhibition.js          Schede progetto e gallerie
    navigation.js          Menu e collegamenti alle sezioni
    dialogs.js             Focus e accessibilità dei dialoghi
    lens.js                Ingrandimento manuale dei dettagli della maglia
    cursor.js              Cursore decorativo per il mouse
    animations.js          Animazioni di ingresso e comparsa
  images/                  Logo, divise, foto e anteprima social
docs/
  MANUTENZIONE.md          Dipendenze, convenzioni e guida agli interventi
scripts/
  check.mjs                Controlli locali di sintassi e riferimenti
AGENTS.md                  Regole per i successivi interventi sul codice
package.json               Comando npm run check, senza dipendenze
```

`index.html` resta nella radice: è il punto di ingresso atteso dagli hosting statici.
Non c'è una cartella `html/` perché al momento esiste una sola pagina.

## Aprire il sito

Aprire questa cartella in Antigravity e premere **Go Live**. In alternativa:

```powershell
python -m http.server 8000
```

Aprire quindi `http://localhost:8000`. I moduli JavaScript richiedono un server:
non aprire `index.html` con un doppio clic tramite un indirizzo `file://`.

## Controllare il codice

Con Node.js installato, eseguire dalla radice:

```powershell
npm run check
```

Non serve eseguire `npm install`: il controllo usa soltanto funzionalità native di Node.js.
I controlli statici non sostituiscono la prova nel browser, su telefono e su iPad.

## Pubblicare

Caricare `index.html` e l'intera cartella `assets/`, conservando la struttura.
Font Google e GSAP rimangono risorse esterne. Il contatto email apre il programma
di posta del visitatore; il sito non invia email tramite un server.

## Punti di ripristino

Le modifiche vengono salvate sul branch `riordino-sito`, con un commit per intervento.
Il tag `originale-consegnato` identifica lo stato iniziale locale.
Per annullare un intervento già condiviso usare `git revert`, conservando la cronologia.
