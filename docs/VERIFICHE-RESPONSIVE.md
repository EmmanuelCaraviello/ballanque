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
