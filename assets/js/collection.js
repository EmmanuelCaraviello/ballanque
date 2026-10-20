/**
 * Crea le opere del Museo e applica i filtri. Le schede complete sono gestite da exhibition.js.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $, $$, hasG } from "./core.js";
import { WORKS } from "./projects.js";

/* collezione */
var track = $("#track");
/** Costruisce il riquadro con fronte e, quando disponibile, retro della divisa. */
function kitFrame(w) {
  return (
    '<div class="frame"><div class="kit' +
    (w.isPhoto ? " ph" : "") +
    '"><img class="f' +
    (w.back ? " has-b" : "") +
    '" src="' +
    w.front +
    '" alt="' +
    w.club +
    ", " +
    w.title +
    ', fronte" loading="lazy" decoding="async">' +
    (w.back
      ? '<img class="b" src="' +
        w.back +
        '" alt="' +
        w.club +
        ", " +
        w.title +
        ', retro" loading="lazy" decoding="async">'
      : "") +
    "</div></div>"
  );
}
WORKS.forEach(function (w, i) {
  var b = document.createElement("button");
  b.type = "button";
  b.className = "work " + w.size + " " + (w.cls || "");
  b.dataset.i = i;
  b.dataset.tag = w.tag;
  b.dataset.cursor = "EXPLORE";
  b.setAttribute("aria-label", "Apri la mostra: " + w.club + ", " + w.title);
  b.innerHTML =
    kitFrame(w) +
    '<div class="label"><span class="mono muted">' +
    w.n +
    " / " +
    String(WORKS.length).padStart(2, "0") +
    "</span>" +
    (i === 0 || WORKS[i - 1].club !== w.club
      ? '<span class="c">' + w.club + "</span>"
      : '<span class="c">' + w.club + "</span>") +
    '<span class="t">' +
    w.title +
    '</span><span class="note" style="margin-top:8px">' +
    w.phrase +
    "</span></div>";
  track.appendChild(b);
});

/* Filtri della collezione: nessuno spostamento forzato della pagina. */
$$("[data-f]").forEach(function (b) {
  b.addEventListener("click", function () {
    $$("[data-f]").forEach(function (x) {
      x.setAttribute("aria-pressed", String(x === b));
    });
    $$(".work").forEach(function (w) {
      w.hidden = !(
        b.dataset.f === "all" ||
        (" " + w.dataset.tag + " ").indexOf(" " + b.dataset.f + " ") > -1
      );
    });
    if (hasG) ScrollTrigger.refresh();
  });
});

export { track };
