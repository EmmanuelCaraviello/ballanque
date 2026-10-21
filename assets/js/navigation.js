/**
 * Gestisce menu, chiusura e collegamenti alle tre sezioni principali.
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
/** Apre il menu e sposta il focus sul primo collegamento. */
function openPlan() {
  plan.classList.add("open");
  setInert(true);
  planBtn.setAttribute("aria-expanded", "true");
  document.documentElement.style.overflow = "hidden";
  var first = $("a", plan);
  if (first) first.focus();
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
plan.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closePlan();
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
if ("IntersectionObserver" in window) {
  var navIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.dataset.navSection;
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
  $$("[data-nav-section]").forEach(function (section) {
    navIO.observe(section);
  });
}

export { closePlan };
