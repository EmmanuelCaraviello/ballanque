/**
 * Linguaggio animato del Museo: titoli composti per parole, opere in ingresso,
 * fotografie svelate da una maschera. Usa il movimento nativo del browser;
 * non intercetta ruota, touch o scorrimento e non fissa sezioni allo schermo.
 */
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Inserisce maschere nelle sole parti testuali, preservando br, em e semantica. */
function prepareTitle(heading) {
  if (heading.dataset.motionPrepared) return;
  heading.dataset.motionPrepared = "true";
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(function (node) {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(function (word) {
      if (!word.trim()) {
        fragment.appendChild(document.createTextNode(word));
        return;
      }
      const mask = document.createElement("span");
      const inner = document.createElement("span");
      mask.className = "motion-word";
      inner.className = "motion-word-inner";
      inner.textContent = word;
      mask.appendChild(inner);
      fragment.appendChild(mask);
    });
    node.replaceWith(fragment);
  });
}

/** Attiva una sequenza locale; restituisce la pulizia per le schede dinamiche. */
export function initMuseumMotion(container, scroller = null) {
  if (
    motionPreference.matches ||
    !window.IntersectionObserver ||
    !Element.prototype.animate
  ) {
    return function () {};
  }
  const running = new Set();
  const observed = new Set();
  const compact = window.matchMedia("(max-width: 820px)").matches;

  /** Avvia un ingresso finito: nessun loop continuo e nessun ritardo obbligato. */
  function animate(element, frames, delay = 0, duration = 950) {
    const animation = element.animate(frames, {
      duration,
      delay,
      easing: "cubic-bezier(.16,1,.3,1)",
      fill: "backwards",
    });
    running.add(animation);
    animation.finished
      .then(function () {
        running.delete(animation);
      })
      .catch(function () {});
  }

  /** Sceglie un movimento coerente con il contenuto, anziché un unico fade. */
  function reveal(element) {
    const kind = element.dataset.museumMotion;
    if (kind === "title") {
      element
        .querySelectorAll(".motion-word-inner")
        .forEach(function (word, index) {
          animate(
            word,
            [
              { transform: "translateY(110%) rotate(3deg)" },
              { transform: "translateY(0) rotate(0)" },
            ],
            Math.min(index * 65, 325),
            1000,
          );
        });
    } else if (kind === "exhibit") {
      // La maglia, la didascalia e la foto entrano separatamente e con tempi leggibili.
      const piece = element.querySelector(".museum-piece");
      const caption = element.querySelector(".museum-caption");
      const detail = element.querySelector(".museum-detail");
      animate(
        piece,
        [
          { transform: "translateY(38px) rotate(-3deg) scale(.96)" },
          { transform: "translateY(0) rotate(0) scale(1)" },
        ],
        0,
        2400,
      );
      // Le tre copie della foto condividono taglio, dimensioni e trasparenza.
      animate(
        piece.querySelector(".museum-silhouette"),
        [{ opacity: 0 }, { opacity: 1 }],
        0,
        1100,
      );
      animate(
        piece.querySelector(".museum-underpaint"),
        [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
        350,
        2100,
      );
      animate(
        piece.querySelector(".museum-finished"),
        [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
        1050,
        2700,
      );
      animate(
        caption,
        [
          { opacity: 0, transform: "translateY(40px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        170,
        1500,
      );
      if (detail)
        animate(
          detail,
          [
            { opacity: 0, transform: "translateY(45px) rotate(-4deg)" },
            { opacity: 1, transform: "translateY(0) rotate(5deg)" },
          ],
          380,
          1700,
        );
    } else if (kind === "entrance") {
      animate(
        element,
        [
          { opacity: 0, transform: "translateY(45px) rotate(-2deg)" },
          { opacity: 1, transform: "translateY(0) rotate(0)" },
        ],
        0,
        1800,
      );
    } else if (kind === "photo") {
      animate(
        element,
        [
          { clipPath: "inset(0 0 100% 0)", transform: "translateY(18px)" },
          { clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
        ],
        0,
        1100,
      );
    } else if (kind === "work") {
      animate(
        element,
        [
          {
            opacity: 0,
            transform: `translateY(${compact ? 25 : 45}px) rotate(-2deg)`,
          },
          { opacity: 1, transform: "translateY(0) rotate(0)" },
        ],
        Number(element.dataset.motionDelay || 0),
        1050,
      );
    } else {
      animate(element, [
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" },
      ]);
    }
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        observed.delete(entry.target);
        reveal(entry.target);
      });
    },
    { root: scroller, threshold: 0.12 },
  );

  /** Associa un ingresso agli elementi presenti senza nasconderli via CSS. */
  function register(selector, kind) {
    container.querySelectorAll(selector).forEach(function (element, index) {
      if (kind === "title") prepareTitle(element);
      element.dataset.museumMotion = kind;
      element.dataset.motionDelay =
        kind === "work" ? String((index % (compact ? 1 : 3)) * 100) : "0";
      observed.add(element);
      observer.observe(element);
    });
  }
  register(
    "#studioTitle, #museumPortalTitle, #museumWelcomeTitle, #collezione .coll-top h2, #contactTitle, #expoTitle, .chap h3, .expo-end h3",
    "title",
  );
  register(".museum-exhibit", "exhibit");
  register(".museum-host, .museum-portal-art", "entrance");
  register(".expo-hero .viewer", "work");
  register(".pthumb", "photo");
  register(
    ".room-head, .studio-copy, .phase, .museum-intro, .contact-copy, .chap > div:last-child",
    "text",
  );

  /** Se l'utente cambia preferenza, rende immediatamente statiche tutte le sequenze. */
  function stop() {
    observer.disconnect();
    observed.clear();
    running.forEach(function (animation) {
      animation.cancel();
    });
    running.clear();
    motionPreference.removeEventListener("change", onPreferenceChange);
  }
  function onPreferenceChange(event) {
    if (event.matches) stop();
  }
  motionPreference.addEventListener("change", onPreferenceChange);
  return stop;
}
