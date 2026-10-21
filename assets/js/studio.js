/**
 * Illustrazione dello Studio: un filo diventa trama e sagoma in otto secondi.
 * È un racconto grafico del metodo, non un configuratore di prodotti.
 * Il ciclo è finito, si ferma fuori schermo e offre pausa e ripetizione.
 */
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
  const duration = 8000;
  let progress = preference.matches ? 1 : 0;
  let visible = false;
  let paused = false;
  let frame = 0;
  let lastTime = 0;
  let currentStep = -1;
  const outline = [
    [0.34, 0.19],
    [0.21, 0.25],
    [0.08, 0.42],
    [0.23, 0.5],
    [0.29, 0.43],
    [0.28, 0.83],
    [0.72, 0.83],
    [0.71, 0.43],
    [0.77, 0.5],
    [0.92, 0.42],
    [0.79, 0.25],
    [0.66, 0.19],
    [0.6, 0.25],
    [0.55, 0.28],
    [0.5, 0.29],
    [0.45, 0.28],
    [0.4, 0.25],
    [0.34, 0.19],
  ];

  /** Traccia soltanto la frazione richiesta di una polilinea, usando la sua lunghezza reale. */
  function stroke(points, fraction, color, width) {
    if (fraction <= 0) return;
    const lengths = points
      .slice(1)
      .map((point, index) =>
        Math.hypot(point[0] - points[index][0], point[1] - points[index][1]),
      );
    let remaining =
      lengths.reduce((sum, value) => sum + value, 0) * Math.min(1, fraction);
    context.beginPath();
    context.moveTo(...points[0]);
    for (let i = 1; i < points.length && remaining > 0; i++) {
      const ratio = Math.min(1, remaining / Math.max(0.001, lengths[i - 1]));
      context.lineTo(
        points[i - 1][0] + (points[i][0] - points[i - 1][0]) * ratio,
        points[i - 1][1] + (points[i][1] - points[i - 1][1]) * ratio,
      );
      remaining -= lengths[i - 1];
    }
    context.strokeStyle = color;
    context.lineWidth = width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }

  /** Ridisegna alla risoluzione del dispositivo senza modificare le dimensioni del layout. */
  function draw() {
    const box = surface.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(box.width * dpr),
      pixelHeight = Math.round(box.height * dpr);
    if (surface.width !== pixelWidth || surface.height !== pixelHeight) {
      surface.width = pixelWidth;
      surface.height = pixelHeight;
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, box.width, box.height);
    const point = ([x, y]) => [x * box.width, y * box.height];
    const thread = [];
    for (let i = 0; i <= 80; i++) {
      const x = 0.1 + (i / 80) * 0.8;
      thread.push(
        point([
          x,
          0.67 - (0.27 * i) / 80 + Math.sin((i / 80) * Math.PI * 2) * 0.08,
        ]),
      );
    }
    stroke(thread, progress * 3, "#C5894B", 1.7);
    for (let row = 0; row < 12; row++) {
      const wave = [];
      for (let i = 0; i <= 60; i++)
        wave.push(
          point([
            0.2 + (i / 60) * 0.6,
            0.31 +
              row * 0.034 +
              Math.sin((i / 60) * Math.PI * 2 + row * 0.22) * 0.025,
          ]),
        );
      stroke(
        wave,
        Math.max(0, (progress - 0.2 - row * 0.018) * 2.5),
        "#095F56",
        1,
      );
    }
    stroke(outline.map(point), (progress - 0.49) / 0.51, "#8A3226", 2);
    const step = Math.min(2, Math.floor(progress * 3));
    if (step !== currentStep) {
      currentStep = step;
      steps.forEach((element, index) => {
        element.classList.toggle("is-current", index === step);
      });
    }
  }

  /** Aggiorna i pulsanti senza annunciare al lettore di schermo ogni fotogramma. */
  function updateControls() {
    controls.hidden = preference.matches;
    toggle.disabled = progress >= 1;
    toggle.textContent =
      progress >= 1 ? "Segno completo" : paused ? "Riprendi" : "Pausa";
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
    if (
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
    if (
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
  preference.addEventListener("change", function () {
    stopFrame();
    if (preference.matches) progress = 1;
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
  draw();
  updateControls();
  resume();
}
