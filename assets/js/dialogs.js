/**
 * Accessibilità dei dialoghi: sfondo inerte e focus confinato nel menu o nella scheda aperta.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $, $$ } from "./core.js";

/* ===================== DIALOGHI ===================== */
var bgEls = [$("#nav"), $("main"), $("#uscita")];
/** Esclude lo sfondo dalla navigazione mentre un dialogo è aperto. */
function setInert(on) {
  bgEls.forEach(function (el) {
    if (!el) return;
    if (on) {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    } else {
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
    }
  });
}
/** Mantiene il tasto Tab tra i controlli visibili del dialogo. */
function trapTab(e, box) {
  if (e.key !== "Tab") return;
  var f = $$(
    'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea',
    box,
  ).filter(function (x) {
    return x.offsetParent !== null;
  });
  if (!f.length) return;
  var a = f[0],
    z = f[f.length - 1];
  if (
    e.shiftKey &&
    (document.activeElement === a || document.activeElement === box)
  ) {
    e.preventDefault();
    z.focus();
  } else if (!e.shiftKey && document.activeElement === z) {
    e.preventDefault();
    a.focus();
  }
}
$("#plan").addEventListener("keydown", function (e) {
  trapTab(e, this);
});
$("#expo").addEventListener("keydown", function (e) {
  trapTab(e, this);
});

export { setInert, trapTab };
