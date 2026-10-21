/**
 * Illustrazione dello Studio: il giaguaro-artista dipinge la home Atletico BMG in tre scene.
 * È un racconto grafico del metodo, non un configuratore di prodotti.
 * Il ciclo è finito, si ferma fuori schermo e offre pausa e ripetizione.
 */
import { createStudioScene } from "./studio-scene.js";

const canvas = document.getElementById("studioCanvas");
if (canvas) initStudio(canvas);

/** Collega disegno, preferenze di accessibilità e controlli alla sezione Studio. */
function initStudio(surface) {
  const context = surface.getContext?.("2d");
  if (!context) return;
  const section = surface.closest("#studio");
  const controls = section.querySelector(".studio-art-controls");
  const toggle = section.querySelector("#studioMotionToggle");
  const replay = section.querySelector("#studioMotionReplay");
  const steps = [...section.querySelectorAll("[data-studio-step]")];
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const duration = 18000;
  let progress = preference.matches ? 1 : 0;
  let visible = false;
  let paused = false;
  let frame = 0;
  let lastTime = 0;
  let currentStep = -1;
  let ready = false;
  const scene = createStudioScene(surface);

  /** Sincronizza la scena del pittore con le tre fasi del metodo. */
  function draw() {
    if (!ready) return;
    if (preference.matches) progress = 1;
    scene.render(progress);
    const step = progress < 0.33 ? 0 : progress < 0.69 ? 1 : 2;
    if (step !== currentStep) {
      currentStep = step;
      steps.forEach((element, index) =>
        element.classList.toggle("is-current", index === step),
      );
    }
  }

  /** Aggiorna i pulsanti senza annunciare al lettore di schermo ogni fotogramma. */
  function updateControls() {
    controls.hidden = preference.matches;
    toggle.disabled = !ready || progress >= 1;
    toggle.textContent =
      progress >= 1 ? "Divisa completa" : paused ? "Riprendi" : "Pausa";
    toggle.setAttribute(
      "aria-label",
      paused
        ? "Riprendi il disegno animato"
        : "Metti in pausa il disegno animato",
    );
  }

  /** Arresta il lavoro grafico quando il disegno non deve proseguire. */
  function stopFrame() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  }

  /** Esegue un solo ciclo; il tempo fuori schermo non fa saltare parti del racconto. */
  function tick(time) {
    frame = 0;
    if (preference.matches) {
      progress = 1;
      draw();
      updateControls();
      return;
    }
    if (
      !ready ||
      !visible ||
      paused ||
      document.hidden ||
      preference.matches ||
      progress >= 1
    )
      return;
    if (lastTime)
      progress = Math.min(
        1,
        progress + Math.min(time - lastTime, 64) / duration,
      );
    lastTime = time;
    draw();
    if (progress < 1) frame = requestAnimationFrame(tick);
    else updateControls();
  }

  /** Avvia o riprende soltanto quando il visitatore può vedere l'illustrazione. */
  function resume() {
    if (preference.matches) {
      progress = 1;
      draw();
      updateControls();
      return;
    }
    if (
      ready &&
      !frame &&
      visible &&
      !paused &&
      !document.hidden &&
      !preference.matches &&
      progress < 1
    ) {
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    }
  }
  toggle.addEventListener("click", function () {
    paused = !paused;
    stopFrame();
    updateControls();
    resume();
  });
  replay.addEventListener("click", function () {
    stopFrame();
    progress = 0;
    paused = false;
    draw();
    updateControls();
    resume();
  });
  preference.addEventListener("change", function (event) {
    stopFrame();
    if (event.matches) progress = 1;
    draw();
    updateControls();
    resume();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopFrame();
    else resume();
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) resume();
        else stopFrame();
      },
      { threshold: 0.35 },
    );
    observer.observe(surface);
  } else {
    visible = true;
    progress = 1;
  }
  if ("ResizeObserver" in window) new ResizeObserver(draw).observe(surface);
  else window.addEventListener("resize", draw);
  scene.ready
    .then(function () {
      ready = true;
      draw();
      updateControls();
      resume();
    })
    .catch(function () {
      // Un asset mancante non deve impedire di leggere lo Studio o navigare nel sito.
      controls.hidden = true;
      section.querySelector(".studio-art").hidden = true;
    });
  draw();
  updateControls();
  resume();
}
