/**
 * Il titolo arriva come pigmento lanciato: impatto delle parole e schizzi coordinati.
 * Il testo resta HTML, leggibile e immediatamente completo senza animazioni.
 */
export function initHeroCanvas() {
  const canvas = document.querySelector(".hero-canvas");
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!canvas || preference.matches || !Element.prototype.animate) return;
  const running = new Set();

  /** Avvia un gesto finito: nessun fotogramma continuo o blocco dello scorrimento. */
  function paint(
    element,
    frames,
    delay,
    duration,
    easing = "cubic-bezier(.16,1,.3,1)",
  ) {
    const animation = element.animate(frames, {
      delay,
      duration,
      easing,
      fill: "backwards",
    });
    running.add(animation);
    animation.finished.then(() => running.delete(animation)).catch(() => {});
  }
  canvas
    .querySelectorAll("#heroTitle .row > span")
    .forEach(function (line, index) {
      // Le parole arrivano dall'asse centrale: nessuna tendina che scorre da un lato.
      const fragment = document.createDocumentFragment();
      line.textContent.split(/(\s+)/).forEach(function (word) {
        if (!word.trim()) {
          fragment.appendChild(document.createTextNode(word));
          return;
        }
        const span = document.createElement("span");
        span.className = "paint-word";
        span.textContent = word;
        fragment.appendChild(span);
      });
      line.replaceChildren(fragment);
      line.querySelectorAll(".paint-word").forEach(function (word, wordIndex) {
        const tilt = (wordIndex % 2 ? 1 : -1) * 7;
        paint(
          word,
          [
            {
              opacity: 0,
              transform: `translateY(-22px) scale(1.55) rotate(${tilt}deg)`,
              filter: "blur(8px)",
              offset: 0,
            },
            {
              opacity: 1,
              transform: "translateY(2px) scale(.97) rotate(-1deg)",
              filter: "blur(.6px)",
              offset: 0.35,
            },
            {
              opacity: 1,
              transform: "translateY(0) scale(1) rotate(0)",
              filter: "blur(0)",
              offset: 1,
            },
          ],
          350 + index * 980 + wordIndex * 100,
          1150,
        );
      });
    });
  canvas.querySelectorAll(".paint-impact").forEach(function (splash, index) {
    paint(
      splash,
      [
        { opacity: 0, transform: "scale(.15)", offset: 0 },
        { opacity: 0.85, transform: "scale(1.08)", offset: 0.3 },
        { opacity: 0.65, transform: "scale(1)", offset: 1 },
      ],
      450 + index * 980,
      1200,
    );
  });
  paint(
    canvas.querySelector(".hero-signature"),
    [
      { opacity: 0, transform: "scale(1.12)", filter: "blur(3px)" },
      { opacity: 1, transform: "scale(1)", filter: "blur(0)" },
    ],
    3450,
    900,
  );

  /** Un cambio di preferenza lascia subito il titolo e la firma nel loro stato finale. */
  function stop(event) {
    if (!event.matches) return;
    running.forEach((animation) => animation.cancel());
    running.clear();
    preference.removeEventListener("change", stop);
  }
  preference.addEventListener("change", stop);
}
