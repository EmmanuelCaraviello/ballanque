/**
 * Animazioni di ingresso e comparsa. Il contenuto resta accessibile senza GSAP e con movimento ridotto.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $$ } from "./core.js";
import { initMuseumMotion } from "./museum-motion.js";

// La tela dipinta ha un ingresso nativo, indipendente dal caricamento di GSAP.
import { initHeroCanvas } from "./hero-canvas.js";
initHeroCanvas();

/* Lo scorrimento resta nativo: nessuna sezione viene fissata da ScrollTrigger. */

$$(".work").forEach(function (work) {
  work.classList.add("lit");
});
// Un solo sistema di comparsa evita conflitti tra trasformazioni GSAP e native.
initMuseumMotion(document.querySelector("main"));
