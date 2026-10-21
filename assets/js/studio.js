/**
 * Illustrazione dello Studio: la home Atletico BMG passa da neutra a colorata in dodici secondi.
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
  const duration = 12000;
  let progress = preference.matches ? 1 : 0;
  let visible = false;
  let paused = false;
  let frame = 0;
  let lastTime = 0;
  let currentStep = -1;
  // L'immagine originale conserva esattamente sagoma, pattern e stemmi del progetto.
  const shirt = new Image();
  const neutral = document.createElement("canvas");
  const blue = document.createElement("canvas");
  let ready = false;

  /** Crea una base neutra e una blu usando soltanto la trasparenza della stessa maglia. */
  function prepareLayers() {
    neutral.width = blue.width = shirt.naturalWidth;
    neutral.height = blue.height = shirt.naturalHeight;
    const whiteContext = neutral.getContext("2d");
    const blueContext = blue.getContext("2d");
    whiteContext.drawImage(shirt, 0, 0);
    whiteContext.globalCompositeOperation = "source-in";
    whiteContext.fillStyle = "#F4F4F4";
    whiteContext.fillRect(0, 0, neutral.width, neutral.height);
    // Un'ombra molto tenue mantiene leggibili volume e cuciture senza mostrare il pattern.
    whiteContext.globalCompositeOperation = "source-atop";
    whiteContext.globalAlpha = 0.1;
    whiteContext.filter = "grayscale(1)";
    whiteContext.drawImage(shirt, 0, 0);
    blueContext.drawImage(shirt, 0, 0);
    blueContext.globalCompositeOperation = "source-in";
    blueContext.fillStyle = "#1b2150";
    blueContext.fillRect(0, 0, blue.width, blue.height);
    ready = true;
    draw();
    updateControls();
    resume();
  }

  /** Rende morbido l'inizio e la fine di ogni passaggio, lasciando brevi pause visive. */
  function phase(value, start, end) {
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
    return t * t * (3 - 2 * t);
  }

  /** Svela un livello dentro la sagoma con un fronte di colore leggermente ondulato. */
  function revealLayer(image, amount, x, y, width, height) {
    if (amount <= 0) return;
    if (amount >= 1) {
      context.drawImage(image, x, y, width, height);
      return;
    }
    const edge = y - height * 0.06 + amount * height * 1.12;
    context.save();
    context.beginPath();
    context.moveTo(x, y - height * 0.1);
    context.lineTo(x + width, y - height * 0.1);
    context.lineTo(x + width, edge);
    for (let i = 60; i >= 0; i--) {
      const ratio = i / 60;
      context.lineTo(
        x + ratio * width,
        edge + Math.sin(ratio * Math.PI * 2) * height * 0.025,
      );
    }
    context.closePath();
    context.clip();
    context.drawImage(image, x, y, width, height);
    context.restore();
  }

  /** Ridisegna i livelli alla risoluzione del dispositivo, senza alterare il file originale. */
  function draw() {
    if (!ready) return;
    // Anche un ridimensionamento deve rispettare la preferenza appena cambiata.
    if (preference.matches) progress = 1;
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
    const fit = Math.min(
      (box.width * 0.94) / shirt.naturalWidth,
      (box.height * 0.9) / shirt.naturalHeight,
    );
    const width = shirt.naturalWidth * fit,
      height = shirt.naturalHeight * fit;
    const x = (box.width - width) / 2,
      y = (box.height - height) / 2;
    context.drawImage(neutral, x, y, width, height);
    // 0–1.7 s: maglia neutra; 1.7–5.8 s: blu; pausa; 6.7–11.2 s: pattern originale.
    revealLayer(blue, phase(progress, 0.14, 0.48), x, y, width, height);
    revealLayer(shirt, phase(progress, 0.56, 0.93), x, y, width, height);
    const step = progress < 0.14 ? 0 : progress < 0.56 ? 1 : 2;
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
  shirt.addEventListener("load", prepareLayers, { once: true });
  shirt.addEventListener(
    "error",
    function () {
      controls.hidden = true;
      section.querySelector(".studio-art").hidden = true;
    },
    { once: true },
  );
  shirt.src = "assets/images/image-06.webp";
  draw();
  updateControls();
  resume();
}
