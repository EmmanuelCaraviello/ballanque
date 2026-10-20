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
