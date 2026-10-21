# Verifiche responsive — 20 ottobre 2026

Prove nel browser Chrome su Windows con dimensioni della finestra simulate.
Non sono prove su dispositivi fisici o su Safari iOS.

| Vista | Dimensioni in pixel CSS | Esito |
| --- | --- | --- |
| Telefono piccolo | 320 × 740 | Nessun overflow della pagina o della scheda |
| Telefono | 390 × 844 | Nessun overflow della pagina o della scheda |
| iPad verticale | 834 × 1194 | Nessun overflow della pagina o della scheda |
| iPad orizzontale | 1194 × 834 | Nessun overflow della pagina o della scheda |
| Desktop | 1440 × 1000 | Nessun overflow della pagina o della scheda |

Per ogni vista: menu aperto/chiuso, filtro Away e ripristino di tutte le opere,
scheda progetto, avanzamento della galleria, cambio delle dimensioni mantenendo
la foto selezionata, chiusura della scheda e controllo della lente.
Nessun errore JavaScript rilevato durante queste sequenze.

Verificata la versione con preferenza di movimento ridotto.
Ripetute le sequenze su telefono (390 × 844) e iPad (834 × 1194) con touch
simulato e animazioni GSAP attive: puntatore coarse riconosciuto, cursore
decorativo nascosto, nessun overflow o errore JavaScript rilevato.
Le immagini delle schede sono state controllate anche visivamente nelle catture
di telefono e iPad: la divisa intera resta contenuta nel visore.

Controlli statici: `npm run check` e `git diff --check`.
Resta consigliata una prova su Safari iPhone/iPad reali prima della pubblicazione.

## Animazioni del Museo

Dopo l'aggiunta delle sequenze sono state ripetute le interazioni con touch
simulato su telefono e iPad, senza overflow o errori JavaScript.
Su desktop sono stati verificati avvio dei titoli mascherati, comparsa delle opere,
svelamento delle miniature fotografiche e arresto delle animazioni passando
alla preferenza di movimento ridotto durante la visita.

## Studio animato — 21 ottobre 2026

Verificato in Chrome a 390 × 844, 834 × 1194 e 1440 × 1000 pixel CSS:
avanzamento da filo a trama, pausa stabile, ripetizione e passaggio a movimento
ridotto con risultato completo. Nessun overflow orizzontale o errore JavaScript.
Controllate visivamente le catture di telefono e desktop.

Aggiornamento: la sequenza è ora di dodici secondi e usa la home Atletico BMG.
Ripetute le verifiche a 390, 834 e 1440 px: pausa, ripetizione, movimento ridotto,
assenza di overflow e di errori JavaScript. Controllata anche la resa finale
della maglia originale sul fondo libero dello Studio.


## Giaguaro pittore — 21 ottobre 2026

Sequenza di diciotto secondi verificata in Chrome a 390 × 844, 834 × 1194 e
1440 × 1000: pausa stabile, ripetizione, risultato finale con movimento ridotto,
nessun overflow orizzontale e nessun errore JavaScript.
Controllate anche quattro catture della scena: sagoma, strisce, pittura e risultato
completo. Le prove sono simulate nel browser, non su dispositivi fisici.


## Parete espositiva — 21 ottobre 2026

Verifiche Chrome a 320 × 740, 390 × 844, 834 × 1194, 1194 × 834 e 1440 × 1000:
menu, filtri, apertura scheda, galleria, ridimensionamento e lente. Nessun overflow
di pagina o dialogo e nessun errore JavaScript rilevato.
Controllate visivamente le composizioni desktop e telefono. Le fotografie di contesto
sono quelle già associate ai progetti, non nuovi materiali o contenuti inventati.

Con animazioni attive, a 390, 834 e 1440 px: aperte tutte e sette le schede,
verificati filtro Away, apertura con Invio, chiusura con Esc e passaggio al movimento
ridotto. Nessun overflow o errore JavaScript rilevato. Prove su finestre simulate,
non su iPhone/iPad fisici.


## Museo su pagina dedicata — 21 ottobre 2026

Chrome: 320 × 740, 390 × 844, 834 × 1194, 1194 × 834 e 1440 × 1000.
Verificati home senza archivio completo, ingresso tramite link, ritorni a Studio
e Contatti con controllo statico delle ancore, menu e chiusura con Esc,
sette progetti, filtro Away, apertura da tastiera, galleria e chiusura della scheda.
Controllata l'animazione attiva del livello a colori e il risultato completo.
Nessun overflow orizzontale o errore JavaScript rilevato nelle sequenze.
Provato il Museo con GSAP e ScrollTrigger bloccati e movimento ridotto:
apertura e chiusura delle opere restano disponibili, senza errori JavaScript.
Ripetute le prove su telefono dopo l'affiancamento del giaguaro al titolo.
Controllate le catture di home, accoglienza e prima opera su desktop e telefono.
Non sono prove su dispositivi fisici o su Safari iOS.

## Giaguaro nell'invito della home — 21 ottobre 2026

Chrome a 390 × 844, 834 × 1194 e 1440 × 1000: immagine caricata,
collegamento «Seguimi nel Museo» funzionante e asset differenti fra home e Museo.
Nessun overflow orizzontale o errore JavaScript rilevato. Controllata visivamente
la composizione desktop con gesto rivolto al testo dell'invito.


## Soglia del Museo nella home — 21 ottobre 2026

Chrome a 320, 390, 834, 1194 e 1440 px: entrambe le foto delle maglie caricate,
giaguaro presente, ingresso al Museo funzionante, nessun overflow o errore JavaScript.
Verificato il passaggio a movimento ridotto: animazioni cancellate e personaggio
completamente visibile. Controllate le catture di telefono piccolo e desktop.


## Tela iniziale dipinta — 21 ottobre 2026

Chrome a 320 × 740, 390 × 844, 834 × 1194, 1194 × 834 e 1440 × 1000:
testo originale conservato, nessuna foto della maglia nella hero, firma e titolo
contenuti nella schermata, nessun overflow orizzontale o errore JavaScript.
Provati menu con Esc e collegamento dalla hero alla pagina Museo.
Controllate le catture di telefono piccolo e desktop.
Verificata la cancellazione delle animazioni cambiando preferenza durante
l'ingresso e il titolo visibile con movimento ridotto e GSAP/ScrollTrigger bloccati.
Prove su finestre simulate in Chrome, non su dispositivi fisici o Safari iOS.


## Pittura a impatto e titolo centrato — 21 ottobre 2026

Chrome a 320, 390, 834, 1194 e 1440 px: titolo centrato orizzontalmente,
testo originale conservato, firma e parole dentro la tela, nessun overflow
o errore JavaScript rilevato. Controllate le catture desktop e telefono.
Verificati menu, collegamento al Museo e arresto degli ingressi al passaggio
al movimento ridotto. Titolo disponibile anche con GSAP e ScrollTrigger bloccati.


## Maglia staff sul giaguaro — 21 ottobre 2026

Verificati caricamento della nuova illustrazione e collegamento al Museo a
320, 390, 834, 1194 e 1440 px. Controllata visivamente la cattura desktop:
maniche lunghe, verde/avorio e marchio giallo coerenti con il riferimento del cliente.


## Contattaci e maglia staff interna — 21 ottobre 2026

Chrome a 320, 390, 834, 1194 e 1440 px: nessun overflow dell'header, maglia staff
caricata nel Museo, vecchio pulsante della hero rimosso. Verificati menu con Esc
e percorso dalla scheda progetto a `index.html#commissiona`, senza errori JavaScript.
