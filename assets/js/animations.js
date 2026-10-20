/**
 * Animazioni di ingresso e comparsa. Il contenuto resta accessibile senza GSAP e con movimento ridotto.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $, $$, RM, hasG } from "./core.js";

/* Ingresso diretto: animazione hero senza schermata o attesa iniziale. */
if (hasG && !RM) {
  heroIn(0);
}

/** Anima maglia e titolo direttamente, senza schermata di ingresso. */
function heroIn(delay) {
  var img = "#heroShirt",
    rows = "#heroTitle .row > span";
  gsap.set(img, {
    opacity: 0,
    scale: 1.14,
    filter: "brightness(1) saturate(1)",
  });
  gsap.set(rows, { yPercent: 110 });
  gsap.set(".hero-logo,.hero-foot", { opacity: 0 });
  gsap
    .timeline({ delay: delay })
    .to(img, { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" })
    .to(
      img,
      {
        filter: "brightness(.42) saturate(.85)",
        duration: 1.4,
        ease: "power2.inOut",
      },
      "+=.5",
    )
    .to(
      rows,
      { yPercent: 0, duration: 1.1, stagger: 0.38, ease: "power4.out" },
      "<.15",
    )
    .to(".hero-logo", { opacity: 1, duration: 1 }, "-=.6")
    .to(".hero-foot", { opacity: 1, duration: 0.8 }, "<.2");
}

/* Lo scorrimento resta nativo: nessuna sezione viene fissata da ScrollTrigger. */

$$(".work").forEach(function (work) {
  work.classList.add("lit");
});
if (hasG && !RM) {
  ScrollTrigger.config({ ignoreMobileResize: true });
  $$(
    ".room-head,.studio-intro,.phase,.work,.canvas-copy,.contact-grid",
  ).forEach(function (el) {
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });
  addEventListener("load", function () {
    ScrollTrigger.refresh();
  });
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(function () {
      ScrollTrigger.refresh();
    });
}
