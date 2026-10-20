# Convenzioni per gli interventi su Ballanqué

- Leggere `README.md` e `docs/MANUTENZIONE.md` prima di modificare la struttura.
- Mantenere `index.html` nella radice, CSS in `assets/css`, JavaScript in `assets/js`
  e immagini in `assets/images`.
- Aggiungere commenti in italiano che descrivano la responsabilità di ogni modulo,
  le funzioni nominate e la logica non evidente. Non limitarsi a ripetere le istruzioni.
- Formattare il codice: non aggiungere funzioni o regole CSS compresse in una riga.
- Preservare palette e font ufficiali e i dati reali dei sette progetti.
- Nessuna schermata di ingresso obbligatoria e nessuna animazione che trattenga lo scroll.
- Mantenere navigazione e contenuti utilizzabili senza GSAP e con movimento ridotto.
- Dopo un intervento eseguire `npm run check` e `git diff --check`.
- Salvare un commit per intervento completo. Non includere modifiche preesistenti
  dell'utente senza richiesta esplicita e non sovrascriverle.
