/**
 * Lente della maglia: sette punti focali, pulsanti, selettori e gesti touch senza bloccare lo scroll.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $, $$, RM } from "./core.js";

/* ===================== SALA 02: LENTE ===================== */
/* punti focali in pixel dell'immagine 1695×1385: x, y, ingrandimento */
var IW = 1695,
  IH = 1385;
var FOCI = [
  [847, 692, 1],
  [840, 640, 1.7],
  [1111, 482, 4],
  [550, 480, 4.8],
  [850, 135, 2.6],
  [575, 255, 5.5],
  [1575, 430, 3.2],
];
var Z = FOCI.map(function (f) {
  var s2 = f[2],
    u = f[0] / IW - 0.5,
    v = f[1] / IH - 0.5;
  return { s: s2, x: -s2 * u * 100, y: -s2 * v * 100 };
});
var steps = $$("#steps li"),
  N = Z.length,
  lcIdx = 0,
  tapMode = false;
var zoomerEl = $("#zoomer"),
  lensEl = $(".lens"),
  chipRow = $("#lensChips"),
  chips = $$("#lensChips button");
/** Sincronizza descrizione, indice e selettore del dettaglio. */
function markStep(k) {
  steps.forEach(function (li, j) {
    li.classList.toggle("cur", j === k);
  });
  var sn = $("#stepNo");
  if (sn)
    sn.textContent =
      String(k + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
  chips.forEach(function (c, j) {
    c.setAttribute("aria-current", j === k);
  });
  var c = chips[k];
  if (c && tapMode) {
    chipRow.scrollTo({
      left: c.offsetLeft - chipRow.clientWidth / 2 + c.offsetWidth / 2,
      behavior: RM ? "auto" : "smooth",
    });
  }
}
/** Applica posizione e ingrandimento del punto focale richiesto. */
function goStep(k) {
  lcIdx = (k + N) % N;
  var z = Z[lcIdx];
  zoomerEl.style.transform =
    "translate(" + z.x + "%," + z.y + "%) scale(" + z.s + ")";
  $("#mag").textContent = "× " + z.s.toFixed(1);
  markStep(lcIdx);
}
/** Abilita i controlli manuali della lente. */
function tapOn() {
  tapMode = true;
  document.body.classList.add("lens-tap");
  goStep(lcIdx);
}
/** Ripristina la vista base della lente. */
function tapOff() {
  tapMode = false;
  document.body.classList.remove("lens-tap");
  zoomerEl.style.transform = "";
}
$("#lensPrev").addEventListener("click", function () {
  goStep(lcIdx - 1);
});
$("#lensNext").addEventListener("click", function () {
  goStep(lcIdx + 1);
});
chips.forEach(function (c) {
  c.addEventListener("click", function () {
    goStep(+c.dataset.k);
  });
});
(function () {
  var sx = 0,
    sy = 0,
    on = false;
  lensEl.addEventListener("pointerdown", function (e) {
    if (!tapMode) return;
    on = true;
    sx = e.clientX;
    sy = e.clientY;
  });
  lensEl.addEventListener("pointerup", function (e) {
    if (!tapMode || !on) return;
    on = false;
    var dx = e.clientX - sx,
      dy = e.clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      goStep(lcIdx + (dx < 0 ? 1 : -1));
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      goStep(lcIdx + 1);
    }
  });
  lensEl.addEventListener("pointercancel", function () {
    on = false;
  });
})();

// La lente è manuale su tutti i dispositivi: nessuna sequenza obbligata.
tapOn();
