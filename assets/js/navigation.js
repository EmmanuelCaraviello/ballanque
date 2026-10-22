/**
 * Gestisce pianta, stato della sala corrente, focus e collegamenti del sito.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $, $$, RM } from "./core.js";
import { setInert } from "./dialogs.js";

/* Navigazione essenziale, senza statistiche o percorso obbligato. */
var nav = $("#nav"),
  plan = $("#plan"),
  planBtn = $("#planBtn");
window.addEventListener(
  "scroll",
  function () {
    nav.classList.toggle("solid", window.scrollY > 60);
  },
  { passive: true },
);
/** Apre la pianta e sposta il focus nel dialogo. */
function openPlan() {
  plan.classList.add("open");
  setInert(true);
  planBtn.setAttribute("aria-expanded", "true");
  document.documentElement.style.overflow = "hidden";
  // Il focus sulla pianta ne annuncia il titolo senza scorrere via dall'insieme.
  plan.focus({ preventScroll: true });
}
/** Chiude il menu, ripristina lo scroll e riporta il focus al pulsante. */
function closePlan() {
  plan.classList.remove("open");
  setInert(false);
  planBtn.setAttribute("aria-expanded", "false");
  document.documentElement.style.overflow = "";
  planBtn.focus();
}
planBtn.addEventListener("click", openPlan);
$("#planClose").addEventListener("click", closePlan);
// Esc chiude il menu anche nella home, dove il modulo delle schede non è caricato.
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && plan.classList.contains("open")) closePlan();
});
$$("#plan a[href^='#']").forEach(function (a) {
  a.addEventListener("click", function (e) {
    var target = $(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    closePlan();
    target.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});
/** Evidenzia la sala corrente con testo e aria-current, senza affidarsi al solo colore. */
function markRoom(id) {
  const labels = {
    ingresso: "Ingresso",
    studio: "Studio",
    museo: "Museo",
    commissiona: "Contatti",
  };
  $$("[data-map-room]", plan).forEach(function (room) {
    if (room.dataset.mapRoom === id)
      room.setAttribute("aria-current", "location");
    else room.removeAttribute("aria-current");
  });
  const status = $(".map-location", plan);
  if (status)
    status.textContent = labels[id]
      ? "Sei qui / " + labels[id]
      : "Visita libera";
}
markRoom(
  document.body.classList.contains("museum-page")
    ? "museo"
    : document.getElementById("ingresso")
      ? "ingresso"
      : "",
);
if ("IntersectionObserver" in window) {
  var navIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.dataset.navSection || e.target.id;
        markRoom(id);
        $$("[data-nav-link]").forEach(function (a) {
          var active = a.dataset.navLink === id;
          a.classList.toggle("on", active);
          if (active) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -55% 0px" },
  );
  $$("#ingresso, [data-nav-section]").forEach(function (section) {
    navIO.observe(section);
  });
}

export { closePlan };
